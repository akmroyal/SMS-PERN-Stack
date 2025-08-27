import { useEffect, useMemo, useState, useCallback } from 'react'
import { useStudentStore } from '../store/students'
import { Card, CardBody, Button, Input, Select, Modal, Table } from '../components/ui'
import { Plus, Pencil, Trash2, ArrowUpDown, CheckCircle2, AlertCircle, X, Search, Filter } from 'lucide-react'
import { getAllStudents, createStudent, updateStudent as apiUpdateStudent, deleteStudent as apiDeleteStudent } from '../api/studentsApi.js'

function StudentForm({ initial = {}, onCreated, onUpdated, onRequestClose }) {
  const [form, setForm] = useState({
    name: initial.name || '',
    age: initial.age ?? '',
    className: initial.className || '',
    marks: initial.marks ?? '',
    gender: initial.gender || 'Male',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // auto-dismiss messages
  useEffect(() => {
    if (!error) return
    const t = setTimeout(() => setError(''), 4000)
    return () => clearTimeout(t)
  }, [error])
  useEffect(() => {
    if (!success) return
    const t = setTimeout(() => setSuccess(''), 3000)
    return () => clearTimeout(t)
  }, [success])

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    // Map to API schema: server expects "class" not "className"
    const payload = {
      name: form.name,
      age: Number(form.age),
      class: form.className,
      marks: Number(form.marks),
      gender: form.gender,
    }

    if (form.name.length < 2) {
      setError("Name atleast to be 2 character long !!")
      return;
    }
    try {
      const isEdit = Boolean(initial?.st_id)
      if (isEdit) {
        await apiUpdateStudent(initial.st_id, payload)
        setSuccess('Student updated successfully!')
      } else {
        await createStudent(payload)
        setSuccess('Successfully added!')
      }
      // reset form
      setForm({ name: '', age: '', className: '', marks: '', gender: 'Male' })
      // ask parent to refresh list
      if (isEdit) onUpdated && onUpdated(); else onCreated && onCreated()
      // close the modal after 4s
      setTimeout(() => { onRequestClose && onRequestClose() }, 4000)
    } catch (error) {
      setError(`Failed to add student. ${error?.message ?? ''}`);
    }
  }


  return (
    <form onSubmit={submit} className="grid grid-cols-2 gap-4">
      {/* Alerts */}
      {error && (
        <div className="col-span-2 -mb-2 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700">
          <AlertCircle className="mt-0.5 size-5 text-red-600" />
          <div className="flex-1 text-sm">{error}</div>
          <button type="button" onClick={() => setError('')} className="rounded p-1 hover:bg-red-100">
            <X className="size-4" />
          </button>
        </div>
      )}
      {success && (
        <div className="col-span-2 -mb-2 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-800">
          <CheckCircle2 className="mt-0.5 size-5 text-emerald-600" />
          <div className="flex-1 text-sm">{success}</div>
          <button type="button" onClick={() => setSuccess('')} className="rounded p-1 hover:bg-emerald-100">
            <X className="size-4" />
          </button>
        </div>
      )}
      <label className="col-span-2">
        <div className="text-sm text-gray-600 mb-1">Full Name</div>
        <Input name="name" value={form.name} onChange={change} placeholder="Enter full name" required />
      </label>
      <label>
        <div className="text-sm text-gray-600 mb-1">Age</div>
        <Input name="age" type="number" min="1" value={form.age} onChange={change} required />
      </label>
      <label>
        <div className="text-sm text-gray-600 mb-1">Class</div>
        <Input name="className" value={form.className} onChange={change} placeholder="e.g. 10" required />
      </label>
      <label>
        <div className="text-sm text-gray-600 mb-1">Marks</div>
        <Input name="marks" type="number" min="0" max="100" value={form.marks} onChange={change} required />
      </label>
      <label>
        <div className="text-sm text-gray-600 mb-1">Gender</div>
        <Select name="gender" value={form.gender} onChange={change}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </Select>
      </label>
      <div className="col-span-2 flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}

export default function Students() {
  const store = useStudentStore()
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [pageMsg, setPageMsg] = useState({ type: '', text: '' })

  // Local rows and classes are computed from server data for real-time updates
  // (search/filter/sort state still lives in the store)

  const onAdd = () => { setEditId(null); setOpen(true) }
  const onEdit = (id) => { setEditId(id); setOpen(true) }
  // Note: creation handled inside StudentForm -> API -> refresh list

  const SortBtn = ({ id, children }) => (
    <button onClick={() => store.setSort(id)} className={`inline-flex items-center gap-1 ${store.sortBy === id ? 'text-emerald-700' : 'text-gray-700'}`}>
      {children} <ArrowUpDown className="size-4" />
    </button>
  )


  // Real Data fetch 
  const [studentsData, setStudentsData] = useState([]);

  const fetchStudents = useCallback(async () => {
    try {
      const data = await getAllStudents();
      setStudentsData(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  }, [])

  useEffect(() => { fetchStudents() }, [fetchStudents])
  useEffect(() => {
    if (!pageMsg.text) return
    const t = setTimeout(() => setPageMsg({ type: '', text: '' }), 3000)
    return () => clearTimeout(t)
  }, [pageMsg])

  // derive classes list from current data
  const classes = useMemo(() => {
    const set = new Set(studentsData.map((s) => String(s.class)))
    return ['All', ...Array.from(set)]
  }, [studentsData])

  // apply search/filter/sort on server data so cards and table update live
  const rows = useMemo(() => {
    const q = store.search.trim().toLowerCase()
    const filtered = studentsData.filter((s) => (
      (store.filterClass === 'All' || String(s.class) === String(store.filterClass)) &&
      (q === '' || s.name.toLowerCase().includes(q) || String(s.class).toLowerCase().includes(q))
    ))
    const sel = {
      name: (x) => x.name.toLowerCase(),
      class: (x) => parseInt(x.class, 10) || 0,
      marks: (x) => Number(x.marks) || 0,
      age: (x) => Number(x.age) || 0,
    }[store.sortBy] || ((x) => x.name.toLowerCase())
    filtered.sort((a,b) => {
      const ka = sel(a); const kb = sel(b)
      if (ka < kb) return store.sortDir === 'asc' ? -1 : 1
      if (ka > kb) return store.sortDir === 'asc' ? 1 : -1
      return 0
    })
    return filtered
  }, [studentsData, store.search, store.filterClass, store.sortBy, store.sortDir])

  // now that studentsData exists, compute editing and delete handler
  const editing = editId ? (studentsData.find((x) => x.st_id === editId) || null) : null
  const onDelete = async (id) => {
    try {
      if (!window.confirm('Delete this student?')) return
      await apiDeleteStudent(id)
      await fetchStudents()
      setPageMsg({ type: 'success', text: 'Student deleted successfully.' })
    } catch (e) {
      console.error('Failed to delete', e)
      setPageMsg({ type: 'error', text: `Delete failed. ${e?.message ?? ''}` })
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Card><CardBody>
          <div className="text-sm text-gray-500">Search Result</div>
          <div className="text-3xl font-semibold">{rows.length}</div>
        </CardBody></Card>
        <Card><CardBody>
          <div className="text-sm text-gray-500">Total Students</div>
          <div className="text-3xl font-semibold">{studentsData.length}</div>
        </CardBody></Card>
        <Card><CardBody>
          <div className="text-sm text-gray-500">Average Marks</div>
          <div className="text-3xl font-semibold">{Math.round((studentsData.reduce((a, b) => a + (Number(b.marks) || 0), 0)) / Math.max(1, studentsData.length))}</div>
        </CardBody></Card>
        <Card><CardBody>
          <div className="text-sm text-gray-500">Classes</div>
          <div className="text-3xl font-semibold">{classes.length - 1}</div>
        </CardBody></Card>
      </div>

      {/* Page-level alerts */}
      {pageMsg.text && (
        <div className={`flex items-start gap-2 rounded-lg border px-3 py-2 ${pageMsg.type==='success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}>
          {pageMsg.type==='success' ? <CheckCircle2 className="mt-0.5 size-5"/> : <AlertCircle className="mt-0.5 size-5"/>}
          <div className="flex-1 text-sm">{pageMsg.text}</div>
          <button className="rounded p-1 hover:bg-black/5" onClick={() => setPageMsg({ type:'', text:'' })}><X className="size-4"/></button>
        </div>
      )}

      <Card>
        <CardBody className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 flex-wrap">
            {/* Search */}
            <div className="relative w-full sm:flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                className="pl-9 h-10"
                placeholder="Search by name or class"
                value={store.search}
                onChange={(e) => store.setSearch(e.target.value)}
                aria-label="Search students"
              />
            </div>

            {/* Filter by class */}
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-gray-500 hidden sm:block" />
              <span className="text-sm text-gray-600 hidden sm:block">Class</span>
              <Select
                value={store.filterClass}
                onChange={(e) => store.setFilterClass(e.target.value)}
                className="h-10 w-[160px]"
                aria-label="Filter by class"
              >
                {classes.map((c) => <option key={c}>{c}</option>)}
              </Select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:ml-auto">
              <Button
                variant="ghost"
                className="h-10"
                onClick={() => { store.setSearch(''); store.setFilterClass('All') }}
              >
                Clear
              </Button>
              <Button onClick={onAdd} className="h-10 px-4"><Plus className="size-4" /> Add Student</Button>
            </div>
          </div>

          <Table
            columns={[
              { key: 'st_id', header: 'Roll Num' },
              { key: 'name', header: <SortBtn id="name">Full Name</SortBtn> },
              { key: 'class', header: <SortBtn id="class">Class</SortBtn> },
              { key: 'gender', header: 'Gender' },
              { key: 'age', header: <SortBtn id="age">Age</SortBtn> },
              { key: 'marks', header: <SortBtn id="marks">Marks</SortBtn> },
              { key: 'actions', header: 'Actions' },
            ]}
            rows={rows}
            renderRow={(r) => (
              <tr key={r.st_id} className="border-t">
                <td className="px-4 py-2">{r.st_id}</td>
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">{r.class}</td>
                <td className="px-4 py-2">{r.gender}</td>
                <td className="px-4 py-2">{String(r.age).padStart(2, '0')}</td>
                <td className="px-4 py-2">{r.marks}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => onEdit(r.st_id)}><Pencil className="size-4" /> Edit</Button>
                    <Button variant="danger" onClick={() => onDelete(r.st_id)}><Trash2 className="size-4" /> Delete</Button>
                  </div>
                </td>
              </tr>
            )}
          />
        </CardBody>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={editId ? 'Edit Student' : 'Add Student'}
        actions={<>
          {/* Save handled by form */}
        </>}>
        <StudentForm
          initial={editing ? { ...editing, className: editing.class } : {}}
          onCreated={fetchStudents}
          onUpdated={fetchStudents}
          onRequestClose={() => setOpen(false)}
        />
      </Modal>
    </div>
  )
}

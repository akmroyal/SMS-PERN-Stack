import { useMemo, useCallback, useEffect, useState } from 'react'
import { Card, CardBody } from '../components/ui'
import { getAllStudents } from '../api/studentsApi'

export default function Dashboard() {
  const [students, setStudents] = useState([])

  const load = useCallback(async () => {
    const data = await getAllStudents()
    setStudents(data)
  }, [])

  useEffect(() => { load() }, [load])

  const byClass = useMemo(() => {
    const map = new Map()
    for (const s of students) map.set(String(s.class), (map.get(String(s.class)) || 0) + 1)
    return Array.from(map.entries()).sort((a,b)=>parseInt(a[0])-parseInt(b[0]))
  }, [students])
  const avgMarks = useMemo(() => Math.round((students.reduce((a,b)=>a + (Number(b.marks)||0),0))/Math.max(1, students.length)), [students])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Card><CardBody>
          <div className="text-sm text-gray-500">Total Students</div>
          <div className="text-3xl font-semibold">{students.length}</div>
        </CardBody></Card>
        <Card><CardBody>
          <div className="text-sm text-gray-500">Classes</div>
          <div className="text-3xl font-semibold">{byClass.length}</div>
        </CardBody></Card>
        <Card><CardBody>
          <div className="text-sm text-gray-500">Top Class</div>
          <div className="text-3xl font-semibold">{byClass[0]?.[0] ?? '-'}</div>
        </CardBody></Card>
        <Card><CardBody>
          <div className="text-sm text-gray-500">Average Marks</div>
          <div className="text-3xl font-semibold">{avgMarks}</div>
        </CardBody></Card>
      </div>
      <Card>
        <CardBody>
          <div className="text-lg font-semibold mb-2">Students per Class</div>
          <div className="grid grid-cols-12 gap-2">
            {byClass.map(([c, n]) => (
              <div key={c} className="col-span-3 sm:col-span-2">
                <div className="text-xs text-gray-500 mb-1">Class {c}</div>
                <div className="h-24 bg-emerald-100 rounded flex items-end">
                  <div style={{height: `${10 + n*10}px`}} className="w-full bg-emerald-600 rounded-b"></div>
                </div>
                <div className="text-center text-sm mt-1">{n}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

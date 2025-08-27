import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Student shape
// { id: string, name: string, age: number, className: string, marks: number, gender?: string }

const seed = [
  { id: 'A123BC', name: 'Tommy Smith', age: 12, className: '7', marks: 78, gender: 'Male' },
  { id: 'B456DE', name: 'Lucy Brown', age: 17, className: '12', marks: 92, gender: 'Female' },
  { id: 'C789FG', name: 'Jake White', age: 8, className: '3', marks: 65, gender: 'Male' },
  { id: 'D012HI', name: 'Ella Green', age: 15, className: '10', marks: 88, gender: 'Female' },
  { id: 'E345JK', name: 'Max Jones', age: 10, className: '5', marks: 71, gender: 'Male' },
]

export const useStudentStore = create(
  persist(
    (set, get) => ({
      students: seed,
      search: '',
      filterClass: 'All',
      sortBy: 'name',
      sortDir: 'asc',

      setSearch: (q) => set({ search: q }),
      setFilterClass: (cls) => set({ filterClass: cls }),
      setSort: (by) => {
        const { sortBy, sortDir } = get()
        if (sortBy === by) {
          set({ sortDir: sortDir === 'asc' ? 'desc' : 'asc' })
        } else {
          set({ sortBy: by, sortDir: 'asc' })
        }
      },

      addStudent: (stu) => set((s) => ({ students: [ { ...stu, id: crypto.randomUUID().slice(0,6).toUpperCase() }, ...s.students ] })),
      updateStudent: (id, patch) => set((s) => ({ students: s.students.map((x) => x.id === id ? { ...x, ...patch } : x) })),
      deleteStudent: (id) => set((s) => ({ students: s.students.filter((x) => x.id !== id) })),

      getFilteredSorted: () => {
        const { students, search, filterClass, sortBy, sortDir } = get()
        const q = search.trim().toLowerCase()
        let rows = students.filter((s) =>
          (filterClass === 'All' || s.className === filterClass) &&
          (q === '' || s.name.toLowerCase().includes(q) || s.className.toLowerCase().includes(q))
        )
        const keySel = {
          name: (x) => x.name.toLowerCase(),
          class: (x) => parseInt(x.className, 10) || 0,
          marks: (x) => x.marks,
          age: (x) => x.age,
        }[sortBy] || ((x) => x.name.toLowerCase())
        rows.sort((a, b) => {
          const ka = keySel(a); const kb = keySel(b)
          if (ka < kb) return sortDir === 'asc' ? -1 : 1
          if (ka > kb) return sortDir === 'asc' ? 1 : -1
          return 0
        })
        return rows
      },
    }),
    { name: 'sms-students' }
  )
)

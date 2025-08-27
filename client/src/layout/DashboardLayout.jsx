import { Outlet, NavLink } from 'react-router-dom'
import { Settings, UserRound, GraduationCap } from 'lucide-react'

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-[#f3f5f6]">
            <header className="bg-emerald-900 text-white">
                <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <GraduationCap className="size-6" />
                        <div className="font-semibold">Student Management System •</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <NavLink to="/" className="hover:underline">Dashboard</NavLink>
                        <NavLink to="/students" className="hover:underline">Students</NavLink>
                        <Settings className="size-5 opacity-80" />
                        <div className="size-8 rounded-full bg-emerald-800 grid place-content-center">
                            <UserRound className="size-5" />
                        </div>
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-7xl px-4 py-6">
                <Outlet />
            </main>
        </div>
    )
}

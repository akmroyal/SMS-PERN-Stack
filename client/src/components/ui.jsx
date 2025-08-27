import { X } from 'lucide-react'

export const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>{children}</div>
)

export const CardBody = ({ children, className = '' }) => (
    <div className={`p-4 ${className}`}>{children}</div>
)

export const Button = ({ children, className = '', variant = 'primary', ...rest }) => {
    const base = 'inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60'
    const variants = {
        primary: 'bg-emerald-700 hover:bg-emerald-800 text-white',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-800',
        outline: 'border border-gray-300 hover:bg-gray-50',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
    }
    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...rest}>{children}</button>
    )
}

export const Input = ({ className = '', ...rest }) => (
    <input className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 ${className}`} {...rest} />
)

export const Select = ({ className = '', ...rest }) => (
    <select className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 ${className}`} {...rest} />
)

export const Modal = ({ open, onClose, title, children, actions }) => {
    if (!open) return null
    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="font-semibold">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
                        <X className="size-5" />
                    </button>
                </div>
                <div className="p-4">{children}</div>
                {actions && <div className="flex justify-end gap-2 border-t px-4 py-3">{actions}</div>}
            </div>
        </div>
    )
}

export const Table = ({ columns, rows, renderRow }) => (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
                <tr>
                    {columns.map((c) => (
                        <th key={c.key} className="px-4 py-2 text-left font-medium">{c.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {!rows || rows.length === 0 ? (
                    <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={columns.length}>No data</td></tr>
                ) : (
                    rows.map((r) => renderRow(r))
                )}
            </tbody>
        </table>
    </div>
)

import { useState, type ReactNode } from 'react'


interface HeaderDropdownMenuType {
    children: ReactNode,
    icon: ReactNode
};

export default function HeaderDropdownMenu({ children,icon }: HeaderDropdownMenuType) {

    const [open, setOpen] = useState(false);

    return (
        <div
            className="relative group"
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className="them-button-style">
                {icon}
            </div>

            {open && (
                <div className="absolute end-0 bg-slate-200 dark:bg-gray-900 border-x rounded-lg px-2 py-3 lg:px-6 lg:py-4 space-y-2 md:space-y-3 shadow-lg">
                    {children}
                </div>
            )}
        </div>

    )
}

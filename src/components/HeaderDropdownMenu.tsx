import { useState, type ReactNode } from 'react'
import { TiThMenu } from 'react-icons/ti'


interface HeaderDropdownMenuType {
    children: ReactNode
};

export default function HeaderDropdownMenu({ children }: HeaderDropdownMenuType) {

    const [open, setOpen] = useState(false);

    return (
        <div
            className="relative"
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className="them-button-style hover:-rotate-90 transition-all">
                <TiThMenu className="size-4" />
            </div>

            {open && (
                <div className="absolute right-0 bg-slate-200 dark:bg-gray-900 border-x rounded-lg px-6 py-4 space-y-3 shadow-lg">
                    {children}
                </div>
            )}
        </div>

    )
}

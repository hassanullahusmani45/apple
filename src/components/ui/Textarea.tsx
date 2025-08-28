import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { TiWarningOutline } from "react-icons/ti";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string,
    label?: string,
    error?: string
    id?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ name, label, error, id, ...props }, ref) => {

    const elementId = id || name;


    return (
        <div className="">
            {label && <label htmlFor={elementId} className="font-bold ms-4">{label} :</label>}

            <textarea
                id={elementId}
                ref={ref}
                name={name}
                {...props}
                className="textarea-style"
            ></textarea>
            {error ? <span className="flex justify-start items-center gap-1 text-sm font-semibold text-red-500 ms-4"><TiWarningOutline className="size-6" />{error}</span> : <div className="min-h-[1.5rem]"></div>}
        </div>
    );
});

export default Textarea;
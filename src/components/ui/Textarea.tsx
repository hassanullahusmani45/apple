import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { TiWarningOutline } from "react-icons/ti";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string,
    label?: string,
    error?: string
    id?: string;
    className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ name, label, error, id, className, ...props }, ref) => {

    const elementId = id || name;
    const { t } = useTranslation('zod_error_messages');


    return (
        <div className="">
            {label && <label htmlFor={elementId} className="ms-4 text-sm md:text-base">{label} :</label>}

            <textarea
                id={elementId}
                ref={ref}
                name={name}
                {...props}
                className={`textarea-style ${className}`}
            ></textarea>
            {error ? <span className="flex justify-start items-center gap-1 text-sm font-semibold text-red-500 ms-4"><TiWarningOutline className="size-6" />{t(error)}</span> : <div className="min-h-[1.5rem]"></div>}
        </div>
    );
});

export default Textarea;
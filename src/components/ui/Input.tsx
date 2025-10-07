import { forwardRef, type InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { TiWarningOutline } from "react-icons/ti";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, id, className, ...props }, ref) => {
  const inputId = id || props.name;
  const { t } = useTranslation('zod_error_messages');
  return (
    <div className="flex flex-col gap-0.5">
      {label && <label htmlFor={inputId} className="ms-4 text-sm md:text-base">{label} :</label>}
      <input
        id={inputId}
        ref={ref}
        {...props}
        autoComplete="off"
        className={`input-style ${className}`}
      />
      {error ? <span className="flex justify-start items-center gap-1 text-xs font-semibold text-red-500 ms-4 min-h-[1.3rem]"><TiWarningOutline className="size-5" />{t(error)}</span> : <div className="min-h-[1.3rem]"></div>}
    </div>
  );
});

export default Input;

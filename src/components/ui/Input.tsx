import { forwardRef, type InputHTMLAttributes } from "react";
import { TiWarningOutline } from "react-icons/ti";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, id, ...props }, ref) => {
  const inputId = id || props.name;

  return (
    <div className="flex flex-col gap-1 mb-1.5">
      {label && <label htmlFor={inputId} className="font-bold ms-4">{label} :</label>}
      <input
        id={inputId}
        ref={ref}
        {...props}
        autoComplete="off"
        className="input-style"
      />
      {error ? <span className="flex justify-start items-center gap-1 text-sm font-semibold text-red-500 ms-4"><TiWarningOutline className="size-6" />{error}</span> : <div className="min-h-[1.5rem]"></div>}
    </div>
  );
});

export default Input;

import { forwardRef, type InputHTMLAttributes } from "react";
import { TiWarningOutline } from "react-icons/ti";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      {label && <label className="font-medium ms-4">{label} :</label>}
      <input
        ref={ref}
        {...props}
        autoComplete="off"
        className="font-base rounded-full shadow-md block w-full p-2.5 px-6 bg-slate-300 dark:bg-slate-950/70 placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal"
      />
      {error ? <span className="flex justify-start items-center gap-1 text-sm font-semibold text-red-500 ms-4"><TiWarningOutline className="size-6" />{error}</span> : <div className="min-h-[1.5rem]"></div>}
    </div>
  );
});

export default Input;

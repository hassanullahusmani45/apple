import type { TextareaHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Textarea from "../ui/Textarea";



interface RHFTextareaPrpos extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string,
    label?: string,
    className?: string,
}


const RHFTextarea = ({ name, label, className, ...reset }: RHFTextareaPrpos) => {

    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Textarea
                    {...field}
                    {...reset}
                    label={label}
                    className={className}
                    error={fieldState.error?.message}
                />
            )}
        />
    )
}

export default RHFTextarea;
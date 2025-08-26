import { Controller, useFormContext } from "react-hook-form";
import Input from "../ui/Input";
import type { InputHTMLAttributes } from "react";

interface RHFInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
}

const RHFInput = ({ name, label, type = "text", ...rest }: RHFInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          {...rest}
          label={label}
          type={type}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default RHFInput;

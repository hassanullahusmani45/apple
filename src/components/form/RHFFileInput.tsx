import { Controller, useFormContext } from "react-hook-form";
import Input from "../ui/Input";
import type { InputHTMLAttributes } from "react";

interface RHFFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  id?: string;
}

const RHFFileInput = ({ name, label, id, ...rest }: RHFFileInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState }) => (
        <Input
          {...rest}
          type="file"
          id={id}
          label={label}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            field.onChange(e.target.files)
          }
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default RHFFileInput;

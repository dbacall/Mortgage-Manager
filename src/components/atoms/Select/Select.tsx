import { type FC } from "react";
import { useFormContext } from "react-hook-form";

interface SelectProps {
  options: Option[]
  placeholder: string;
  className?: React.ComponentProps<'select'>['className'];
  name: string
}

interface Option {
  label: string;
  value: string;
}

export const Select: FC<SelectProps> = ({
  options,
  name,
  placeholder,
  className = ""
}) => {
  const methods = useFormContext();

  return (
    <select className={`select select-bordered border-slate-200 font-medium text-md max-w-xs ${className}`} {...methods.register(name)}>
      <option disabled selected>{placeholder}</option>
      {options.map((option) => (
        <option value={option.value} key={option.label}>{option.label}</option>

      ))}
    </select>
  );
}

import { type FC } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  name: string;
}

export const NumberInput: FC<InputProps> = ({ className = "", error, name, ...props }) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col w-full">
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <input
            className={`input input-bordered text-sm border-slate-200 text-content-primary placeholder-content-tertiary ${className}`}
            type="number"
            {...props}
            {...field}
            onChange={(e) => {
              field.onChange(e.target.valueAsNumber)
            }}
          />
        )
        }
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

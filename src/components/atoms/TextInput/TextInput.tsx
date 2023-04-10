import { type FC } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  name: string;
}

export const TextInput: FC<InputProps> = ({ className = "", error, name, ...props }) => {
  const methods = useFormContext()

  return (
    <div className="flex flex-col w-full">
      <input
        className={`input input-bordered w-full text-sm border-slate-200 text-content-primary placeholder-content-tertiary ${className}`}
        type="text"
        {...props}
        {...methods.register(name)}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

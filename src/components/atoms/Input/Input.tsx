import { type FC } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  name: string;
}

export const Input: FC<InputProps> = ({ className = "", error, name, ...props }) => {
  const methods = useFormContext()

  return (
    <>
      <input
        className={`w-full max-w-xs input input-bordered border-slate-200 text-content-primary placeholder-content-tertiary ${className}`}
        {...props}
        {...methods.register(name)}
      />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}

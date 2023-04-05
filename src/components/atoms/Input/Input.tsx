import { type FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  name: string;
  register: any;
}

export const Input: FC<InputProps> = ({ className = "", error, name, register, ...props }) => {
  return (
    <>
      <input className={`w-full max-w-xs input input-bordered border-slate-200 ${className}`} {...props} {...register(name)} />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}

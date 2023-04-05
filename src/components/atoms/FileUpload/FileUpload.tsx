import { type FC } from "react";
import { useFormContext } from "react-hook-form";

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  name: string;
}

export const FileUpload: FC<FileUploadProps> = ({ className = "", error, name, ...props }) => {
  const methods = useFormContext();

  return (
    <>
      <input
        type="file"
        className={`file-input file-input-primary w-full max-w-xs  ${className}`}
        {...props}
        {...methods.register(name)}
      />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}

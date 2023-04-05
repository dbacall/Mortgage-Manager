import type { FC } from "react";
import PropagateLoader from "react-spinners/PropagateLoader"
import { buttonVariants } from "./Button.variants";
import type { VariantProps } from "class-variance-authority";

interface ButtonProps extends VariantProps<typeof buttonVariants>, React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading: boolean;
}

export const Button: FC<ButtonProps> = ({ className = '', isLoading = false, ...props }) => {
  const mergedClassName = `w-full btn btn-primary ${className}`

  return (
    <button
      className={buttonVariants({ isLoading, className: mergedClassName })}
      {...props}
    >
      {
        isLoading ? (
          <PropagateLoader
            size={10}
            color="#bef2ff"
            cssOverride={{
              marginBottom: 8
            }}
          />
        ) : (
          'Submit'
        )}
    </button >
  );
}

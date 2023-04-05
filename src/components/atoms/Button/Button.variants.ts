import { cva } from "class-variance-authority";

export const buttonVariants = cva(["font-semibold", "border", "rounded"], {
  variants: {
    isLoading: {
      true: ["pointer-events-none"],
      false: ["pointer-events-auto"],
    }
  },
  defaultVariants: {
    isLoading: false,
  },
});

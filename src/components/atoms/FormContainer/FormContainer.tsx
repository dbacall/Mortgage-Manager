import { type PropsWithChildren, type FC } from "react";

export const FormContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full relative mb-24">
      <div className="bg-white text-center mt-24 p-12 w-128 rounded-lg m-auto shadow-xl">
        {children}
      </div>
    </div>
  );
}

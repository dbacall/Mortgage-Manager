import { type PropsWithChildren, type FC } from "react";

export const FormContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full relative overflow-auto">
      <div className="bg-white text-center my-24 p-12 w-128 rounded-lg m-auto shadow-xl">
        {children}
      </div>
    </div>
  );
}

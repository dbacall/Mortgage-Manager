import type { FC, PropsWithChildren } from "react";
import { Header } from "src/components";

const SignedInLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="pt-20">
        {children}
      </div>
    </div>
  );
}

export default SignedInLayout;
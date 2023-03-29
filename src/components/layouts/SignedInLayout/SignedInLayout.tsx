import type { FC, PropsWithChildren } from "react";
import { Header } from "src/components";

const SignedInLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default SignedInLayout;
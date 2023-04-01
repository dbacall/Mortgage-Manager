import type { FC, PropsWithChildren } from "react";
import { Header } from "src/components";
import { BiRefresh, BiCalculator } from 'react-icons/bi';
import { IoHelpSharp } from 'react-icons/io5';
import { BsPersonAdd } from 'react-icons/bs';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col pt-16">
          {children}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

        </div>
        <div className="drawer-side pt-16">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 bg-slate-100 text-base-content w-64">
            <li className="text-primary-focus"><a><BiRefresh size={20} /> Client Renewals</a></li>
            <li className="text-slate-400"><a><BsPersonAdd size={20} /> Add Client</a></li>
            <li className="text-slate-400"><a><BiCalculator size={20} /> Mortgage Calculator</a></li>
            <li className="text-slate-400"><a><IoHelpSharp size={20} /> Help</a></li>
          </ul>

        </div>
      </div>
    </div >
  );
}

export default MainLayout;
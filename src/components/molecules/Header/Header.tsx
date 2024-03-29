import { BiLogOut, BiCog } from 'react-icons/bi'
import Link from "next/link";
import Image from 'next/image';

const Header = () => {
  return (
    <div className="navbar bg-base-100 fixed z-50 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          <Image
            alt=""
            src="https://iazjjkurflujtydrmeqj.supabase.co/storage/v1/object/public/mortgage-manager/full-logo.png?t=2023-03-30T23%3A29%3A41.650Z"
            height={50}
            width={140}
          />
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-content-primary">
          <li>
            <Link href="/settings" legacyBehavior>
              <a className="gap-2">
                <BiCog size={20} />
                Settings
              </a>
            </Link>
          </li>
          <li>
            <Link href="/api/auth/signout" legacyBehavior>
              <a className="gap-2">
                <BiLogOut size={20} />
                Log out
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}


export default Header;
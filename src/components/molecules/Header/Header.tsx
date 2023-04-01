import { BiLogOut } from 'react-icons/bi'
import Link from "next/link";
import Image from 'next/image';

const Header = () => {
  return (
    <div className="navbar bg-base-100 fixed z-50">
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
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/api/auth/signout" legacyBehavior>
              <a>
                <BiLogOut size={20} /> Log out
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}


export default Header;
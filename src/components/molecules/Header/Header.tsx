import { BiLogOut } from 'react-icons/bi'
import Link from "next/link";

const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Placeholder Logo</a>
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
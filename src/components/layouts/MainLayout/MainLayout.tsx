import { type FC, type PropsWithChildren, useState, useEffect, type ReactElement } from "react";
import { Header } from "src/components";
import { BiRefresh } from 'react-icons/bi';
import { IoHelpSharp } from 'react-icons/io5';
import { BsPersonAdd } from 'react-icons/bs';
import { useRouter } from "next/router";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  console.log(router);
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    setAudio(new Audio('/help.mp3'))
  }, [])

  const options = [
    {
      name: 'Client Renewals',
      icon: <BiRefresh size={20} />,
      href: '/',
      isSelected: router.pathname === '/'
    },
    {
      name: 'Add Client',
      icon: <BsPersonAdd size={20} />,
      href: '/client/add',
      isSelected: router.pathname === '/client/add'
    },
    {
      name: 'Mortgage Calculator',
      icon: <BiRefresh size={20} />,
      isSelected: router.pathname === '/afafsdd'
    },
    {
      name: 'Help',
      icon: <IoHelpSharp size={20} />,
      isSelected: router.pathname === '/afddafs'
    },
  ]

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
            {options.map((option, id) => (
              <li
                key={id}
                className={option.isSelected ? "text-primary-focus" : "text-slate-400"}
              >
                <a
                  onClick={() => {
                    if (option.name === 'Help') {
                      audio.play().catch(() => { })
                    } else {
                      router.push(option.href)
                    }
                  }}
                >
                  {option.icon} {option.name}
                </a>
              </li>
            ))}

            {/* <li className="text-slate-400"><a href="https://www.youtube.com/watch?v=CTsB-llTzyc&t=34s" target="_blank"><IoHelpSharp size={20} /> Help</a></li> */}
          </ul>

        </div>
      </div>
    </div >
  );
}

export const getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default MainLayout;
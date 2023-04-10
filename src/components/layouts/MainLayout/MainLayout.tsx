import { type FC, type PropsWithChildren, useState, useEffect, type ReactElement } from "react";
import { Header } from "src/components";
import {
  BsPersonAdd,
  BsPersonFillAdd,
  BsHouseAdd,
  BsHouseAddFill,
  BsCalculator,
  BsCalculatorFill,
  BsQuestionCircle,
  BsQuestionCircleFill,
  BsFileEarmarkText,
  BsFileEarmarkTextFill
} from 'react-icons/bs';
import { useRouter } from "next/router";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudio(new Audio('/help.mp3'))
  }, [])

  const options = [
    {
      name: 'Client Renewals',
      icon: router.pathname === '/' ? <BsFileEarmarkTextFill size={20} /> : <BsFileEarmarkText size={20} />,
      href: '/',
      isSelected: router.pathname === '/'
    },
    {
      name: 'Mortgage Calculator',
      icon: <BsCalculator size={20} />,
      isSelected: router.pathname === '/afafsdd'
    },
    {
      name: 'Add Client',
      icon: router.pathname === '/client/add' ? <BsPersonFillAdd size={20} /> : <BsPersonAdd size={20} />,
      href: '/client/add',
      isSelected: router.pathname === '/client/add'
    },
    {
      name: 'Add Mortgage',
      icon: router.pathname === '/mortgage/add' ? <BsHouseAddFill size={20} /> : <BsHouseAdd size={20} />,
      href: '/mortgage/add',
      isSelected: router.pathname === '/mortgage/add'
    },
    {
      name: 'Help',
      icon: <BsQuestionCircle size={20} />,
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
        <div className="drawer-side pt-16 shadow-lg">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 bg-slate-100 text-base-content w-64">
            {options.map((option, id) => (
              <li
                key={id}
                className={option.isSelected ? "text-primary-focus" : "text-content-tertiary"}
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
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
  IoPersonOutline,
  IoStorefrontOutline
} from 'react-icons/io5'

import { LogoutButton, SidebarItem } from '..'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    path: '/dashboard',
    title: 'Dashboard'
  },
  {
    icon: <IoCheckboxOutline />,
    path: '/dashboard/rest-todos',
    title: 'REST ToDos'
  },
  {
    icon: <IoListOutline />,
    path: '/dashboard/server-todos',
    title: 'Server ToDos'
  },
  {
    icon: <IoStorefrontOutline />,
    path: '/dashboard/cookies',
    title: 'Cookies'
  },
  {
    icon: <IoBasketOutline />,
    path: '/dashboard/products',
    title: 'Productos'
  },
  {
    icon: <IoPersonOutline />,
    path: '/dashboard/profile',
    title: 'Perfil de usuario'
  }
]

export default async function Sidebar() {
  const session = await getServerSession(authOptions)
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="#" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="tailus logo"
              width={128}
              height={36}
            />
          </Link>
        </div>
        <div className="mt-8 text-center">
          {session?.user?.image && session.user.name && (
            <Image
              src={session.user.image}
              alt={session.user.name}
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
              width={150}
              height={150}
            />
          )}
          {session?.user?.name && (
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{session.user.name}</h5>
          )}
          {session?.user?.roles && (
            <span className="hidden text-gray-400 lg:inline capitalize">{session?.user?.roles?.join(', ')}</span>
          )}
        </div>
        <ul className="space-y-2 tracking-wide mt-4">
          {menuItems.map((item) => (
            <SidebarItem key={item.title} {...item} />
          ))}
        </ul>
      </div>
      <LogoutButton />
    </aside>
  )
}

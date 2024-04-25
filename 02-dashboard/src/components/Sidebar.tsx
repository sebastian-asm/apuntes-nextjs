import Image from 'next/image'

import { IoLogoReact, IoBrowsersOutline, IoCalculator, IoEgg } from 'react-icons/io5'

import { SidebarMenuItem } from '.'

const menuItems = [
  {
    path: '/dashboard/main',
    icon: <IoBrowsersOutline size={25} />,
    title: 'Dashboard',
    description: 'Visualización'
  },
  {
    path: '/dashboard/counter',
    icon: <IoCalculator size={25} />,
    title: 'Counter',
    description: 'Contador client side'
  },
  {
    path: '/dashboard/pokemons',
    icon: <IoEgg size={25} />,
    title: 'Pokemons',
    description: 'Pokedex online'
  }
]

export default function Sidebar() {
  return (
    <div
      id="menu"
      style={{ width: '400px' }}
      className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0 overflow-y-scroll"
    >
      <div id="logo" className="my-4 px-6">
        <div className="flex items-center mb-2">
          <IoLogoReact className="mr-2 text-xl" />
          <h1 className="text-lg md:text-2xl font-bold text-white">
            Dash<span className="text-blue-500">8</span>.
          </h1>
        </div>
        <p className="text-slate-500 text-sm">Manage your actions and activities</p>
      </div>
      <div id="profile" className="px-6 py-10">
        <p className="text-slate-500">Welcome back,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            {/* con Image es necesario hacer una configuración en next.config */}
            <Image
              className="rounded-full w-8 h-8"
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
              alt="Avatar"
              height="50"
              width="50"
            />
          </span>
          <span className="text-sm md:text-base font-bold">Demo</span>
        </a>
      </div>
      <div id="nav" className="w-full px-6">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  )
}

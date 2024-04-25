'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Props {
  path: string
  icon: JSX.Element
  title: string
  description: string
}

export default function SidebarMenuItem({ path, icon, title, description }: Props) {
  const pathname = usePathname()
  return (
    <Link
      href={path}
      className={`${
        pathname === path ? 'bg-blue-800' : ''
      } w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-4 hover:bg-white/5 transition ease-linear duration-150`}
    >
      <div>{icon}</div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-white">{title}</span>
        <span className="text-sm text-white/50 md:block">{description}</span>
      </div>
    </Link>
  )
}

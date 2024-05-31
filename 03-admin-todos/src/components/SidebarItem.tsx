'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  icon: React.ReactNode
  path: string
  title: string
}

export default function SidebarItem({ icon, path, title }: Props) {
  const pathName = usePathname()
  const activeLink = pathName === path ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''

  return (
    <li>
      <Link href={path} className={`${activeLink} relative px-4 py-3 flex items-center space-x-4 rounded-xl`}>
        {icon}
        <span className="font-medium">{title}</span>
      </Link>
    </li>
  )
}

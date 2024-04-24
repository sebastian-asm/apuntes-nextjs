// indicamos que este componente sea del lado del cliente
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import style from './ActiveLink.module.css'

interface Props {
  path: string
  name: string
}

export default function ActiveLink({ path, name }: Props) {
  // usePathname solo funciona del lado del servidor
  const pathName = usePathname()

  return (
    <Link className={`${style.link} ${pathName === path ? style['active-link'] : ''}`} href={path}>
      {name}
    </Link>
  )
}

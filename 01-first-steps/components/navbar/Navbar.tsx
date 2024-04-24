import Link from 'next/link'

import { ActiveLink } from '..'

const navItems = [
  { path: '/pricing', name: 'Pricing' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' }
]

export default function Navbar() {
  return (
    <nav className="flex justify-between bg-blue-800 bg-opacity-30 p-2 m-2 rounded">
      <Link href="/">
        <h5>Home</h5>
      </Link>
      <div>
        {navItems.map(({ path, name }) => (
          <ActiveLink key={name} path={path} name={name} />
        ))}
      </div>
    </nav>
  )
}

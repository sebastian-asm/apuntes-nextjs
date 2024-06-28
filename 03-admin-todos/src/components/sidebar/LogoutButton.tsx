'use client'
import { MouseEventHandler } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { CiLogout } from 'react-icons/ci'

const Button = ({ title, onClick }: { title: string; onClick: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
      <button onClick={onClick} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <CiLogout />
        <span className="group-hover:text-gray-700">{title}</span>
      </button>
    </div>
  )
}

export default function LogoutButton() {
  const { data: session, status } = useSession()
  // si fuera del lado del servidor, un estado de loading no seria necesario
  // if (status === 'loading') return <p>Espere...</p>
  if (status === 'unauthenticated') return <Button onClick={() => signIn()} title="Ingresar" />
  return <Button onClick={() => signOut()} title="Salir" />
}

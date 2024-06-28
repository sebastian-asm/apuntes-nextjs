'use client'
import { useSession } from 'next-auth/react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  return (
    <section className="m-5">
      <h5 className="text-xl text-gray-600 mb-5">Usuario conectado (client side)</h5>
      {status === 'loading' && <p className="font-bold">Cargando...</p>}
      {status === 'authenticated' && (
        <div>
          <p className="mb-2.5">Nombre: {session?.user?.name}</p>
          <p className="mb-2.5">Email: {session?.user?.email}</p>
          <p className="mb-2.5 capitalize">Roles: {session?.user?.roles?.join(', ')}</p>
          <p>Url de la imagen: {session?.user?.image}</p>
        </div>
      )}
    </section>
  )
}

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { WidgetItem } from '@/components'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/api/auth/signin')

  return (
    <div className="px-6 pt-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <WidgetItem title="Usuario conectado (server side)">{JSON.stringify(session.user)}</WidgetItem>
      </div>
    </div>
  )
}

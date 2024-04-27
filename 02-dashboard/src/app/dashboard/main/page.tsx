import type { Metadata } from 'next'

import { WidgetsGrid } from '@/components'

export const metadata: Metadata = {
  title: 'Admin Dashboard Page'
}

export default function MainPage() {
  return (
    <section className="p-2">
      <div className="mb-5">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Información general</p>
      </div>
      <WidgetsGrid />
    </section>
  )
}

import { cookies } from 'next/headers'

import { TabBar } from '@/components'

export const metadata = {
  title: 'Cookies'
}

export default function CookiesPage() {
  const cookie = cookies()
  const cookieTab = cookie.get('cookieTab')?.value ?? '1'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <TabBar currentTab={+cookieTab} />
    </div>
  )
}

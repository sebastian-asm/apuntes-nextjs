'use client'
import { useState } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

interface Props {
  currentTab?: number
  tabOptions?: number[]
}

export default function TabBar({ tabOptions = [1, 2, 3, 4], currentTab = 1 }: Props) {
  const router = useRouter()
  const [tabSelect, setTabSelect] = useState(currentTab)

  const onTabSelected = (tab: number) => {
    setTabSelect(tab)
    setCookie('cookieTab', tab.toString())
    router.refresh()
  }

  return (
    <div className={`m-5 grid space-x-2 rounded-xl bg-gray-200 p-2 ${'grid-cols-' + tabOptions.length}`}>
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            checked={tabSelect === tab}
            onChange={() => {}}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  )
}

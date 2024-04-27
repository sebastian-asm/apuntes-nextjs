'use client'
import { IoCartOutline } from 'react-icons/io5'

import { useAppSelector } from '@/store'
import SimpleWidget from './SimpleWidget'

export default function WidgetsGrid() {
  const count = useAppSelector((state) => state.counter.count)
  return (
    <div className="flex justify-center flex-wrap gap-8">
      <SimpleWidget
        title={count.toString()}
        subtitle="Productos"
        label="Contador"
        href="/dashboard/counter"
        icon={<IoCartOutline size={50} className="text-blue-500" />}
      />
    </div>
  )
}

import Link from 'next/link'

interface Props {
  title: string
  subtitle?: string
  label?: string
  // se puede definir como JSX.Element o React.ReactElement
  // la ventaja de este último es que pueden ser más de un elemento
  icon?: React.ReactElement
  href?: string
}

export default function SimpleWidget({ title, subtitle, label, icon, href }: Props) {
  return (
    <div className="bg-white shadow-xl p-3 sm:min-w-[25%] min-w-full  rounded-2xl border-1 border-gray-50 mx-2">
      <div className="flex flex-col">
        {label && <h2 className="font-bold text-gray-600 text-center">{label}</h2>}
        <div className="my-3">
          <div className="flex flex-row items-center justify-center space-x-1 ">
            {icon}
            <div id="temp" className="text-center">
              {title && <h4 className="text-4xl">{title}</h4>}
              {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
          </div>
        </div>
        {href && (
          <div className="w-full place-items-end text-right border-t-2 border-gray-100 mt-2">
            <Link href={href} className="text-indigo-600 text-xs font-medium">
              Más
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

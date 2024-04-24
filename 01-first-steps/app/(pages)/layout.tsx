import { Navbar } from '@/components'

export default function PagesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="text-center">
        <h3>Pages</h3>
        {children}
      </main>
    </>
  )
}

import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-5xl">Test</p>
      <Link href="/pricing">Pricing list</Link>
    </main>
  )
}

import { Heading } from '@/components/Heading'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Heading content="Hello World" as={'h1'} size="6xl" />
    </main>
  )
}

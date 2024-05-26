import SchedulesHeader from '@/components/SchedulesHeader'

// https://nextjs.org/docs/app/api-reference/file-conventions/layout
export default function SchedulesLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    username: string
  }
}) {
  return (
    <main
      id="Container"
      className="min-h-screen overflow-hidden flex flex-col items-center"
    >
      <SchedulesHeader username={''} />
      {children}
    </main>
  )
}

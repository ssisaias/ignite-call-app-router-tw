import SchedulesHeader from '@/components/SchedulesHeader'

export default function SchedulesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main
      id="Container"
      className="min-h-screen overflow-hidden flex flex-col items-center"
    >
      <SchedulesHeader />
      {children}
    </main>
  )
}

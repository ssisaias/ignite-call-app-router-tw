import { Metadata } from 'next'

import SchedulesHeader from '@/components/SchedulesHeader'

export const metadata: Metadata = {
  title: 'Agendar | Ignite Call',
  openGraph: {
    title: 'Agendar | Ignite Call',
    siteName: 'Ignite Call',
    locale: 'pt_BR',
    type: 'website',
  },
}

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
      <SchedulesHeader username={params.username} />
      {children}
    </main>
  )
}

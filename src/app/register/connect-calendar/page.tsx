import { Metadata } from 'next'
import { Suspense } from 'react'

import { Heading } from '@/components/Heading'
import { Multistep } from '@/components/Multistep'
import { Text } from '@/components/Text'
import { auth } from '@/lib/auth'

import { ConnectForm } from './connectForm'

export const metadata: Metadata = {
  title: 'Agendamento descomplicado',
  description:
    'Conecte seu calendário e permita que seus clientes agendem horários com você no seu tempo livre.',
  openGraph: {
    title: 'Agendamento descomplicado',
    description:
      'Conecte seu calendário e permita que seus clientes agendem horários com você no seu tempo livre.',
    siteName: 'Ignite Call',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function Page() {
  const session = await auth()

  return (
    <main
      id="Container"
      className="min-h-screen overflow-hidden flex flex-col items-center"
    >
      <div id="Header" className="max-w-[572px] mt-16 ml-4 mr-4 self-center">
        <Heading as={'strong'} className="leading-base">
          Conecte sua agenda
        </Heading>
        <Text className="leading-base text-gray200 mb-6">
          Conecte seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados
        </Text>

        <Multistep size={4} currentStep={2} />
        <Suspense>
          <ConnectForm session={session} />
        </Suspense>
      </div>
    </main>
  )
}

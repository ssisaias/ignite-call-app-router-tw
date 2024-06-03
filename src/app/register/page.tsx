import { Metadata } from 'next'
import { Suspense } from 'react'

import { Heading } from '@/components/Heading'
import { Multistep } from '@/components/Multistep'
import { Text } from '@/components/Text'

import { RegisterForm } from './registerForm'

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
}

export default async function Page() {
  return (
    <main
      id="Container"
      className="min-h-screen overflow-hidden flex flex-col items-center"
    >
      <div id="Header" className="max-w-[572px] mt-16 ml-4 mr-4 self-center">
        <Heading as={'strong'} className="leading-base">
          Bem vindo ao Ignite Call
        </Heading>
        <Text className="leading-base text-gray200 mb-6">
          Precisamos de algumas informações para criar seu perfil, você pode
          editá-las posteriormente.
        </Text>

        <Multistep size={4} currentStep={1} />
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  )
}

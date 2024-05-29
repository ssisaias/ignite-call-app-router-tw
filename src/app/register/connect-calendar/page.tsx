import { Heading } from '@/components/Heading'
import { Multistep } from '@/components/Multistep'
import { Text } from '@/components/Text'
import { auth } from '@/lib/auth'

import { ConnectForm } from './connectForm'

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

        <ConnectForm session={session} />
      </div>
    </main>
  )
}

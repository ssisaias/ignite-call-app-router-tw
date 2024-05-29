import { Heading } from '@/components/Heading'
import { Multistep } from '@/components/Multistep'
import { Text } from '@/components/Text'

import IntervalForm from './intervalForm'

export default function Page() {
  // const session = await auth()

  return (
    <main
      id="Container"
      className="min-h-screen overflow-hidden flex flex-col items-center"
    >
      <div id="Header" className="max-w-[572px] mt-16 ml-4 mr-4 self-center">
        <Heading as={'strong'} className="leading-base">
          Quase lá
        </Heading>
        <Text className="leading-base text-gray200 mb-6">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <Multistep size={4} currentStep={3} />

        <IntervalForm />
      </div>
    </main>
  )
}

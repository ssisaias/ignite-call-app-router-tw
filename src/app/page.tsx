import Image from 'next/image'

import { ClaimUsernameForm } from '@/components/ClaimUsernameForm'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'

import previewImg from '../assets/homepreview.png'

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div
        id="container"
        className="flex items-center gap-20 ml-auto max-w-[calc(100vw-(100vw-1160px))/2] overflow-hidden"
      >
        <div id="hero" className="max-w-[480px] pl-10">
          <Heading size="4xl" className="font-bold ">
            Agendamento descomplicado
          </Heading>
          <Text size="lg" className="mt-2 text-gray-200">
            Conecte seu calendário e permita que seus clientes agendem horários
            com você no seu tempo livre.
          </Text>
          <div className="my-2">
            <ClaimUsernameForm />
          </div>
        </div>
        <div id="preview">
          <Image
            src={previewImg}
            alt="Preview"
            height={400}
            width={600}
            quality={100}
            priority={true}
          />
        </div>
      </div>
    </main>
  )
}

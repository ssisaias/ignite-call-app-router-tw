import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'

import previewImg from '../assets/homepreview.png'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div
        id="container"
        className="flex items-center gap-20 ml-auto max-w-[calc(100vw-(100vw-1160px))/2] overflow-hidden"
      >
        <div id="hero" className="max-w-[480px] pl-10">
          <Heading
            content="Agendamento descomplicado"
            size="4xl"
            className="font-bold "
          />
          <Text
            size="lg"
            content="Conecte seu calendário e permita que seus clientes agendem horários com você no seu tempo livre."
            className="mt-2 text-gray-200"
          />
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

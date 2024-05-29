import { Heading } from '@/components/Heading'
import { Multistep } from '@/components/Multistep'
import { Text } from '@/components/Text'

import { RegisterForm } from './registerForm'

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
        <RegisterForm />
      </div>
    </main>
  )
}

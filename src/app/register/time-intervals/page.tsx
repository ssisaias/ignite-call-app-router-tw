import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Heading } from '@/components/Heading'
import { Multistep } from '@/components/Multistep'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { auth } from '@/lib/auth'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

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

        <form id="intervalbox" className="mt-6 flex flex-col">
          <div
            id="intervalscontainer"
            className="border-[1px] border-solid border-gray600 rounded-md mb-4 bg-gray800"
          >
            <div
              id="intervalitem"
              className="flex flex-row justify-between items-center py-3 px-4 border-b-[1px] border-solid border-gray600"
            >
              <div id="intervalday" className="flex items-center gap-3">
                <Checkbox /> <Text>Segunda-feira</Text>
              </div>
              <div id="intervalinputs" className="flex items-center gap-2">
                <TextInput sizevariant="sm" type="time" step={60}></TextInput>
                <TextInput sizevariant="sm" type="time" step={60}></TextInput>
              </div>
            </div>

            <div
              id="intervalitem"
              className="flex flex-row justify-between items-center py-3 px-4 border-b-[1px] border-solid border-gray600"
            >
              <div id="intervalday" className="flex items-center gap-3">
                <Checkbox /> <Text>Terça-feira</Text>
              </div>
              <div id="intervalinputs" className="flex items-center gap-2">
                <TextInput sizevariant="sm" type="time" step={60}></TextInput>
                <TextInput sizevariant="sm" type="time" step={60}></TextInput>
              </div>
            </div>
          </div>

          <Button type="submit" className="self-end w-full">
            Próximo passo <ArrowRight />
          </Button>
        </form>
      </div>
    </main>
  )
}

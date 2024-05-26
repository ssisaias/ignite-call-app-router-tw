'use client'

import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextArea } from '@/components/TextArea'
import { TextInput } from '@/components/TextInput'
import { CalendarBlank, Clock } from '@phosphor-icons/react/dist/ssr'

export default function ConfirmStepForm() {
  function handleConfirmScheduling() {}

  return (
    <Box
      as={'form'}
      id="ConfirmForm"
      onSubmit={handleConfirmScheduling}
      className="md:w-[540px] max-w-[540px] mt-6 mx-auto mb-0 flex flex-col gap-4 [&_label]:flex [&_label]:flex-col [&_label]:gap-2"
    >
      <div
        id="FormHeader"
        className="flex content-between items-stretch pb-4 border-b-[1px] border-b-solid border-b-gray600 [&_svg]:text-gray200 [&_svg]:w-5 [&_svg]:h-5"
      >
        <Text as={'span'} className="flex items-center gap-2">
          <CalendarBlank /> 22 de Setembro de 2022
        </Text>
        <Text as={'span'} className="flex items-center gap-2 ml-auto">
          <Clock /> 18:00h
        </Text>
      </div>
      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput placeholder="Seu nome"></TextInput>
      </label>

      <label>
        <Text size="sm">Endereço de email</Text>
        <TextInput type="email" placeholder="email@exemplo.com"></TextInput>
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea className="w-full"></TextArea>
      </label>

      <div id="FormActions" className="flex justify-end gap-2 mt-2">
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </div>
    </Box>
  )
}

function FormError({ children }: { children: React.ReactNode }) {
  return <Text className="text-destructive-red">{children}</Text>
}

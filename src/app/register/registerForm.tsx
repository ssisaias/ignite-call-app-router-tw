'use client'

import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { Multistep } from '@/components/Multistep'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { ArrowRight } from '@phosphor-icons/react'

export function RegisterForm() {
  return (
    <>
      <Heading as={'strong'} className="leading-base">
        Bem vindo ao Ignite Call
      </Heading>
      <Text className="leading-base text-gray200 mb-6">
        Precisamos de algumas informações para criar seu perfil, você pode
        editá-las posteriormente.
      </Text>

      <Multistep size={4} currentStep={1} />

      <Box id="RegisterForm" as={'form'} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <Text size="sm">Nome de usuário</Text>
          <TextInput prefix="sample.com/" placeholder="seu-usuario"></TextInput>
        </label>

        <label className="flex flex-col gap-2">
          <Text size="sm">Nome Completo</Text>
          <TextInput placeholder="Seu nome"></TextInput>
        </label>

        <Button type="submit" className="self-end w-full">
          Próximo passo <ArrowRight />
        </Button>
      </Box>
    </>
  )
}

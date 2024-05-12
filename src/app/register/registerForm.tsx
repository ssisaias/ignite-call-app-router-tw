'use client'

import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { Multistep } from '@/components/Multistep'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres')
    .max(20, 'O nome de usuário deve ter no máximo 20 caracteres')
    .regex(
      /^[a-z0-9-]+$/,
      'O nome de usuário deve conter apenas letras, números e hífens',
    )
    .transform((value) => value.toLowerCase()),
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegister(data: RegisterFormData) {
    console.log(data)
  }

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

      <Box
        id="RegisterForm"
        as={'form'}
        className="mt-6 flex flex-col gap-4"
        onSubmit={handleSubmit(handleRegister)}
      >
        <label className="flex flex-col gap-2">
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="sample.com/"
            placeholder="seu-usuario"
            {...register('username')}
          ></TextInput>
          {errors.username && (
            <Text size="sm" className="text-descructive-red">
              {errors.username.message}
            </Text>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <Text size="sm">Nome Completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')}></TextInput>
          {errors.name && (
            <Text size="sm" className="text-descructive-red">
              {errors.name.message}
            </Text>
          )}
        </label>

        <Button
          type="submit"
          className="self-end w-full"
          disabled={isSubmitting}
        >
          Próximo passo <ArrowRight />
        </Button>
      </Box>
    </>
  )
}

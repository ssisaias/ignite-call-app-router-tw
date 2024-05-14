'use client'

import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react'
import { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import * as z from 'zod'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres')
    .max(20, 'O nome de usuário deve ter no máximo 20 caracteres')
    .regex(
      /^[a-zA-Z0-9-]+$/,
      'O nome de usuário deve conter apenas letras, números e hífens',
    )
    .transform((value) => value.toLowerCase()),
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function RegisterForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const params = useSearchParams()

  useEffect(() => {
    setValue('username', params.get('username') ?? '')
  }, [params, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
      }
      console.log(error)
    }
  }

  return (
    <>
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
            <Text size="sm" className="text-red-500">
              {errors.username.message}
            </Text>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <Text size="sm">Nome Completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')}></TextInput>
          {errors.name && (
            <Text size="sm" className="text-red-500">
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
      <Toaster theme="dark" />
    </>
  )
}

'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Box } from '../Box'
import { Button } from '../Button'
import { Text } from '../Text'
import { TextInput } from '../TextInput'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres')
    .max(20, 'O nome de usuário deve ter no máximo 20 caracteres')
    .regex(
      /^[a-zA-Z0-9-]+$/,
      'O nome de usuário deve conter apenas letras, números e hífens',
    )
    .transform((value) => value.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const [buttonClicked, setButtonClicked] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    setButtonClicked(true)
    const { username } = data
    router.push(`/register?username=${username}`)
    setTimeout(() => setButtonClicked(false), 15000)
  }

  return (
    <>
      <Box
        as={'form'}
        className="bg-gray700 grid grid-flow-row gap-2 mt-4 md:grid-flow-col"
        onSubmit={handleSubmit(handleClaimUsername)}
      >
        <TextInput
          sizevariant="sm"
          prefix="sample.com/"
          placeholder="seu-usuario"
          className="h-full"
          type="text"
          {...register('username')}
        />
        <Button
          type="submit"
          size="md"
          className="h-full"
          disabled={buttonClicked}
        >
          Reservar login
          <ArrowRight />
        </Button>
      </Box>

      <Text as={'span'} size="sm" className="text-red-500 absolute">
        {errors.username?.message || ''}
      </Text>
    </>
  )
}

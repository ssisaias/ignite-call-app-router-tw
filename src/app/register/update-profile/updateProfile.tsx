'use client'

import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextArea } from '@/components/TextArea'
import { TextInput } from '@/components/TextInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import * as z from 'zod'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

interface UpdateProfileFormProps {
  session: Session
}

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export function UpdateProfileForm({ session }: UpdateProfileFormProps) {
  console.log(session)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  async function handleUpdateProfile(data: UpdateProfileFormData) {}

  return (
    <>
      <Box
        id="UpdateProfileForm"
        as={'form'}
        className="mt-6 flex flex-col gap-4"
        onSubmit={handleSubmit(handleUpdateProfile)}
      >
        <label className="flex flex-col gap-2">
          <Text size="sm">Foto de perfil</Text>
        </label>

        <label className="flex flex-col gap-2">
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')}></TextArea>
          <Text size="xs" className="text-gray200">
            Fale um pouco sobre você.
          </Text>
        </label>

        <Button
          type="submit"
          className="self-end w-full"
          disabled={isSubmitting}
        >
          Finalizar
          <ArrowRight />
        </Button>
      </Box>
      <Toaster theme="dark" />
    </>
  )
}

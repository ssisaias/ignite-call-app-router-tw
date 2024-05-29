'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'
import * as z from 'zod'

import { Avatar } from '@/components/Avatar'
import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextArea } from '@/components/TextArea'
import { api } from '@/lib/axios'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

interface UpdateProfileFormProps {
  session: Session
}

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export function UpdateProfileForm({ session }: UpdateProfileFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    try {
      await api.put('/users/profile', { bio: data.bio }).then(() => {
        toast.success('Perfil atualizado com sucesso.')
        router.push(`/schedule/${session.user?.username}`)
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error('Erro ao atualizar perfil.' + error?.message)
    }
  }

  return (
    <>
      <Box
        id="UpdateProfileForm"
        as={'form'}
        className="mt-6 flex flex-col gap-4 min-w-[94]"
        onSubmit={handleSubmit(handleUpdateProfile)}
      >
        <label className="flex flex-col gap-2">
          <Text size="sm">Foto de perfil</Text>
          <Avatar
            src={session.user?.avatar_url}
            alt={session.user?.name || ''}
          />
        </label>

        <label className="flex flex-col gap-2">
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} className="w-full"></TextArea>
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

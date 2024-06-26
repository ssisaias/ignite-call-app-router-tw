'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarBlank, Clock } from '@phosphor-icons/react/dist/ssr'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'
import { z } from 'zod'
import { useServerAction } from 'zsa-react'

import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { TextArea } from '@/components/TextArea'
import { TextInput } from '@/components/TextInput'
import { CreateSchedule } from '@/lib/actions/insert-booking'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Digite um email válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export interface ConfirmStepFormProps {
  dateSelected?: null | Date
  onBackFn: () => void
}

export default function ConfirmStepForm({
  dateSelected,
  onBackFn,
}: ConfirmStepFormProps) {
  const formatedDate = dayjs(dateSelected).format('DD[ de ]MMMM[ de ]YYYY')
  const formatedTime = dayjs(dateSelected).format('HH:mm')
  const params = useParams<{ username: string }>()
  const username = params.username
  const { execute, isPending } = useServerAction(CreateSchedule, {
    onSuccess: ({ data }) => {
      if (data?.status === 201) {
        toast.success('Horário agendado!')
        onBackFn()
      }
    },
    onError: ({ err }) => {
      console.error(err)
      let errors = err.message ?? ''
      errors += err.cause ?? ''
      errors += err.stack ?? ''
      toast.error(`Não foi possível agendar o horário. ${errors}`)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({ resolver: zodResolver(confirmFormSchema) })

  function handleConfirmScheduling(data: ConfirmFormData) {
    if (!dateSelected) {
      return
    }
    execute({
      username,
      date: dateSelected.toISOString(),
      email: data.email,
      name: data.name,
      observations: data.observations ?? '',
    })
  }

  return (
    <Box
      as={'form'}
      id="ConfirmForm"
      onSubmit={handleSubmit(handleConfirmScheduling)}
      className="md:w-[540px] max-w-[540px] mt-6 mx-auto mb-0 flex flex-col gap-4 [&_label]:flex [&_label]:flex-col [&_label]:gap-2"
    >
      <div
        id="FormHeader"
        className="flex content-between items-stretch pb-4 border-b-[1px] border-b-solid border-b-gray600 [&_svg]:text-gray200 [&_svg]:w-5 [&_svg]:h-5"
      >
        <Text as={'span'} className="flex items-center gap-2">
          <CalendarBlank /> {formatedDate}
        </Text>
        <Text as={'span'} className="flex items-center gap-2 ml-auto">
          <Clock /> {formatedTime}
        </Text>
      </div>
      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')}></TextInput>
        {errors.name && <FormError>{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de email</Text>
        <TextInput
          type="email"
          placeholder="email@exemplo.com"
          {...register('email')}
        ></TextInput>
        {errors.email && <FormError>{errors.email.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea className="w-full" {...register('observations')}></TextArea>
      </label>

      <div id="FormActions" className="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          variant="tertiary"
          onClick={onBackFn}
          disabled={isPending}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || isPending}>
          Confirmar
        </Button>
      </div>
      <Toaster theme="dark" />
    </Box>
  )
}

function FormError({ children }: { children: React.ReactNode }) {
  return (
    <Text className="text-destructive-100" size="sm">
      {children}
    </Text>
  )
}

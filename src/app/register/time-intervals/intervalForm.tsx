'use client'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { convertTimeStringToMinutes } from '@/lib/utils/convert-time-to-minutes'
import { getWeekDays } from '@/lib/utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Selecione pelo menos um dia da semana',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeMinutes - 60 >= interval.startTimeMinutes,
        )
      },
      {
        message:
          'O horário de término deve ser pelo menos 1 hora maior que o horário de início',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function IntervalForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput, unknown, TimeIntervalsFormOutput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })

  const intervals = watch('intervals')

  async function handleSetTimeIntervals(data: TimeIntervalsFormOutput) {
    console.log(data)
  }

  return (
    <form
      id="intervalbox"
      className="mt-6 flex flex-col"
      onSubmit={handleSubmit(handleSetTimeIntervals)}
    >
      <div
        id="intervalscontainer"
        className="border-[1px] border-solid border-gray600 rounded-md mb-4 bg-gray800"
      >
        {fields.map((field, idx) => {
          return (
            <div
              key={field.id}
              id="intervalitem"
              className="flex flex-row justify-between items-center py-3 px-4 border-b-[1px] border-solid border-gray600"
            >
              <div id="intervalday" className="flex items-center gap-3">
                <Controller
                  name={`intervals.${idx}.enabled`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      checked={field.value}
                    />
                  )}
                />
                <Text>{weekDays[field.weekDay]}</Text>
              </div>
              <div id="intervalinputs" className="flex items-center gap-2">
                <TextInput
                  sizevariant="sm"
                  type="time"
                  step={60}
                  disabled={!intervals[idx].enabled}
                  {...register(`intervals.${idx}.startTime`)}
                ></TextInput>
                <TextInput
                  sizevariant="sm"
                  type="time"
                  step={60}
                  disabled={!intervals[idx].enabled}
                  {...register(`intervals.${idx}.endTime`)}
                ></TextInput>
              </div>
            </div>
          )
        })}
      </div>
      {errors.intervals && (
        <Text className="mb-4 leading-base text-destructive-red" size="sm">
          {errors?.intervals?.root?.message}
        </Text>
      )}
      <Button type="submit" className="self-end w-full" disabled={isSubmitting}>
        Próximo passo <ArrowRight />
      </Button>
    </form>
  )
}

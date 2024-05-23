'use client'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'
import { getWeekDays } from '@/lib/utils/get-week-days'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalsFormSchema = z.object({})

export default function IntervalForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
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

  async function handleSetTimeIntervals() {}

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

      <Button type="submit" className="self-end w-full">
        Próximo passo <ArrowRight />
      </Button>
    </form>
  )
}

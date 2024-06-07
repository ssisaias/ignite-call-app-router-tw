'use client'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useServerAction } from 'zsa-react'

import { Box } from '@/components/Box'
import { Calendar } from '@/components/Calendar'
import TimePicker from '@/components/CalendarTimePicker'
import { getUserAgenda } from '@/lib/actions/get-user-calendar'

export interface Availability {
  possibleTimes?: number[] | undefined | null
  availableTimes?: number[] | undefined | null
}

interface CalendarStepProps {
  username?: string | null
  onSelectDateTime: (date: Date) => void
}

export default function CalendarWrapper({
  username,
  onSelectDateTime,
}: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const {
    execute,
    isPending,
    data: availability,
  } = useServerAction(getUserAgenda)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const dateString = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const timePickerOpen = clsx({
    'grid grid-cols-1 md:grid-cols-[1fr,280px] w-7/12': isDateSelected,
    'grid grid-cols-1 w-4/12': !isDateSelected,
  })

  useEffect(() => {
    if (!selectedDate || !username) {
      return
    }
    execute({
      username,
      date: dayjs(selectedDate).format('YYYY-MM-DD'),
    })
  }, [execute, selectedDate, username])

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate).set('hour', hour).startOf('hour')
    onSelectDateTime(dateWithTime.toDate())
  }

  return (
    <Box
      id="Container"
      as={'div'}
      className={`${timePickerOpen} mt-4 grid relative p-0 mb-auto`}
    >
      <Calendar
        selectedDate={selectedDate}
        onDateSelected={setSelectedDate}
        username={username}
      />
      {isDateSelected && (
        <TimePicker
          onClick={handleSelectTime}
          loading={isPending}
          weekDay={weekDay}
          dateString={dateString}
          availability={availability!}
        />
      )}
    </Box>
  )
}

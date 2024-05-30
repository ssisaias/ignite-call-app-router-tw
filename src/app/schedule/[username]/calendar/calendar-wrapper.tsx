'use client'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useAction } from 'next-safe-action/hooks'
import { useEffect, useState } from 'react'

import { Box } from '@/components/Box'
import { Calendar } from '@/components/Calendar'
import TimePicker from '@/components/CalendarTimePicker'
import { getUserAgenda } from '@/lib/actions/get-user-calendar'

export interface Availability {
  possibleTimes?: number[] | undefined | null
  availableTimes?: number[] | undefined | null
}

export default function CalendarWrapper({
  username,
}: {
  username?: string | null
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const {
    execute,
    isExecuting,
    result: availability,
  } = useAction(getUserAgenda)

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
    execute({ username, date: dayjs(selectedDate).format('YYYY-MM-DD') })
  }, [execute, selectedDate, username])

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
          loading={isExecuting}
          weekDay={weekDay}
          dateString={dateString}
          availability={availability.data!}
        />
      )}
    </Box>
  )
}

'use client'
import { Box } from '@/components/Box'
import { Calendar } from '@/components/Calendar'
import TimePicker from '@/components/CalendarTimePicker'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useState } from 'react'

export default function CalendarWrapper() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const dateString = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const timePickerOpen = clsx({
    'grid grid-cols-1 md:grid-cols-[1fr,280px] w-7/12': isDateSelected,
    'grid grid-cols-1 w-4/12': !isDateSelected,
  })

  return (
    <Box
      id="Container"
      as={'div'}
      className={`${timePickerOpen} mt-4 grid relative p-0 mb-auto`}
    >
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePicker weekDay={weekDay} dateString={dateString} />
      )}
    </Box>
  )
}

'use client'
import { Box } from '@/components/Box'
import { Calendar } from '@/components/Calendar'
import TimePicker from '@/components/CalendarTimePicker'
import clsx from 'clsx'
import { useState } from 'react'

export default function CalendarWrapper() {
  // const [isDateSelected, setIsDateSelected] = useState(false)
  const isDateSelected = false
  const timePickerOpen = clsx({
    'grid grid-cols-1 md:grid-cols-[1fr,280px] max-w-[900px]': isDateSelected,
    'grid grid-cols-1 max-w-[560px]': !isDateSelected,
  })
  return (
    <Box
      id="Container"
      as={'div'}
      className={`${timePickerOpen} mt-4 grid relative p-0 `}
    >
      <Calendar />
      {isDateSelected && <TimePicker />}
    </Box>
  )
}

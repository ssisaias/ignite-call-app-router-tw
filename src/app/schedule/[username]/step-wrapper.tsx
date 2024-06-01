'use client'
import { useState } from 'react'

import CalendarWrapper from './calendar/calendar-wrapper'
import ConfirmStep from './confirm/page'

export default function StepWrapper({
  username,
}: {
  username?: string | null
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>()

  function handleClearSelectedDate() {
    setSelectedDate(null)
  }

  return (
    <>
      {selectedDate ? (
        <ConfirmStep
          selectedSchedulingDate={selectedDate}
          onBack={handleClearSelectedDate}
        />
      ) : (
        <CalendarWrapper
          username={username}
          onSelectDateTime={setSelectedDate}
        />
      )}
    </>
  )
}

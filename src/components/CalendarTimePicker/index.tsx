import { SpinnerGap } from '@phosphor-icons/react/dist/ssr'

import { Availability } from '@/app/schedule/[username]/calendar/calendar-wrapper'

import { Text } from '../Text'
import TimePickerItem from './time-picker-btn'

interface TimePickerProps {
  loading?: boolean | null | undefined
  weekDay?: string | null
  dateString?: string | null
  availability?: Availability | null | undefined
}

export default function TimePicker({
  weekDay,
  dateString,
  availability,
  loading,
}: TimePickerProps) {
  return (
    <div
      id="TimePicker"
      className="mt-4 pt-6 px-6 pb-0 md:border-l-[1px] md:border-l-gray600 overflow-y-scroll md:absolute md:w-[280px] top-0 bottom-0 right-0 relative w-full"
    >
      {loading || !availability?.availableTimes ? (
        <div className="flex items-center justify-center">
          <SpinnerGap size={32} className="text-gray-300" weight="fill" />
          <Text className="ml-2 text-gray-300">Please wait...</Text>
        </div>
      ) : (
        <>
          <Text className="font-medium capitalize">
            {weekDay}{' '}
            <span className="text-gray200 ml-1 animate-spin">{dateString}</span>
          </Text>
          <div id="TimePickerList" className="mt-3 grid grid-cols-1 gap-2">
            {availability?.possibleTimes &&
              availability?.possibleTimes.map((hour) => {
                return (
                  <TimePickerItem
                    key={hour}
                    disabled={!availability?.availableTimes!.includes(hour)}
                  >
                    {String(hour).padStart(2, '0')}:00h
                  </TimePickerItem>
                )
              })}
            {!(
              availability?.possibleTimes ||
              availability?.possibleTimes?.length === 0
            ) && <Text className="text-gray200">No available times</Text>}
          </div>
        </>
      )}
    </div>
  )
}

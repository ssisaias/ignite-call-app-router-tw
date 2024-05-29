import '@/lib/dayjs'

import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import { api } from '@/lib/axios'
import { getWeekDays } from '@/lib/utils/get-week-days'

import { Text } from '../Text'
import CalendarDay from './calendar-day'

interface CalendarWeek {
  week: number
  days: Array<{ date: dayjs.Dayjs; disabled: boolean }>
}

type CalendarWeeks = Array<CalendarWeek>

interface CalendarProps {
  selectedDate?: Date | null
  username?: string | null
  onDateSelected: (date: Date) => void
}

interface BlockedDates {
  blockedWeekDays: number[]
}

export function Calendar({
  selectedDate,
  username,
  onDateSelected,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const [blockedDays, setBlockedDays] = useState<BlockedDates>({
    blockedWeekDays: [],
  })

  useEffect(() => {
    api
      .get(`/users/${username}/blocked-dates`, {
        params: {
          year: dayjs(currentDate).format('YYYY'),
          month: dayjs(currentDate).format('MM'),
        },
      })
      .then((res) => {
        console.log(res.data)
        setBlockedDays(res.data)
      })
  }, [currentDate, username])

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')
    setCurrentDate(nextMonth)
  }

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })
    const firstWeekDay = currentDate.get('day')

    const previousMonthFillDays = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillDays = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillDays.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            blockedDays?.blockedWeekDays.includes(date.get('day')),
        }
      }),
      ...nextMonthFillDays.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0
        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }
        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDays])

  return (
    <div id="calendarContainer" className="flex flex-col gap-6 p-6">
      <div id="calendarHeader" className="flex justify-between items-center">
        <div id="calendarTitle" className="flex gap-2">
          <Text size="md" className="font-medium capitalize">
            {currentMonth}
          </Text>{' '}
          <Text size="md" className="text-gray200">
            {currentYear}
          </Text>{' '}
        </div>
        <div
          id="calendarActions"
          className="flex gap-2 text-gray200 shadow-none"
        >
          <button
            onClick={handlePreviousMonth}
            title="Previous month"
            className="cursor-pointer rounded-sm border-2 border-transparent hover:border-gray100 focus:border-gray100"
          >
            <CaretLeft className="hover:text-gray100 hover:fill-current" />
          </button>
          <button
            onClick={handleNextMonth}
            title="Next month"
            className="cursor-pointer rounded-sm border-2 border-transparent hover:border-gray100 focus:border-gray100"
          >
            <CaretRight className="hover:text-gray100 hover:fill-current" />
          </button>
        </div>
      </div>
      <table
        id="calendarBody"
        className="w-full font-default border-separate border-spacing-1 table-fixed gap-2"
      >
        <thead>
          <tr>
            {shortWeekDays.map((day) => (
              <th className="text-gray200 font-medium text-sm" key={day}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="before:content-['.'] before:leading-3 before:block before:text-gray800">
          {calendarWeeks.map((week) => {
            return (
              <tr key={week.week}>
                {week.days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay
                        onClick={() => onDateSelected(date.toDate())}
                        disabled={disabled}
                      >
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

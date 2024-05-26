import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import { Text } from '../Text'
import { getWeekDays } from '@/lib/utils/get-week-days'
import CalendarDay from './calendar-day'

export function Calendar() {
  const shortWeekDays = getWeekDays({ short: true })

  return (
    <div
      id="calendarContainer"
      className="mr-auto mb-0 pt-2 p-6 grid grid-cols-1 gap-6 "
    >
      <div id="calendarHeader" className="flex justify-between items-center">
        <div id="calendarTitle" className="flex gap-2">
          <Text size="md" className="font-medium">
            Dezembro
          </Text>{' '}
          <Text size="md" className="text-gray200">
            2022
          </Text>{' '}
        </div>
        <div
          id="calendarActions"
          className="flex gap-2 text-gray200 shadow-none"
        >
          <button className="cursor-pointer rounded-sm border-2 border-transparent hover:border-gray100 focus:border-gray100">
            <CaretLeft className="hover:text-gray100 hover:fill-current" />
          </button>
          <button className="cursor-pointer rounded-sm border-2 border-transparent hover:border-gray100 focus:border-gray100">
            <CaretRight className="hover:text-gray100 hover:fill-current" />
          </button>
        </div>
      </div>
      <table
        id="calendarBody"
        className="w-[100%] font-default border-separate border-spacing-1 table-fixed gap-2"
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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

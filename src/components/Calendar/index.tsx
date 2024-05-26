import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import { Text } from '../Text'
import { getWeekDays } from '@/lib/utils/get-week-days'
import CalendarDay from './calendar-day'

export function Calendar() {
  const shortWeekDays = getWeekDays({ short: true })

  return (
    <div id="calendarContainer" className="w-full">
      <div id="calendarHeader">
        <div id="calendarTitle">
          <Text>Dezembro</Text> <Text>2022</Text>{' '}
        </div>
        <div id="calendarActions">
          <button>
            <CaretLeft />
          </button>
          <button>
            <CaretRight />
          </button>
        </div>
      </div>
      <table id="calendarBody">
        <thead>
          <tr>
            {shortWeekDays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>2</CalendarDay>
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

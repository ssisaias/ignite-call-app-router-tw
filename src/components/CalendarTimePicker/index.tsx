import { Text } from '../Text'
import TimePickerItem from './time-picker-btn'

interface TimePickerProps {
  weekDay?: string | null
  dateString?: string | null
}

export default function TimePicker({ weekDay, dateString }: TimePickerProps) {
  return (
    <div
      id="TimePicker"
      className="mt-4 pt-6 px-6 pb-0 md:border-l-[1px] md:border-l-gray600 overflow-y-scroll md:absolute md:w-[280px] top-0 bottom-0 right-0 relative w-full"
    >
      <Text className="font-medium capitalize">
        {weekDay} <span className="text-gray200 ml-1">{dateString}</span>
      </Text>

      <div id="TimePickerList" className="mt-3 grid grid-cols-1 gap-2">
        <TimePickerItem>08:00</TimePickerItem>
        <TimePickerItem>09:00</TimePickerItem>
        <TimePickerItem disabled>10:00</TimePickerItem>
        <TimePickerItem>11:00</TimePickerItem>
        <TimePickerItem>12:00</TimePickerItem>
        <TimePickerItem disabled>13:00</TimePickerItem>
        <TimePickerItem>14:00</TimePickerItem>
        <TimePickerItem>15:00</TimePickerItem>
        <TimePickerItem>16:00</TimePickerItem>
        <TimePickerItem>17:00</TimePickerItem>
        <TimePickerItem>18:00</TimePickerItem>
        <TimePickerItem>19:00</TimePickerItem>
        <TimePickerItem>20:00</TimePickerItem>
      </div>
    </div>
  )
}

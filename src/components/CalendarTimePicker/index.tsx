import { Text } from '../Text'
import TimePickerItem from './time-picker-btn'

export default function TimePicker() {
  return (
    <div
      id="TimePicker"
      className="mt-4 pt-6 px-6 pb-0 border-l-[1px] border-l-gray600 overflow-y-scroll absolute top-0 bottom-0 right-0 w-[280px]"
    >
      <Text className="font-medium">
        Terça Feira, <span className="text-gray200">22 de Setembro</span>
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

import CalendarWrapper from './calendar-wrapper'

export default function CalendarStep({
  username,
}: {
  username?: string | null
}) {
  return <CalendarWrapper username={username} />
}

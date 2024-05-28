import CalendarStep from './calendar/page'
// import ConfirmStep from './confirm/page'

export default function ScheduleForm({
  params,
}: {
  children: React.ReactNode
  params: {
    username: string
  }
}) {
  return <CalendarStep username={params.username} />
}

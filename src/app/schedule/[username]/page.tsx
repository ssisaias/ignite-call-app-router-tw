import StepWrapper from './step-wrapper'

export default function ScheduleForm({
  params,
}: {
  children: React.ReactNode
  params: {
    username: string
  }
}) {
  return <StepWrapper username={params.username} />
}

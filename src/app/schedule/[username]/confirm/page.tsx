import ConfirmStepForm from './confirm-step-form'

export default function ConfirmStep({
  selectedSchedulingDate,
  onBack,
}: {
  selectedSchedulingDate?: Date
  onBack: () => void
}) {
  return (
    <ConfirmStepForm onBackFn={onBack} dateSelected={selectedSchedulingDate} />
  )
}

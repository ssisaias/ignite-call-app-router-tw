import ConfirmStepForm from './confirm-step-form'

interface ConfirmStepProps {
  selectedSchedulingDate: Date
  onBack: () => void
}

export default function ConfirmStep({
  selectedSchedulingDate,
  onBack,
}: ConfirmStepProps) {
  return (
    <ConfirmStepForm
      selectedSchedulingDate={selectedSchedulingDate}
      onBack={onBack}
    />
  )
}

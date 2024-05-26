import { Box } from '@/components/Box'
import { Calendar } from '@/components/Calendar'

export default function CalendarStep() {
  return (
    <Box
      id="Container"
      as={'div'}
      className="mt-6 mr-auto mb-0 p-0 grid max-w-[100%] relative"
    >
      <Calendar />
    </Box>
  )
}

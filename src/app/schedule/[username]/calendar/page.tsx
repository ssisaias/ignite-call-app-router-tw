import { Box } from '@/components/Box'
import { Calendar } from '@/components/Calendar'

export default function CalendarStep() {
  return (
    <Box id="Container" as={'div'} className="mt-4 relative p-0 max-w-[540px]">
      <Calendar />
    </Box>
  )
}

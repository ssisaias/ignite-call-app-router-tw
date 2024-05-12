import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Button } from '../Button'
import { TextInput } from '../TextInput'
import { Box } from '../Box'

export function ClaimUsernameForm() {
  return (
    <Box
      as={'form'}
      className="bg-gray700 grid grid-flow-row gap-2 mt-4 md:grid-flow-col"
    >
      <TextInput
        sizeVariant="sm"
        prefix="sample.com/"
        placeholder="seu-usuario"
        className="h-full"
      />
      <Button type="submit" size="md" className="h-full">
        Reservar login
        <ArrowRight />
      </Button>
    </Box>
  )
}

'use client'
import { Button } from '@/components/Button'
import { ArrowRight, Calendar } from '@phosphor-icons/react/dist/ssr'
import { Text } from '@/components/Text'
import { SignIn } from '@/lib/auth-action'

export function ConnectForm() {
  return (
    <form
      id="ConnectBox"
      className="mt-6 flex flex-col"
      action={() => {
        SignIn()
      }}
    >
      <div className="flex py-4 px-6 items-center justify-between border-solid border-gray600 border-[1px] rounded-md mb-2">
        <Text>Google Calendar</Text>
        <Button type="submit" variant="secondary" size="sm">
          Conectar <Calendar />
        </Button>
      </div>

      <Button type="submit" className="self-end w-full">
        Próximo passo <ArrowRight />
      </Button>
    </form>
  )
}

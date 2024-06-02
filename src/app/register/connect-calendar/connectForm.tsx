'use client'
import { ArrowRight, Calendar } from '@phosphor-icons/react/dist/ssr'
import { useRouter, useSearchParams } from 'next/navigation'
import { Session } from 'next-auth'

import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { SignIn } from '@/lib/actions/auth-action'

type ConnectFormProps = {
  session: Session | null
}

export function ConnectForm({ session }: ConnectFormProps) {
  const router = useRouter()
  const params = useSearchParams()

  const hasAuthError = params.has('error')
  const isConnected = !!session

  async function handleNavigateAfterSignIn() {
    await router.push('/register/time-intervals')
  }

  return (
    <Box as={'div'} className="mt-6">
      <form
        id="ConnectBox"
        className="flex flex-col"
        action={() => {
          SignIn()
        }}
      >
        <div className="flex py-4 px-6 items-center justify-between border-solid border-gray600 border-[1px] rounded-md mb-2">
          <Text>Google Calendar</Text>
          <Button
            type="submit"
            variant="secondary"
            size="sm"
            disabled={isConnected}
          >
            {isConnected ? 'Conectado' : 'Conectar'} <Calendar />
          </Button>
        </div>

        {hasAuthError && (
          <Text
            size="sm"
            className="leading-base text-destructive-100 mb-6 border-destructive-red"
          >
            Falha ao conectar à sua agenda. Verifique suas permissões e tente
            novamente.
          </Text>
        )}
      </form>
      <Button
        className="self-end w-full"
        disabled={!isConnected}
        onClick={handleNavigateAfterSignIn}
      >
        Próximo passo <ArrowRight />
      </Button>
    </Box>
  )
}

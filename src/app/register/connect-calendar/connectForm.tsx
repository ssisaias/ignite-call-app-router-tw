'use client'
import { Button } from '@/components/Button'
import { ArrowRight, Calendar } from '@phosphor-icons/react/dist/ssr'
import { Text } from '@/components/Text'
import { SignIn } from '@/lib/auth-action'
import { useRouter, useSearchParams } from 'next/navigation'
import { Box } from '@/components/Box'
import { Session } from 'next-auth'

type ConnectFormProps = {
  session: Session | null
}

export function ConnectForm({ session }: ConnectFormProps) {
  const router = useRouter()
  const params = useSearchParams()

  console.log(session)
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
            className="leading-base text-destructive-red mb-6 border-destructive-red"
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

import { Avatar } from '@/components/Avatar'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'

export default function SchedulesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main
      id="Container"
      className="min-h-screen overflow-hidden flex flex-col items-center"
    >
      <div
        id="userHeader"
        className="mt-12 w-full flex flex-col items-center justify-center"
      >
        <div>
          <Avatar src="https://github.com/ssisaias.png" />
        </div>
        <Heading className="leading-base font-bold" as={'h1'} size="2xl">
          Isaias Silva
        </Heading>
        <Text className="text-gray200" size="md">
          Nobody
        </Text>
      </div>
      {children}
    </main>
  )
}

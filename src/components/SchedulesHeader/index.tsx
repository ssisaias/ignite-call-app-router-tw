import { Avatar } from '../Avatar'
import { Heading } from '../Heading'
import { Text } from '../Text'

export default function SchedulesHeader() {
  return (
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
  )
}

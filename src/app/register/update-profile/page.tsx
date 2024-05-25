import { Heading } from '@/components/Heading'
import { Multistep } from '@/components/Multistep'
import { Text } from '@/components/Text'
import { UpdateProfileForm } from './updateProfile'
import { auth } from '@/lib/auth'

export default async function UpdateProfile() {
  const session = await auth()
  if (!session) {
    return <div>loading please wait...</div>
  }

  return (
    <main
      id="Container"
      className="min-h-screen overflow-hidden flex flex-col items-center"
    >
      <div id="Header" className="max-w-[572px] mt-16 ml-4 mr-4 self-center">
        <Heading as={'strong'} className="leading-base">
          a
        </Heading>
        <Text className="leading-base text-gray200 mb-6">b</Text>

        <Multistep size={4} currentStep={1} />
        <UpdateProfileForm session={session} />
      </div>
    </main>
  )
}

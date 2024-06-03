'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useServerAction } from 'zsa-react'

import { getPublicUserInfo } from '@/lib/actions/get-user-info'

import { Avatar } from '../Avatar'
import { Heading } from '../Heading'
import { Text } from '../Text'

interface SchedulesHeaderProps {
  username?: string | undefined
}

export default function SchedulesHeader({ username }: SchedulesHeaderProps) {
  const {
    execute,
    isPending,
    data: userInfo,
  } = useServerAction(getPublicUserInfo)

  useEffect(() => {
    if (username) {
      execute({ username })
    }
  }, [username, execute])

  return (
    <>
      {isPending ? (
        <div className="flex items-center justify-center">
          <Heading>Loading...</Heading>
        </div>
      ) : (
        <div
          id="userHeader"
          className="mt-10 w-full flex flex-col items-center justify-center"
        >
          <div>
            {userInfo ? (
              <Avatar src={userInfo?.avatar_url || ''} />
            ) : (
              <Avatar src="https://thispersondoesnotexist.com/" />
            )}
          </div>
          <Heading className="leading-base font-bold" as={'h1'} size="2xl">
            {userInfo?.name}
          </Heading>
          <Text className="text-gray200" size="md">
            {userInfo?.bio || (
              <Link href="https://thispersondoesnotexist.com/">
                this person does not exist
              </Link>
            )}
          </Text>
        </div>
      )}
    </>
  )
}

'use client'

import Link from 'next/link'
import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'

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
    isExecuting,
    result: userInfo,
  } = useAction(getPublicUserInfo)

  useEffect(() => {
    if (username) {
      execute({ username })
    }
  }, [username, execute])

  return (
    <>
      {isExecuting ? (
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
              <Avatar src={userInfo?.data?.avatar_url || ''} />
            ) : (
              <Avatar src="https://thispersondoesnotexist.com/" />
            )}
          </div>
          <Heading className="leading-base font-bold" as={'h1'} size="2xl">
            {userInfo?.data?.name}
          </Heading>
          <Text className="text-gray200" size="md">
            {userInfo?.data?.bio || (
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

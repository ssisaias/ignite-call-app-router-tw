'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getPublicUserInfo } from '@/lib/actions/get-user-calendar-action'

import { Avatar } from '../Avatar'
import { Heading } from '../Heading'
import { Text } from '../Text'

interface UserInfo {
  id: string
  username: string
  name: string
  bio: string | null
  avatar_url: string | null
}

interface SchedulesHeaderProps {
  username?: string | undefined
}

export default function SchedulesHeader({ username }: SchedulesHeaderProps) {
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null)
  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getPublicUserInfo(username || '')
      setUserInfo(data)
    }
    fetchUserInfo()
  }, [username])

  return (
    <div
      id="userHeader"
      className="mt-10 w-full flex flex-col items-center justify-center"
    >
      <div>
        {userInfo ? (
          <Avatar src={userInfo.avatar_url || ''} />
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
  )
}

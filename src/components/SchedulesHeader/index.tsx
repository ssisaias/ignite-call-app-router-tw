'use client'

import { getPublicUserInfo } from '@/lib/actions/get-user-calendar-action'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { usePathname } from 'next/navigation'
import { Avatar } from '../Avatar'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface UserInfo {
  id: string
  username: string
  name: string
  bio: string | null
  avatar_url: string | null
}

export default function SchedulesHeader() {
  const path = usePathname()
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null)
  const username = path.replace('/schedule/', '')
  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getPublicUserInfo(username)
      setUserInfo(data)
    }
    fetchUserInfo()
  }, [username])

  return (
    <div
      id="userHeader"
      className="mt-12 w-full flex flex-col items-center justify-center"
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
            you do not exist
          </Link>
        )}
      </Text>
    </div>
  )
}

'use client'
import { Children, ElementType } from 'react'

import { Text } from './Text'

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: string
  as: ElementType
  children?: React.ReactNode
}

export function Box(props: BoxProps) {
  return (
    <>
      {/* className="flex flex-col gap-2" */}
      {props.as && (
        <props.as
          className={`${props.className} p-6 rounded-md bg-gray800 border-solid border-[1px] border-gray600`}
          onClick={props.onClick}
          onSubmit={props.onSubmit}
        >
          {props.content && <Text>{props.content}</Text>}
          {Children.toArray(props.children).map((child, index) => (
            <div key={index}>{child}</div>
          ))}
        </props.as>
      )}
    </>
  )
}

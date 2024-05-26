'use client'
import { ElementType } from 'react'
import { clsx } from 'clsx'

export interface TextProps {
  size?:
    | 'xxs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl'
  as?: ElementType
  className?: string
  children: React.ReactNode
}

export function Text(props: TextProps) {
  const classSize = clsx({
    'text-xxs': props.size === 'xxs',
    'text-xs': props.size === 'xs',
    'text-sm': props.size === 'sm',
    'text-md': !props.size || props.size === 'md',
    'text-lg': props.size === 'lg',
    'text-xl': props.size === 'xl',
    'text-2xl': props.size === '2xl',
    'text-4xl': props.size === '4xl',
    'text-5xl': props.size === '5xl',
    'text-6xl': props.size === '6xl',
    'text-7xl': props.size === '7xl',
    'text-8xl': props.size === '8xl',
    'text-9xl': props.size === '9xl',
  })
  const defaultColor = clsx({
    'text-gray-100':
      !props.className || !props.className.match(/(text-.*\d{3})+/g),
  })
  return (
    <>
      {props.as ? (
        <props.as
          className={`${defaultColor} ${classSize} ${props.className} margin-0 font-default leading-base `}
        >
          {props.children}
        </props.as>
      ) : (
        <p
          className={`${defaultColor} ${classSize} ${props.className} margin-0 font-default leading-base `}
        >
          {props.children}
        </p>
      )}
    </>
  )
}

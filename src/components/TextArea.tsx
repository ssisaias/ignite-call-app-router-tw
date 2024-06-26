'use client'

import { forwardRef } from 'react'

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// eslint-disable-next-line react/display-name
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ ...props }: TextAreaProps, ref) => {
    return (
      <>
        <textarea
          {...props}
          className={`
          box-border min-h-24 resize-y rounded-sm border-2 border-solid border-gray-900 bg-gray-900 px-3
          py-4 font-default text-sm font-regular text-white
          placeholder:text-gray-400 focus-within:border-ignite300
          focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50 
        `}
          placeholder={props.placeholder}
          disabled={props.disabled}
          ref={ref}
        ></textarea>
      </>
    )
  },
)

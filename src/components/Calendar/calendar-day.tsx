interface CalendarDayProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  disabled?: boolean
}

export default function CalendarDay({ children, ...props }: CalendarDayProps) {
  return (
    <button
      className="w-full aspect-square rounded-sm border-transparent border-2 bg-gray600 cursor-pointer hover:border-gray100 focus:border-gray100 disabled:bg-transparent disabled:border-none disabled:cursor-default disabled:text-gray500"
      {...props}
    >
      {children}
    </button>
  )
}

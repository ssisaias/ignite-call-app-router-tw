export interface TimePickerItemProps {
  children: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

export default function TimePickerItem({
  children,
  disabled,
  onClick,
}: TimePickerItemProps) {
  return (
    <button
      className="border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-tight last:mb-8 last:md:mb-6 disabled:bg-none disabled:cursor-default disabled:opacity-40 enabled:hover:bg-gray500 focus:shadow-2 focus:shadow-gray100"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

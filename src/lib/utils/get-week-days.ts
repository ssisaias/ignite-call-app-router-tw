interface GetWeekDaysParams {
  short?: boolean
}
export function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })
  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(1997, 0, day - 2, 0, 0, 0, 0)))
    .map((weekday) => {
      if (short) {
        return weekday.slice(0, 3)
      }

      return weekday.charAt(0).toUpperCase() + weekday.slice(1)
    })
}

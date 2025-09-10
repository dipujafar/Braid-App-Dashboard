export const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export const isDateDisabled = (day: number, currentMonth: Date) => {
  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

export const isDateSelected = (day: number, selectedDate: Date | undefined, currentMonth: Date) => {
  if (!selectedDate) return false
  return (
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === currentMonth.getMonth() &&
    selectedDate.getFullYear() === currentMonth.getFullYear()
  )
}

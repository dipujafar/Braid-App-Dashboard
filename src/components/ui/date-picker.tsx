"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getDaysInMonth, getFirstDayOfMonth, formatDate, isDateDisabled, isDateSelected } from "@/lib/date-utils"

interface DatePickerProps {
  selectedDate: Date | undefined
  onDateSelect: (date: Date) => void
  placeholder?: string
}

export function DatePicker({ selectedDate, onDateSelect, placeholder = "Select date" }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const selectDate = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    onDateSelect(newDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal bg-transparent hover:bg-gray-50"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" type="button" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-sm">
              {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <Button variant="ghost" size="sm" type="button" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, index) => (
              <div key={`empty-${index}`} className="h-9 w-9" />
            ))}
            {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => i + 1).map((day) => (
              <Button
                key={day}
                variant={isDateSelected(day, selectedDate, currentMonth) ? "default" : "ghost"}
                size="sm"
                type="button"
                disabled={isDateDisabled(day, currentMonth)}
                className={`h-9 w-9 p-0 text-sm ${
                  isDateSelected(day, selectedDate, currentMonth)
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : isDateDisabled(day, currentMonth)
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-100"
                }`}
                onClick={() => selectDate(day)}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

"use client"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { timeSlots } from "@/lib/time-utils"

interface TimePickerProps {
  selectedTime: string
  onTimeSelect: (time: string) => void
  placeholder?: string
}

export function TimePicker({ selectedTime, onTimeSelect, placeholder = "Select time" }: TimePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal bg-transparent hover:bg-gray-50"
        >
          <Clock className="mr-2 h-4 w-4" />
          {selectedTime || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-700">Available Times</h4>
          <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                type="button"
                className={`text-xs h-8 ${
                  selectedTime === time
                    ? "bg-purple-600 text-white hover:bg-purple-700 border-purple-600"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => onTimeSelect(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

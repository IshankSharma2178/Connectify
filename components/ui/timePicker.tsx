"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimePickerProps {
  onChange?: (time: string) => void;
}

export function TimePicker({ onChange }: TimePickerProps) {
  const [hour, setHour] = useState<string>("12");
  const [minute, setMinute] = useState<string>("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  const handleTimeChange = (
    newHour: string,
    newMinute: string,
    newPeriod: "AM" | "PM"
  ) => {
    setHour(newHour);
    setMinute(newMinute);
    setPeriod(newPeriod);
    if (onChange) {
      onChange(`${newHour}:${newMinute} ${newPeriod}`);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[280px] justify-start text-left font-normal"
        >
          <Clock className="mr-2 h-4 w-4" />
          {hour}:{minute} {period}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0 bg-white text-black border border-gray-300 rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4">
          <Select
            value={hour}
            onValueChange={(value) => handleTimeChange(value, minute, period)}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                <SelectItem key={h} value={h.toString().padStart(2, "0")}>
                  {h.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={minute}
            onValueChange={(value) => handleTimeChange(hour, value, period)}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Minute" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                <SelectItem key={m} value={m.toString().padStart(2, "0")}>
                  {m.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={period}
            onValueChange={(value: "AM" | "PM") =>
              handleTimeChange(hour, minute, value)
            }
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}

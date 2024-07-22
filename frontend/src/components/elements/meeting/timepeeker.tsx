"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { type TimePeekerProps, type WeeklySchedule } from "@/lib/timepeeker";

export function TimePeeker({ schedule, onSlotClick }: TimePeekerProps) {
  const [selectedSchedule, setSchedule] = useState(schedule);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2" />
            {selectedSchedule.map((day) => (
              <th key={day} className="px-4 py-2 text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time, index) => (
            <tr key={time}>
              <td className="px-4 py-2 text-right">{time}</td>
              {slots[index]?.map((slot, i) => (
                <td
                  key={i}
                  className={`px-4 py-2 ${slot} cursor-pointer border border-gray-300 ${
                    selectedSlots.includes(`${times[index]} - ${days[i]}`)
                      ? "bg-blue-500 text-white"
                      : ""
                  } ${1 ? "bg-blue-200" : ""}`}
                  onMouseDown={() => handleSlotClick(index, i)}
                  onMouseEnter={(e) => {
                    if (isSelecting && e.buttons === 1) {
                      handleSlotClick(index, i);
                    }
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

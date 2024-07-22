"use client";

import React from "react";
import { type TimePeekerProps, TimePeekerSlotType } from "./timepeeker";

export enum WeekDay {
  Monday = "Mon",
  Tuesday = "Tue",
  Wednesday = "Wed",
  Thursday = "Thu",
  Friday = "Fri",
  Saturday = "Sat",
  Sunday = "Sun",
}

export const WeeklySchedule: React.FC<TimePeekerProps> = ({
  schedule,
  onSlotClick,
}) => {
  const days = Object.keys(schedule) as Array<WeekDay>;
  const times =
    days.length > 0
      ? Object.keys(schedule[days[0]!] as Record<string, TimePeekerSlotType>)
      : [];

  const getSlot = (day: WeekDay, time: string) => {
    return schedule[day]![time];
  };
  const getSlotClass = (slotType: TimePeekerSlotType) => {
    switch (slotType) {
      case TimePeekerSlotType.Busy:
        return "bg-green-600";
      case TimePeekerSlotType.Available:
      default:
        return "bg-white";
    }
  };

  return (
    <div className="grid grid-cols-8 gap-2">
      <div></div>
      {days.map((day) => (
        <div key={day} className="text-center font-semibold">
          {day}
        </div>
      ))}
      {times.map((time) => (
        <React.Fragment key={time}>
          <div className="pr-2 text-right">{time}</div>
          {days.map((day) => (
            <div
              key={`${day}-${time}`}
              className={`cursor-pointer border ${getSlotClass(getSlot(day, time)!)}`}
              onClick={() => onSlotClick(day, time)}
            >
              &nbsp;
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WeeklySchedule;

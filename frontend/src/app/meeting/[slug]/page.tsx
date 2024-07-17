"use client";

import React, { useState } from "react";
import WeeklySchedule from "@/components/WeeklySchedule/WeeklySchedule";
import {
  type WeeklySchedule as WeeklyScheduleType,
  schedule as defaultSchedule,
  TimePeekerSlotType,
} from "@/components/WeeklySchedule/timepeeker";

const SchedulePage = ({ params }: { params: { slug: string } }) => {
  console.log(params.slug);
  const [schedule, setSchedule] = useState<WeeklyScheduleType>(defaultSchedule);

  const handleSlotClick = (day: string, time: string) => {
    setSchedule((prevSchedule) => {
      const newSchedule = { ...prevSchedule };
      if (newSchedule[day]?.[time]) {
        newSchedule[day][time] =
          newSchedule[day][time] === TimePeekerSlotType.Available
            ? TimePeekerSlotType.Busy
            : TimePeekerSlotType.Available;
      }
      newSchedule[day]?.[time] === TimePeekerSlotType.Available
        ? TimePeekerSlotType.Busy
        : TimePeekerSlotType.Available;
      return newSchedule;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Weekly Schedule</h1>
      <WeeklySchedule schedule={schedule} onSlotClick={handleSlotClick} />
    </div>
  );
};

export default SchedulePage;

import React, { useState, useEffect } from "react";
import { type Meeting } from "@/lib/api/interfaces";
import { joinMeeting, leftMeeting } from "@/lib/api/api";

const hours = [
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface TimeSlotTableProps {
  meeting: Partial<Meeting>;
}

const TimeSlotTable: React.FC<TimeSlotTableProps> = ({ meeting }) => {
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);

  useEffect(() => {
    if (meeting.users_time_slots) {
      const initialSelectedSlots = meeting.users_time_slots.map(
        (uts) => uts.timeslot,
      );
      setSelectedSlots(initialSelectedSlots);
    }
  }, [meeting.users_time_slots]);

  const handleSlotClick = async (slotId: number) => {
    console.log(1);
    if (isSelected(slotId)) {
      try {
        await leftMeeting(meeting.id!, { timeslot_id: slotId });
        setSelectedSlots((prev) => prev.filter((id) => id !== slotId));
      } catch (error) {
        console.error("Failed to leave time slot:", error);
      }
    } else {
      try {
        await joinMeeting(meeting.id!, { timeslot_id: slotId });
        setSelectedSlots((prev) => [...prev, slotId]);
      } catch (error) {
        console.error("Failed to join time slot:", error);
      }
    }
  };

  const isSelected = (slotId: number) => selectedSlots.includes(slotId);

  const renderTimeSlots = (day: string, hour: string) => {
    const slot = meeting.timeslots?.find(
      (ts) =>
        new Date(ts.start_time).getUTCDay() === days.indexOf(day) + 1 &&
        new Date(ts.start_time).getUTCHours() === parseInt(hour),
    );

    return slot ? (
      <div
        key={slot.id}
        className={`border p-2 ${isSelected(slot.id) ? "bg-green-500" : "bg-white"}`}
        onClick={() => handleSlotClick(slot.id)}
      />
    ) : (
      <div key={`${day}-${hour}`} className="border bg-red-100 p-2" />
    );
  };

  return (
    <div className="grid grid-cols-8 gap-2">
      <div></div>
      {days.map((day) => (
        <div key={day} className="text-center font-bold">
          {day}
        </div>
      ))}
      {hours.map((hour) => (
        <React.Fragment key={hour}>
          <div className="pr-2 text-right">{hour}</div>
          {days.map((day) => renderTimeSlots(day, hour))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TimeSlotTable;

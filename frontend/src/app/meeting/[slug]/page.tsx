"use client";

import React, { useEffect, useState } from "react";
import { fetchMeeting } from "@/lib/api/api";
import { type Meeting } from "@/lib/api/interfaces";
import TimeSlotTable from "@/components/WeeklySchedule/TimeSlotTable";
import MeetingCard, {
  bestTimeSlotsToOneString,
} from "@/components/elements/meeting/card";

interface MeetingSchedulerProps {
  params: {
    slug: number;
  };
}

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ params }) => {
  const [meeting, setMeeting] = useState<Meeting>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeeing() {
      const meeting = await fetchMeeting(params.slug);
      setMeeting(meeting);
      setLoading(false);
    }

    void fetchMeeing();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container">
        <h1 className="mb-4 text-2xl font-bold">Meeting Scheduler</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }
  return (
    <div className="container">
      <h1 className="mb-4 text-2xl font-bold">Meeting Scheduler</h1>
      <div className="flex w-full flex-row justify-between">
        <MeetingCard
          className="flex-1"
          key={meeting!.id}
          id={meeting!.id}
          title={meeting!.title}
          description={meeting!.description ?? ""}
          videoLink={meeting!.call_link ?? ""}
          bestTimeSlots={bestTimeSlotsToOneString(meeting!.best_time_slots)}
          participants={meeting!.users_time_slots.length}
        />
        <TimeSlotTable meeting={meeting!} />
        <TimeSlotTable meeting={meeting!} />
      </div>
    </div>
  );
};

export default MeetingScheduler;

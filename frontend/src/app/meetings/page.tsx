"use client";

import React, { useEffect, useState, type JSX, type SVGProps } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import MeetingCard, {
  bestTimeSlotsToOneString,
} from "@/components/elements/meeting/card";
import Link from "next/link";

import { fetchMeetings } from "@/lib/api/api";
import { type Meeting } from "@/lib/api/interfaces";

function MeetingCards({ participant }: { participant: boolean }) {
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState<Meeting[]>();

  useEffect(() => {
    async function fetchMeeings() {
      const meetings_ = await fetchMeetings(participant);
      setMeetings(meetings_);

      setLoading(false);
    }

    void fetchMeeings();
  }, [participant]);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!meetings || meetings.length === 0) {
    return (
      <div className="container">
        <div className="text-center">No meetings found</div>
      </div>
    );
  }

  return (
    <>
      {meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          id={meeting.id}
          title={meeting.title}
          description={meeting.description ?? ""}
          videoLink={meeting.call_link ?? ""}
          bestTimeSlots={bestTimeSlotsToOneString(meeting.best_time_slots)}
          participants={meeting.users_time_slots.length}
        />
      ))}
    </>
  );
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8">
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            Meetings You&apos;re Organizing
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MeetingCards participant={false} />
          </div>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            Meetings You&apos;re Participating In
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MeetingCards participant={true} />
          </div>
        </section>
      </div>
    </div>
  );
}

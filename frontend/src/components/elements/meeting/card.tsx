"use client";

import React, { useEffect, useState, type JSX, type SVGProps } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { Meeting } from "~/lib/api/interfaces";

export default function MeetingCard({
  id,
  title,
  description,
  videoLink,
  bestTimeSlots,
  participants,
  className,
}: {
  id: number;
  title: string;
  description: string;
  videoLink: string;
  bestTimeSlots: string;
  participants: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <Card className="rounded-lg bg-card text-card-foreground shadow-sm">
        <Link href={"/meeting/" + id}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Link>

        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <VideoIcon className="h-5 w-5 text-muted-foreground" />
            {videoLink ? (
              <Link
                href={videoLink}
                className="text-primary hover:underline"
                prefetch={false}
              >
                Join meeting via link
              </Link>
            ) : (
              <p>Meeting link not available</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-muted-foreground" />
            <p>Best time slots: {bestTimeSlots}</p>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-muted-foreground" />
            <p>{participants} participants</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function VideoIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

function ClockIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export const bestTimeSlotsToOneString = (
  bestTimeSlots: Meeting["best_time_slots"],
) => {
  return bestTimeSlots
    .map((bts) => {
      const users = bts.users.map((u) => u).join(", ");
      return `${bts.start_time} - ${bts.end_time} (${users})`;
    })
    .join(", ");
};

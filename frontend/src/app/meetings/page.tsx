import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import React, { type JSX, type SVGProps } from "react";

interface MeetingCardProps {
  id: string;
  title: string;
  description: string;
  videoLink: string;
  timeSlots: string;
  participants: number;
}

function MeetingCard({
  id,
  title,
  description,
  videoLink,
  timeSlots,
  participants,
}: MeetingCardProps) {
  return (
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
          <p>Best time slots: {timeSlots}</p>
        </div>
        <div className="flex items-center gap-2">
          <UsersIcon className="h-5 w-5 text-muted-foreground" />
          <p>{participants} participants</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8">
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            Meetings You&apos;re Organizing
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MeetingCard
              description={"Discuss upcoming product features"}
              id={1}
              participants={15}
              timeSlots={"Mondays 3-4 PM"}
              title={"Product Roadmap Discussion"}
              videoLink={"https://meet.google.com/landing"}
            />
          </div>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            Meetings You&apos;re Participating In
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="rounded-lg bg-card text-card-foreground shadow-sm">
              <CardHeader>
                <CardTitle>Product Roadmap Discussion</CardTitle>
                <CardDescription>
                  Discuss upcoming product features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <VideoIcon className="h-5 w-5 text-muted-foreground" />
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    Join Zoom Meeting
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-muted-foreground" />
                  <p>Best time slots: Mondays 3-4 PM</p>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-muted-foreground" />
                  <p>15 participants</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg bg-card text-card-foreground shadow-sm">
              <CardHeader>
                <CardTitle>Sales Team Sync</CardTitle>
                <CardDescription>
                  Discuss sales pipeline and customer updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <VideoIcon className="h-5 w-5 text-muted-foreground" />
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    Join Zoom Meeting
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-muted-foreground" />
                  <p>Best time slots: Thursdays 2-3 PM</p>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-muted-foreground" />
                  <p>12 participants</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg bg-card text-card-foreground shadow-sm">
              <CardHeader>
                <CardTitle>Marketing Team Brainstorm</CardTitle>
                <CardDescription>Discuss new campaign ideas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <VideoIcon className="h-5 w-5 text-muted-foreground" />
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    Join Zoom Meeting
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-muted-foreground" />
                  <p>Best time slots: Tuesdays 11 AM-12 PM</p>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-muted-foreground" />
                  <p>9 participants</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
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

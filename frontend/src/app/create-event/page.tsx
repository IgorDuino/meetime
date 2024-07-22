"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { type DateRange } from "react-day-picker";
import { createMeeting } from "@/lib/api/api";
import { type MeetingCreate } from "@/lib/api/interfaces";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

export default function Component() {
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const params = useSearchParams();

  useEffect(() => {
    if (params.get("title")) {
      if (title !== params.get("title")) setTitle(params.get("title")!);
    }
  }, [params, title]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const meetingData: Partial<MeetingCreate> = {
      title,
      description,
      start_date: dateRange?.from
        ? new Date(
            new Date(dateRange.from).setDate(
              new Date(dateRange.from).getDate() + 1,
            ),
          )
            .toISOString()
            .split("T")[0]
        : undefined,
      end_date: dateRange?.to
        ? new Date(
            new Date(dateRange.to).setDate(
              new Date(dateRange.to).getDate() + 1,
            ),
          )
            .toISOString()
            .split("T")[0]
        : undefined,
    };
    try {
      await createMeeting(meetingData);
      toast({
        variant: "default",
        title: "Success",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Error during creation: ${error as string}`,
      });
    }
  };

  return (
    <div className="container py-24 lg:py-32">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Create Event</CardTitle>
              <CardDescription>
                Fill out the details for your event.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required={true}
                  placeholder="Event name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  placeholder="Event link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <Button type="submit" variant="action" className="w-full">
                Create Event
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Select Date and Time</CardTitle>
              <CardDescription>
                Choose start and end time and date range for your event.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Calendar
                  className={"w-full"}
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={1}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

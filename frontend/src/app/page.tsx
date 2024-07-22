"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSectionImageWithReviews() {
  const [meetingTitle, setMeetingTitle] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void router.push(`/create-event?title=${meetingTitle}`);
  };

  return (
    <div className="container py-24 lg:py-32">
      <div className="grid gap-4 md:grid-cols-2 md:items-start md:gap-8 xl:gap-20">
        <div>
          <h1 className="mt-20 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Schedule a meeting at the best time
          </h1>
          <p className="mt-3 text-xl text-muted-foreground">
            Finding a meeting time for groups is hard. MeeTime makes it easier!
            Send a poll to your participants to find the best day and time, with
            just a few clicks and no ads!
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-7 grid w-full gap-3 sm:inline-flex"
          >
            <div className="flex w-full max-w-lg items-center space-x-2">
              <Input
                type="text"
                placeholder="Meeting title"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
              />
              <Button variant="action" type="submit">
                Create
              </Button>
            </div>
          </form>
        </div>
        <div className="">
          <Image
            width={100}
            height={100}
            className="w-full rounded-md"
            src="https://cdn.kanobu.ru/articles/pics/46483b74-a92c-4be6-b96a-668e12c1238d.jpg"
            alt="Image Description"
          />
        </div>
      </div>
    </div>
  );
}

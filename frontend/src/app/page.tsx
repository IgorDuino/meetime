import React from "react";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSectionImageWithReviews() {
  return (
    <>
      {/* Hero */}
      <div className="container py-24 lg:py-32">
        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-2 md:items-start md:gap-8 xl:gap-20">
          <div>
            <h1 className="mt-20 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Schedule a meeting at the best time
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              Finding a meeting time for groups is hard. MeeTime make it easier!
              Send a poll to your participants to find the best day and time,
              with just a few clicks and no ads!
            </p>
            {/* Buttons */}
            <div className="mt-7 grid w-full gap-3 sm:inline-flex">
              <div className="flex w-full max-w-lg items-center space-x-2">
                <Input type="email" placeholder="Meeting title" />
                <Button variant="action" type="submit" asChild>
                  <Link href="/create-event">Create</Link>
                </Button>
              </div>
            </div>
          </div>
          {/* Col */}
          <div className="">
            <Image
              width={100}
              height={100}
              className="w-full rounded-md"
              src="/img/hero.jpeg"
              alt="Image Description"
            />
          </div>
        </div>
      </div>
    </>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

export default function HeroSectionImageWithReviews() {
  return (
    <>
      {/* Hero */}
      <div className="container py-24 lg:py-32">
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-start">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-20">
            Schedule a meeting at the best time
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
            Finding a meeting time for groups is hard. MeeTime make it easier! Send a poll to your participants to find the best day and time, with just a few clicks and no ads!   
            </p>
            {/* Buttons */}
            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                  <div className="flex w-full max-w-lg items-center space-x-2">
                    <Input type="email" placeholder="Meeting title" />
                    <Button variant="action" type="submit">Create</Button>
                  </div>
            </div>

          </div>
          {/* Col */}
          <div className="">
            <img
              className="w-full rounded-md"
              src="https://placehold.co/800x700"
              alt="Image Description"
            />
          </div>
        </div>
      </div>
    </>
  );
}

import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col">
      <section className="py-10 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold ">MeeTime scheduling platform</h1>
            <p className="text-lg md:text-xl ">
            A simple and quick way to gather the opinions of all team members to find the best time for a team meeting
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-18">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
            <div className="flex items-center justify-center">
            <img src="/img/about/gcal.png" width={400} height={300} alt="Google Calendar" className="rounded-lg" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Import the busy from Google Calendar</h2>
              <p className="text-muted-foreground">
              We will safely look at the time when you are unavailable so that you can quickly choose a convenient time
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-18">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Convenient integration with calls in ZOOM</h2>
              <p className="text-muted-foreground">
              Create a call immediately after determining the exact time and we will send all participants a link to join
              </p>
            </div>
            <div className="flex items-center justify-center">
            <img src="/img/about/zoom.png" width={400} height={300} alt="Google Calendar" className="rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
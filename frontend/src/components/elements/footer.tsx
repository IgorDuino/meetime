import React, { type JSX, type SVGProps } from "react"

export default function Component() {
  return (
    <footer className="py-6 w-full bottom-0">
      <div className="container flex items-center justify-center gap-2">
        <CloudLightningIcon className="h-4 w-4" />
        <p className="text-sm text-muted-foreground">Made with MeeTime</p>
      </div>
    </footer>
  )
}

function CloudLightningIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="12" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M9.49132 18.8569L0 17.9648L7.86875 0.75H18.6265L12.5268 10.6268L23.5 11.8402L3.35714 36L9.49132 18.8569Z" fill="#FF9500"/>
</svg>
  )
}

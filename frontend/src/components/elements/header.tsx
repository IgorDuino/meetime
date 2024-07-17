import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { ReactNode } from "react"


export default function Header () {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-2 py-6">
            <HeaderLink href="/" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Home
            </HeaderLink>
            <HeaderLink href="/about" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              About
            </HeaderLink>
            <HeaderLink href="/meetings" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              My meetings
            </HeaderLink>
          </div>
        </SheetContent>
      </Sheet>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <HeaderLink
              href="/" prefetch={false}
            >
              Home
            </HeaderLink>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <HeaderLink
              href="/about"  prefetch={false}
            >
              About
            </HeaderLink>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <HeaderLink
              href="/meetings" prefetch={false}
            >
              My meetings
            </HeaderLink>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto flex gap-2">
        <Button variant="outline" className="text-neutral-700">Sign in</Button>
        <Button  variant="action">Sign Up</Button>
      </div>
    </header>
  )
}

function HeaderLink({ children, ...props }: { children: ReactNode }) {
    return (
        <Link {...props} href={props.href} className="text-neutral-700	 group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors  focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50" prefetch={false}>
        {children}
        </Link>
    )
    }

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}



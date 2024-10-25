import "~/styles/globals.css";
import { useEffect, useState } from "react"; // P13fd

import Header from "~/components/elements/header";
import Footer from "~/components/elements/footer";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "MeeTime",
  description: "choose best time to meet",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState("light"); // Pec5b

  useEffect(() => { // Pba0e
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    };
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <html lang="en" className={`${GeistSans.variable} ${theme}`}> // P5538
      <body> 
      <Header />
      <main>
      {children}
      </main>
      <Footer />
      <SpeedInsights />
      </body>
    </html>
  );
}

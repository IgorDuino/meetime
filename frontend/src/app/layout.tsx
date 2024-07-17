import "~/styles/globals.css";

import Header from "~/components/elements/header";
import Footer from "~/components/elements/footer";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body> 
      <Header />
      {children}
      <Footer />
      </body>
    </html>
  );
}
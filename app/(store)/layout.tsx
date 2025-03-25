import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Clerk Next.js Quickstart",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <main>{children}</main>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}

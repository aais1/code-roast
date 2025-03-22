import type { Metadata } from "next";
import "./globals.css";
import { Tektur } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Header from "./components/shared/Header";

const tektur = Tektur({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Roaster",
  description: "Roast your code with sphaghetti code with Code Roaster",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={`${tektur.className} antialiased`}>
          <Header />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Secure Payment Gateway",
  description: "A production-grade mock payment gateway built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}

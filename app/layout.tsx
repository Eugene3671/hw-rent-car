import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/compotents/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rent Car",
  description: "App where you can rent car",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanStackProvider>
      <html lang="en">
        <body className={`${manrope.variable}`}>
          {children}
          <Toaster position="top-center" />
        </body>
      </html>
    </TanStackProvider>
  );
}

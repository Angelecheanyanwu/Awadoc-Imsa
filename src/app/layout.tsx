import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import AskNoura from "@/components/AskNoura";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"], // latin-ext carries the naira sign (₦)
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const nohemi = localFont({
  src: [
    { path: "../fonts/Nohemi-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Nohemi-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-nohemi",
});

// Real device width on phones, and respect notches / rounded corners.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "IMSA",
  description: "IMSA",};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${nohemi.variable}`}>
      <body className="font-sans">
        {children}
        {/* Outside any page wrapper so it stays pinned to the viewport on every page. */}
        <AskNoura />
      </body>
    </html>
  );
}

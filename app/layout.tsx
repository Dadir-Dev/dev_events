import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRays from "./components/LightRays";
import NavBar from "./components/NavBar";
import { PostHogProvider } from "./providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const SchibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const MartianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Events",
  description: "The Hub for Every Developer Event You Mustn't Miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        SchibstedGrotesk.variable,
        MartianMono.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <PostHogProvider>
          <NavBar />
          <div className="absolute inset-0 top-0 z-[-1] min-h-screen ">
            <LightRays
              raysOrigin="top-center-offset"
              raysColor="#5dfeca"
              raysSpeed={1}
              lightSpread={0.9}
              rayLength={1.4}
              followMouse={true}
              mouseInfluence={0.05}
              noiseAmount={0}
              distortion={0}
              className="custom-rays"
              pulsating={false}
              fadeDistance={1}
              saturation={1}
            />
          </div>

          <main>{children}</main>
        </PostHogProvider>
      </body>
    </html>
  );
}

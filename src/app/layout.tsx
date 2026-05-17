import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Libre_Baskerville } from "next/font/google";
import { metadataGlobal } from "@/src/lib/seo";
import ComparisonBar from "@/src/components/comparar/ComparisonBar";
import AmbientBackground from "@/src/components/ui/AmbientBackground";
import { ComparisonProvider } from "@/src/hooks/useComparison";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F1115",
};

export const metadata: Metadata = metadataGlobal;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${jakarta.variable} ${baskerville.variable}`}
    >
      <body className="bg-carbon text-white font-sans antialiased">
        <AmbientBackground />
        <ComparisonProvider>
          {children}
          <ComparisonBar />
        </ComparisonProvider>
      </body>
    </html>
  );
}

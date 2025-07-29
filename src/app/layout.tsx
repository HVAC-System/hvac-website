import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL("https://hvac-design-tool.com"),
  title: "HVAC & Lighting Design Tool",
  description: "Integrated energy-efficient design for commercial spaces",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.variable +
          " bg-white text-gray-900 min-h-screen flex flex-col font-sans"
        }
      >
        <header className="w-full flex items-center justify-between px-6 py-4 shadow-sm bg-white relative z-10 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center p-1">
              <Image
                src="/logo.png"
                alt="HVAC Design Tool Logo"
                width={32}
                height={32}
                className="rounded"
                priority
              />
            </div>
            <span className="font-semibold text-xl text-gray-900">
              HVAC Design
            </span>
          </Link>
          <Navbar />
        </header>
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

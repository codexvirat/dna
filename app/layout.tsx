import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart-context";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "DNA Bars - Daily Nutrition Aesthetics",
  description: "Premium E-commerce platform for DNA Bars. Fuel your body with aesthetics.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <SessionProvider session={session}>
          <CartProvider>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
              {children}
            </main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

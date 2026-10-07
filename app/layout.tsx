import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Grullo Express | Street Tacos & Birria in Clarksville, TN",
  description: "Discover birria, street tacos, and Mexican favorites at El Grullo Express and El Grullo #4 in Clarksville. Find menus, hours, directions, and branch phone numbers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className="antialiased"><body>{children}</body></html>;
}

import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import poppins from "@/fonts/font";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className={`${poppins.className} mt-20`}>{children}</main>
      </body>
    </html>
  );
}

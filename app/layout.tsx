import type { Metadata } from "next";
import { Galindo } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

const galindo = Galindo({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Maze.io",
  description: "Multiplayer Maze Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className={galindo.className}>
        <body className="select-none">
          {children}
          <div id="modal-container" />
        </body>
      </html>
    </AuthProvider>
  );
}

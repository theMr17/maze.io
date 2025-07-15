import type { Metadata } from "next";
import { Galindo } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className={galindo.className}>
      <body>
        {children}
        <div id="modal-container" />
      </body>
    </html>
  );
}

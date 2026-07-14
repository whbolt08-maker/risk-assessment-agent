import type { Metadata } from "next";
import { Inspector } from "react-dev-inspector";
import "./globals.css";

export const metadata: Metadata = {
  title: "Risk Assessment Agent",
  description:
    "AI-powered risk assessment system for international client visit management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans antialiased">
        <Inspector keys={["command", "i"]}>{children}</Inspector>
      </body>
    </html>
  );
}

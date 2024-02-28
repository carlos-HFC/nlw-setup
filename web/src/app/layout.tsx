import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habits",
  description: "Aprenda a desenvolver rotinas diárias positivas para melhorar sua qualidade de vida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className, 'bg-background text-white')}>{children}</body>
    </html>
  );
}

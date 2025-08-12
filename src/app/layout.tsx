import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOMI 모두의 미술관",
  description: "모두의 미술관에 오신걸 환영합니다",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}

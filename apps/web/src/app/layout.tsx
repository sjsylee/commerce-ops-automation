import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "마진 스튜디오",
  description:
    "커머스 매입, 원가, 가격, 정산 검토를 위한 운영 자동화 콘솔입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

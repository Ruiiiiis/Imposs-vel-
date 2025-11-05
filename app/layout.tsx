import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fichas Carousel",
  description: "Carrossel de fichas com revelação do Lock",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}

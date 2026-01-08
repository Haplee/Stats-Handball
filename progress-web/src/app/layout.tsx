import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Handball Stats: Análisis de Partidos con IA",
  description: "Plataforma para el análisis de partidos de balonmano utilizando inteligencia artificial, desarrollada como un TFG de ASIR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-sans">
        <Header />
        <main className="container mx-auto px-4 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

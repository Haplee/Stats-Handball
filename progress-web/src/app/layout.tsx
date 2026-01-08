import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="es" className="bg-gray-900">
      <body className={`${inter.className} bg-gray-900 text-white antialiased`}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

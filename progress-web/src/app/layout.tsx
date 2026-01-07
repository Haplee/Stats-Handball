import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TFG: Análisis de Partidos de Balonmano con IA",
  description: "Web de seguimiento y documentación del TFG de ASIR sobre el análisis de partidos de balonmano utilizando inteligencia artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans">
        <Header />
        <main className="pt-20 container mx-auto px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

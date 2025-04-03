import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientBody from "./ClientBody"; // Import the ClientBody component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sarmiento F5 | Canchas de Fútbol 5",
  description: "Reserva canchas de fútbol 5 en Sarmiento F5. Disfruta del fútbol con tus amigos en nuestras canchas de primera calidad.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ClientBody>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ClientBody>
      </body>
    </html>
  );
}

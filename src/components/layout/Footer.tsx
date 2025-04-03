"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div>
            <div className="flex items-center">
              <Image
                src="/images/logo-sarmiento-f5.png"
                alt="Sarmiento F5"
                width={50}
                height={50}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-green-700">Sarmiento F5</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Disfruta del fútbol con tus amigos en nuestras canchas de primera calidad.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Enlaces útiles</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-green-600">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/precios" className="text-sm text-gray-600 hover:text-green-600">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/turnos-hoy" className="text-sm text-gray-600 hover:text-green-600">
                  Turnos para hoy
                </Link>
              </li>
              <li>
                <Link href="/buscar-rivales" className="text-sm text-gray-600 hover:text-green-600">
                  Buscar Rivales
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-gray-600 hover:text-green-600">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Contacto</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <Link
                  href="https://maps.app.goo.gl/csSJmhT7QrKzkErz6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 text-sm text-gray-600 hover:text-green-600"
                >
                  Donde encontrarnos
                </Link>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <Link
                  href="https://wa.me/+543795165059"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 text-sm text-gray-600 hover:text-green-600"
                >
                  +543795165059
                </Link>
              </li>
              <li className="mt-4 flex space-x-4">
                <Link
                  href="https://www.facebook.com/ComplejoSarmientoF5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-green-600"
                >
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/sarmientof5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-green-600"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-5 w-5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Sarmiento F5. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

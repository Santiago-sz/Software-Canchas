"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

// Define the navigation items
const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Precios", href: "/#precios" },
  { name: "Turnos para hoy", href: "/turnos-hoy" },
  { name: "Contacto", href: "/#contacto" },
  { name: "Buscar Rivales", href: "/buscar-rivales" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  // Helper para determinar si un enlace es interno a la página de inicio
  const isInternalLink = (href: string) => {
    return href.startsWith("/#");
  };

  // Función para manejar los enlaces internos
  const handleInternalLink = (href: string, e: React.MouseEvent) => {
    if (isHome && isInternalLink(href)) {
      e.preventDefault();
      const targetId = href.substring(2); // Eliminar el "/#"
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Ajustar por el header
          behavior: "smooth",
        });
        setMobileMenuOpen(false);
      }
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-sarmiento-f5.png"
                alt="Sarmiento F5"
                width={50}
                height={50}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-green-700">Sarmiento F5</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 rounded-md hover:bg-gray-50"
                onClick={(e) => handleInternalLink(item.href, e)}
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-4 flex items-center space-x-2">
              <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                Iniciar sesión
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">Registrarse</Button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Abrir menú</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md"
                onClick={(e) => {
                  handleInternalLink(item.href, e);
                  if (!isInternalLink(item.href)) {
                    setMobileMenuOpen(false);
                  }
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            <div className="flex items-center px-5">
              <Button variant="outline" className="w-full justify-center text-green-600 border-green-600 hover:bg-green-50 mb-2">
                Iniciar sesión
              </Button>
            </div>
            <div className="flex items-center px-5">
              <Button className="w-full justify-center bg-green-600 hover:bg-green-700">
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

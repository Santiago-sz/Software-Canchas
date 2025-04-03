import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, MapPin, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "url('https://ext.same-assets.com/2845550102/2845550102.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-green-800 sm:text-5xl md:text-6xl">
              Reserva de Canchas de Fútbol 5 Sarmiento
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-green-700">
              ¡Disfruta del fútbol con tus amigos en nuestras canchas de primera calidad!
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg">
                <Link href="/reservar">Reservar cancha</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 text-lg">
                <Link href="/turnos-hoy">Turnos para hoy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Nuestros servicios</h2>
            <p className="mt-4 text-xl text-gray-600">Todo lo que necesitas para disfrutar del fútbol</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-green-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-800">Ubicación estratégica</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  Canchas ubicadas en un lugar de fácil acceso con estacionamiento disponible.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CalendarClock className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-800">Horarios flexibles</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  Amplia disponibilidad de horarios de lunes a domingo para adaptarse a tu agenda.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-800">Busca rivales</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  ¿Te faltan jugadores? ¿Buscas un equipo para desafiar? Encuentra rivales en nuestra plataforma.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="text-green-600 hover:text-green-800 p-0">
                  <Link href="/buscar-rivales">Conoce más →</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Price Cards */}
      <section id="precios" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Nuestros precios</h2>
            <p className="mt-4 text-xl text-gray-600">Tarifas accesibles para todos los días de la semana</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-green-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="bg-green-600 p-2 text-white text-center font-medium">
                Días de semana
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Lunes a Viernes</CardTitle>
                <CardDescription className="text-center text-gray-600">
                  Reserva una cancha de lunes a viernes y disfruta de nuestro precio.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="flex items-center mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-semibold text-gray-900">$18000</span>
                    <span className="ml-2 text-sm text-gray-600">(día)</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-semibold text-gray-900">$22000</span>
                    <span className="ml-2 text-sm text-gray-600">(noche)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/reservar">Reservar ahora</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-green-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="bg-green-600 p-2 text-white text-center font-medium">
                Fin de semana
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Sábados y Domingos</CardTitle>
                <CardDescription className="text-center text-gray-600">
                  Reserva una cancha los sábados y domingos y obtén un descuento.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="flex items-center mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-semibold text-gray-900">$16000</span>
                    <span className="ml-2 text-sm text-gray-600">(día)</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-semibold text-gray-900">$18000</span>
                    <span className="ml-2 text-sm text-gray-600">(noche)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/reservar">Reservar ahora</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="contacto" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Nuestra ubicación</h2>
            <p className="mt-4 text-xl text-gray-600">Ven a visitarnos y disfruta de nuestras instalaciones</p>
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg">
            <div className="aspect-w-16 aspect-h-9 h-[400px] relative">
              <iframe
                title="Ubicación de Sarmiento F5"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54853.40350023105!2d-58.82693317832029!3d-27.47455799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456c9d832f6a5f%3A0x83246e4989d37fa5!2sSarmiento%20F5!5e0!3m2!1ses-419!2sar!4v1718305323359!5m2!1ses-419!2sar"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="https://wa.me/+543795165059" target="_blank" rel="noopener noreferrer">
                Contactar por WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Botones de navegación flotantes */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        <Button
          asChild
          variant="outline"
          className="rounded-full p-3 bg-white shadow-lg border-green-600 text-green-600 hover:bg-green-50"
          aria-label="Ir a Precios"
        >
          <a href="#precios">Precios</a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-full p-3 bg-white shadow-lg border-green-600 text-green-600 hover:bg-green-50"
          aria-label="Ir a Contacto"
        >
          <a href="#contacto">Contacto</a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-full p-3 bg-white shadow-lg border-green-600 text-green-600 hover:bg-green-50"
          aria-label="Ver Turnos para hoy"
        >
          <Link href="/turnos-hoy">Turnos</Link>
        </Button>
      </div>
    </div>
  );
}

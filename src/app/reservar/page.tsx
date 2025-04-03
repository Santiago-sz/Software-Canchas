"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  court1: boolean;
  court2: boolean;
  court3: boolean;
  court4: boolean;
}

// Generar horarios para la tabla - versión determinística
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  // Usamos un patrón predefinido en lugar de valores aleatorios
  const availabilityPattern = [
    [true, true, true, true], // 15:00
    [true, true, true, true], // 16:00
    [true, true, false, true], // 17:00
    [true, false, true, true], // 18:00
    [true, true, true, false], // 19:00
    [false, true, true, true], // 20:00
    [true, true, false, true], // 21:00
    [true, false, true, true], // 22:00
    [false, true, true, true], // 23:00
    [true, true, false, true], // 00:00
    [true, false, true, true], // 01:00
  ];

  // Para las horas de 15:00 a 24:00
  for (let i = 0; i < 10; i++) {
    const hour = i + 15;
    let displayHour = hour;
    if (displayHour > 23) displayHour -= 24;

    const displayTime = `${displayHour}:00`;
    const pattern = availabilityPattern[i];

    slots.push({
      id: `slot-${hour}`,
      time: displayTime,
      available: pattern.some(value => value), // Al menos una cancha disponible
      court1: pattern[0],
      court2: pattern[1],
      court3: pattern[2],
      court4: pattern[3],
    });
  }

  // Para la hora adicional (01:00)
  const displayTime = `01:00`;
  const pattern = availabilityPattern[10];

  slots.push({
    id: `slot-1`,
    time: displayTime,
    available: pattern.some(value => value),
    court1: pattern[0],
    court2: pattern[1],
    court3: pattern[2],
    court4: pattern[3],
  });

  return slots;
};

// Obtener el precio según el día y hora
const getPrice = (date: Date | undefined, timeSlot: string): number => {
  if (!date) return 0;

  const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 0 = domingo, 6 = sábado
  const hour = parseInt(timeSlot.split(':')[0]);
  const isNight = hour >= 19 || hour < 8; // Horario nocturno desde las 19:00 hasta las 8:00

  if (isWeekend) {
    return isNight ? 18000 : 16000; // Fin de semana
  } else {
    return isNight ? 22000 : 18000; // Día de semana
  }
};

export default function ReservaPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<{
    nombre: string;
    telefono: string;
    email: string;
    fecha: string;
    hora: string;
    cancha: number;
    precio: number;
  } | null>(null);

  // Datos del formulario
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  // Nuevos estados para la lista de espera
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  const [waitlistCourt, setWaitlistCourt] = useState<number | null>(null);
  const [waitlistTimeSlot, setWaitlistTimeSlot] = useState<string | null>(null);
  const [waitlistNombre, setWaitlistNombre] = useState("");
  const [waitlistTelefono, setWaitlistTelefono] = useState("");

  const { toast } = useToast();

  // Cargar horarios cuando cambia la fecha
  useEffect(() => {
    setIsLoading(true);
    // Simulamos una carga de datos
    setTimeout(() => {
      setTimeSlots(generateTimeSlots());
      setIsLoading(false);
    }, 500);
  }, [date]);

  // Manejar la selección de un horario y cancha
  const handleSlotSelect = (timeSlot: string, court: number) => {
    setSelectedTimeSlot(timeSlot);
    setSelectedCourt(court);
    setShowReservationForm(true);
  };

  // Función para manejar la inscripción en lista de espera
  const handleWaitlistClick = (timeSlot: string, court: number) => {
    setWaitlistTimeSlot(timeSlot);
    setWaitlistCourt(court);
    setShowWaitlistForm(true);
  };

  // Función para procesar la inscripción en lista de espera
  const handleWaitlistSubmit = () => {
    if (!waitlistNombre || !waitlistTelefono) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos para inscribirte en la lista de espera.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowWaitlistForm(false);

      // Guardar en localStorage para simular base de datos
      const waitlistEntry = {
        nombre: waitlistNombre,
        telefono: waitlistTelefono,
        fecha: date ? format(date, "d 'de' MMMM", { locale: es }) : "hoy",
        hora: waitlistTimeSlot,
        cancha: waitlistCourt,
        fechaInscripcion: new Date().toISOString(),
      };

      const waitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
      waitlist.push(waitlistEntry);
      localStorage.setItem('waitlist', JSON.stringify(waitlist));

      // Limpiar formulario
      setWaitlistNombre("");
      setWaitlistTelefono("");

      // Mostrar notificación de éxito
      toast({
        title: "¡Inscripción exitosa!",
        description: "Has sido agregado a la lista de espera. Te contactaremos si hay una baja.",
        duration: 5000,
      });
    }, 1000);
  };

  // Manejar la reserva - paso 1: Mostrar opciones de pago
  const handleProceedToPayment = () => {
    if (!nombre || !telefono || !email) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos para continuar con la reserva.",
        variant: "destructive",
      });
      return;
    }

    // Ocultar formulario de datos y mostrar opciones de pago
    setShowReservationForm(false);

    // Calcular precio basado en día y hora
    const price = getPrice(date, selectedTimeSlot || "");

    // Guardar detalles de la reserva
    setReservationDetails({
      nombre,
      telefono,
      email,
      fecha: date ? format(date, "d 'de' MMMM", { locale: es }) : "",
      hora: selectedTimeSlot || "",
      cancha: selectedCourt || 0,
      precio: price
    });

    // Mostrar opciones de pago
    setShowPaymentOptions(true);
  };

  // Modificar la función handleMercadoPagoPayment para realizar una redirección
  const handleMercadoPagoPayment = () => {
    if (!reservationDetails) return;

    // Calcular la seña (50% del precio total)
    const senaAmount = reservationDetails.precio / 2;

    // Guardar temporalmente los detalles de la reserva en localStorage para recuperarlos después del pago
    localStorage.setItem('reservaTemp', JSON.stringify({
      nombre: reservationDetails.nombre,
      telefono: reservationDetails.telefono,
      email: reservationDetails.email,
      fecha: reservationDetails.fecha,
      hora: reservationDetails.hora,
      cancha: reservationDetails.cancha,
      precio: reservationDetails.precio,
      pagado: false,
      fechaCreacion: new Date().toISOString()
    }));

    // URL de pago de Mercado Pago (en un sistema real, esta URL se generaría con la API de Mercado Pago)
    // Para simular, usaremos una redirección y luego la capturaremos en una página de retorno
    const mercadoPagoUrl = `/procesar-pago?monto=${senaAmount}&concepto=Seña+cancha+${reservationDetails.cancha}+${reservationDetails.fecha}+${reservationDetails.hora}&email=${reservationDetails.email}`;

    // En una implementación real, esta URL vendría de la API de Mercado Pago
    // Aquí simularemos el comportamiento para la demostración
    window.location.href = mercadoPagoUrl;
  };

  // Verificar si una celda debe estar disponible
  const isCellAvailable = (timeSlot: TimeSlot, court: number): boolean => {
    switch (court) {
      case 1:
        return timeSlot.court1;
      case 2:
        return timeSlot.court2;
      case 3:
        return timeSlot.court3;
      case 4:
        return timeSlot.court4;
      default:
        return false;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-lg mb-8">
        <div
          className="absolute inset-0 z-0 opacity-20 rounded-lg"
          style={{
            backgroundImage: "url('https://ext.same-assets.com/2845550102/849522504.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 px-4 py-12 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-green-800 sm:text-5xl">
            Reserva de Canchas de Fútbol 5 Sarmiento
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-green-700">
            ¡Disfruta del fútbol con tus amigos en nuestras canchas de primera calidad!
          </p>
        </div>
      </section>

      {/* Selector de fecha */}
      <div className="mb-8 flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              locale={es}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Sección de precios */}
      <section id="precios" className="mb-12 py-8 bg-green-50 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Precios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
          {/* Tarjeta para días de semana */}
          <Card className="overflow-hidden shadow-lg">
            <div className="h-48 overflow-hidden">
              <Image
                src="https://ext.same-assets.com/2845550102/849522504.jpeg"
                alt="Cancha de fútbol 5"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-center text-green-600">Días de semana</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">
                Reserva una cancha de lunes a viernes y disfruta de nuestro precio.
              </p>
              <div className="flex justify-center space-x-6">
                <div className="text-center">
                  <span className="text-xl font-bold text-green-600">$18000</span>
                  <span className="ml-2 text-yellow-500">☀️</span>
                </div>
                <div className="text-center">
                  <span className="text-xl font-bold text-green-600">$22000</span>
                  <span className="ml-2 text-blue-500">🌙</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tarjeta para fin de semana */}
          <Card className="overflow-hidden shadow-lg">
            <div className="h-48 overflow-hidden">
              <Image
                src="https://ext.same-assets.com/2845550102/849522504.jpeg"
                alt="Cancha de fútbol 5"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-center text-green-600">Fin de Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">
                Reserva una cancha los sábados y domingos y obtén un descuento.
              </p>
              <div className="flex justify-center space-x-6">
                <div className="text-center">
                  <span className="text-xl font-bold text-green-600">$16000</span>
                  <span className="ml-2 text-yellow-500">☀️</span>
                </div>
                <div className="text-center">
                  <span className="text-xl font-bold text-green-600">$18000</span>
                  <span className="ml-2 text-blue-500">🌙</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tabla de turnos */}
      <section id="turnos" className="mb-12">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
          Turnos para {date ? format(date, "d 'de' MMMM", { locale: es }) : "hoy"}
        </h2>

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Horarios</th>
                  <th className="border px-4 py-2 text-center">Cancha 1</th>
                  <th className="border px-4 py-2 text-center">Cancha 2</th>
                  <th className="border px-4 py-2 text-center">Cancha 3</th>
                  <th className="border px-4 py-2 text-center">Cancha 4</th>
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot.id}>
                    <td className="border px-4 py-4 font-medium">{slot.time}</td>
                    {[1, 2, 3, 4].map((court) => (
                      <td key={`${slot.id}-${court}`} className="border px-4 py-4 text-center">
                        {isCellAvailable(slot, court) ? (
                          <Button
                            onClick={() => handleSlotSelect(slot.time, court)}
                            className="bg-green-100 hover:bg-green-200 text-green-800 font-semibold px-4 py-2 rounded-md transition-colors"
                          >
                            Disponible
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => handleWaitlistClick(slot.time, court)}
                            className="border-red-200 bg-red-50 hover:bg-red-100 text-red-800 font-semibold px-4 py-2 rounded-md transition-colors"
                          >
                            Anotarse por baja
                          </Button>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Modal de datos para la reserva */}
      <AlertDialog open={showReservationForm} onOpenChange={setShowReservationForm}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar reserva</AlertDialogTitle>
            <AlertDialogDescription>
              Por favor completa tus datos para reservar la Cancha {selectedCourt} el día{" "}
              {date ? format(date, "d 'de' MMMM", { locale: es }) : ""} a las {selectedTimeSlot}.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefono" className="text-right">
                Teléfono
              </Label>
              <Input
                id="telefono"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              onClick={handleProceedToPayment}
              className="bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              Continuar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal de opciones de pago */}
      <AlertDialog open={showPaymentOptions} onOpenChange={setShowPaymentOptions}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Opciones de pago</AlertDialogTitle>
            <AlertDialogDescription>
              Para confirmar tu reserva, es necesario pagar una seña mediante Mercado Pago.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            {reservationDetails && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="font-semibold text-lg mb-3">Detalles de la reserva</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="font-medium">Cancha:</span>
                    <span>{reservationDetails.cancha}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Fecha:</span>
                    <span>{reservationDetails.fecha}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Hora:</span>
                    <span>{reservationDetails.hora}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Precio total:</span>
                    <span className="font-semibold">${reservationDetails.precio}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Seña a pagar (50%):</span>
                    <span className="font-semibold text-green-600">${reservationDetails.precio / 2}</span>
                  </li>
                </ul>
              </div>
            )}

            <div className="flex flex-col space-y-3">
              <Button
                onClick={handleMercadoPagoPayment}
                className="bg-[#009ee3] hover:bg-[#008ecf] flex items-center justify-center space-x-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 animate-spin">⟳</span> Procesando...
                  </>
                ) : (
                  <>
                    <Image
                      src="/images/mercado-pago-logo.png"
                      alt="Mercado Pago"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    <span>Pagar con Mercado Pago</span>
                  </>
                )}
              </Button>

              <p className="text-sm text-gray-500 mt-2">
                Al realizar el pago de la seña, confirmas tu reserva. El resto del importe se abona en la cancha antes de jugar.
              </p>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal para lista de espera */}
      <AlertDialog open={showWaitlistForm} onOpenChange={setShowWaitlistForm}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Lista de espera</AlertDialogTitle>
            <AlertDialogDescription>
              Anótate en la lista de espera para la Cancha {waitlistCourt} el día{" "}
              {date ? format(date, "d 'de' MMMM", { locale: es }) : ""} a las {waitlistTimeSlot}.
              Te avisaremos si hay una baja.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="waitlist-nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="waitlist-nombre"
                value={waitlistNombre}
                onChange={(e) => setWaitlistNombre(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="waitlist-telefono" className="text-right">
                Teléfono
              </Label>
              <Input
                id="waitlist-telefono"
                type="tel"
                value={waitlistTelefono}
                onChange={(e) => setWaitlistTelefono(e.target.value)}
                className="col-span-3"
                required
                placeholder="Whatsapp preferentemente"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 col-span-4">
              Te contactaremos por este número si hay una baja en este turno.
            </p>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              onClick={handleWaitlistSubmit}
              className="bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="mr-2 animate-spin">⟳</span> Procesando...
                </>
              ) : (
                "Inscribirme"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Sección de contacto */}
      <section id="contacto" className="py-8 bg-green-50 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Contacto</h2>
        <div className="flex flex-col items-center justify-center mb-8">
          <Link
            href="https://wa.me/+543795165059"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg flex items-center mb-6 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Enviar mensaje por WhatsApp
          </Link>

          <Link
            href="https://maps.app.goo.gl/csSJmhT7QrKzkErz6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mb-2 text-gray-700 hover:text-green-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Donde encontrarnos
          </Link>

          <Link
            href="https://wa.me/+543795165059"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-700 hover:text-green-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +543795165059
          </Link>
        </div>
      </section>
    </div>
  );
}

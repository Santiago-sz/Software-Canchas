"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface ReservaDetails {
  nombre: string;
  telefono: string;
  email: string;
  fecha: string;
  hora: string;
  cancha: number;
  precio: number;
  pagado: boolean;
  fechaCreacion: string;
}

export default function ReservaConfirmadaPage() {
  const router = useRouter();
  const [reservaDetails, setReservaDetails] = useState<ReservaDetails | null>(null);

  useEffect(() => {
    // Intentar obtener los detalles de reserva del historial
    const reservasHistorial = JSON.parse(localStorage.getItem('reservasHistorial') || '[]');

    if (reservasHistorial.length > 0) {
      // Obtener la última reserva
      const ultimaReserva = reservasHistorial[reservasHistorial.length - 1];
      setReservaDetails(ultimaReserva);
    }
  }, []);

  const handleVolverInicio = () => {
    router.push('/reservar');
  };

  if (!reservaDetails) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>No se encontraron detalles de la reserva</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              No se encontraron detalles de tu reserva. Es posible que hayas llegado a esta página por error.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleVolverInicio} className="bg-green-600 hover:bg-green-700">
              Volver al inicio
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center bg-green-50">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800">¡Reserva Confirmada!</CardTitle>
          <CardDescription>
            Tu pago ha sido procesado correctamente y tu reserva ha sido confirmada.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-3">Detalles de la reserva</h3>
              <div className="grid grid-cols-2 gap-3">
                <span className="text-gray-600">Cancha:</span>
                <span className="font-medium">Cancha {reservaDetails.cancha}</span>

                <span className="text-gray-600">Fecha:</span>
                <span className="font-medium">{reservaDetails.fecha}</span>

                <span className="text-gray-600">Hora:</span>
                <span className="font-medium">{reservaDetails.hora}</span>

                <span className="text-gray-600">Precio total:</span>
                <span className="font-medium">${reservaDetails.precio}</span>

                <span className="text-gray-600">Seña pagada:</span>
                <span className="font-semibold text-green-600">${reservaDetails.precio / 2}</span>

                <span className="text-gray-600">Restante a pagar:</span>
                <span className="font-medium">${reservaDetails.precio / 2}</span>
              </div>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-3">Datos del cliente</h3>
              <div className="grid grid-cols-2 gap-3">
                <span className="text-gray-600">Nombre:</span>
                <span className="font-medium">{reservaDetails.nombre}</span>

                <span className="text-gray-600">Teléfono:</span>
                <span className="font-medium">{reservaDetails.telefono}</span>

                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{reservaDetails.email}</span>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-md">
              <h3 className="font-semibold text-lg mb-2 text-yellow-800">Importante</h3>
              <p className="text-sm text-yellow-700">
                Por favor, llegue 15 minutos antes de su turno para completar el pago restante. Recuerde traer el número de reserva o mostrar esta confirmación.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button
            onClick={handleVolverInicio}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Volver al inicio
          </Button>

          {/* Para una implementación futura se podrían agregar botones para:
              - Agregar al calendario
              - Compartir por WhatsApp
              - Enviar comprobante por email */}
        </CardFooter>
      </Card>
    </div>
  );
}

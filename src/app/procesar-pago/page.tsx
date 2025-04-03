"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function ProcesarPagoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    monto: string;
    concepto: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    // Obtener parámetros de la URL
    const monto = searchParams.get('monto');
    const concepto = searchParams.get('concepto');
    const email = searchParams.get('email');

    if (monto && concepto && email) {
      setPaymentDetails({
        monto,
        concepto,
        email
      });
    } else {
      // Si no hay parámetros válidos, redirigir a la página de reserva
      router.push('/reservar');
    }
  }, [searchParams, router]);

  // Simular el procesamiento del pago
  const handleProcessPayment = () => {
    setIsLoading(true);

    // Simulación de procesamiento de pago (en la vida real, esto se manejaría con la API de Mercado Pago)
    setTimeout(() => {
      setIsLoading(false);

      // Obtener la reserva temporal guardada
      const reservaTempStr = localStorage.getItem('reservaTemp');

      if (reservaTempStr) {
        const reservaTemp = JSON.parse(reservaTempStr);

        // Marcar como pagado
        reservaTemp.pagado = true;

        // Guardar en localStorage como historial de reservas
        const reservasHistorial = JSON.parse(localStorage.getItem('reservasHistorial') || '[]');
        reservasHistorial.push(reservaTemp);
        localStorage.setItem('reservasHistorial', JSON.stringify(reservasHistorial));

        // Limpiar la reserva temporal
        localStorage.removeItem('reservaTemp');

        // Mostrar notificación de éxito
        toast({
          title: "¡Pago exitoso!",
          description: "Tu reserva ha sido confirmada. Recibirás un mensaje con los detalles.",
          duration: 5000,
        });

        // Redirigir a la página de confirmación
        router.push('/reserva-confirmada');
      } else {
        // Si no hay reserva temporal, mostrar error
        toast({
          title: "Error en la reserva",
          description: "No se encontraron los detalles de la reserva. Por favor, intenta nuevamente.",
          variant: "destructive",
          duration: 5000,
        });

        // Redirigir a la página de reserva
        router.push('/reservar');
      }
    }, 2000);
  };

  const handleCancelPayment = () => {
    // Mostrar notificación
    toast({
      title: "Pago cancelado",
      description: "Has cancelado el proceso de pago. Tu reserva no ha sido confirmada.",
      duration: 5000,
    });

    // Eliminar la reserva temporal
    localStorage.removeItem('reservaTemp');

    // Redirigir a la página de reserva
    router.push('/reservar');
  };

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-[#009ee3] text-white">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/mercado-pago-logo.png"
              alt="Mercado Pago"
              width={40}
              height={40}
              className="bg-white p-1 rounded-full"
            />
            <CardTitle>Mercado Pago</CardTitle>
          </div>
          <CardDescription className="text-white opacity-90">
            Procesamiento de pago seguro
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {paymentDetails ? (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2">Detalles del pago</h3>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-600">Concepto:</span>
                  <span className="font-medium">{paymentDetails.concepto}</span>

                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{paymentDetails.email}</span>

                  <span className="text-gray-600">Monto a pagar:</span>
                  <span className="font-semibold text-green-600">${paymentDetails.monto}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Método de pago</h3>
                <div className="flex items-center p-3 border rounded-md space-x-3">
                  <div className="w-10 h-6 bg-blue-600 rounded-md"></div>
                  <span>Tarjeta terminada en 1234</span>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Al hacer clic en "Pagar ahora", estarás señando tu reserva. El pago es seguro y está protegido por Mercado Pago.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-10 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#009ee3]"></div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <Button
            onClick={handleProcessPayment}
            className="w-full bg-[#009ee3] hover:bg-[#008ecf]"
            disabled={isLoading || !paymentDetails}
          >
            {isLoading ? (
              <>
                <span className="mr-2 animate-spin">⟳</span> Procesando...
              </>
            ) : (
              "Pagar ahora"
            )}
          </Button>

          <Button
            onClick={handleCancelPayment}
            variant="outline"
            className="w-full"
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

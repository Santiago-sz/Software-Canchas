"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, PhoneCall, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface WaitlistEntry {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  cancha: number;
  fechaInscripcion: string;
}

export default function AdminListaEsperaPage() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Cargar lista de espera desde localStorage
    const loadWaitlist = () => {
      setIsLoading(true);
      try {
        const storedWaitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
        setWaitlist(storedWaitlist);
      } catch (error) {
        console.error("Error al cargar la lista de espera:", error);
        setWaitlist([]);
      }
      setIsLoading(false);
    };

    loadWaitlist();
  }, []);

  // Función para eliminar una entrada de la lista de espera
  const handleDelete = (index: number) => {
    const newWaitlist = [...waitlist];
    newWaitlist.splice(index, 1);
    setWaitlist(newWaitlist);
    localStorage.setItem('waitlist', JSON.stringify(newWaitlist));

    toast({
      title: "Eliminado de la lista",
      description: "La inscripción ha sido eliminada de la lista de espera.",
      duration: 3000,
    });
  };

  // Función para marcar como contactado
  const handleMarkedAsContacted = (index: number) => {
    const updatedWaitlist = [...waitlist];
    // En una aplicación real, actualizaríamos un campo 'contactado' en la entrada
    // Para esta simulación, simplemente mostraremos una notificación

    toast({
      title: "Cliente contactado",
      description: `Has marcado a ${waitlist[index].nombre} como contactado.`,
      duration: 3000,
    });

    // En una aplicación real, aquí guardaríamos el cambio en la base de datos
  };

  // Formatear fecha para mostrarla
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/admin" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Lista de espera</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personas en lista de espera</CardTitle>
          <CardDescription>
            Estos clientes están esperando ser notificados si hay bajas en las canchas reservadas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : waitlist.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hay personas en lista de espera por el momento.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Cancha</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Inscripción</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {waitlist.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{entry.nombre}</TableCell>
                      <TableCell>{entry.telefono}</TableCell>
                      <TableCell>Cancha {entry.cancha}</TableCell>
                      <TableCell>{entry.fecha}</TableCell>
                      <TableCell>{entry.hora}</TableCell>
                      <TableCell>{entry.fechaInscripcion ? formatDate(entry.fechaInscripcion) : "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-green-600"
                            onClick={() => handleMarkedAsContacted(index)}
                            title="Marcar como contactado"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-blue-600"
                            onClick={() => window.open(`tel:${entry.telefono}`, '_blank')}
                            title="Llamar"
                          >
                            <PhoneCall className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-red-600"
                            onClick={() => handleDelete(index)}
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

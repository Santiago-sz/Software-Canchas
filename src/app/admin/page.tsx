"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListTodo, CalendarDays, Users, ClipboardList } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-gray-600 mt-2">Gestiona reservas, canchas y clientes</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/">
            <Button variant="outline">Volver al sitio</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta de Reservas */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Reservas</CardTitle>
              <CalendarDays className="h-6 w-6 text-green-600" />
            </div>
            <CardDescription>
              Gestiona todas las reservas de canchas
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-500">
              Ver, modificar o cancelar reservas. Gestiona pagos y confirmaciones.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Ver Reservas
            </Button>
          </CardFooter>
        </Card>

        {/* Tarjeta de Lista de Espera */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Espera</CardTitle>
              <ListTodo className="h-6 w-6 text-blue-600" />
            </div>
            <CardDescription>
              Personas esperando ser notificadas por bajas
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-500">
              Gestiona la lista de personas que quieren ser notificadas si hay cancelaciones.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/lista-espera" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Ver Lista de Espera
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Tarjeta de Clientes */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Clientes</CardTitle>
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Gestión de clientes y usuarios
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-500">
              Ver información de clientes, historial de reservas y pagos realizados.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Ver Clientes
            </Button>
          </CardFooter>
        </Card>

        {/* Tarjeta de Reportes */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Reportes</CardTitle>
              <ClipboardList className="h-6 w-6 text-amber-600" />
            </div>
            <CardDescription>
              Estadísticas y reportes
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-500">
              Visualiza reportes de ocupación, ingresos y estadísticas de reservas.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-amber-600 hover:bg-amber-700">
              Ver Reportes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

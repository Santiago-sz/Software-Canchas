"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Definir horarios disponibles
const HOURS = [
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
  "21:00 - 22:00",
  "22:00 - 23:00",
  "23:00 - 00:00",
];

// Estado inicial de disponibilidad (para demostración)
const initialAvailability = {
  "Cancha 1": {
    "15:00 - 16:00": "disponible",
    "16:00 - 17:00": "disponible",
    "17:00 - 18:00": "disponible",
    "18:00 - 19:00": "disponible",
    "19:00 - 20:00": "disponible",
    "20:00 - 21:00": "disponible",
    "21:00 - 22:00": "reservado",
    "22:00 - 23:00": "disponible",
    "23:00 - 00:00": "disponible",
  },
  "Cancha 2": {
    "15:00 - 16:00": "disponible",
    "16:00 - 17:00": "disponible",
    "17:00 - 18:00": "disponible",
    "18:00 - 19:00": "disponible",
    "19:00 - 20:00": "disponible",
    "20:00 - 21:00": "disponible",
    "21:00 - 22:00": "reservado",
    "22:00 - 23:00": "disponible",
    "23:00 - 00:00": "disponible",
  },
  "Cancha 3": {
    "15:00 - 16:00": "disponible",
    "16:00 - 17:00": "disponible",
    "17:00 - 18:00": "disponible",
    "18:00 - 19:00": "reservado",
    "19:00 - 20:00": "disponible",
    "20:00 - 21:00": "reservado",
    "21:00 - 22:00": "reservado",
    "22:00 - 23:00": "reservado",
    "23:00 - 00:00": "disponible",
  },
  "Cancha 4": {
    "15:00 - 16:00": "disponible",
    "16:00 - 17:00": "disponible",
    "17:00 - 18:00": "disponible",
    "18:00 - 19:00": "disponible",
    "19:00 - 20:00": "disponible",
    "20:00 - 21:00": "disponible",
    "21:00 - 22:00": "disponible",
    "22:00 - 23:00": "disponible",
    "23:00 - 00:00": "disponible",
  },
};

export default function TurnosHoy() {
  const [availability, setAvailability] = useState(initialAvailability);
  const router = useRouter();

  // Función para determinar el color de la celda
  const getCellColor = (status: string) => {
    return status === "disponible"
      ? "bg-green-100 hover:bg-green-200 text-green-800 cursor-pointer"
      : "bg-red-100 text-red-800";
  };

  // Función para manejar el clic en una celda disponible
  const handleCellClick = (court: string, time: string) => {
    if (availability[court][time] === "disponible") {
      router.push("/reservar");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Turnos para hoy</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Consulta la disponibilidad de nuestras canchas para el día de hoy
        </p>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b border-r text-left text-gray-700 font-semibold">Horarios</th>
              <th className="py-3 px-4 border-b border-r text-center text-gray-700 font-semibold">Cancha 1</th>
              <th className="py-3 px-4 border-b border-r text-center text-gray-700 font-semibold">Cancha 2</th>
              <th className="py-3 px-4 border-b border-r text-center text-gray-700 font-semibold">Cancha 3</th>
              <th className="py-3 px-4 border-b text-center text-gray-700 font-semibold">Cancha 4</th>
            </tr>
          </thead>
          <tbody>
            {HOURS.map((time) => (
              <tr key={time} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-r text-gray-700 font-medium">{time}</td>
                {["Cancha 1", "Cancha 2", "Cancha 3", "Cancha 4"].map((court) => (
                  <td
                    key={`${court}-${time}`}
                    className={`py-3 px-4 border-b ${court !== "Cancha 4" ? "border-r" : ""} text-center transition-colors ${getCellColor(availability[court][time])}`}
                    onClick={() => handleCellClick(court, time)}
                  >
                    {availability[court][time] === "disponible" ? "Disponible" : "Reservado"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg">
          <Link href="/reservar">Reservar cancha</Link>
        </Button>
      </div>
    </div>
  );
}

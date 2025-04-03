"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserCircle, Calendar, Clock, Search, MapPin, Users, MessageCircle } from "lucide-react";
import PublicarAnuncioDialog from "@/components/buscar-rivales/PublicarAnuncioDialog";
import { Toaster } from "react-hot-toast";

// Definir interfaces para los tipos de datos
interface TeamData {
  id: number;
  name: string;
  type: "team";
  level: string;
  players: number;
  needsPlayers: boolean;
  dayPreference: string;
  timePreference: string;
  location: string;
  contact: string;
  created: string;
}

interface PlayerData {
  id: number;
  name: string;
  type: "player";
  level: string;
  position: string;
  age: number;
  dayPreference: string;
  timePreference: string;
  location: string;
  contact: string;
  created: string;
}

type ListingData = TeamData | PlayerData;

// Datos de muestra para equipos y jugadores
const teamsData: TeamData[] = [
  {
    id: 1,
    name: "Los Cracks FC",
    type: "team",
    level: "Intermedio",
    players: 8,
    needsPlayers: true,
    dayPreference: "Sábados",
    timePreference: "Tarde",
    location: "Zona Norte",
    contact: "Juan (WhatsApp: 123-456-7890)",
    created: "Hace 2 días",
  },
  {
    id: 2,
    name: "Atlético Victoria",
    type: "team",
    level: "Avanzado",
    players: 10,
    needsPlayers: false,
    dayPreference: "Viernes",
    timePreference: "Noche",
    location: "Zona Centro",
    contact: "Carlos (WhatsApp: 234-567-8901)",
    created: "Hace 5 días",
  },
  {
    id: 3,
    name: "Deportivo San Martín",
    type: "team",
    level: "Principiante",
    players: 6,
    needsPlayers: true,
    dayPreference: "Miércoles",
    timePreference: "Tarde",
    location: "Zona Sur",
    contact: "Pedro (WhatsApp: 345-678-9012)",
    created: "Hace 1 semana",
  },
];

const playersData: PlayerData[] = [
  {
    id: 101,
    name: "Miguel Fernández",
    type: "player",
    level: "Intermedio",
    position: "Delantero",
    age: 28,
    dayPreference: "Lunes a Viernes",
    timePreference: "Noche",
    location: "Zona Centro",
    contact: "WhatsApp: 456-789-0123",
    created: "Hace 1 día",
  },
  {
    id: 102,
    name: "Luis Sánchez",
    type: "player",
    level: "Avanzado",
    position: "Arquero",
    age: 32,
    dayPreference: "Fin de semana",
    timePreference: "Mañana",
    location: "Zona Norte",
    contact: "WhatsApp: 567-890-1234",
    created: "Hace 3 días",
  },
  {
    id: 103,
    name: "Roberto Gómez",
    type: "player",
    level: "Principiante",
    position: "Defensor",
    age: 25,
    dayPreference: "Cualquier día",
    timePreference: "Tarde",
    location: "Zona Sur",
    contact: "WhatsApp: 678-901-2345",
    created: "Hace 6 días",
  },
];

export default function BuscarRivales() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all, teams, players
  const [filterLevel, setFilterLevel] = useState<string[]>([]);
  const [filterLocation, setFilterLocation] = useState<string[]>([]);
  const [filterDay, setFilterDay] = useState<string[]>([]);
  const [filterTime, setFilterTime] = useState<string[]>([]);
  const [anuncios, setAnuncios] = useState<ListingData[]>([...teamsData, ...playersData]);

  // Combinar y filtrar datos
  const allData: ListingData[] = anuncios;

  // Filtrar por texto de búsqueda
  const filteredBySearch = allData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Aplicar filtros
  const filteredData = filteredBySearch.filter(item => {
    // Filtro por tipo
    if (filter !== "all" && item.type !== filter) return false;

    // Filtro por nivel
    if (filterLevel.length > 0 && !filterLevel.includes(item.level)) return false;

    // Filtro por ubicación
    if (filterLocation.length > 0 && !filterLocation.some(loc => item.location.includes(loc))) return false;

    // Filtro por día
    if (filterDay.length > 0 && !filterDay.some(day => item.dayPreference.includes(day))) return false;

    // Filtro por horario
    if (filterTime.length > 0 && !filterTime.includes(item.timePreference)) return false;

    return true;
  });

  // Opciones para los filtros
  const levelOptions = ["Principiante", "Intermedio", "Avanzado"];
  const locationOptions = ["Zona Norte", "Zona Centro", "Zona Sur"];
  const dayOptions = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábados", "Domingos"];
  const timeOptions = ["Mañana", "Tarde", "Noche"];

  // Toggle para los filtros de checkbox
  const toggleFilter = (filterArray: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    if (filterArray.includes(value)) {
      setter(filterArray.filter(item => item !== value));
    } else {
      setter([...filterArray, value]);
    }
  };

  // Helper para extraer el número de WhatsApp
  const getWhatsAppNumber = (contact: string): string => {
    if (contact.includes("WhatsApp:")) {
      const match = contact.split("WhatsApp:")[1]?.trim();
      return match ? match.replace(/[^0-9]/g, "") : "5493795165059";
    }
    return "5493795165059"; // Número de contacto por defecto
  };

  // Handler para cuando se publica un nuevo anuncio
  const handleAnuncioPublicado = (nuevoAnuncio: ListingData) => {
    setAnuncios(prevAnuncios => [nuevoAnuncio, ...prevAnuncios]);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Buscar Rivales</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Encuentra equipos para jugar un partido o jugadores para completar tu equipo
        </p>
      </div>

      {/* Buscador y filtros principales */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nombre o ubicación..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Todos
            </Button>
            <Button
              variant={filter === "team" ? "default" : "outline"}
              onClick={() => setFilter("team")}
              className={filter === "team" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Equipos
            </Button>
            <Button
              variant={filter === "player" ? "default" : "outline"}
              onClick={() => setFilter("player")}
              className={filter === "player" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Jugadores
            </Button>
          </div>
        </div>

        {/* Filtros avanzados */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Nivel */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Nivel</h3>
            <div className="space-y-2">
              {levelOptions.map((level) => (
                <div key={level} className="flex items-center">
                  <Checkbox
                    id={`level-${level}`}
                    checked={filterLevel.includes(level)}
                    onCheckedChange={() => toggleFilter(filterLevel, setFilterLevel, level)}
                    className="border-green-600 data-[state=checked]:bg-green-600"
                  />
                  <label htmlFor={`level-${level}`} className="ml-2 text-sm text-gray-600">
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Ubicación</h3>
            <div className="space-y-2">
              {locationOptions.map((location) => (
                <div key={location} className="flex items-center">
                  <Checkbox
                    id={`location-${location}`}
                    checked={filterLocation.includes(location)}
                    onCheckedChange={() => toggleFilter(filterLocation, setFilterLocation, location)}
                    className="border-green-600 data-[state=checked]:bg-green-600"
                  />
                  <label htmlFor={`location-${location}`} className="ml-2 text-sm text-gray-600">
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Día */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Día</h3>
            <div className="space-y-2">
              {dayOptions.map((day) => (
                <div key={day} className="flex items-center">
                  <Checkbox
                    id={`day-${day}`}
                    checked={filterDay.includes(day)}
                    onCheckedChange={() => toggleFilter(filterDay, setFilterDay, day)}
                    className="border-green-600 data-[state=checked]:bg-green-600"
                  />
                  <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-600">
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Horario */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Horario</h3>
            <div className="space-y-2">
              {timeOptions.map((time) => (
                <div key={time} className="flex items-center">
                  <Checkbox
                    id={`time-${time}`}
                    checked={filterTime.includes(time)}
                    onCheckedChange={() => toggleFilter(filterTime, setFilterTime, time)}
                    className="border-green-600 data-[state=checked]:bg-green-600"
                  />
                  <label htmlFor={`time-${time}`} className="ml-2 text-sm text-gray-600">
                    {time}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Botón para publicar */}
      <div className="mb-8 text-center">
        <PublicarAnuncioDialog onAnuncioPublicado={handleAnuncioPublicado} />
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Card key={item.id} className="overflow-hidden border-green-100 shadow-md hover:shadow-lg transition-shadow">
              <div className={`h-2 ${item.type === "team" ? "bg-blue-500" : "bg-amber-500"}`} />
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <CardDescription className="text-gray-500 text-sm">{item.created}</CardDescription>
                  </div>
                  <Badge className={item.type === "team" ? "bg-blue-500" : "bg-amber-500"}>
                    {item.type === "team" ? "Equipo" : "Jugador"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {item.type === "team" ? (
                  // Contenido específico para equipos
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        {item.players} jugadores - {item.needsPlayers ? "Busca jugadores" : "Equipo completo"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm mr-2">Nivel:</span>
                      <Badge variant="outline" className="border-green-600 text-green-700">
                        {item.level}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  // Contenido específico para jugadores
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <UserCircle className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        {item.position} - {item.age} años
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm mr-2">Nivel:</span>
                      <Badge variant="outline" className="border-green-600 text-green-700">
                        {item.level}
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Información común */}
                <div className="pt-2 border-t border-gray-100 space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">{item.dayPreference}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">{item.timePreference}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">{item.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-100 pt-4">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => window.open(`https://wa.me/${getWhatsAppNumber(item.contact)}`, "_blank")}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contactar
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
              <p className="text-gray-500">
                Intenta ajustar los filtros o realizar una búsqueda diferente.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Consejos */}
      <div className="mt-16 bg-green-50 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Consejos para encontrar rivales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-green-700 mb-2">Sé específico</h3>
            <p className="text-gray-600">
              Al contactar con equipos o jugadores, indica claramente tu nivel, disponibilidad y expectativas para facilitar la coordinación.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-green-700 mb-2">Anticípate</h3>
            <p className="text-gray-600">
              Busca rivales con tiempo suficiente para organizar adecuadamente el partido y asegurar la disponibilidad de todos los jugadores.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-green-700 mb-2">Diversifica</h3>
            <p className="text-gray-600">
              Jugar contra equipos de diferentes niveles te ayudará a mejorar y descubrir nuevas tácticas y estrategias.
            </p>
          </div>
        </div>
      </div>

      {/* Toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

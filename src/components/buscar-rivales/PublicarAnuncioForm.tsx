"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// Esquema de validación con Zod para el formulario de equipo
const teamFormSchema = z.object({
  type: z.literal("team"),
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  level: z.enum(["Principiante", "Intermedio", "Avanzado"], {
    required_error: "Por favor selecciona un nivel",
  }),
  players: z.number().min(1, { message: "Debe haber al menos 1 jugador" }).max(15, { message: "Máximo 15 jugadores" }),
  needsPlayers: z.boolean().default(false),
  dayPreference: z.string({ required_error: "Por favor selecciona un día" }),
  timePreference: z.enum(["Mañana", "Tarde", "Noche"], {
    required_error: "Por favor selecciona un horario",
  }),
  location: z.enum(["Zona Norte", "Zona Centro", "Zona Sur"], {
    required_error: "Por favor selecciona una ubicación",
  }),
  contact: z.string().min(10, { message: "Por favor proporciona información de contacto válida" }),
});

// Esquema de validación con Zod para el formulario de jugador
const playerFormSchema = z.object({
  type: z.literal("player"),
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  level: z.enum(["Principiante", "Intermedio", "Avanzado"], {
    required_error: "Por favor selecciona un nivel",
  }),
  position: z.enum(["Arquero", "Defensor", "Mediocampista", "Delantero"], {
    required_error: "Por favor selecciona una posición",
  }),
  age: z.number().min(15, { message: "La edad mínima es 15 años" }).max(70, { message: "La edad máxima es 70 años" }),
  dayPreference: z.string({ required_error: "Por favor selecciona un día" }),
  timePreference: z.enum(["Mañana", "Tarde", "Noche"], {
    required_error: "Por favor selecciona un horario",
  }),
  location: z.enum(["Zona Norte", "Zona Centro", "Zona Sur"], {
    required_error: "Por favor selecciona una ubicación",
  }),
  contact: z.string().min(10, { message: "Por favor proporciona información de contacto válida" }),
});

// Tipo unión para los dos tipos de formularios
const formSchema = z.discriminatedUnion("type", [teamFormSchema, playerFormSchema]);

type FormValues = z.infer<typeof formSchema>;

export default function PublicarAnuncioForm({
  onSuccess,
  onCancel
}: {
  onSuccess: (data: FormValues) => void;
  onCancel: () => void
}) {
  const [anuncioTipo, setAnuncioTipo] = useState<"team" | "player">("team");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializar el formulario con react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: anuncioTipo,
      name: "",
      level: "Intermedio",
      dayPreference: "Sábados",
      timePreference: "Tarde",
      location: "Zona Centro",
      contact: "",
      ...(anuncioTipo === "team" ? {
        players: 5,
        needsPlayers: false,
      } : {
        position: "Mediocampista",
        age: 25,
      }),
    },
  });

  // Cambiar entre formulario de equipo y jugador
  const handleTipoChange = (tipo: "team" | "player") => {
    setAnuncioTipo(tipo);
    const currentValues = form.getValues();

    form.reset({
      ...currentValues,
      type: tipo,
      ...(tipo === "team" ? {
        players: 5,
        needsPlayers: false,
      } : {
        position: "Mediocampista",
        age: 25,
      }),
    });
  };

  // Manejar el envío del formulario
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Aquí iría la lógica para enviar los datos al servidor
      // Simulando una petición al servidor con un timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Llamar al callback de éxito
      onSuccess(data);

      toast.success("Anuncio publicado correctamente");
    } catch (error) {
      console.error("Error al publicar anuncio:", error);
      toast.error("Hubo un error al publicar el anuncio. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6 flex justify-center gap-4">
        <Button
          type="button"
          variant={anuncioTipo === "team" ? "default" : "outline"}
          className={anuncioTipo === "team" ? "bg-blue-500 hover:bg-blue-600" : ""}
          onClick={() => handleTipoChange("team")}
        >
          Soy un equipo
        </Button>
        <Button
          type="button"
          variant={anuncioTipo === "player" ? "default" : "outline"}
          className={anuncioTipo === "player" ? "bg-amber-500 hover:bg-amber-600" : ""}
          onClick={() => handleTipoChange("player")}
        >
          Soy un jugador
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Nombre */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre {anuncioTipo === "team" ? "del equipo" : "completo"}</FormLabel>
                <FormControl>
                  <Input placeholder={anuncioTipo === "team" ? "Los Campeones FC" : "Juan Pérez"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nivel */}
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nivel de juego</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un nivel" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Principiante">Principiante</SelectItem>
                    <SelectItem value="Intermedio">Intermedio</SelectItem>
                    <SelectItem value="Avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campos específicos según tipo de anuncio */}
          {anuncioTipo === "team" ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="players"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de jugadores</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={15}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="needsPlayers"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-green-600 data-[state=checked]:bg-green-600"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Busca jugadores</FormLabel>
                        <FormDescription>
                          Marca si estás buscando jugadores para completar tu equipo
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Posición preferida</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una posición" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Arquero">Arquero</SelectItem>
                          <SelectItem value="Defensor">Defensor</SelectItem>
                          <SelectItem value="Mediocampista">Mediocampista</SelectItem>
                          <SelectItem value="Delantero">Delantero</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Edad</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={15}
                          max={70}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          {/* Campos comunes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dayPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Días disponibles</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un día" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Lunes">Lunes</SelectItem>
                      <SelectItem value="Martes">Martes</SelectItem>
                      <SelectItem value="Miércoles">Miércoles</SelectItem>
                      <SelectItem value="Jueves">Jueves</SelectItem>
                      <SelectItem value="Viernes">Viernes</SelectItem>
                      <SelectItem value="Sábados">Sábados</SelectItem>
                      <SelectItem value="Domingos">Domingos</SelectItem>
                      <SelectItem value="Fin de semana">Fin de semana</SelectItem>
                      <SelectItem value="Lunes a Viernes">Lunes a Viernes</SelectItem>
                      <SelectItem value="Cualquier día">Cualquier día</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timePreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horario preferido</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un horario" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Mañana">Mañana</SelectItem>
                      <SelectItem value="Tarde">Tarde</SelectItem>
                      <SelectItem value="Noche">Noche</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ubicación</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una ubicación" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Zona Norte">Zona Norte</SelectItem>
                    <SelectItem value="Zona Centro">Zona Centro</SelectItem>
                    <SelectItem value="Zona Sur">Zona Sur</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contacto</FormLabel>
                <FormControl>
                  <Input placeholder="WhatsApp: 123-456-7890" {...field} />
                </FormControl>
                <FormDescription>
                  Proporciona un número de WhatsApp o información de contacto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publicando...
                </>
              ) : (
                "Publicar anuncio"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

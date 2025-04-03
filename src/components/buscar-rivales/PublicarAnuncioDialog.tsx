"use client";

import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import PublicarAnuncioForm from "./PublicarAnuncioForm";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PublicarAnuncioDialogProps {
  onAnuncioPublicado: (data: any) => void;
}

export default function PublicarAnuncioDialog({ onAnuncioPublicado }: PublicarAnuncioDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [step, setStep] = useState<"form" | "preview" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reiniciar el estado al cerrar el diálogo
      setTimeout(() => {
        setStep("form");
        setFormData(null);
      }, 300);
    }
    setIsOpen(open);
  };

  const handleFormSuccess = (data: any) => {
    setFormData(data);
    setStep("preview");
  };

  const handleCancel = () => {
    setStep("form");
  };

  const handlePublish = async () => {
    setIsSubmitting(true);

    try {
      // Aquí iría la lógica para enviar los datos al servidor
      // Por ahora, simularemos un retraso
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Añadir un ID y fecha de creación
      const finalData = {
        ...formData,
        id: Math.floor(Math.random() * 1000) + 200,
        created: "Hace unos momentos",
      };

      // Llamar al callback de publicación
      onAnuncioPublicado(finalData);

      // Cambiar al paso de éxito
      setStep("success");

      // Cerrar el diálogo después de un breve retraso
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error al publicar anuncio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Vista previa simple del anuncio
  const renderPreview = () => {
    if (!formData) return null;

    return (
      <Card className="w-full max-w-2xl mx-auto border-green-100">
        <CardHeader>
          <CardTitle>{formData.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p><strong>Tipo:</strong> {formData.type === "team" ? "Equipo" : "Jugador"}</p>
            <p><strong>Nivel:</strong> {formData.level}</p>

            {formData.type === "team" ? (
              <>
                <p><strong>Número de jugadores:</strong> {formData.players}</p>
                <p><strong>Busca jugadores:</strong> {formData.needsPlayers ? "Sí" : "No"}</p>
              </>
            ) : (
              <>
                <p><strong>Posición:</strong> {formData.position}</p>
                <p><strong>Edad:</strong> {formData.age} años</p>
              </>
            )}

            <p><strong>Día preferido:</strong> {formData.dayPreference}</p>
            <p><strong>Horario preferido:</strong> {formData.timePreference}</p>
            <p><strong>Ubicación:</strong> {formData.location}</p>
            <p><strong>Contacto:</strong> {formData.contact}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button size="lg" className="bg-green-600 hover:bg-green-700">
          Publicar anuncio
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-center">
            {step === "form" && "Publicar un nuevo anuncio"}
            {step === "preview" && "Vista previa del anuncio"}
            {step === "success" && "¡Anuncio publicado con éxito!"}
          </AlertDialogTitle>
        </AlertDialogHeader>

        {step === "form" && (
          <PublicarAnuncioForm
            onSuccess={handleFormSuccess}
            onCancel={() => setIsOpen(false)}
          />
        )}

        {step === "preview" && formData && (
          <div className="py-4">
            {renderPreview()}
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={handleCancel}>
                Volver a editar
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handlePublish}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publicando...
                  </>
                ) : (
                  "Confirmar y publicar"
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-green-50 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              ¡Tu anuncio ha sido publicado!
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Tu anuncio ya está disponible para que otros usuarios lo vean.
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              Cerrar
            </Button>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

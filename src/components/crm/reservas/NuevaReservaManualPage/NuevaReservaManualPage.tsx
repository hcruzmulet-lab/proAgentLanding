'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function NuevaReservaManualPage() {
  const router = useRouter();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="space-y-6 w-full">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink 
              onClick={() => router.push('/es/crm/reservas')}
              className="cursor-pointer"
            >
              Reservas
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Reserva externa</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Reserva externa</h1>
        <p className="text-slate-600">Elige uno de los siguientes métodos para enviar una nueva reserva.</p>
      </div>

      {/* Main Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Option */}
        <Card className="border-2 shadow-none">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                mail
              </span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-900">
                Email{' '}
                <a 
                  href="mailto:reservas@proagent.com" 
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  reservas@proagent.com
                </a>
              </h2>
              <p className="text-sm text-slate-600">
                Puedes reenviar tus confirmaciones o incluirlas como archivo adjunto. 
                Aparecerán en tu página de reservas como borradores en unos minutos.
              </p>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/es/crm/reservas')}
            >
              Ir a página de Reservas
            </Button>
          </CardContent>
        </Card>

        {/* Upload Option */}
        <Card className="border-2 shadow-none">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                upload_file
              </span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-900">Subir archivo</h2>
              <p className="text-sm text-slate-600">
                Sube tus documentos aquí. Puede ser un PDF, una captura de pantalla de un email, 
                o un formato de imagen aceptado.
              </p>
            </div>

            <Button 
              className="w-full bg-slate-700 hover:bg-slate-800"
              onClick={() => setIsUploadModalOpen(true)}
            >
              Subir comprobante de reserva
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modification Section */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold text-slate-900">
          ¿Quieres reportar una modificación de reserva?
        </h2>
        <p className="text-slate-600 mb-4">Elige una de las siguientes opciones:</p>

        <div className="space-y-3">
          {/* Option 1 */}
          <Card className="border border-slate-200 hover:border-slate-300 transition-colors shadow-none">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-shrink-0">
                <span className="material-symbols-outlined text-slate-600" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                  mail
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-700">
                  Reenvía la confirmación a{' '}
                  <a 
                    href="mailto:reservas@proagent.com" 
                    className="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    reservas@proagent.com
                  </a>
                  , luego ve a la página de Reservas y selecciona "Modificación" en "Finalizar envío".
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Option 2 */}
          <Card className="border border-slate-200 hover:border-slate-300 transition-colors shadow-none">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-shrink-0">
                <span className="material-symbols-outlined text-slate-600" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                  edit
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-700">
                  Navega a la reserva que deseas modificar, luego haz clic en "Gestionar reserva" 
                  y selecciona "Modificar reserva o reportar modificación".
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-900">
              Subir comprobante de reserva
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors cursor-pointer">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-slate-600" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                    upload_file
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-900">
                    Haz clic para subir o arrastra y suelta
                  </p>
                  <p className="text-xs text-slate-500">
                    PDF, PNG, JPG o JPEG (max. 10MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium text-slate-700">
                  Notas adicionales (opcional)
                </Label>
                <Input 
                  id="notes"
                  placeholder="Agrega información adicional sobre esta reserva..."
                  className="w-full"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4">
              <Button 
                variant="outline"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="bg-slate-700 hover:bg-slate-800"
                onClick={() => {
                  // TODO: Implementar lógica de subida
                  setIsUploadModalOpen(false);
                  router.push('/es/crm/reservas');
                }}
              >
                Subir archivo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

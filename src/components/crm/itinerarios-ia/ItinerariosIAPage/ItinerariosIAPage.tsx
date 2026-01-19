'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DatePicker } from '@/components/ui/date-picker';
import { useToast } from '@/contexts/ToastContext';

// Actualizado: 3 itinerarios disponibles

interface Itinerario {
  id: string;
  numeroItinerario: string;
  fechaCreacion: string;
  fechaViaje: string;
  nombre: string;
  destino: string;
  pasajeros: number;
  ubicaciones: number;
  hoteles: number;
  noches: number;
  precio: number;
  estado: 'pendiente' | 'enviado' | 'aceptado' | 'rechazado';
  imagen?: string;
}

const itinerariosMock: Itinerario[] = [
  {
    id: '1',
    numeroItinerario: 'ITI-001',
    fechaCreacion: '10 ene 2026',
    fechaViaje: '15 feb 2026',
    nombre: 'Miguel Zabala',
    destino: 'Toscana, Italia',
    pasajeros: 2,
    ubicaciones: 1,
    hoteles: 1,
    noches: 5,
    precio: 476.00,
    estado: 'enviado',
    imagen: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    numeroItinerario: 'ITI-002',
    fechaCreacion: '12 ene 2026',
    fechaViaje: '20 mar 2026',
    nombre: 'Arieldi Marrero',
    destino: 'Punta Cana, República Dominicana',
    pasajeros: 4,
    ubicaciones: 1,
    hoteles: 1,
    noches: 7,
    precio: 2800.00,
    estado: 'pendiente',
    imagen: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    numeroItinerario: 'ITI-003',
    fechaCreacion: '15 ene 2026',
    fechaViaje: '24 ene 2026',
    nombre: 'Cliente Europa',
    destino: 'Madrid • Barcelona • Roma',
    pasajeros: 2,
    ubicaciones: 3,
    hoteles: 4,
    noches: 9,
    precio: 2749.00,
    estado: 'aceptado',
    imagen: 'https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
  }
];

export function ItinerariosIAPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'es';
  const { showToast } = useToast();
  const [filtros, setFiltros] = useState({
    buscar: 'todos',
    destino: '',
    numeroItinerario: '',
    fechaDesde: undefined as Date | undefined,
    fechaHasta: undefined as Date | undefined
  });

  const [itinerarios, setItinerarios] = useState<Itinerario[]>(itinerariosMock);
  const [isNewItinerarioModalOpen, setIsNewItinerarioModalOpen] = useState(false);
  const [sortField, setSortField] = useState<'fechaCreacion' | 'fechaViaje' | null>('fechaCreacion');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [showMotorIframe, setShowMotorIframe] = useState(false);
  const [motorUrl] = useState('https://azucartravel.com/?tripType=TRIP_PLANNER');
  const [shareModalItinerario, setShareModalItinerario] = useState<Itinerario | null>(null);

  const handleLimpiar = () => {
    setFiltros({
      buscar: 'todos',
      destino: '',
      numeroItinerario: '',
      fechaDesde: undefined,
      fechaHasta: undefined
    });
  };

  const handleBuscar = () => {
    console.log('Buscando con filtros:', filtros);
  };

  const handleSort = (field: 'fechaCreacion' | 'fechaViaje') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }

    const sorted = [...itinerarios].sort((a, b) => {
      const dateA = new Date(a[field]).getTime();
      const dateB = new Date(b[field]).getTime();
      
      if (sortField === field && sortOrder === 'asc') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    setItinerarios(sorted);
  };

  const getEstadoBadge = (estado: string) => {
    const badges = {
      pendiente: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendiente' },
      enviado: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Enviado' },
      aceptado: { bg: 'bg-green-100', text: 'text-green-700', label: 'Aceptado' },
      rechazado: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rechazado' }
    };
    return badges[estado as keyof typeof badges] || badges.pendiente;
  };

  return (
    <TooltipProvider>
      <div className="itinerarios-page">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.1px', margin: 0 }}>
              {showMotorIframe ? 'Nuevo itinerario con motor' : 'Itinerarios IA'}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', paddingTop: '0px' }}>
            {showMotorIframe ? (
              <Button 
                className="bg-slate-500 hover:bg-slate-600 text-white"
                onClick={() => setShowMotorIframe(false)}
                style={{ marginTop: 0 }}
              >
                <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>close</span>
                Cancelar
              </Button>
            ) : (
              <Button 
                className="bg-slate-700 hover:bg-slate-800 text-white"
                onClick={() => setIsNewItinerarioModalOpen(true)}
                style={{ marginTop: 0 }}
              >
                <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>add</span>
                Nuevo itinerario
              </Button>
            )}
          </div>
        </div>

        {/* Contenido principal o iframe */}
        {showMotorIframe ? (
          <div style={{ 
            width: '100%',
            height: 'calc(100vh - 180px)',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <iframe
              src={motorUrl}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '8px'
              }}
              title="Motor de Itinerarios"
              allow="fullscreen"
            />
          </div>
        ) : (
          <div className="space-y-6">

        {/* Cards informativos superiores */}
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Itinerarios</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">3</p>
            </div>
            <span className="material-symbols-outlined text-[#cbd5e1] text-[32px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>description</span>
          </div>
          
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Destinos</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">5</p>
            </div>
            <span className="material-symbols-outlined text-[#cbd5e1] text-[32px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>map</span>
          </div>
          
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Pasajeros</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">8</p>
            </div>
            <span className="material-symbols-outlined text-[#cbd5e1] text-[32px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>group</span>
          </div>
          
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Valor Total</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">$4,050</p>
            </div>
            <span className="material-symbols-outlined text-[#cbd5e1] text-[32px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>payments</span>
          </div>
        </div>

          {/* Filtros */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Buscar:</label>
                  <Select value={filtros.buscar} onValueChange={(value) => setFiltros({...filtros, buscar: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="pendientes">Pendientes</SelectItem>
                      <SelectItem value="enviados">Enviados</SelectItem>
                      <SelectItem value="aceptados">Aceptados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Destino:</label>
                  <Input 
                    placeholder="Buscar por destino" 
                    value={filtros.destino}
                    onChange={(e) => setFiltros({...filtros, destino: e.target.value})}
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">N° Itinerario:</label>
                  <Input 
                    placeholder="Ej: ITI-001" 
                    value={filtros.numeroItinerario}
                    onChange={(e) => setFiltros({...filtros, numeroItinerario: e.target.value})}
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Fecha Desde:</label>
                  <DatePicker
                    date={filtros.fechaDesde}
                    onSelect={(date) => setFiltros({...filtros, fechaDesde: date || undefined})}
                    placeholder="Seleccionar fecha"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Fecha Hasta:</label>
                  <DatePicker
                    date={filtros.fechaHasta}
                    onSelect={(date) => setFiltros({...filtros, fechaHasta: date || undefined})}
                    placeholder="Seleccionar fecha"
                  />
                </div>

                <Button onClick={handleBuscar} className="bg-slate-700 hover:bg-slate-800">
                  Buscar
                </Button>

                <Button variant="outline" onClick={handleLimpiar}>
                  Limpiar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itinerarios.map((itinerario) => {
                const estadoBadge = getEstadoBadge(itinerario.estado);
                const isClickable = itinerario.id === '3'; // Solo el itinerario 3 es clickeable
                return (
                  <Card 
                    key={itinerario.id} 
                    className={isClickable ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}
                    onClick={isClickable ? () => router.push(`/${locale}/crm/itinerarios-ia/${itinerario.id}`) : undefined}
                  >
                    {itinerario.imagen && (
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <img 
                          src={itinerario.imagen} 
                          alt={itinerario.destino}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-lg font-semibold text-slate-900 mb-1">{itinerario.numeroItinerario}</div>
                          <Badge className={`${estadoBadge.bg} ${estadoBadge.text} border-0`}>
                            {estadoBadge.label}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div>
                          <p className="text-sm text-slate-500">Destino</p>
                          <p className="text-base text-slate-900">{itinerario.destino}</p>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <div>
                            <p className="text-slate-500">Fecha viaje</p>
                            <p className="text-slate-900">{itinerario.fechaViaje}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Pasajeros</p>
                            <p className="text-slate-900">{itinerario.pasajeros}</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-500">Precio</span>
                          <span className="text-xl font-semibold text-slate-900">US${itinerario.precio.toFixed(2)}</span>
                        </div>
                        {isClickable && (
                          <button
                            className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShareModalItinerario(itinerario);
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>share</span>
                            <span>Compartir</span>
                          </button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Nuevo Itinerario */}
        <Dialog open={isNewItinerarioModalOpen} onOpenChange={setIsNewItinerarioModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-slate-900">Nuevo Itinerario</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 py-6">
              {/* Itinerario con Motor */}
              <button 
                className="flex flex-col items-center gap-4 p-6 bg-slate-700 border-2 border-slate-700 rounded-lg hover:bg-slate-800 hover:border-slate-800 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => {
                  setShowMotorIframe(true);
                  setIsNewItinerarioModalOpen(false);
                }}
              >
                <span className="material-symbols-outlined text-white text-7xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
                  auto_awesome
                </span>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">Itinerario con Motor</h3>
                  <p className="text-xs text-slate-400 mt-1">Crear itinerario con nuestro motor de búsqueda</p>
                </div>
              </button>

              {/* Itinerario Manual */}
              <button 
                className="flex flex-col items-center gap-4 p-6 bg-slate-700 border-2 border-slate-700 rounded-lg hover:bg-slate-800 hover:border-slate-800 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => {
                  router.push(`/${locale}/crm/itinerarios-ia/nuevo-manual`);
                  setIsNewItinerarioModalOpen(false);
                }}
              >
                <span className="material-symbols-outlined text-white text-7xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
                  edit_document
                </span>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">Itinerario Manual</h3>
                  <p className="text-xs text-slate-400 mt-1">Crear un itinerario de forma manual</p>
                </div>
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de Compartir */}
        {shareModalItinerario && (
          <div 
            className="fixed inset-0 flex items-center justify-center"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999
            }}
            onClick={() => setShareModalItinerario(null)}
          >
            <div 
              className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-900">Compartir Itinerario</h3>
                <button 
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShareModalItinerario(null)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                Elige cómo deseas compartir este itinerario
              </p>
              <div className="space-y-3">
                {/* WhatsApp */}
                <button
                  className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => {
                    const enlacePublico = `${window.location.origin}/es/itinerario/${shareModalItinerario.numeroItinerario}`;
                    const mensaje = `¡Mira este increíble itinerario de viaje! ${enlacePublico}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, '_blank');
                    setShareModalItinerario(null);
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-slate-700 rounded-full">
                    <svg height="24" viewBox="0 0 512 512" width="24" xmlns="http://www.w3.org/2000/svg" fill="white">
                      <path d="m435.921875 74.351562c-48.097656-47.917968-112.082031-74.3242182-180.179687-74.351562-67.945313 0-132.03125 26.382812-180.445313 74.289062-48.5 47.988282-75.234375 111.761719-75.296875 179.339844v.078125.046875c.0078125 40.902344 10.753906 82.164063 31.152344 119.828125l-30.453125 138.417969 140.011719-31.847656c35.460937 17.871094 75.027343 27.292968 114.933593 27.308594h.101563c67.933594 0 132.019531-26.386719 180.441406-74.296876 48.542969-48.027343 75.289062-111.71875 75.320312-179.339843.019532-67.144531-26.820312-130.882813-75.585937-179.472657zm-180.179687 393.148438h-.089844c-35.832032-.015625-71.335938-9.011719-102.667969-26.023438l-6.621094-3.59375-93.101562 21.175782 20.222656-91.90625-3.898437-6.722656c-19.382813-33.425782-29.625-70.324219-29.625-106.71875.074218-117.800782 96.863281-213.75 215.773437-213.75 57.445313.023437 111.421875 22.292968 151.984375 62.699218 41.175781 41.03125 63.84375 94.710938 63.824219 151.152344-.046875 117.828125-96.839844 213.75-215.773438 213.75z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-slate-900">WhatsApp</h4>
                    <p className="text-sm text-slate-600">Comparte el itinerario por WhatsApp</p>
                  </div>
                </button>

                {/* Email */}
                <button
                  className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => {
                    const enlacePublico = `${window.location.origin}/es/itinerario/${shareModalItinerario.numeroItinerario}`;
                    const subject = `¡Mira este itinerario de viaje!`;
                    const body = `Hola,\n\nTe comparto este itinerario de viaje que te podría interesar:\n${enlacePublico}\n\nSaludos,`;
                    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                    setShareModalItinerario(null);
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-slate-700 rounded-full">
                    <span className="material-symbols-outlined text-white">mail</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-slate-900">Email</h4>
                    <p className="text-sm text-slate-600">Envía el itinerario por correo electrónico</p>
                  </div>
                </button>

                {/* SMS */}
                <button
                  className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => {
                    const enlacePublico = `${window.location.origin}/es/itinerario/${shareModalItinerario.numeroItinerario}`;
                    const message = `¡Mira este itinerario de viaje! ${enlacePublico}`;
                    window.open(`sms:?body=${encodeURIComponent(message)}`, '_blank');
                    setShareModalItinerario(null);
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-slate-700 rounded-full">
                    <span className="material-symbols-outlined text-white">sms</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-slate-900">SMS</h4>
                    <p className="text-sm text-slate-600">Envía el itinerario por mensaje de texto</p>
                  </div>
                </button>

                {/* Copiar Enlace */}
                <button
                  className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => {
                    const enlacePublico = `${window.location.origin}/es/itinerario/${shareModalItinerario.numeroItinerario}`;
                    navigator.clipboard.writeText(enlacePublico);
                    setShareModalItinerario(null);
                    showToast({
                      title: 'Enlace copiado',
                      description: 'El enlace ha sido copiado al portapapeles'
                    });
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-slate-700 rounded-full">
                    <span className="material-symbols-outlined text-white">link</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-slate-900">Copiar Enlace</h4>
                    <p className="text-sm text-slate-600">Copia el enlace público para compartirlo</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

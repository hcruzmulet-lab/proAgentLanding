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
      <div className="itinerarios-page" style={{ display: 'flex', gap: showMotorIframe ? '16px' : '0', height: showMotorIframe ? '100%' : 'auto' }}>
        {/* Columna izquierda - Contenido principal */}
        <div style={{ flex: showMotorIframe ? '0 0 320px' : '1', transition: 'all 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.1px', margin: 0 }}>Itinerarios IA</h1>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', paddingTop: '0px' }}>
              {showMotorIframe && (
                <Button 
                  className="bg-slate-500 hover:bg-slate-600 text-white"
                  onClick={() => setShowMotorIframe(false)}
                  style={{ marginTop: 0 }}
                >
                  <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>close</span>
                  Cerrar
                </Button>
              )}
              <Button 
                className="bg-slate-700 hover:bg-slate-800 text-white"
                onClick={() => setIsNewItinerarioModalOpen(true)}
                style={{ marginTop: 0 }}
              >
                <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>add</span>
                Nuevo itinerario
              </Button>
            </div>
          </div>
          <div className="space-y-6" style={{ display: showMotorIframe ? 'none' : 'block' }}>

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

        <div className="space-y-6">

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
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">Precio</span>
                          <span className="text-xl font-semibold text-slate-900">US${itinerario.precio.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
        </div>
        </div>

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
        </div>

        {/* Columna derecha - Iframe del motor */}
        {showMotorIframe && (
          <div style={{ 
            flex: '1', 
            height: 'calc(100vh - 120px)', 
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
        )}
      </div>
    </TooltipProvider>
  );
}

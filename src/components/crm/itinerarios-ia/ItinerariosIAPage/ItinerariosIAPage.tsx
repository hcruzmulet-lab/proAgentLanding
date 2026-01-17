'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  }
];

export function ItinerariosIAPage() {
  const router = useRouter();
  const [filtros, setFiltros] = useState({
    buscar: 'todos',
    destino: '',
    numeroItinerario: '',
    nombre: ''
  });

  const [itinerarios, setItinerarios] = useState<Itinerario[]>(itinerariosMock);
  const [isNewItinerarioModalOpen, setIsNewItinerarioModalOpen] = useState(false);
  const [sortField, setSortField] = useState<'fechaCreacion' | 'fechaViaje' | null>('fechaCreacion');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const handleLimpiar = () => {
    setFiltros({
      buscar: 'todos',
      destino: '',
      numeroItinerario: '',
      nombre: ''
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.1px', margin: 0 }}>Itinerarios IA</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', paddingTop: '0px' }}>
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
        <div className="space-y-6">

        {/* Cards informativos superiores */}
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Itinerarios</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">2</p>
            </div>
            <span className="material-symbols-outlined text-[#cbd5e1] text-[32px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>description</span>
          </div>
          
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Destinos</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">2</p>
            </div>
            <span className="material-symbols-outlined text-[#cbd5e1] text-[32px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>map</span>
          </div>
          
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Pasajeros</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">6</p>
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
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Nombre:</label>
                  <Input 
                    placeholder="Nombre del cliente" 
                    value={filtros.nombre}
                    onChange={(e) => setFiltros({...filtros, nombre: e.target.value})}
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

          {/* View Toggle */}
          <div className="flex justify-end mb-4">
            <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => setViewMode('list')}
              >
                <span className="material-symbols-outlined text-lg">view_list</span>
              </button>
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <span className="material-symbols-outlined text-lg">grid_view</span>
              </button>
            </div>
          </div>

          {/* List View */}
          {viewMode === 'list' && (
            <>
              {/* Header de tabla */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 uppercase items-center">
                <div className="col-span-1">N° Itinerario</div>
                <div 
                  className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors"
                  onClick={() => handleSort('fechaCreacion')}
                >
                  Fecha de creación
                  {sortField === 'fechaCreacion' && (
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}>
                      {sortOrder === 'desc' ? 'expand_more' : 'expand_less'}
                    </span>
                  )}
                </div>
                <div 
                  className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors"
                  onClick={() => handleSort('fechaViaje')}
                >
                  Fecha de viaje
                  {sortField === 'fechaViaje' && (
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}>
                      {sortOrder === 'desc' ? 'expand_more' : 'expand_less'}
                    </span>
                  )}
                </div>
                <div className="col-span-2">Cliente</div>
                <div className="col-span-2">Detalles</div>
                <div className="col-span-3 text-right">Precio total</div>
              </div>

              {/* Lista de itinerarios */}
              <div className="space-y-4">
            {itinerarios.map((itinerario) => {
              const estadoBadge = getEstadoBadge(itinerario.estado);
              
              return (
                <Card key={itinerario.id} className="overflow-hidden">
                  <div className="flex">
                    {/* Imagen del destino */}
                    {itinerario.imagen && (
                      <div className="flex-shrink-0">
                        <img 
                          src={itinerario.imagen} 
                          alt={itinerario.destino}
                          className="w-48 h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Contenido del itinerario */}
                    <CardContent className="p-6 flex-1">
                      <div className="grid grid-cols-12 gap-4 items-start">
                        {/* N° Itinerario */}
                        <div className="col-span-1">
                          <div className="text-lg font-semibold text-slate-700">{itinerario.numeroItinerario}</div>
                        </div>

                      {/* Fecha de creación */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900">{itinerario.fechaCreacion}</p>
                      </div>

                      {/* Fecha de viaje */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900">{itinerario.fechaViaje}</p>
                      </div>

                      {/* Cliente */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900 font-medium">{itinerario.nombre}</p>
                        <p className="text-xs text-slate-500">{itinerario.destino}</p>
                      </div>

                      {/* Detalles - Iconos */}
                      <div className="col-span-2">
                        <div className="flex flex-wrap gap-3">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 text-sm cursor-default">
                                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>person</span>
                                <span>{itinerario.pasajeros}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Pasajeros</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 text-sm cursor-default">
                                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>location_on</span>
                                <span>{itinerario.ubicaciones}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Destinos</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 text-sm cursor-default">
                                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>hotel</span>
                                <span>{itinerario.hoteles}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Hoteles</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 text-sm cursor-default">
                                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>nightlight</span>
                                <span>{itinerario.noches}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Noches</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>

                        {/* Precio */}
                        <div className="col-span-3 text-right">
                          <p className="text-lg font-semibold text-slate-900">US${itinerario.precio.toFixed(2)}</p>
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t">
                        <Badge className={`${estadoBadge.bg} ${estadoBadge.text} hover:${estadoBadge.bg} whitespace-nowrap border-0`}>
                          {estadoBadge.label}
                        </Badge>
                        <div className="flex items-center gap-3">
                          <Button className="bg-slate-700 hover:bg-slate-800 text-white">
                            Editar
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => window.open('https://azucartravel.com/es/idea/41931780/-crucero-toscana-mas-vuelo', '_blank', 'noopener,noreferrer')}
                          >
                            Ver Itinerario
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
              </div>
            </>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itinerarios.map((itinerario) => {
                const estadoBadge = getEstadoBadge(itinerario.estado);
                return (
                  <Card 
                    key={itinerario.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => router.push(`/crm/itinerarios-ia/${itinerario.id}`)}
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
                          <p className="text-sm text-slate-500">Cliente</p>
                          <p className="text-base font-medium text-slate-900">{itinerario.nombre}</p>
                        </div>
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
          )}
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
                className="flex flex-col items-center gap-4 p-6 bg-white border-2 border-slate-200 rounded-lg hover:border-slate-700 hover:shadow-md transition-all cursor-pointer"
                onClick={() => {
                  window.open('https://azucartravel.com/?tripType=TRIP_PLANNER', '_blank', 'noopener,noreferrer');
                  setIsNewItinerarioModalOpen(false);
                }}
              >
                <span className="material-symbols-outlined text-slate-700 text-6xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                  travel_explore
                </span>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900">Itinerario con Motor</h3>
                  <p className="text-sm text-slate-500 mt-1">Crear itinerario con nuestro motor de búsqueda</p>
                </div>
              </button>

              {/* Itinerario Manual */}
              <button 
                className="flex flex-col items-center gap-4 p-6 bg-white border-2 border-slate-200 rounded-lg hover:border-slate-700 hover:shadow-md transition-all cursor-pointer"
                onClick={() => {
                  router.push('/es/crm/itinerarios-ia/nuevo-manual');
                  setIsNewItinerarioModalOpen(false);
                }}
              >
                <span className="material-symbols-outlined text-slate-700 text-6xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                  edit_note
                </span>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900">Itinerario Manual</h3>
                  <p className="text-sm text-slate-500 mt-1">Crear un itinerario de forma manual</p>
                </div>
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

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
import { DatePicker } from '@/components/ui/date-picker';
import './ReservasCRMPage.scss';

interface Reserva {
  id: string;
  localizador: string;
  fechaCreacion: string;
  fechaSalida: string;
  nombre: string;
  destino: string;
  pasajeros: number;
  ubicaciones: number;
  autos: number;
  hoteles: number;
  noches: number;
  precio: number;
  comision: number;
  estado: 'finalizada' | 'pendiente' | 'cancelada';
  imagen?: string;
}

const reservasMock: Reserva[] = [
  {
    id: '1',
    localizador: 'AZC-2',
    fechaCreacion: '30 dic 2025',
    fechaSalida: '24 ene 2026',
    nombre: 'Arieldi Marrero',
    destino: 'Cancún, México',
    pasajeros: 2,
    ubicaciones: 2,
    autos: 0,
    hoteles: 0,
    noches: 2,
    precio: 651.55,
    comision: 0,
    estado: 'finalizada',
    imagen: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    localizador: 'AZC-1',
    fechaCreacion: '26 dic 2025',
    fechaSalida: '24 ene 2026',
    nombre: 'Arieldi Marrero',
    destino: 'Punta Cana, RD',
    pasajeros: 2,
    ubicaciones: 2,
    autos: 1,
    hoteles: 0,
    noches: 2,
    precio: 298.53,
    comision: 0,
    estado: 'finalizada',
    imagen: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
  }
];

export function ReservasCRMPage() {
  const router = useRouter();
  const [filtros, setFiltros] = useState({
    buscar: 'todas',
    destino: '',
    localizador: '',
    nombre: '',
    fechaDesde: undefined as Date | undefined,
    fechaHasta: undefined as Date | undefined
  });

  const [reservas, setReservas] = useState<Reserva[]>(reservasMock);
  const [isNewReservaModalOpen, setIsNewReservaModalOpen] = useState(false);
  const [isFacturaModalOpen, setIsFacturaModalOpen] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [sortField, setSortField] = useState<'fechaCreacion' | 'fechaSalida' | null>('fechaCreacion');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const handleLimpiar = () => {
    setFiltros({
      buscar: 'todas',
      destino: '',
      localizador: '',
      nombre: '',
      fechaDesde: undefined,
      fechaHasta: undefined
    });
  };

  const handleBuscar = () => {
    console.log('Buscando con filtros:', filtros);
  };

  const handleGenerarFactura = (e: React.MouseEvent, reserva: Reserva) => {
    e.stopPropagation();
    setSelectedReserva(reserva);
    setIsFacturaModalOpen(true);
  };

  const handleSort = (field: 'fechaCreacion' | 'fechaSalida') => {
    if (sortField === field) {
      // Si ya está ordenado por este campo, cambiar la dirección
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Si es un nuevo campo, ordenar descendente por defecto
      setSortField(field);
      setSortOrder('desc');
    }

    const sorted = [...reservas].sort((a, b) => {
      const dateA = new Date(a[field]).getTime();
      const dateB = new Date(b[field]).getTime();
      
      if (sortField === field && sortOrder === 'asc') {
        return dateB - dateA; // Cambiar a desc
      } else {
        return dateA - dateB; // Cambiar a asc
      }
    });

    setReservas(sorted);
  };

  return (
    <TooltipProvider>
      <div className="reservas-crm-page">
        <div className="reservas-crm-page__header">
          <div className="reservas-crm-page__header-left">
            <h1 className="reservas-crm-page__title">Reservas</h1>
          </div>
          <div className="reservas-crm-page__actions">
            <Button 
              className="bg-slate-700 hover:bg-slate-800 text-white"
              onClick={() => setIsNewReservaModalOpen(true)}
            >
              <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>add</span>
              Nueva Reserva
            </Button>
          </div>
        </div>
        <div className="space-y-6">

        {/* Cards informativos superiores */}
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Reservas</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">2</p>
            </div>
            <span className="material-symbols-outlined text-[#cbd5e1] text-[32px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>event_available</span>
          </div>
          
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Destinos</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">4</p>
            </div>
            <span className="material-symbols-outlined text-[#cbd5e1] text-[32px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>map</span>
          </div>
          
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Hoteles</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">0</p>
            </div>
            <span className="material-symbols-outlined text-[#cbd5e1] text-[32px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>hotel</span>
          </div>
          
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Transportes</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">1</p>
            </div>
            <span className="material-symbols-outlined text-[#cbd5e1] text-[32px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>flight_takeoff</span>
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
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="finalizadas">Finalizadas</SelectItem>
                      <SelectItem value="pendientes">Pendientes</SelectItem>
                      <SelectItem value="canceladas">Canceladas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Destino</label>
                  <Input 
                    value={filtros.destino}
                    onChange={(e) => setFiltros({...filtros, destino: e.target.value})}
                    placeholder="Buscar destino"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Localizador</label>
                  <Input 
                    value={filtros.localizador}
                    onChange={(e) => setFiltros({...filtros, localizador: e.target.value})}
                    placeholder="Buscar localizador"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Nombre</label>
                  <Input 
                    value={filtros.nombre}
                    onChange={(e) => setFiltros({...filtros, nombre: e.target.value})}
                    placeholder="Buscar nombre"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Fecha Desde</label>
                  <DatePicker
                    date={filtros.fechaDesde}
                    onSelect={(date) => setFiltros({...filtros, fechaDesde: date || undefined})}
                    placeholder="Seleccionar fecha"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Fecha Hasta</label>
                  <DatePicker
                    date={filtros.fechaHasta}
                    onSelect={(date) => setFiltros({...filtros, fechaHasta: date || undefined})}
                    placeholder="Seleccionar fecha"
                  />
                </div>

                <Button 
                  variant="outline" 
                  onClick={handleLimpiar}
                  className="px-6"
                >
                  Limpiar
                </Button>
                <Button 
                  onClick={handleBuscar}
                  className="px-6 bg-slate-700 hover:bg-slate-800 text-white"
                >
                  Buscar
                </Button>
              </div>
            </CardContent>
          </Card>


          {/* List View */}
          {viewMode === 'list' && (
            <>
              {/* Header de tabla */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 uppercase items-center">
            <div className="col-span-1">Localizador</div>
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
              onClick={() => handleSort('fechaSalida')}
            >
              Fecha de salida
              {sortField === 'fechaSalida' && (
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}>
                  {sortOrder === 'desc' ? 'expand_more' : 'expand_less'}
                </span>
              )}
            </div>
            <div className="col-span-2">Nombre</div>
            <div className="col-span-2">Viaje</div>
            <div className="col-span-3 text-right">Precio total</div>
          </div>

          {/* Lista de reservas */}
          <div className="space-y-4">
            {reservas.map((reserva) => (
              <Card key={reserva.id} className="overflow-hidden">
                <div className="flex">
                  {/* Imagen del destino */}
                  {reserva.imagen && (
                    <div className="flex-shrink-0">
                      <img 
                        src={reserva.imagen} 
                        alt={reserva.destino}
                        className="w-48 h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Contenido de la reserva */}
                  <CardContent className="p-6 flex-1">
                    <div className="grid grid-cols-12 gap-4 items-start">
                      {/* Localizador */}
                      <div className="col-span-1">
                        <div className="text-lg font-semibold text-slate-700">{reserva.localizador}</div>
                      </div>

                    {/* Fecha de creación */}
                    <div className="col-span-2">
                      <p className="text-sm text-slate-900">{reserva.fechaCreacion}</p>
                    </div>

                    {/* Fecha de salida */}
                    <div className="col-span-2">
                      <p className="text-sm text-slate-900">{reserva.fechaSalida}</p>
                    </div>

                    {/* Nombre */}
                    <div className="col-span-2">
                      <p className="text-sm text-slate-900 font-medium">{reserva.nombre}</p>
                      <p className="text-xs text-slate-500">{reserva.destino}</p>
                    </div>

                    {/* Viaje - Iconos */}
                    <div className="col-span-2">
                      <div className="flex flex-wrap gap-3">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1 text-sm cursor-default">
                              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>person</span>
                              <span>{reserva.pasajeros}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Adultos</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1 text-sm cursor-default">
                              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>location_on</span>
                              <span>{reserva.ubicaciones}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Destinos</p>
                          </TooltipContent>
                        </Tooltip>

                        {reserva.autos > 0 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 text-sm cursor-default">
                                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>directions_car</span>
                                <span>{reserva.autos}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Transportes</p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1 text-sm cursor-default">
                              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>hotel</span>
                              <span>{reserva.hoteles}</span>
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
                              <span>{reserva.noches}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Noches de alojamiento</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                      {/* Precio */}
                      <div className="col-span-3 text-right">
                        <p className="text-lg font-semibold text-slate-900">US${reserva.precio.toFixed(2)}</p>
                        <p className="text-sm text-slate-600">Comisión: US${reserva.comision.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 whitespace-nowrap border-0">
                        Reserva Finalizada
                      </Badge>
                      <div className="flex items-center gap-3">
                        <Button 
                          onClick={(e) => handleGenerarFactura(e, reserva)}
                          className="bg-slate-700 hover:bg-slate-800 text-white"
                          size="sm"
                        >
                          <span className="material-symbols-outlined mr-2 text-base">receipt_long</span>
                          Generar Factura
                        </Button>
                        <Button className="bg-slate-700 hover:bg-slate-800 text-white">
                          Modificar
                        </Button>
                        <Button variant="outline">
                          Detalles
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
            </>
          )}
        </div>

        {/* Modal Nueva Reserva */}
        <Dialog open={isNewReservaModalOpen} onOpenChange={setIsNewReservaModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-slate-900">Nueva Reserva</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 py-6">
              {/* Reserva con Motor */}
              <button 
                className="flex flex-col items-center gap-4 p-6 bg-slate-700 border-2 border-slate-700 rounded-lg hover:bg-slate-800 hover:border-slate-800 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => {
                  window.open('https://azucartravel.com/?tripType=TRIP_PLANNER', '_blank', 'noopener,noreferrer');
                  setIsNewReservaModalOpen(false);
                }}
              >
                <span className="material-symbols-outlined text-white text-7xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
                  auto_awesome
                </span>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">Reserva con Motor</h3>
                  <p className="text-xs text-slate-400 mt-1">Buscar y reservar con nuestro motor de búsqueda</p>
                </div>
              </button>

              {/* Reservas Externas */}
              <button 
                className="flex flex-col items-center gap-4 p-6 bg-slate-700 border-2 border-slate-700 rounded-lg hover:bg-slate-800 hover:border-slate-800 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => {
                  router.push('/es/crm/reservas/nueva-manual');
                  setIsNewReservaModalOpen(false);
                }}
              >
                <span className="material-symbols-outlined text-white text-7xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
                  upload_file
                </span>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">Reservas externas</h3>
                  <p className="text-xs text-slate-400 mt-1">Sube tus reservas externas</p>
                </div>
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal Generar Factura */}
        <Dialog open={isFacturaModalOpen} onOpenChange={setIsFacturaModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-slate-900">Generar Factura</DialogTitle>
            </DialogHeader>
            {selectedReserva && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Localizador</label>
                    <Input value={selectedReserva.localizador} disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Fecha</label>
                    <Input value={selectedReserva.fechaCreacion} disabled />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Cliente</label>
                  <Input value={selectedReserva.nombre} disabled />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Destino</label>
                  <Input value={selectedReserva.destino} disabled />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Pasajeros</label>
                    <Input value={selectedReserva.pasajeros} disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Noches</label>
                    <Input value={selectedReserva.noches} disabled />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Monto Total</label>
                    <Input value={`US$ ${selectedReserva.precio.toFixed(2)}`} disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Comisión</label>
                    <Input value={`US$ ${selectedReserva.comision.toFixed(2)}`} disabled />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsFacturaModalOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={() => {
                      router.push('/es/crm/facturas/nueva');
                      setIsFacturaModalOpen(false);
                    }}
                    className="flex-1 bg-slate-700 hover:bg-slate-800"
                  >
                    Crear Factura
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        </div>
      </div>
    </TooltipProvider>
  );
}

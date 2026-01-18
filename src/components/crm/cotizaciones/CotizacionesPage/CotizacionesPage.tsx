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

interface Cotizacion {
  id: string;
  numeroCotizacion: string;
  fechaCreacion: string;
  fechaViaje: string;
  nombre: string;
  destino: string;
  pasajeros: number;
  ubicaciones: number;
  hoteles: number;
  noches: number;
  precio: number;
  estado: 'pendiente' | 'enviada' | 'aceptada' | 'rechazada';
  imagen?: string;
}

const cotizacionesMock: Cotizacion[] = [
  {
    id: '1',
    numeroCotizacion: 'COT-001',
    fechaCreacion: '10 ene 2026',
    fechaViaje: '15 feb 2026',
    nombre: 'Miguel Zabala',
    destino: 'Toscana, Italia',
    pasajeros: 2,
    ubicaciones: 1,
    hoteles: 1,
    noches: 5,
    precio: 476.00,
    estado: 'enviada',
    imagen: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    numeroCotizacion: 'COT-002',
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

export function CotizacionesPage() {
  const router = useRouter();
  const [filtros, setFiltros] = useState({
    buscar: 'todas',
    destino: '',
    numeroCotizacion: '',
    nombre: '',
    fechaDesde: undefined as Date | undefined,
    fechaHasta: undefined as Date | undefined
  });

  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>(cotizacionesMock);
  const [isNewCotizacionModalOpen, setIsNewCotizacionModalOpen] = useState(false);
  const [isFacturaModalOpen, setIsFacturaModalOpen] = useState(false);
  const [isPagoModalOpen, setIsPagoModalOpen] = useState(false);
  const [selectedCotizacion, setSelectedCotizacion] = useState<Cotizacion | null>(null);
  const [sortField, setSortField] = useState<'fechaCreacion' | 'fechaViaje' | null>('fechaCreacion');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  const handleLimpiar = () => {
    setFiltros({
      buscar: 'todas',
      destino: '',
      numeroCotizacion: '',
      nombre: '',
      fechaDesde: undefined,
      fechaHasta: undefined
    });
  };

  const handleBuscar = () => {
    console.log('Buscando con filtros:', filtros);
  };

  const handleGenerarFactura = (e: React.MouseEvent, cotizacion: Cotizacion) => {
    e.stopPropagation();
    setSelectedCotizacion(cotizacion);
    setIsFacturaModalOpen(true);
  };

  const handleRegistrarPago = (e: React.MouseEvent, cotizacion: Cotizacion) => {
    e.stopPropagation();
    setSelectedCotizacion(cotizacion);
    setIsPagoModalOpen(true);
  };

  const handleSort = (field: 'fechaCreacion' | 'fechaViaje') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }

    const sorted = [...cotizaciones].sort((a, b) => {
      const dateA = new Date(a[field]).getTime();
      const dateB = new Date(b[field]).getTime();
      
      if (sortField === field && sortOrder === 'asc') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    setCotizaciones(sorted);
  };

  const getEstadoBadge = (estado: string) => {
    const badges = {
      pendiente: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendiente' },
      enviada: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Enviada' },
      aceptada: { bg: 'bg-green-100', text: 'text-green-700', label: 'Aceptada' },
      rechazada: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rechazada' }
    };
    return badges[estado as keyof typeof badges] || badges.pendiente;
  };

  return (
    <TooltipProvider>
      <div className="cotizaciones-page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.1px', margin: 0 }}>Cotizaciones</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', paddingTop: '0px' }}>
            <Button 
              className="bg-slate-700 hover:bg-slate-800 text-white"
              onClick={() => setIsNewCotizacionModalOpen(true)}
              style={{ marginTop: 0 }}
            >
              <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>add</span>
              Nueva Cotización
            </Button>
          </div>
        </div>
        <div className="space-y-6">

        {/* Cards informativos superiores */}
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Cotizaciones</p>
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
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="pendientes">Pendientes</SelectItem>
                      <SelectItem value="enviadas">Enviadas</SelectItem>
                      <SelectItem value="aceptadas">Aceptadas</SelectItem>
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
                  <label className="text-sm font-medium text-slate-700 mb-2 block">N° Cotización:</label>
                  <Input 
                    placeholder="Ej: COT-001" 
                    value={filtros.numeroCotizacion}
                    onChange={(e) => setFiltros({...filtros, numeroCotizacion: e.target.value})}
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
              {cotizaciones.map((cotizacion) => {
                const estadoBadge = getEstadoBadge(cotizacion.estado);
                return (
                  <Card 
                    key={cotizacion.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => router.push(`/es/crm/cotizaciones/${cotizacion.id}`)}
                  >
                    {cotizacion.imagen && (
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <img 
                          src={cotizacion.imagen} 
                          alt={cotizacion.destino}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-lg font-semibold text-slate-900 mb-1">{cotizacion.numeroCotizacion}</div>
                          <Badge className={`${estadoBadge.bg} ${estadoBadge.text} border-0`}>
                            {estadoBadge.label}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div>
                          <p className="text-sm text-slate-500">Cliente</p>
                          <p className="text-base font-medium text-slate-900">{cotizacion.nombre}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Destino</p>
                          <p className="text-base text-slate-900">{cotizacion.destino}</p>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <div>
                            <p className="text-slate-500">Fecha viaje</p>
                            <p className="text-slate-900">{cotizacion.fechaViaje}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Pasajeros</p>
                            <p className="text-slate-900">{cotizacion.pasajeros}</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-slate-500">Precio</span>
                          <span className="text-xl font-semibold text-slate-900">US${cotizacion.precio.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={(e) => handleGenerarFactura(e, cotizacion)}
                            className="flex-1 bg-slate-700 hover:bg-slate-800 text-white"
                            size="sm"
                          >
                            <span className="material-symbols-outlined mr-2 text-base">receipt_long</span>
                            Generar Factura
                          </Button>
                          <Button 
                            onClick={(e) => handleRegistrarPago(e, cotizacion)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            size="sm"
                          >
                            <span className="material-symbols-outlined mr-2 text-base">payments</span>
                            Registrar Pago
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
        </div>

        {/* Modal Nueva Cotización */}
        <Dialog open={isNewCotizacionModalOpen} onOpenChange={setIsNewCotizacionModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-slate-900">Nueva Cotización</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 py-6">
              {/* Cotización con Motor */}
              <button 
                className="flex flex-col items-center gap-4 p-6 bg-slate-700 border-2 border-slate-700 rounded-lg hover:bg-slate-800 hover:border-slate-800 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => {
                  window.open('https://azucartravel.com/?tripType=TRIP_PLANNER', '_blank', 'noopener,noreferrer');
                  setIsNewCotizacionModalOpen(false);
                }}
              >
                <span className="material-symbols-outlined text-white text-7xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
                  auto_awesome
                </span>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">Cotización con Motor</h3>
                  <p className="text-xs text-slate-400 mt-1">Buscar y cotizar con nuestro motor de búsqueda</p>
                </div>
              </button>

              {/* Cotización Manual */}
              <button 
                className="flex flex-col items-center gap-4 p-6 bg-slate-700 border-2 border-slate-700 rounded-lg hover:bg-slate-800 hover:border-slate-800 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => {
                  router.push('/es/crm/cotizaciones/nueva-manual');
                  setIsNewCotizacionModalOpen(false);
                }}
              >
                <span className="material-symbols-outlined text-white text-7xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
                  edit_document
                </span>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">Cotización Manual</h3>
                  <p className="text-xs text-slate-400 mt-1">Crear una cotización de forma manual</p>
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
            {selectedCotizacion && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">N° Cotización</label>
                    <Input value={selectedCotizacion.numeroCotizacion} disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Fecha</label>
                    <Input value={selectedCotizacion.fechaCreacion} disabled />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Cliente</label>
                  <Input value={selectedCotizacion.nombre} disabled />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Destino</label>
                  <Input value={selectedCotizacion.destino} disabled />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Pasajeros</label>
                    <Input value={selectedCotizacion.pasajeros} disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Noches</label>
                    <Input value={selectedCotizacion.noches} disabled />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Monto Total</label>
                  <Input value={`US$ ${selectedCotizacion.precio.toFixed(2)}`} disabled />
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

        {/* Modal Registrar Pago */}
        <Dialog open={isPagoModalOpen} onOpenChange={setIsPagoModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-slate-900">Registrar Pago</DialogTitle>
            </DialogHeader>
            {selectedCotizacion && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">N° Cotización</label>
                    <Input value={selectedCotizacion.numeroCotizacion} disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Fecha</label>
                    <Input value={selectedCotizacion.fechaCreacion} disabled />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Cliente</label>
                  <Input value={selectedCotizacion.nombre} disabled />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Concepto</label>
                  <Input value={`Pago para ${selectedCotizacion.destino}`} disabled />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Monto Total</label>
                    <Input value={`US$ ${selectedCotizacion.precio.toFixed(2)}`} disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Monto a Pagar *</label>
                    <Input 
                      type="number" 
                      placeholder="Ingrese monto"
                      defaultValue={selectedCotizacion.precio.toFixed(2)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Método de Pago *</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="efectivo">Efectivo</SelectItem>
                      <SelectItem value="tarjeta">Tarjeta de Crédito/Débito</SelectItem>
                      <SelectItem value="transferencia">Transferencia Bancaria</SelectItem>
                      <SelectItem value="zelle">Zelle</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Notas (opcional)</label>
                  <Input placeholder="Notas adicionales sobre el pago" />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsPagoModalOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={() => {
                      router.push('/es/crm/pagos/nuevo');
                      setIsPagoModalOpen(false);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Registrar Pago
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

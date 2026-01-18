'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DatePicker } from '@/components/ui/date-picker';

interface Expediente {
  id: string;
  numeroExpediente: string;
  fechaCreacion: string;
  fechaViaje: string;
  nombre: string;
  destino: string;
  cotizaciones: number;
  reservas: number;
  pasajeros: number;
  precio: number;
  estado: 'activo' | 'cerrado' | 'cancelado' | 'pendiente';
  imagen?: string;
}

const expedientesMock: Expediente[] = [
  {
    id: '1',
    numeroExpediente: 'EXP-001',
    fechaCreacion: '10 ene 2026',
    fechaViaje: '15 feb 2026',
    nombre: 'Miguel Zabala',
    destino: 'Cancún, México',
    cotizaciones: 2,
    reservas: 1,
    pasajeros: 2,
    precio: 2500.00,
    estado: 'activo',
    imagen: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    numeroExpediente: 'EXP-002',
    fechaCreacion: '12 ene 2026',
    fechaViaje: '20 mar 2026',
    nombre: 'Arieldi Marrero',
    destino: 'Punta Cana, República Dominicana',
    cotizaciones: 1,
    reservas: 2,
    pasajeros: 4,
    precio: 4200.00,
    estado: 'activo',
    imagen: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
  }
];

export function ExpedientesPage() {
  const router = useRouter();
  const [filtros, setFiltros] = useState({
    buscar: 'todos',
    destino: '',
    numeroExpediente: '',
    nombre: '',
    fechaDesde: undefined as Date | undefined,
    fechaHasta: undefined as Date | undefined
  });

  const [expedientes, setExpedientes] = useState<Expediente[]>(expedientesMock);
  const [sortField, setSortField] = useState<'fechaCreacion' | 'fechaViaje' | null>('fechaCreacion');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const handleLimpiar = () => {
    setFiltros({
      buscar: 'todos',
      destino: '',
      numeroExpediente: '',
      nombre: '',
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

    const sorted = [...expedientes].sort((a, b) => {
      const dateA = new Date(a[field]).getTime();
      const dateB = new Date(b[field]).getTime();
      
      if (sortField === field && sortOrder === 'asc') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    setExpedientes(sorted);
  };

  const getEstadoBadge = (estado: string) => {
    const badges = {
      activo: { bg: 'bg-green-100', text: 'text-green-700', label: 'Activo' },
      cerrado: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Cerrado' },
      cancelado: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelado' },
      pendiente: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendiente' }
    };
    return badges[estado as keyof typeof badges] || badges.activo;
  };

  return (
    <TooltipProvider>
      <div className="expedientes-page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.1px', margin: 0 }}>Expedientes</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', paddingTop: '0px' }}>
            <Button 
              className="bg-slate-700 hover:bg-slate-800 text-white"
              onClick={() => router.push('/es/crm/expedientes/nuevo-manual')}
              style={{ marginTop: 0 }}
            >
              <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>add</span>
              Nuevo Expediente
            </Button>
          </div>
        </div>
        <div className="space-y-6">

        {/* Cards informativos superiores */}
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Expedientes</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">2</p>
            </div>
            <span className="material-symbols-outlined text-[#cbd5e1] text-[32px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>folder_open</span>
          </div>
          
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Cotizaciones</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">3</p>
            </div>
            <span className="material-symbols-outlined text-[#cbd5e1] text-[32px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>description</span>
          </div>
          
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Reservas</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">3</p>
            </div>
            <span className="material-symbols-outlined text-[#cbd5e1] text-[32px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>airplane_ticket</span>
          </div>
          
          <div className="flex items-center justify-between bg-[#f8fafc] rounded-lg px-[19px] py-[21px]">
            <div className="flex flex-col">
              <p className="text-base font-normal text-[#374151]">Valor Total</p>
              <p className="text-xl font-semibold text-[#374151] tracking-tight">$6,700</p>
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
                      <SelectItem value="activos">Activos</SelectItem>
                      <SelectItem value="cerrados">Cerrados</SelectItem>
                      <SelectItem value="cancelados">Cancelados</SelectItem>
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
                  <label className="text-sm font-medium text-slate-700 mb-2 block">N° Expediente:</label>
                  <Input 
                    placeholder="Ej: EXP-001" 
                    value={filtros.numeroExpediente}
                    onChange={(e) => setFiltros({...filtros, numeroExpediente: e.target.value})}
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


          {/* List View */}
          {viewMode === 'list' && (
            <>
              {/* Header de tabla */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 uppercase items-center">
            <div className="col-span-1">N° Expediente</div>
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
            <div className="col-span-2">Contenido</div>
            <div className="col-span-3 text-right">Valor total</div>
          </div>

          {/* Lista de expedientes */}
          <div className="space-y-4">
            {expedientes.map((expediente) => {
              const estadoBadge = getEstadoBadge(expediente.estado);
              
              return (
                <Card key={expediente.id} className="overflow-hidden">
                  <div className="flex">
                    {/* Imagen del destino */}
                    {expediente.imagen && (
                      <div className="flex-shrink-0">
                        <img 
                          src={expediente.imagen} 
                          alt={expediente.destino}
                          className="w-48 h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Contenido del expediente */}
                    <CardContent className="p-6 flex-1">
                      <div className="flex-1">
                        <div className="grid grid-cols-12 gap-4 items-start">
                          {/* N° Expediente */}
                          <div className="col-span-1">
                            <div className="text-lg font-semibold text-slate-700">{expediente.numeroExpediente}</div>
                          </div>

                      {/* Fecha de creación */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900">{expediente.fechaCreacion}</p>
                      </div>

                      {/* Fecha de viaje */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900">{expediente.fechaViaje}</p>
                      </div>

                      {/* Cliente */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900 font-medium">{expediente.nombre}</p>
                        <p className="text-xs text-slate-500">{expediente.destino}</p>
                      </div>

                      {/* Contenido */}
                      <div className="col-span-2">
                        <div className="flex flex-wrap gap-3">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 text-sm cursor-default">
                                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>description</span>
                                <span>{expediente.cotizaciones}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Cotizaciones</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 text-sm cursor-default">
                                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>airplane_ticket</span>
                                <span>{expediente.reservas}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Reservas</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 text-sm cursor-default">
                                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>person</span>
                                <span>{expediente.pasajeros}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Pasajeros</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>

                          {/* Precio */}
                          <div className="col-span-3 text-right">
                            <p className="text-lg font-semibold text-slate-900">US${expediente.precio.toFixed(2)}</p>
                          </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t">
                          <Badge className={`${estadoBadge.bg} ${estadoBadge.text} hover:${estadoBadge.bg} whitespace-nowrap border-0`}>
                            {estadoBadge.label}
                          </Badge>
                          <div className="flex items-center gap-3">
                            <Button className="bg-slate-700 hover:bg-slate-800 text-white">
                              Ver Detalles
                            </Button>
                            <Button variant="outline">
                              Gestionar
                            </Button>
                          </div>
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
        </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

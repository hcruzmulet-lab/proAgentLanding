'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TooltipProvider } from '@/components/ui/tooltip';

interface Comision {
  id: string;
  numeroComision: string;
  fechaGeneracion: string;
  fechaPago: string;
  cliente: string;
  numeroFactura: string;
  numeroReserva: string;
  concepto: string;
  montoVenta: number;
  porcentajeComision: number;
  montoComision: number;
  proveedor: string;
  estado: 'pagada' | 'pendiente' | 'aprobada' | 'rechazada';
}

const comisionesMock: Comision[] = [
  {
    id: '1',
    numeroComision: 'COM-001',
    fechaGeneracion: '30 dic 2025',
    fechaPago: '05 ene 2026',
    cliente: 'Arieldi Marrero',
    numeroFactura: 'FAC-001',
    numeroReserva: 'AZC-2',
    concepto: 'Comisión vuelo Cancún',
    montoVenta: 651.55,
    porcentajeComision: 12,
    montoComision: 78.19,
    proveedor: 'Air Europa',
    estado: 'pagada'
  },
  {
    id: '2',
    numeroComision: 'COM-002',
    fechaGeneracion: '26 dic 2025',
    fechaPago: 'Pendiente',
    cliente: 'Arieldi Marrero',
    numeroFactura: 'FAC-002',
    numeroReserva: 'AZC-1',
    concepto: 'Comisión renta de auto Punta Cana',
    montoVenta: 298.53,
    porcentajeComision: 15,
    montoComision: 44.78,
    proveedor: 'Enterprise Rent-A-Car',
    estado: 'aprobada'
  },
  {
    id: '3',
    numeroComision: 'COM-003',
    fechaGeneracion: '10 ene 2026',
    fechaPago: 'Pendiente',
    cliente: 'Miguel Zabala',
    numeroFactura: 'FAC-003',
    numeroReserva: 'COT-001',
    concepto: 'Comisión paquete completo Cancún',
    montoVenta: 1250.00,
    porcentajeComision: 10,
    montoComision: 125.00,
    proveedor: 'Iberostar Hotels',
    estado: 'aprobada'
  },
  {
    id: '4',
    numeroComision: 'COM-004',
    fechaGeneracion: '12 ene 2026',
    fechaPago: 'Pendiente',
    cliente: 'Miguel Zabala',
    numeroFactura: 'FAC-003',
    numeroReserva: 'COT-001',
    concepto: 'Comisión adicional servicios terrestres',
    montoVenta: 1250.00,
    porcentajeComision: 5,
    montoComision: 62.50,
    proveedor: 'Azúcar Travel',
    estado: 'pendiente'
  }
];

export function ComisionesPage() {
  const router = useRouter();
  const [comisiones] = useState<Comision[]>(comisionesMock);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [sortField, setSortField] = useState<'fechaGeneracion' | 'fechaPago' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: 'fechaGeneracion' | 'fechaPago') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Filtrar comisiones
  const comisionesFiltradas = comisiones.filter(comision => {
    const matchEstado = filtroEstado === 'todos' || comision.estado === filtroEstado;
    const matchBusqueda = 
      comision.numeroComision.toLowerCase().includes(busqueda.toLowerCase()) ||
      comision.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      comision.numeroFactura.toLowerCase().includes(busqueda.toLowerCase()) ||
      comision.numeroReserva.toLowerCase().includes(busqueda.toLowerCase()) ||
      comision.proveedor.toLowerCase().includes(busqueda.toLowerCase());
    
    return matchEstado && matchBusqueda;
  });

  // Ordenar comisiones
  const comisionesOrdenadas = [...comisionesFiltradas].sort((a, b) => {
    if (!sortField) return 0;
    
    const dateA = new Date(a[sortField]).getTime();
    const dateB = new Date(b[sortField]).getTime();
    
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const getEstadoBadge = (estado: Comision['estado']) => {
    switch (estado) {
      case 'pagada':
        return { bg: 'bg-green-100', text: 'text-green-700', label: 'Pagada' };
      case 'aprobada':
        return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Aprobada' };
      case 'pendiente':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendiente' };
      case 'rechazada':
        return { bg: 'bg-red-100', text: 'text-red-700', label: 'Rechazada' };
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Desconocido' };
    }
  };

  // Calcular totales
  const totalComisiones = comisiones.length;
  const totalGenerado = comisiones.reduce((sum, c) => sum + c.montoComision, 0);
  const totalPagado = comisiones
    .filter(c => c.estado === 'pagada')
    .reduce((sum, c) => sum + c.montoComision, 0);
  const totalPendiente = comisiones
    .filter(c => c.estado === 'pendiente' || c.estado === 'aprobada')
    .reduce((sum, c) => sum + c.montoComision, 0);

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Comisiones</h1>
            <p className="text-slate-600 mt-1">Gestiona y realiza seguimiento de todas tus comisiones generadas</p>
          </div>
          <Button className="bg-slate-700 hover:bg-slate-800 text-white">
            <span className="material-symbols-outlined mr-2 text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
              download
            </span>
            Exportar Reporte
          </Button>
        </div>

        {/* Cards informativos */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Comisiones</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{totalComisiones}</p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-400 text-2xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                    receipt_long
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Generado</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">US${totalGenerado.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-purple-600 text-2xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                    trending_up
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Comisiones Pagadas</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">US${totalPagado.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-600 text-2xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                    check_circle
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Comisiones Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600 mt-1">US${totalPendiente.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-yellow-600 text-2xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                    schedule
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por N° comisión, cliente, factura, reserva o proveedor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={filtroEstado} onValueChange={setFiltroEstado}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="pagada">Pagada</SelectItem>
              <SelectItem value="aprobada">Aprobada</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="rechazada">Rechazada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Listado de comisiones */}
        <div className="space-y-4">
          {/* Header de tabla */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 uppercase items-center">
            <div className="col-span-1">N° Comisión</div>
            <div 
              className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors"
              onClick={() => handleSort('fechaGeneracion')}
            >
              Fecha Generación
              {sortField === 'fechaGeneracion' && (
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}>
                  {sortOrder === 'desc' ? 'expand_more' : 'expand_less'}
                </span>
              )}
            </div>
            <div className="col-span-2">Cliente/Reserva</div>
            <div className="col-span-2">Proveedor</div>
            <div className="col-span-2">Monto Venta</div>
            <div className="col-span-3 text-right">Comisión</div>
          </div>

          {/* Lista de comisiones */}
          <div className="space-y-4">
            {comisionesOrdenadas.map((comision) => {
              const estadoBadge = getEstadoBadge(comision.estado);
              
              return (
                <Card key={comision.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-12 gap-4 items-start">
                      {/* N° Comisión */}
                      <div className="col-span-1">
                        <div className="text-lg font-semibold text-slate-700">{comision.numeroComision}</div>
                      </div>

                      {/* Fecha generación */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900">{comision.fechaGeneracion}</p>
                        <p className="text-xs text-slate-500">
                          Pago: {comision.fechaPago}
                        </p>
                      </div>

                      {/* Cliente/Reserva */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900 font-medium">{comision.cliente}</p>
                        <p className="text-xs text-slate-500">{comision.numeroFactura} / {comision.numeroReserva}</p>
                        <p className="text-xs text-slate-500">{comision.concepto}</p>
                      </div>

                      {/* Proveedor */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-slate-600 text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                            business
                          </span>
                          <p className="text-sm text-slate-900">{comision.proveedor}</p>
                        </div>
                      </div>

                      {/* Monto Venta */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900 font-medium">US${comision.montoVenta.toFixed(2)}</p>
                      </div>

                      {/* Comisión */}
                      <div className="col-span-3 text-right">
                        <p className="text-lg font-semibold text-slate-900">US${comision.montoComision.toFixed(2)}</p>
                        <p className="text-xs text-slate-500">{comision.porcentajeComision}% de comisión</p>
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
                        {comision.estado === 'pagada' && (
                          <Button variant="outline">
                            Comprobante
                          </Button>
                        )}
                        {comision.estado === 'aprobada' && (
                          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                            Solicitar Pago
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TooltipProvider } from '@/components/ui/tooltip';

interface Factura {
  id: string;
  numeroFactura: string;
  fechaEmision: string;
  fechaVencimiento: string;
  cliente: string;
  numeroReserva: string;
  concepto: string;
  subtotal: number;
  impuestos: number;
  total: number;
  estado: 'pagada' | 'pendiente' | 'vencida' | 'cancelada';
}

const facturasMock: Factura[] = [
  {
    id: '1',
    numeroFactura: 'FAC-001',
    fechaEmision: '30 dic 2025',
    fechaVencimiento: '15 ene 2026',
    cliente: 'Arieldi Marrero',
    numeroReserva: 'AZC-2',
    concepto: 'Reserva de vuelo Cancún',
    subtotal: 600.00,
    impuestos: 51.55,
    total: 651.55,
    estado: 'pagada'
  },
  {
    id: '2',
    numeroFactura: 'FAC-002',
    fechaEmision: '26 dic 2025',
    fechaVencimiento: '10 ene 2026',
    cliente: 'Arieldi Marrero',
    numeroReserva: 'AZC-1',
    concepto: 'Reserva de auto Punta Cana',
    subtotal: 275.00,
    impuestos: 23.53,
    total: 298.53,
    estado: 'pendiente'
  },
  {
    id: '3',
    numeroFactura: 'FAC-003',
    fechaEmision: '10 ene 2026',
    fechaVencimiento: '25 ene 2026',
    cliente: 'Miguel Zabala',
    numeroReserva: 'COT-001',
    concepto: 'Cotización Cancún - Paquete completo',
    subtotal: 1150.00,
    impuestos: 100.00,
    total: 1250.00,
    estado: 'pendiente'
  }
];

export function FacturasPage() {
  const router = useRouter();
  const [facturas] = useState<Factura[]>(facturasMock);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [sortField, setSortField] = useState<'fechaEmision' | 'fechaVencimiento' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: 'fechaEmision' | 'fechaVencimiento') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Filtrar facturas
  const facturasFiltradas = facturas.filter(factura => {
    const matchEstado = filtroEstado === 'todos' || factura.estado === filtroEstado;
    const matchBusqueda = 
      factura.numeroFactura.toLowerCase().includes(busqueda.toLowerCase()) ||
      factura.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      factura.numeroReserva.toLowerCase().includes(busqueda.toLowerCase());
    
    return matchEstado && matchBusqueda;
  });

  // Ordenar facturas
  const facturasOrdenadas = [...facturasFiltradas].sort((a, b) => {
    if (!sortField) return 0;
    
    const dateA = new Date(a[sortField]).getTime();
    const dateB = new Date(b[sortField]).getTime();
    
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const getEstadoBadge = (estado: Factura['estado']) => {
    switch (estado) {
      case 'pagada':
        return { bg: 'bg-green-100', text: 'text-green-700', label: 'Pagada' };
      case 'pendiente':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendiente' };
      case 'vencida':
        return { bg: 'bg-red-100', text: 'text-red-700', label: 'Vencida' };
      case 'cancelada':
        return { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Cancelada' };
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Desconocido' };
    }
  };

  // Calcular totales
  const totalFacturas = facturas.length;
  const totalPagado = facturas
    .filter(f => f.estado === 'pagada')
    .reduce((sum, f) => sum + f.total, 0);
  const totalPendiente = facturas
    .filter(f => f.estado === 'pendiente')
    .reduce((sum, f) => sum + f.total, 0);
  const totalVencido = facturas
    .filter(f => f.estado === 'vencida')
    .reduce((sum, f) => sum + f.total, 0);

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Facturas</h1>
            <p className="text-slate-600 mt-1">Gestiona todas las facturas emitidas a tus clientes</p>
          </div>
          <Button className="bg-slate-700 hover:bg-slate-800 text-white">
            <span className="material-symbols-outlined mr-2 text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
              add
            </span>
            Nueva Factura
          </Button>
        </div>

        {/* Cards informativos */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Facturas</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{totalFacturas}</p>
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
                  <p className="text-sm font-medium text-slate-600">Total Pagado</p>
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
                  <p className="text-sm font-medium text-slate-600">Total Pendiente</p>
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

          <Card className="bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Vencido</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">US${totalVencido.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-red-600 text-2xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                    warning
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
              placeholder="Buscar por N° factura, cliente o reserva..."
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
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="vencida">Vencida</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Listado de facturas */}
        <div className="space-y-4">
          {/* Header de tabla */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 uppercase items-center">
            <div className="col-span-1">N° Factura</div>
            <div 
              className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors"
              onClick={() => handleSort('fechaEmision')}
            >
              Fecha Emisión
              {sortField === 'fechaEmision' && (
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}>
                  {sortOrder === 'desc' ? 'expand_more' : 'expand_less'}
                </span>
              )}
            </div>
            <div 
              className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors"
              onClick={() => handleSort('fechaVencimiento')}
            >
              Fecha Vencimiento
              {sortField === 'fechaVencimiento' && (
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}>
                  {sortOrder === 'desc' ? 'expand_more' : 'expand_less'}
                </span>
              )}
            </div>
            <div className="col-span-2">Cliente</div>
            <div className="col-span-2">Reserva</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          {/* Lista de facturas */}
          <div className="space-y-4">
            {facturasOrdenadas.map((factura) => {
              const estadoBadge = getEstadoBadge(factura.estado);
              
              return (
                <Card key={factura.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-12 gap-4 items-start">
                      {/* N° Factura */}
                      <div className="col-span-1">
                        <div className="text-lg font-semibold text-slate-700">{factura.numeroFactura}</div>
                      </div>

                      {/* Fecha emisión */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900">{factura.fechaEmision}</p>
                      </div>

                      {/* Fecha vencimiento */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900">{factura.fechaVencimiento}</p>
                      </div>

                      {/* Cliente */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900 font-medium">{factura.cliente}</p>
                        <p className="text-xs text-slate-500">{factura.concepto}</p>
                      </div>

                      {/* Reserva */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-700 font-medium">{factura.numeroReserva}</p>
                      </div>

                      {/* Total */}
                      <div className="col-span-3 text-right">
                        <p className="text-lg font-semibold text-slate-900">US${factura.total.toFixed(2)}</p>
                        <p className="text-xs text-slate-500">Subtotal: US${factura.subtotal.toFixed(2)}</p>
                        <p className="text-xs text-slate-500">Impuestos: US${factura.impuestos.toFixed(2)}</p>
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
                          Descargar PDF
                        </Button>
                        {factura.estado === 'pendiente' && (
                          <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                            Marcar como Pagada
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

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TooltipProvider } from '@/components/ui/tooltip';

interface Pago {
  id: string;
  numeroPago: string;
  fechaPago: string;
  cliente: string;
  numeroFactura: string;
  numeroReserva: string;
  concepto: string;
  montoPagado: number;
  montoFactura: number;
  metodoPago: 'tarjeta' | 'transferencia' | 'efectivo' | 'paypal' | 'otro';
  referencia: string;
  estado: 'completado' | 'pendiente' | 'rechazado' | 'reembolsado';
}

const pagosMock: Pago[] = [
  {
    id: '1',
    numeroPago: 'PAG-001',
    fechaPago: '30 dic 2025',
    cliente: 'Arieldi Marrero',
    numeroFactura: 'FAC-001',
    numeroReserva: 'AZC-2',
    concepto: 'Pago completo reserva de vuelo Cancún',
    montoPagado: 651.55,
    montoFactura: 651.55,
    metodoPago: 'tarjeta',
    referencia: 'TXN-45789632',
    estado: 'completado'
  },
  {
    id: '2',
    numeroPago: 'PAG-002',
    fechaPago: '28 dic 2025',
    cliente: 'Arieldi Marrero',
    numeroFactura: 'FAC-002',
    numeroReserva: 'AZC-1',
    concepto: 'Anticipo 50% reserva auto Punta Cana',
    montoPagado: 149.27,
    montoFactura: 298.53,
    metodoPago: 'transferencia',
    referencia: 'TRANS-789456',
    estado: 'completado'
  },
  {
    id: '3',
    numeroPago: 'PAG-003',
    fechaPago: 'Pendiente',
    cliente: 'Arieldi Marrero',
    numeroFactura: 'FAC-002',
    numeroReserva: 'AZC-1',
    concepto: 'Saldo pendiente 50% reserva auto',
    montoPagado: 0,
    montoFactura: 149.26,
    metodoPago: 'tarjeta',
    referencia: '-',
    estado: 'pendiente'
  },
  {
    id: '4',
    numeroPago: 'PAG-004',
    fechaPago: '11 ene 2026',
    cliente: 'Miguel Zabala',
    numeroFactura: 'FAC-003',
    numeroReserva: 'COT-001',
    concepto: 'Anticipo 40% cotización Cancún',
    montoPagado: 500.00,
    montoFactura: 1250.00,
    metodoPago: 'paypal',
    referencia: 'PP-4X8Y9Z1A',
    estado: 'completado'
  },
  {
    id: '5',
    numeroPago: 'PAG-005',
    fechaPago: 'Pendiente',
    cliente: 'Miguel Zabala',
    numeroFactura: 'FAC-003',
    numeroReserva: 'COT-001',
    concepto: 'Saldo pendiente 60% cotización Cancún',
    montoPagado: 0,
    montoFactura: 750.00,
    metodoPago: 'transferencia',
    referencia: '-',
    estado: 'pendiente'
  }
];

export function PagosPage() {
  const router = useRouter();
  const [pagos] = useState<Pago[]>(pagosMock);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [sortField, setSortField] = useState<'fechaPago' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: 'fechaPago') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Filtrar pagos
  const pagosFiltrados = pagos.filter(pago => {
    const matchEstado = filtroEstado === 'todos' || pago.estado === filtroEstado;
    const matchBusqueda = 
      pago.numeroPago.toLowerCase().includes(busqueda.toLowerCase()) ||
      pago.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      pago.numeroFactura.toLowerCase().includes(busqueda.toLowerCase()) ||
      pago.numeroReserva.toLowerCase().includes(busqueda.toLowerCase());
    
    return matchEstado && matchBusqueda;
  });

  // Ordenar pagos
  const pagosOrdenados = [...pagosFiltrados].sort((a, b) => {
    if (!sortField) return 0;
    
    // Para pagos pendientes, los ponemos al final si ordenamos por fecha
    if (a.estado === 'pendiente' && b.estado !== 'pendiente') return 1;
    if (a.estado !== 'pendiente' && b.estado === 'pendiente') return -1;
    
    const dateA = new Date(a.fechaPago).getTime();
    const dateB = new Date(b.fechaPago).getTime();
    
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const getEstadoBadge = (estado: Pago['estado']) => {
    switch (estado) {
      case 'completado':
        return { bg: 'bg-green-100', text: 'text-green-700', label: 'Completado' };
      case 'pendiente':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendiente' };
      case 'rechazado':
        return { bg: 'bg-red-100', text: 'text-red-700', label: 'Rechazado' };
      case 'reembolsado':
        return { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Reembolsado' };
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Desconocido' };
    }
  };

  const getMetodoPagoLabel = (metodo: Pago['metodoPago']) => {
    switch (metodo) {
      case 'tarjeta':
        return 'Tarjeta de Crédito';
      case 'transferencia':
        return 'Transferencia Bancaria';
      case 'efectivo':
        return 'Efectivo';
      case 'paypal':
        return 'PayPal';
      case 'otro':
        return 'Otro';
      default:
        return metodo;
    }
  };

  const getMetodoPagoIcon = (metodo: Pago['metodoPago']) => {
    switch (metodo) {
      case 'tarjeta':
        return 'credit_card';
      case 'transferencia':
        return 'account_balance';
      case 'efectivo':
        return 'payments';
      case 'paypal':
        return 'account_balance_wallet';
      case 'otro':
        return 'more_horiz';
      default:
        return 'payment';
    }
  };

  // Calcular totales
  const totalPagos = pagos.length;
  const totalRecibido = pagos
    .filter(p => p.estado === 'completado')
    .reduce((sum, p) => sum + p.montoPagado, 0);
  const totalPendiente = pagos
    .filter(p => p.estado === 'pendiente')
    .reduce((sum, p) => sum + p.montoFactura, 0);
  const pagosCompletados = pagos.filter(p => p.estado === 'completado').length;

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Pagos</h1>
            <p className="text-slate-600 mt-1">Gestiona todos los pagos recibidos de tus clientes</p>
          </div>
          <Button className="bg-slate-700 hover:bg-slate-800 text-white">
            <span className="material-symbols-outlined mr-2 text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
              add
            </span>
            Registrar Pago
          </Button>
        </div>

        {/* Cards informativos */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Pagos</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{totalPagos}</p>
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
                  <p className="text-sm font-medium text-slate-600">Total Recibido</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">US${totalRecibido.toFixed(2)}</p>
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
                  <p className="text-sm font-medium text-slate-600">Pagos Completados</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{pagosCompletados}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-600 text-2xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                    payments
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
              placeholder="Buscar por N° pago, cliente, factura o reserva..."
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
              <SelectItem value="completado">Completado</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="rechazado">Rechazado</SelectItem>
              <SelectItem value="reembolsado">Reembolsado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Listado de pagos */}
        <div className="space-y-4">
          {/* Header de tabla */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 uppercase items-center">
            <div className="col-span-1">N° Pago</div>
            <div 
              className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors"
              onClick={() => handleSort('fechaPago')}
            >
              Fecha
              {sortField === 'fechaPago' && (
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}>
                  {sortOrder === 'desc' ? 'expand_more' : 'expand_less'}
                </span>
              )}
            </div>
            <div className="col-span-2">Cliente</div>
            <div className="col-span-2">Factura/Reserva</div>
            <div className="col-span-2">Método de Pago</div>
            <div className="col-span-3 text-right">Monto</div>
          </div>

          {/* Lista de pagos */}
          <div className="space-y-4">
            {pagosOrdenados.map((pago) => {
              const estadoBadge = getEstadoBadge(pago.estado);
              const progresoPago = (pago.montoPagado / pago.montoFactura) * 100;
              
              return (
                <Card key={pago.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-12 gap-4 items-start">
                      {/* N° Pago */}
                      <div className="col-span-1">
                        <div className="text-lg font-semibold text-slate-700">{pago.numeroPago}</div>
                      </div>

                      {/* Fecha */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900">{pago.fechaPago}</p>
                      </div>

                      {/* Cliente */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-900 font-medium">{pago.cliente}</p>
                        <p className="text-xs text-slate-500">{pago.concepto}</p>
                      </div>

                      {/* Factura/Reserva */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-700 font-medium">{pago.numeroFactura}</p>
                        <p className="text-xs text-slate-500">Reserva: {pago.numeroReserva}</p>
                      </div>

                      {/* Método de Pago */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-slate-600 text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                            {getMetodoPagoIcon(pago.metodoPago)}
                          </span>
                          <div>
                            <p className="text-sm text-slate-900">{getMetodoPagoLabel(pago.metodoPago)}</p>
                            <p className="text-xs text-slate-500">{pago.referencia}</p>
                          </div>
                        </div>
                      </div>

                      {/* Monto */}
                      <div className="col-span-3 text-right">
                        {pago.estado === 'completado' ? (
                          <>
                            <p className="text-lg font-semibold text-green-600">US${pago.montoPagado.toFixed(2)}</p>
                            <p className="text-xs text-slate-500">de US${pago.montoFactura.toFixed(2)}</p>
                          </>
                        ) : (
                          <>
                            <p className="text-lg font-semibold text-slate-900">US${pago.montoFactura.toFixed(2)}</p>
                            <p className="text-xs text-yellow-600">Pendiente de pago</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Barra de progreso para pagos parciales */}
                    {pago.montoPagado > 0 && pago.montoPagado < pago.montoFactura && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                          <span>Progreso de pago</span>
                          <span>{progresoPago.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all"
                            style={{ width: `${progresoPago}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Botones de acción */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t">
                      <Badge className={`${estadoBadge.bg} ${estadoBadge.text} hover:${estadoBadge.bg} whitespace-nowrap border-0`}>
                        {estadoBadge.label}
                      </Badge>
                      <div className="flex items-center gap-3">
                        <Button className="bg-slate-700 hover:bg-slate-800 text-white">
                          Ver Detalles
                        </Button>
                        {pago.estado === 'completado' && (
                          <Button variant="outline">
                            Comprobante
                          </Button>
                        )}
                        {pago.estado === 'pendiente' && (
                          <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                            Registrar Pago
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

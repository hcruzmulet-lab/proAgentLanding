'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';

interface Cliente {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

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
  const [pagos, setPagos] = useState<Pago[]>(pagosMock);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [sortField, setSortField] = useState<'fechaPago' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isNewPagoModalOpen, setIsNewPagoModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPago, setSelectedPago] = useState<Pago | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [buscarCliente, setBuscarCliente] = useState('');
  const [mostrarSugerenciasCliente, setMostrarSugerenciasCliente] = useState(false);
  const [newPago, setNewPago] = useState({
    cliente: '',
    numeroFactura: '',
    numeroReserva: '',
    concepto: '',
    montoPagado: '',
    montoFactura: '',
    metodoPago: 'tarjeta' as 'tarjeta' | 'transferencia' | 'efectivo' | 'paypal' | 'otro',
    referencia: '',
    fechaPago: '',
    estado: 'completado' as 'completado' | 'pendiente' | 'rechazado' | 'reembolsado'
  });

  // Cargar clientes desde localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm_clients');
      if (stored) {
        const clientesData = JSON.parse(stored);
        setClientes(clientesData);
      }
    }
  }, []);

  // Filtrar clientes para búsqueda
  const getClientesFiltrados = () => {
    if (buscarCliente.length < 2) return [];
    return clientes.filter(cliente => {
      const nombreCompleto = `${cliente.firstName} ${cliente.lastName}`.toLowerCase();
      const email = (cliente.email || '').toLowerCase();
      return nombreCompleto.includes(buscarCliente.toLowerCase()) || 
             email.includes(buscarCliente.toLowerCase());
    });
  };

  // Seleccionar un cliente
  const handleSeleccionarCliente = (cliente: Cliente) => {
    const nombreCompleto = `${cliente.firstName} ${cliente.lastName}`;
    setNewPago({
      ...newPago,
      cliente: nombreCompleto,
    });
    setBuscarCliente(nombreCompleto);
    setMostrarSugerenciasCliente(false);
  };

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

  const handleNewPago = () => {
    const numeroPago = `PAG-${String(pagos.length + 1).padStart(3, '0')}`;
    const nuevoPago: Pago = {
      id: String(pagos.length + 1),
      numeroPago,
      fechaPago: newPago.fechaPago || new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      cliente: newPago.cliente,
      numeroFactura: newPago.numeroFactura,
      numeroReserva: newPago.numeroReserva,
      concepto: newPago.concepto,
      montoPagado: parseFloat(newPago.montoPagado) || 0,
      montoFactura: parseFloat(newPago.montoFactura) || 0,
      metodoPago: newPago.metodoPago,
      referencia: newPago.referencia,
      estado: newPago.estado
    };
    setPagos([...pagos, nuevoPago]);
    setNewPago({
      cliente: '',
      numeroFactura: '',
      numeroReserva: '',
      concepto: '',
      montoPagado: '',
      montoFactura: '',
      metodoPago: 'tarjeta',
      referencia: '',
      fechaPago: '',
      estado: 'completado'
    });
    setIsNewPagoModalOpen(false);
  };

  const handleVerDetalles = (pago: Pago) => {
    setSelectedPago(pago);
    setIsDetailModalOpen(true);
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
      <div className="pagos-page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.1px', margin: 0 }}>Pagos</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', paddingTop: '0px' }}>
            <Button 
              className="bg-slate-700 hover:bg-slate-800 text-white"
              onClick={() => setIsNewPagoModalOpen(true)}
              style={{ marginTop: 0 }}
            >
              <span className="material-symbols-outlined mr-2 text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                add
              </span>
              Registrar Pago
            </Button>
          </div>
        </div>
        <div className="p-6 space-y-6">

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
                        <Button 
                          className="bg-slate-700 hover:bg-slate-800 text-white"
                          onClick={() => handleVerDetalles(pago)}
                        >
                          Ver Detalles
                        </Button>
                        {pago.estado === 'completado' && (
                          <Button variant="outline">
                            Descargar PDF
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

        {/* Modal Registrar Pago */}
        <Dialog open={isNewPagoModalOpen} onOpenChange={setIsNewPagoModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-slate-900">Registrar Nuevo Pago</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cliente">Cliente</Label>
                  <div className="relative">
                    <Input
                      id="cliente"
                      value={buscarCliente}
                      onChange={(e) => {
                        setBuscarCliente(e.target.value);
                        setMostrarSugerenciasCliente(e.target.value.length >= 2);
                        setNewPago({...newPago, cliente: e.target.value});
                      }}
                      onFocus={() => buscarCliente.length >= 2 && setMostrarSugerenciasCliente(true)}
                      placeholder="Buscar cliente por nombre o email"
                    />
                    {mostrarSugerenciasCliente && getClientesFiltrados().length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {getClientesFiltrados().map((cliente) => (
                          <div
                            key={cliente.id}
                            onClick={() => handleSeleccionarCliente(cliente)}
                            className="px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                          >
                            <div className="font-medium text-slate-900">
                              {cliente.firstName} {cliente.lastName}
                            </div>
                            {cliente.email && (
                              <div className="text-sm text-slate-500 mt-1">
                                {cliente.email}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="numeroFactura">N° Factura</Label>
                  <Input
                    id="numeroFactura"
                    value={newPago.numeroFactura}
                    onChange={(e) => setNewPago({...newPago, numeroFactura: e.target.value})}
                    placeholder="Ej: FAC-001"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numeroReserva">N° Reserva</Label>
                  <Input
                    id="numeroReserva"
                    value={newPago.numeroReserva}
                    onChange={(e) => setNewPago({...newPago, numeroReserva: e.target.value})}
                    placeholder="Ej: AZC-1"
                  />
                </div>
                <div>
                  <Label htmlFor="fechaPago">Fecha de Pago</Label>
                  <DatePicker
                    date={newPago.fechaPago ? new Date(newPago.fechaPago) : undefined}
                    onSelect={(date) => setNewPago({...newPago, fechaPago: date ? date.toISOString().split('T')[0] : ''})}
                    placeholder="Seleccionar fecha de pago"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="concepto">Concepto</Label>
                <Input
                  id="concepto"
                  value={newPago.concepto}
                  onChange={(e) => setNewPago({...newPago, concepto: e.target.value})}
                  placeholder="Descripción del pago"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="montoFactura">Monto Factura (US$)</Label>
                  <Input
                    id="montoFactura"
                    type="number"
                    step="0.01"
                    value={newPago.montoFactura}
                    onChange={(e) => setNewPago({...newPago, montoFactura: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="montoPagado">Monto Pagado (US$)</Label>
                  <Input
                    id="montoPagado"
                    type="number"
                    step="0.01"
                    value={newPago.montoPagado}
                    onChange={(e) => setNewPago({...newPago, montoPagado: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="metodoPago">Método de Pago</Label>
                  <Select value={newPago.metodoPago} onValueChange={(value: any) => setNewPago({...newPago, metodoPago: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tarjeta">Tarjeta de Crédito</SelectItem>
                      <SelectItem value="transferencia">Transferencia Bancaria</SelectItem>
                      <SelectItem value="efectivo">Efectivo</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="referencia">Referencia</Label>
                  <Input
                    id="referencia"
                    value={newPago.referencia}
                    onChange={(e) => setNewPago({...newPago, referencia: e.target.value})}
                    placeholder="N° de transacción"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Select value={newPago.estado} onValueChange={(value: any) => setNewPago({...newPago, estado: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completado">Completado</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="rechazado">Rechazado</SelectItem>
                    <SelectItem value="reembolsado">Reembolsado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsNewPagoModalOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-slate-700 hover:bg-slate-800 text-white" onClick={handleNewPago}>
                  Registrar Pago
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal Detalles Pago */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-slate-900">
                Detalles de Pago - {selectedPago?.numeroPago}
              </DialogTitle>
            </DialogHeader>
            {selectedPago && (
              <div className="space-y-6 py-4">
                {/* Header con Logo */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <svg width="180" height="36" viewBox="0 0 472 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_267_2_pago)">
                        <path d="M0 35.9431C0 16.1295 16.1201 0 35.9221 0C55.7242 0 71.8442 16.1295 71.8442 35.9431C71.8442 55.7567 55.7242 71.8862 35.9221 71.8862H0V35.9431ZM13.9233 35.9431V57.9547H35.9221C48.0509 57.9547 57.9209 48.0789 57.9209 35.9431C57.9209 23.8073 48.0509 13.9314 35.9221 13.9314C23.7934 13.9314 13.9233 23.8073 13.9233 35.9431Z" fill="#FFA300"/>
                        <path d="M13.9233 78.9756H0V92.9844H13.9233V78.9756Z" fill="#FFA300"/>
                        <path d="M124.815 41.8911C124.815 34.2134 129.332 30.5293 136.015 30.5293C142.698 30.5293 147.169 34.2134 147.169 41.9531V42.2162H142.219V41.9066C142.219 37.1235 139.697 35.1731 136.015 35.1731C132.333 35.1731 129.812 37.1235 129.812 41.9066V57.2157H124.815V41.9066V41.8911Z" fill="#1B2340"/>
                        <path d="M150.031 44.2131C150.031 36.3186 155.817 30.5293 164.016 30.5293C172.216 30.5293 178.002 36.3186 178.002 44.2131C178.002 52.1075 172.216 57.8968 164.016 57.8968C155.817 57.8968 150.031 52.1075 150.031 44.2131ZM172.974 44.2131C172.974 38.9501 169.4 35.1576 164.032 35.1576C158.664 35.1576 155.09 38.9501 155.09 44.2131C155.09 49.476 158.664 53.2685 164.032 53.2685C169.4 53.2685 172.974 49.476 172.974 44.2131Z" fill="#1B2340"/>
                        <path d="M213.707 61.0547H215.13C216.925 65.745 221.38 67.7418 226.656 67.7418C233.71 67.7418 239.017 64.0577 239.017 55.1107V50.0644C236.866 55.0642 232.225 57.9124 226.393 57.9124C218.24 57.9124 212.454 52.1231 212.454 44.2287C212.454 36.3342 218.24 30.5449 226.439 30.5449C234.639 30.5449 240.378 36.2258 240.378 44.337V55.0178C240.378 65.0639 234.437 69.0111 226.594 69.0111C220.545 69.0111 215.656 66.5964 213.707 61.0702V61.0547ZM239.017 44.2132C239.017 37.1082 233.973 31.7988 226.439 31.7988C218.905 31.7988 213.877 37.1082 213.877 44.2132C213.877 51.3182 218.921 56.6276 226.439 56.6276C233.958 56.6276 239.017 51.3182 239.017 44.2132Z" fill="#1B2340"/>
                        <path d="M244.973 44.2131C244.973 36.3186 250.759 30.5293 258.958 30.5293C267.157 30.5293 272.897 36.3186 272.897 44.2131V44.3214H246.396C246.442 51.38 251.439 56.643 258.958 56.643C264.264 56.643 268.364 54.0115 270.313 49.9095H271.783C269.787 54.7545 265.053 57.9123 258.958 57.9123C250.759 57.9123 244.973 52.123 244.973 44.2285V44.2131ZM271.489 43.0521C270.963 36.5198 266.074 31.7831 258.973 31.7831C251.872 31.7831 246.922 36.5198 246.411 43.0521H271.504H271.489Z" fill="#1B2340"/>
                        <path d="M277.507 43.5784C277.507 35.0028 282.658 30.5293 290.332 30.5293C298.005 30.5293 303.157 35.0028 303.157 43.5784V57.2002H301.795V43.5784C301.795 36.0554 297.278 31.7831 290.332 31.7831C283.386 31.7831 278.868 36.04 278.868 43.5784V57.2002H277.507V43.5784Z" fill="#1B2340"/>
                        <path d="M308.819 47.9434V22H310.18V31.2102H327.012V32.4176H310.18V47.9434C310.18 53.6862 313.491 56.6273 318.643 56.6273C323.794 56.6273 327.167 53.7791 327.167 47.9434V47.5255H328.435V47.9434C328.435 54.5221 324.49 57.8966 318.658 57.8966C312.826 57.8966 308.819 54.5221 308.819 47.9434Z" fill="#1B2340"/>
                        <path d="M194.926 32.7579C201.238 32.7579 206.374 37.897 206.374 44.2126V55.6674H194.926C188.614 55.6674 183.478 50.5282 183.478 44.2126C183.478 37.897 188.614 32.7579 194.926 32.7579ZM194.926 31.21C187.748 31.21 181.931 37.0302 181.931 44.2126C181.931 51.395 187.748 57.2153 194.926 57.2153H207.921V44.2126C207.921 37.0302 202.104 31.21 194.926 31.21Z" fill="#1B2340"/>
                        <path d="M99.3349 63.5158H94.6938V44.244C94.6938 37.0151 100.573 31.1484 107.782 31.1484C114.991 31.1484 120.87 37.0306 120.87 44.244C120.87 51.4574 114.991 57.3395 107.782 57.3395H99.3349V63.5158ZM99.3349 52.7112H107.782C112.438 52.7112 116.229 48.9187 116.229 44.2595C116.229 39.6002 112.438 35.8077 107.782 35.8077C103.125 35.8077 99.3349 39.6002 99.3349 44.2595V52.7112Z" fill="#1B2340"/>
                        <path d="M371.953 42.6313V35H372.913V42.6313H371.953ZM372.417 42.6313V41.7954H374.676C375.249 41.7954 375.682 41.6871 375.976 41.4549C376.27 41.2227 376.424 40.8976 376.424 40.4642C376.424 40.1546 376.362 39.907 376.223 39.7057C376.084 39.5045 375.883 39.3652 375.604 39.2568C375.326 39.1485 374.986 39.102 374.583 39.102H372.402V38.2816H374.305C374.862 38.2816 375.295 38.1733 375.604 37.9566C375.898 37.7398 376.053 37.4148 376.053 37.0123C376.053 36.6253 375.929 36.3312 375.682 36.13C375.434 35.9288 375.078 35.8359 374.614 35.8359H372.417V35H374.831C375.264 35 375.651 35.0774 375.976 35.2322C376.301 35.387 376.564 35.6192 376.749 35.8978C376.935 36.1764 377.028 36.517 377.028 36.904C377.028 37.1826 376.966 37.4303 376.842 37.6779C376.718 37.9256 376.564 38.1268 376.347 38.2816C376.146 38.4519 375.898 38.5448 375.635 38.5912C376.007 38.6531 376.316 38.7615 376.579 38.9318C376.842 39.102 377.043 39.3187 377.182 39.5819C377.322 39.845 377.399 40.1546 377.399 40.4952C377.399 40.9596 377.291 41.3311 377.09 41.6561C376.888 41.9812 376.594 42.2134 376.208 42.3837C375.821 42.5539 375.357 42.6468 374.815 42.6468H372.402L372.417 42.6313Z" fill="#1B2340"/>
                        <path d="M382.117 42.6313V39.3497L379.41 35H380.493L382.581 38.4209H382.612L384.701 35H385.784L383.076 39.3497V42.6313H382.117Z" fill="#1B2340"/>
                        <path d="M371.35 55.6341L374.119 48.0028H375.078V49.2721H374.738L372.588 55.6496H371.334L371.35 55.6341ZM372.696 53.5754L373.036 52.6156H376.486L376.826 53.5754H372.696ZM376.935 55.6341L374.784 49.2566V47.9873H375.419L378.188 55.6186H376.935V55.6341Z" fill="#1B2340"/>
                        <path d="M380.338 55.6343V54.8293L384.515 49.0555V49.0246H380.462V48.0029H385.969V48.8079L381.808 54.5817V54.6126H386.062V55.6343H380.323H380.338Z" fill="#1B2340"/>
                        <path d="M391.879 55.7576C391.245 55.7576 390.688 55.6338 390.224 55.4016C389.76 55.1694 389.404 54.8443 389.156 54.4109C388.909 53.9775 388.785 53.4976 388.785 52.9404V47.987H389.976V52.8475C389.976 53.219 390.054 53.5441 390.193 53.8227C390.332 54.1013 390.564 54.318 390.843 54.4728C391.121 54.6276 391.477 54.705 391.879 54.705C392.281 54.705 392.622 54.6276 392.916 54.4728C393.194 54.318 393.411 54.1013 393.565 53.8227C393.72 53.5441 393.782 53.219 393.782 52.8475V47.987H394.973V52.9404C394.973 53.4976 394.85 53.993 394.602 54.4109C394.354 54.8289 393.999 55.1539 393.535 55.4016C393.07 55.6338 392.529 55.7576 391.879 55.7576ZM392.189 47.3833H391.369L392.251 45.7734H393.349L392.189 47.3833Z" fill="#1B2340"/>
                        <path d="M401.146 55.7578C400.434 55.7578 399.8 55.603 399.274 55.2779C398.748 54.9528 398.33 54.5039 398.052 53.9157C397.758 53.3275 397.619 52.6309 397.619 51.8105C397.619 50.9901 397.758 50.2935 398.052 49.7053C398.346 49.1171 398.748 48.6682 399.274 48.3431C399.8 48.0181 400.434 47.8633 401.146 47.8633C401.703 47.8633 402.213 47.9716 402.662 48.1883C403.111 48.4051 403.482 48.6992 403.776 49.0862C404.07 49.4731 404.255 49.9066 404.333 50.4174V50.4638H403.157L403.126 50.3555C403.049 50.0614 402.91 49.7982 402.739 49.5815C402.569 49.3648 402.337 49.1945 402.074 49.0862C401.811 48.9778 401.502 48.9159 401.161 48.9159C400.682 48.9159 400.28 49.0397 399.939 49.2719C399.599 49.5041 399.32 49.8446 399.135 50.2781C398.949 50.7115 398.841 51.2223 398.841 51.8105C398.841 52.3987 398.934 52.9096 399.135 53.343C399.336 53.7764 399.599 54.1169 399.939 54.3491C400.28 54.5813 400.697 54.7052 401.161 54.7052C401.502 54.7052 401.796 54.6432 402.074 54.5349C402.353 54.4265 402.569 54.2563 402.755 54.0241C402.94 53.8074 403.08 53.5287 403.172 53.2037V53.1572H404.364V53.2037C404.271 53.7145 404.085 54.1634 403.807 54.5349C403.513 54.9219 403.142 55.216 402.693 55.4327C402.244 55.6494 401.734 55.7578 401.177 55.7578H401.146Z" fill="#1B2340"/>
                        <path d="M406.282 55.6341L409.051 48.0028H410.01V49.2721H409.67L407.52 55.6496H406.267L406.282 55.6341ZM407.628 53.5754L407.968 52.6156H411.418L411.759 53.5754H407.628ZM411.867 55.6341L409.717 49.2566V47.9873H410.351L413.12 55.6186H411.867V55.6341Z" fill="#1B2340"/>
                        <path d="M415.471 55.6343V48.0029H418.442C418.952 48.0029 419.416 48.0958 419.788 48.2816C420.159 48.4673 420.468 48.7459 420.669 49.0865C420.871 49.4425 420.979 49.845 420.979 50.3248C420.979 50.8511 420.855 51.3 420.592 51.7025C420.329 52.105 419.973 52.3681 419.509 52.5229L421.211 55.6343H419.834L418.287 52.7087H416.663V55.6343H415.471ZM416.647 51.7335H418.318C418.767 51.7335 419.122 51.6096 419.37 51.3774C419.617 51.1452 419.741 50.8047 419.741 50.3558C419.741 49.9224 419.618 49.5973 419.355 49.3496C419.092 49.102 418.736 48.9936 418.272 48.9936H416.647V51.7335Z" fill="#1B2340"/>
                        <path d="M429.224 55.6343V49.0246H426.888V48.0029H432.736V49.0246H430.4V55.6343H429.209H429.224Z" fill="#1B2340"/>
                        <path d="M435.227 55.6343V48.0029H438.197C438.708 48.0029 439.172 48.0958 439.543 48.2816C439.915 48.4673 440.224 48.7459 440.425 49.0865C440.626 49.4425 440.735 49.845 440.735 50.3248C440.735 50.8511 440.611 51.3 440.348 51.7025C440.085 52.105 439.729 52.3681 439.265 52.5229L440.967 55.6343H439.59L438.043 52.7087H436.418V55.6343H435.227ZM436.403 51.7335H438.074C438.522 51.7335 438.878 51.6096 439.126 51.3774C439.373 51.1452 439.497 50.8047 439.497 50.3558C439.497 49.9224 439.373 49.5973 439.11 49.3496C438.847 49.102 438.491 48.9936 438.027 48.9936H436.403V51.7335Z" fill="#1B2340"/>
                        <path d="M442.823 55.6341L445.592 48.0028H446.551V49.2721H446.211L444.06 55.6496H442.807L442.823 55.6341ZM444.184 53.5754L444.525 52.6156H447.974L448.315 53.5754H444.184ZM448.408 55.6341L446.257 49.2566V47.9873H446.892L449.661 55.6186H448.408V55.6341Z" fill="#1B2340"/>
                        <path d="M453.281 55.6343L450.558 48.0029H451.842L453.915 54.3185H453.946L456.019 48.0029H457.303L454.58 55.6343H453.265H453.281Z" fill="#1B2340"/>
                        <path d="M459.67 55.6343V48.0029H464.512V49.0246H460.846V51.2536H464.311V52.2443H460.846V54.6126H464.512V55.6343H459.67Z" fill="#1B2340"/>
                        <path d="M467.25 55.6343V48.0029H468.442V54.6126H472V55.6343H467.25Z" fill="#1B2340"/>
                        <path d="M351.351 21H350.535V69.9474H351.351V21Z" fill="#1B2340"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_267_2_pago">
                          <rect width="472" height="93" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="text-right text-sm text-slate-600 space-y-1">
                    <p className="text-base font-semibold text-slate-900 mb-2">Proagent Travel LLC</p>
                    <p className="flex items-center justify-end gap-2">
                      <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>mail</span>
                      contacto@proagent.com
                    </p>
                    <p className="flex items-center justify-end gap-2">
                      <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>phone</span>
                      +1 (786) 554-3673
                    </p>
                    <p className="flex items-center justify-end gap-2">
                      <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>location_on</span>
                      Miami, Florida
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-500 text-sm">N° Pago</Label>
                    <p className="text-lg font-semibold text-slate-900 mt-1">{selectedPago.numeroPago}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-sm">Estado</Label>
                    <div className="mt-1">
                      <Badge className={`${getEstadoBadge(selectedPago.estado).bg} ${getEstadoBadge(selectedPago.estado).text} border-0`}>
                        {getEstadoBadge(selectedPago.estado).label}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-sm">Cliente</Label>
                    <p className="text-base text-slate-900 mt-1">{selectedPago.cliente}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-sm">Fecha de Pago</Label>
                    <p className="text-base text-slate-900 mt-1">{selectedPago.fechaPago}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-sm">N° Factura</Label>
                    <p className="text-base text-slate-900 mt-1">{selectedPago.numeroFactura}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-sm">N° Reserva</Label>
                    <p className="text-base text-slate-900 mt-1">{selectedPago.numeroReserva}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-sm">Método de Pago</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="material-symbols-outlined text-slate-600 text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                        {getMetodoPagoIcon(selectedPago.metodoPago)}
                      </span>
                      <p className="text-base text-slate-900">{getMetodoPagoLabel(selectedPago.metodoPago)}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-sm">Referencia</Label>
                    <p className="text-base text-slate-900 mt-1">{selectedPago.referencia}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-slate-500 text-sm">Concepto</Label>
                  <p className="text-base text-slate-900 mt-1">{selectedPago.concepto}</p>
                </div>
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Monto Factura:</span>
                      <span className="text-slate-900 font-medium">US${selectedPago.montoFactura.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Monto Pagado:</span>
                      <span className={`font-medium ${selectedPago.estado === 'completado' ? 'text-green-600' : 'text-slate-900'}`}>
                        US${selectedPago.montoPagado.toFixed(2)}
                      </span>
                    </div>
                    {selectedPago.montoPagado > 0 && selectedPago.montoPagado < selectedPago.montoFactura && (
                      <div className="pt-2 border-t">
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-600">Saldo Pendiente:</span>
                          <span className="text-yellow-600 font-medium">
                            US${(selectedPago.montoFactura - selectedPago.montoPagado).toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all"
                            style={{ width: `${(selectedPago.montoPagado / selectedPago.montoFactura) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                    Cerrar
                  </Button>
                  {selectedPago.estado === 'completado' && (
                    <Button variant="outline">
                      Descargar PDF
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

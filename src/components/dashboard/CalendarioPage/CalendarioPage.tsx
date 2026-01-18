'use client';

import { useState, useMemo, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parse, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import './CalendarioPage.scss';

interface CalendarEvent {
  id: string;
  title: string;
  date: string; // DD/MM/YYYY
  time: string;
  type: 'evento' | 'salida';
}

const defaultEvents: CalendarEvent[] = [
  { id: '1', title: 'Group Bookings Live Support', date: '02/01/2026', time: '02:00 PM', type: 'evento' },
  { id: '2', title: 'Flight Live Support', date: '02/01/2026', time: '04:00 PM', type: 'evento' },
  { id: '3', title: 'Cruise Live Support', date: '03/01/2026', time: '02:00 PM', type: 'evento' },
  { id: '4', title: 'DMCs Live Support', date: '03/01/2026', time: '04:00 PM', type: 'evento' },
  { id: '5', title: 'Spanish-Led Live Support', date: '04/01/2026', time: '02:00 PM', type: 'evento' },
  { id: '6', title: 'Flight Live Support', date: '04/01/2026', time: '04:00 PM', type: 'evento' },
  { id: '7', title: 'DMCs Live Support', date: '03/01/2026', time: '04:00 PM', type: 'evento' },
];

const defaultDepartures: CalendarEvent[] = [
  { id: 'd1', title: 'Grupo Dubái - Familia López', date: '02/01/2026', time: '08:30 AM', type: 'salida' },
  { id: 'd2', title: 'Cliente María González - París', date: '02/01/2026', time: '11:45 AM', type: 'salida' },
  { id: 'd3', title: 'Grupo Europa Express - Roma', date: '03/01/2026', time: '06:15 AM', type: 'salida' },
  { id: 'd4', title: 'Cliente Juan Pérez - Cancún', date: '03/01/2026', time: '02:30 PM', type: 'salida' },
  { id: 'd5', title: 'Grupo Caribe Total - Punta Cana', date: '04/01/2026', time: '09:00 AM', type: 'salida' },
  { id: 'd6', title: 'Cliente Ana Martínez - Nueva York', date: '04/01/2026', time: '05:45 PM', type: 'salida' },
  { id: 'd7', title: 'Grupo Oriente Mágico - Tokio', date: '05/01/2026', time: '10:20 AM', type: 'salida' },
];

interface Cliente {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

type ViewMode = 'mes' | 'agenda';
type FilterType = 'todos' | 'evento' | 'salida';

interface AgendaItem {
  id: string;
  text: string;
  type: 'viaje' | 'pago' | 'llamada' | 'salida' | 'cumpleanos' | 'cliente' | 'oportunidad' | 'fecha' | 'aniversario' | 'tarea' | 'evento';
  date?: Date;
  endDate?: Date;
  priority?: 'alta' | 'media' | 'baja';
  destino?: string;
  hora?: string;
  horaFin?: string;
  aeropuerto?: string;
  cliente?: string;
  clienteId?: string;
  numeroCotizacion?: string;
  numeroVuelo?: string;
  aerolinea?: string;
  clase?: string;
  pasajeros?: number;
  monto?: string;
  estado?: 'pendiente' | 'vencido' | 'proximo' | 'completado';
  fechaEspecial?: string;
  categoriaEspecial?: 'cumpleanos' | 'aniversario' | 'boda' | 'graduacion' | 'otro';
  descripcion?: string;
  archivos?: File[];
  pagoFacturaId?: string;
  pagoFacturaTipo?: 'pago' | 'factura';
  pagoFacturaNumero?: string;
  crmTipo?: 'cotizacion' | 'expediente' | 'reserva' | 'itinerario';
  crmId?: string;
  crmNumero?: string;
  recordatorio?: '15min' | '1hora' | '1dia' | 'ninguno';
}

type AgendaTab = 'hoy' | 'estaSemana' | 'esteMes';

type CategoryType = 'fechas-especiales' | 'pagos-cobros' | 'acciones-tareas' | 'viajes' | 'consolidados' | 'eventos';

interface CategoryData {
  id: CategoryType;
  title: string;
  subtitle: string;
  icon: string;
  items: AgendaItem[];
}

export function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Enero 2026
  const [viewMode, setViewMode] = useState<ViewMode>('agenda');
  const [filterType, setFilterType] = useState<FilterType>('todos');
  const [activeAgendaTab, setActiveAgendaTab] = useState<AgendaTab>('hoy');
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<CategoryType | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [buscarCliente, setBuscarCliente] = useState('');
  const [mostrarSugerenciasCliente, setMostrarSugerenciasCliente] = useState(false);
  const [buscarPagoFactura, setBuscarPagoFactura] = useState('');
  const [mostrarSugerenciasPagoFactura, setMostrarSugerenciasPagoFactura] = useState(false);
  const [buscarCRM, setBuscarCRM] = useState('');
  const [mostrarSugerenciasCRM, setMostrarSugerenciasCRM] = useState(false);
  const [buscarAeropuerto, setBuscarAeropuerto] = useState('');
  const [mostrarSugerenciasAeropuerto, setMostrarSugerenciasAeropuerto] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<AgendaItem>>({
    text: '',
    type: 'tarea',
    date: new Date(),
    priority: 'media',
  });
  const [categoriesData, setCategoriesData] = useState<{
    hoy: CategoryData[];
    estaSemana: CategoryData[];
    esteMes: CategoryData[];
  }>({ 
    hoy: [], 
    estaSemana: [], 
    esteMes: [] 
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
    setNewEvent({
      ...newEvent,
      clienteId: cliente.id,
      cliente: `${cliente.firstName} ${cliente.lastName}`,
    });
    setBuscarCliente(`${cliente.firstName} ${cliente.lastName}`);
    setMostrarSugerenciasCliente(false);
  };

  // Mock de pagos y facturas
  const pagosMock = [
    { id: 'p1', tipo: 'pago' as 'pago', numero: 'PAG-001', monto: 2450.00, cliente: 'Arieldi Marrero', concepto: 'Pago reserva Punta Cana' },
    { id: 'p2', tipo: 'pago' as 'pago', numero: 'PAG-002', monto: 1850.00, cliente: 'Miguel Zabala', concepto: 'Pago parcial tours' },
    { id: 'p3', tipo: 'pago' as 'pago', numero: 'PAG-003', monto: 3200.00, cliente: 'Henrry Mulet', concepto: 'Pago vuelos internacional' },
  ];

  const facturasMock = [
    { id: 'f1', tipo: 'factura' as 'factura', numero: 'FAC-001', monto: 3200.00, cliente: 'Arieldi Marrero', concepto: 'Factura reserva auto' },
    { id: 'f2', tipo: 'factura' as 'factura', numero: 'FAC-002', monto: 5000.00, cliente: 'Miguel Zabala', concepto: 'Factura paquete Europa' },
    { id: 'f3', tipo: 'factura' as 'factura', numero: 'FAC-003', monto: 1250.00, cliente: 'Gretell Rojas', concepto: 'Factura servicios' },
  ];

  const crmMock = [
    { id: 'c1', tipo: 'Cotización', numero: 'COT-2026-001', titulo: 'Punta Cana - Todo incluido' },
    { id: 'c2', tipo: 'Cotización', numero: 'COT-2026-002', titulo: 'Tour Europa 15 días' },
    { id: 'c3', tipo: 'Cotización', numero: 'COT-2026-003', titulo: 'Crucero Caribe' },
    { id: 'e1', tipo: 'Expediente', numero: 'EXP-001', titulo: 'Familia López - Vacaciones' },
    { id: 'e2', tipo: 'Expediente', numero: 'EXP-002', titulo: 'Tech Solutions - Grupo Corporativo' },
    { id: 'r1', tipo: 'Reserva', numero: 'RES-001', titulo: 'Hotel Barceló Bávaro' },
    { id: 'r2', tipo: 'Reserva', numero: 'RES-002', titulo: 'Vuelo AA 1234 Miami-Madrid' },
    { id: 'i1', tipo: 'Itinerario', numero: 'ITI-001', titulo: 'Tour Europa 15 días completo' },
    { id: 'i2', tipo: 'Itinerario', numero: 'ITI-002', titulo: 'Caribe Total - 10 días' },
  ];

  // Filtrar pagos y facturas para búsqueda
  const getPagosFacturasFiltrados = () => {
    if (buscarPagoFactura.length < 2) return [];
    
    const todos = [...pagosMock, ...facturasMock];
    return todos.filter(item => {
      const searchLower = buscarPagoFactura.toLowerCase();
      return (
        item.numero.toLowerCase().includes(searchLower) ||
        item.cliente.toLowerCase().includes(searchLower) ||
        item.concepto.toLowerCase().includes(searchLower)
      );
    });
  };

  // Seleccionar un pago o factura
  const handleSeleccionarPagoFactura = (item: any) => {
    setNewEvent({
      ...newEvent,
      pagoFacturaId: item.id,
      pagoFacturaTipo: item.tipo,
      pagoFacturaNumero: item.numero,
    });
    setBuscarPagoFactura(`${item.tipo === 'pago' ? 'Pago' : 'Factura'} ${item.numero} - ${item.cliente}`);
    setMostrarSugerenciasPagoFactura(false);
  };

  // Filtrar CRM para búsqueda
  const getCRMFiltrados = () => {
    if (buscarCRM.length < 2) return [];
    
    return crmMock.filter(item => {
      const searchLower = buscarCRM.toLowerCase();
      return (
        item.numero.toLowerCase().includes(searchLower) ||
        item.titulo.toLowerCase().includes(searchLower) ||
        item.tipo.toLowerCase().includes(searchLower)
      );
    });
  };

  // Seleccionar un elemento del CRM
  const handleSeleccionarCRM = (item: any) => {
    const tipoMap: { [key: string]: 'cotizacion' | 'expediente' | 'reserva' | 'itinerario' } = {
      'Cotización': 'cotizacion',
      'Expediente': 'expediente',
      'Reserva': 'reserva',
      'Itinerario': 'itinerario',
    };
    
    setNewEvent({
      ...newEvent,
      crmId: item.id,
      crmTipo: tipoMap[item.tipo],
      crmNumero: item.numero,
    });
    setBuscarCRM(`${item.tipo} ${item.numero} - ${item.titulo}`);
    setMostrarSugerenciasCRM(false);
  };

  // Lista de aeropuertos internacionales
  const aeropuertosMock = [
    { codigo: 'AMS', nombre: 'Amsterdam Airport Schiphol', pais: 'Países Bajos' },
    { codigo: 'ATL', nombre: 'Hartsfield-Jackson Atlanta International Airport', pais: 'EE.UU.' },
    { codigo: 'BCN', nombre: 'Barcelona-El Prat Airport', pais: 'España' },
    { codigo: 'BKK', nombre: 'Suvarnabhumi Airport', pais: 'Tailandia' },
    { codigo: 'BOG', nombre: 'El Dorado International Airport', pais: 'Colombia' },
    { codigo: 'CDG', nombre: 'Charles de Gaulle Airport', pais: 'Francia' },
    { codigo: 'CUN', nombre: 'Cancún International Airport', pais: 'México' },
    { codigo: 'DFW', nombre: 'Dallas/Fort Worth International Airport', pais: 'EE.UU.' },
    { codigo: 'DXB', nombre: 'Dubai International Airport', pais: 'EAU' },
    { codigo: 'EZE', nombre: 'Ministro Pistarini International Airport', pais: 'Argentina' },
    { codigo: 'FCO', nombre: 'Leonardo da Vinci-Fiumicino Airport', pais: 'Italia' },
    { codigo: 'FRA', nombre: 'Frankfurt Airport', pais: 'Alemania' },
    { codigo: 'GRU', nombre: 'São Paulo/Guarulhos International Airport', pais: 'Brasil' },
    { codigo: 'HKG', nombre: 'Hong Kong International Airport', pais: 'China' },
    { codigo: 'ICN', nombre: 'Incheon International Airport', pais: 'Corea del Sur' },
    { codigo: 'JFK', nombre: 'John F. Kennedy International Airport', pais: 'EE.UU.' },
    { codigo: 'LAX', nombre: 'Los Angeles International Airport', pais: 'EE.UU.' },
    { codigo: 'LGA', nombre: 'LaGuardia Airport', pais: 'EE.UU.' },
    { codigo: 'LHR', nombre: 'London Heathrow Airport', pais: 'Reino Unido' },
    { codigo: 'LIM', nombre: 'Jorge Chávez International Airport', pais: 'Perú' },
    { codigo: 'MAD', nombre: 'Adolfo Suárez Madrid-Barajas Airport', pais: 'España' },
    { codigo: 'MEX', nombre: 'Mexico City International Airport', pais: 'México' },
    { codigo: 'MIA', nombre: 'Miami International Airport', pais: 'EE.UU.' },
    { codigo: 'NRT', nombre: 'Narita International Airport', pais: 'Japón' },
    { codigo: 'ORD', nombre: "O'Hare International Airport", pais: 'EE.UU.' },
    { codigo: 'PTY', nombre: 'Tocumen International Airport', pais: 'Panamá' },
    { codigo: 'PUJ', nombre: 'Punta Cana International Airport', pais: 'República Dominicana' },
    { codigo: 'SIN', nombre: 'Singapore Changi Airport', pais: 'Singapur' },
    { codigo: 'STI', nombre: 'Cibao International Airport', pais: 'República Dominicana' },
    { codigo: 'SYD', nombre: 'Sydney Kingsford Smith Airport', pais: 'Australia' },
  ];

  // Filtrar aeropuertos para búsqueda
  const getAeropuertosFiltrados = () => {
    if (buscarAeropuerto.length < 2) return [];
    
    return aeropuertosMock.filter(aeropuerto => {
      const searchLower = buscarAeropuerto.toLowerCase();
      return (
        aeropuerto.codigo.toLowerCase().includes(searchLower) ||
        aeropuerto.nombre.toLowerCase().includes(searchLower) ||
        aeropuerto.pais.toLowerCase().includes(searchLower)
      );
    });
  };

  // Seleccionar un aeropuerto
  const handleSeleccionarAeropuerto = (aeropuerto: any) => {
    setNewEvent({
      ...newEvent,
      aeropuerto: aeropuerto.codigo,
    });
    setBuscarAeropuerto(`${aeropuerto.codigo} - ${aeropuerto.nombre} (${aeropuerto.pais})`);
    setMostrarSugerenciasAeropuerto(false);
  };

  // Generar items de agenda organizados por categorías
  useEffect(() => {
    const today = new Date(2026, 0, 1);
    const tomorrow = addDays(today, 1);
    const nextWeek = addDays(today, 7);

    // Cargar clientes desde localStorage para los items del calendario
    let clients: any[] = [];
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm_clients');
      if (stored) {
        clients = JSON.parse(stored);
      }
    }

    // Función para organizar items por categorías (solo 4 categorías)
    const organizeByCategories = (items: AgendaItem[]): CategoryData[] => {
      const categories: CategoryData[] = [
        {
          id: 'fechas-especiales',
          title: 'Recordatorios · Fechas especiales',
          subtitle: 'Cumpleaños, aniversarios y fechas personales',
          icon: 'cake',
          items: items.filter(item => item.type === 'cumpleanos' || item.type === 'aniversario' || item.type === 'fecha')
        },
        {
          id: 'pagos-cobros',
          title: 'Recordatorios · Pagos y cobros',
          subtitle: 'Pendientes, vencidos y próximos',
          icon: 'payment',
          items: items.filter(item => item.type === 'pago')
        },
        {
          id: 'acciones-tareas',
          title: 'Acciones y tareas',
          subtitle: 'Seguimientos y acciones del agente',
          icon: 'task_alt',
          items: items.filter(item => item.type === 'llamada' || item.type === 'tarea' || item.type === 'oportunidad')
        },
        {
          id: 'viajes',
          title: 'Recordatorios · Viajes',
          subtitle: 'Salidas, regresos y fechas de viaje',
          icon: 'flight_takeoff',
          items: items.filter(item => item.type === 'viaje' || item.type === 'salida' || item.type === 'cliente')
        }
      ];
      return categories;
    };

    // Items para HOY
    const hoyItems: AgendaItem[] = [
      // Fechas especiales
      {
        id: 'h1',
        text: 'Cumpleaños de María González',
        type: 'cumpleanos',
        date: today,
        priority: 'media',
        cliente: 'María González',
        fechaEspecial: '01 de Enero'
      },
      {
        id: 'h2',
        text: 'Aniversario de boda - Familia López',
        type: 'aniversario',
        date: today,
        priority: 'baja',
        cliente: 'Familia López',
        fechaEspecial: '01 de Enero'
      },
      // Pagos y cobros
      {
        id: 'h3',
        text: 'Pago pendiente reserva #458 - María González (vence hoy)',
        type: 'pago',
        date: today,
        priority: 'alta',
        cliente: clients[2]?.firstName && clients[2]?.lastName ? `${clients[2].firstName} ${clients[2].lastName}` : 'María González',
        monto: '$2,450.00',
        estado: 'vencido'
      },
      {
        id: 'h4',
        text: 'Pago recibido reserva #342 - Ana Martínez - Confirmar',
        type: 'pago',
        date: today,
        priority: 'media',
        cliente: 'Ana Martínez',
        monto: '$1,850.00',
        estado: 'completado'
      },
      {
        id: 'h5',
        text: 'Cobro próximo reserva #521 - Juan Pérez (vence mañana)',
        type: 'pago',
        date: tomorrow,
        priority: 'alta',
        cliente: 'Juan Pérez',
        monto: '$3,200.00',
        estado: 'proximo'
      },
      // Acciones y tareas
      {
        id: 'h6',
        text: `Llamar a ${clients[1]?.firstName || 'Henrry'} – seguimiento cotización`,
        type: 'llamada',
        date: today,
        priority: 'media',
        numeroCotizacion: 'COT-2026-0123',
        cliente: clients[1]?.firstName || 'Henrry'
      },
      {
        id: 'h7',
        text: 'Revisar propuesta comercial - Cliente Silva',
        type: 'tarea',
        date: today,
        priority: 'alta',
        cliente: 'Roberto Silva',
        numeroCotizacion: 'COT-2026-0789'
      },
      {
        id: 'h8',
        text: 'Enviar documentación adicional - Cliente Premium',
        type: 'tarea',
        date: today,
        priority: 'media',
        cliente: 'Corporación Global Travel'
      },
      // Viajes
      {
        id: 'h9',
        text: `${clients[0]?.firstName || 'Arieldi'} ${clients[0]?.lastName || 'Marrero'} viaja mañana`,
        type: 'viaje',
        date: tomorrow,
        priority: 'alta',
        cliente: `${clients[0]?.firstName || 'Arieldi'} ${clients[0]?.lastName || 'Marrero'}`,
        destino: 'Cancún, México',
        hora: '08:30 AM',
        aeropuerto: 'MIA - Miami International Airport',
        numeroVuelo: 'AA 1234',
        aerolinea: 'American Airlines',
        clase: 'Económica',
        pasajeros: 2
      },
      {
        id: 'h10',
        text: 'Revisar confirmación de vuelo - Cliente García',
        type: 'viaje',
        date: today,
        priority: 'alta',
        cliente: 'María García',
        destino: 'París, Francia',
        hora: '10:45 PM',
        aeropuerto: 'MIA - Miami International Airport',
        numeroVuelo: 'AF 5678',
        aerolinea: 'Air France',
        clase: 'Business',
        pasajeros: 1
      },
      {
        id: 'h11',
        text: 'Enviar documentos de viaje - Cliente Rodríguez',
        type: 'viaje',
        date: today,
        priority: 'media',
        cliente: 'Carlos Rodríguez',
        destino: 'Roma, Italia',
        hora: '06:15 AM',
        aeropuerto: 'FLL - Fort Lauderdale Airport',
        numeroVuelo: 'DL 9012',
        aerolinea: 'Delta Airlines',
        clase: 'Económica',
        pasajeros: 3
      },
      {
        id: 'h12',
        text: 'Regreso de viaje - Cliente Martínez',
        type: 'viaje',
        date: today,
        priority: 'media',
        cliente: 'Ana Martínez',
        destino: 'Nueva York, USA',
        hora: '05:45 PM',
        aeropuerto: 'JFK - John F. Kennedy International Airport',
        numeroVuelo: 'AA 2345',
        aerolinea: 'American Airlines',
        clase: 'Económica',
        pasajeros: 1
      },
      // Eventos
      {
        id: 'h13',
        text: 'Group Bookings Live Support',
        type: 'evento',
        date: today,
        priority: 'media',
        hora: '02:00 PM'
      },
      {
        id: 'h14',
        text: 'Flight Live Support',
        type: 'evento',
        date: today,
        priority: 'media',
        hora: '04:00 PM'
      }
    ];

    // Items para ESTA SEMANA
    const estaSemanaItems: AgendaItem[] = [
      // Fechas especiales
      {
        id: 's1',
        text: 'Cumpleaños cliente premium - Enviar felicitación',
        type: 'cumpleanos',
        priority: 'media',
        cliente: 'María González',
        fechaEspecial: '03 de Enero'
      },
      {
        id: 's2',
        text: 'Aniversario de empresa - Cliente Corporativo',
        type: 'aniversario',
        priority: 'baja',
        cliente: 'Tech Solutions Inc.',
        fechaEspecial: '05 de Enero'
      },
      // Pagos y cobros
      {
        id: 's3',
        text: 'Pago por vencer reserva #521 - Juan Pérez (vence el viernes)',
        type: 'pago',
        priority: 'alta',
        cliente: 'Juan Pérez',
        numeroCotizacion: 'COT-2026-0521',
        monto: '$3,200.00',
        estado: 'proximo'
      },
      {
        id: 's4',
        text: 'Pago pendiente reserva #678 - Roberto Silva',
        type: 'pago',
        priority: 'alta',
        cliente: 'Roberto Silva',
        monto: '$1,950.00',
        estado: 'pendiente'
      },
      // Acciones y tareas
      {
        id: 's5',
        text: 'Seguimiento cotización #789 - Cliente Silva',
        type: 'llamada',
        priority: 'media',
        cliente: 'Roberto Silva',
        numeroCotizacion: 'COT-2026-0789'
      },
      {
        id: 's6',
        text: 'Revisar renovación de contrato - Cliente VIP',
        type: 'oportunidad',
        priority: 'alta',
        cliente: 'Corporación Global Travel',
        numeroCotizacion: 'COT-2026-0890'
      },
      // Viajes
      {
        id: 's7',
        text: 'Salida grupo familiar - Familia López',
        type: 'salida',
        priority: 'alta',
        cliente: 'Familia López',
        destino: 'Dubái, Emiratos Árabes',
        hora: '11:20 PM',
        aeropuerto: 'MIA - Miami International Airport',
        numeroVuelo: 'EK 3456',
        aerolinea: 'Emirates',
        clase: 'Business',
        pasajeros: 4
      },
      {
        id: 's8',
        text: 'Grupo familiar viaja - Confirmar detalles',
        type: 'viaje',
        priority: 'alta',
        cliente: 'Familia López',
        destino: 'Dubái, Emiratos Árabes',
        hora: '11:20 PM',
        aeropuerto: 'MIA - Miami International Airport',
        numeroVuelo: 'EK 3456',
        aerolinea: 'Emirates',
        clase: 'Business',
        pasajeros: 4
      },
      // Eventos
      {
        id: 's9',
        text: 'Cruise Live Support',
        type: 'evento',
        priority: 'media',
        hora: '02:00 PM'
      },
      {
        id: 's10',
        text: 'DMCs Live Support',
        type: 'evento',
        priority: 'media',
        hora: '04:00 PM'
      }
    ];

    // Items para ESTE MES
    const esteMesItems: AgendaItem[] = [
      // Fechas especiales
      {
        id: 'm1',
        text: 'Cumpleaños de cliente VIP',
        type: 'cumpleanos',
        priority: 'media',
        cliente: 'Corporación Global Travel',
        fechaEspecial: '15 de Enero'
      },
      // Pagos y cobros
      {
        id: 'm2',
        text: 'Pago mensual suscripción premium - Tech Solutions Inc.',
        type: 'pago',
        priority: 'media',
        cliente: 'Tech Solutions Inc.',
        monto: '$5,000.00',
        estado: 'proximo',
        fechaEspecial: '20 de Enero'
      },
      // Acciones y tareas
      {
        id: 'm3',
        text: 'Oportunidad sin cerrar - Viaje luna de miel',
        type: 'oportunidad',
        priority: 'alta',
        cliente: 'Pareja Martínez',
        destino: 'Maldivas',
        numeroCotizacion: 'COT-2026-0456'
      },
      // Viajes
      {
        id: 'm4',
        text: 'Cliente regresa de viaje - Arieldi Marrero',
        type: 'cliente',
        priority: 'media',
        cliente: `${clients[0]?.firstName || 'Arieldi'} ${clients[0]?.lastName || 'Marrero'}`,
        destino: 'Cancún, México',
        hora: '03:15 PM',
        aeropuerto: 'CUN - Cancún International Airport',
        numeroVuelo: 'AA 1235',
        aerolinea: 'American Airlines',
        clase: 'Económica',
        pasajeros: 2
      },
      {
        id: 'm5',
        text: 'Viaje corporativo - Empresa Tech Solutions',
        type: 'viaje',
        priority: 'alta',
        cliente: 'Tech Solutions Inc.',
        destino: 'Londres, Reino Unido',
        hora: '09:00 AM',
        aeropuerto: 'MIA - Miami International Airport',
        numeroVuelo: 'BA 7890',
        aerolinea: 'British Airways',
        clase: 'Business',
        pasajeros: 2
      },
      // Eventos
      {
        id: 'm6',
        text: 'Feria comercial de turismo - Participación',
        type: 'evento',
        priority: 'media',
        destino: 'Miami, FL',
        hora: '10:00 AM',
        aeropuerto: 'MIA - Miami International Airport'
      }
    ];

    setCategoriesData({
      hoy: organizeByCategories(hoyItems),
      estaSemana: organizeByCategories(estaSemanaItems),
      esteMes: organizeByCategories(esteMesItems)
    });
  }, []);

  // Convertir fechas string a Date objects
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // Combinar eventos y salidas
  const allEvents = useMemo(() => {
    const events = defaultEvents.map(e => ({ ...e, dateObj: parseDate(e.date) }));
    const departures = defaultDepartures.map(d => ({ ...d, dateObj: parseDate(d.date) }));
    return [...events, ...departures];
  }, []);

  // Filtrar eventos según el filtro seleccionado
  const filteredEvents = useMemo(() => {
    if (filterType === 'todos') return allEvents;
    return allEvents.filter(e => e.type === filterType);
  }, [allEvents, filterType]);

  // Obtener eventos para un día específico
  const getEventsForDay = (date: Date) => {
    return filteredEvents.filter(event => isSameDay(event.dateObj, date));
  };

  // Navegación del calendario
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date(2026, 0, 1));
  };

  // Vista mensual
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Lunes
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Vista de agenda - eventos ordenados por fecha y hora
  const agendaEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      const dateCompare = a.dateObj.getTime() - b.dateObj.getTime();
      if (dateCompare !== 0) return dateCompare;
      
      // Ordenar por hora si es el mismo día
      const parseTime = (timeStr: string): number => {
        const [time, period] = timeStr.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        let totalMinutes = hours * 60 + minutes;
        
        if (period === 'AM') {
          if (hours === 12) totalMinutes = minutes; // 12:XX AM = 0:XX
        } else {
          if (hours !== 12) totalMinutes = (hours + 12) * 60 + minutes; // PM (excepto 12 PM)
        }
        
        return totalMinutes;
      };
      
      return parseTime(a.time) - parseTime(b.time);
    });
  }, [filteredEvents]);

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Cerrar el submenu al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isCreateMenuOpen && !target.closest('.calendario-page__create-event-wrapper')) {
        setIsCreateMenuOpen(false);
      }
    };

    if (isCreateMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCreateMenuOpen]);

  // Función para obtener el tipo de evento según la categoría
  const getEventTypeFromCategory = (category: CategoryType): AgendaItem['type'] => {
    switch (category) {
      case 'fechas-especiales':
        return 'cumpleanos';
      case 'pagos-cobros':
        return 'pago';
      case 'acciones-tareas':
        return 'tarea';
      case 'viajes':
        return 'viaje';
      default:
        return 'tarea';
    }
  };

  // Función para convertir hora de formato 24h a formato 12h
  const formatTime12h = (time24: string): string => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  // Función para manejar la creación del evento
  const handleCreateEvent = () => {
    if (!selectedEventType || !newEvent.text) return;

    const eventType = getEventTypeFromCategory(selectedEventType);
    const formattedHora = newEvent.hora ? formatTime12h(newEvent.hora) : undefined;
    const formattedHoraFin = newEvent.horaFin ? formatTime12h(newEvent.horaFin) : undefined;
    
    const newEventItem: AgendaItem = {
      id: `new-${Date.now()}`,
      text: newEvent.text || '',
      type: eventType,
      date: newEvent.date || new Date(),
      endDate: newEvent.endDate,
      priority: newEvent.priority || 'media',
      cliente: newEvent.cliente,
      destino: newEvent.destino,
      hora: formattedHora,
      horaFin: formattedHoraFin,
      aeropuerto: newEvent.aeropuerto,
      numeroVuelo: newEvent.numeroVuelo,
      aerolinea: newEvent.aerolinea,
      clase: newEvent.clase,
      pasajeros: newEvent.pasajeros,
      monto: newEvent.monto,
      estado: newEvent.estado,
      numeroCotizacion: newEvent.numeroCotizacion,
      fechaEspecial: newEvent.fechaEspecial,
      categoriaEspecial: newEvent.categoriaEspecial,
      descripcion: newEvent.descripcion,
      archivos: newEvent.archivos,
      recordatorio: newEvent.recordatorio,
      pagoFacturaId: newEvent.pagoFacturaId,
      pagoFacturaTipo: newEvent.pagoFacturaTipo,
      pagoFacturaNumero: newEvent.pagoFacturaNumero,
      crmTipo: newEvent.crmTipo,
      crmId: newEvent.crmId,
      crmNumero: newEvent.crmNumero,
    };

    // Agregar el evento a la categoría correspondiente en todos los tabs
    setCategoriesData(prev => {
      const updated = { ...prev };
      
      // Agregar a todos los tabs (hoy, estaSemana, esteMes)
      (['hoy', 'estaSemana', 'esteMes'] as AgendaTab[]).forEach(tab => {
        const categoryIndex = updated[tab].findIndex(cat => cat.id === selectedEventType);
        
        if (categoryIndex !== -1) {
          updated[tab] = [...updated[tab]];
          updated[tab][categoryIndex] = {
            ...updated[tab][categoryIndex],
            items: [...updated[tab][categoryIndex].items, newEventItem]
          };
        }
      });
      
      return updated;
    });

    // Resetear formulario y cerrar modal
    setNewEvent({
      text: '',
      type: 'tarea',
      date: new Date(),
      priority: 'media',
    });
    setBuscarCliente('');
    setMostrarSugerenciasCliente(false);
    setBuscarCRM('');
    setMostrarSugerenciasCRM(false);
    setBuscarAeropuerto('');
    setMostrarSugerenciasAeropuerto(false);
    setBuscarPagoFactura('');
    setMostrarSugerenciasPagoFactura(false);
    setIsNewEventModalOpen(false);
    setSelectedEventType(null);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsNewEventModalOpen(false);
    setSelectedEventType(null);
    setNewEvent({
      text: '',
      type: 'tarea',
      date: new Date(),
      priority: 'media',
    });
    setBuscarCliente('');
    setMostrarSugerenciasCliente(false);
    setBuscarCRM('');
    setMostrarSugerenciasCRM(false);
    setBuscarAeropuerto('');
    setMostrarSugerenciasAeropuerto(false);
    setBuscarPagoFactura('');
    setMostrarSugerenciasPagoFactura(false);
  };

  return (
    <div className="calendario-page">
      <div className="calendario-page__title-wrapper">
        <h1 className="calendario-page__title">Calendario</h1>
        <div className="calendario-page__create-event-wrapper">
          <Button 
            className="calendario-page__create-event-btn"
            onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
          >
            <span className="material-symbols-outlined">add</span>
            Crear evento
          </Button>
          {isCreateMenuOpen && (
            <div className="calendario-page__create-menu">
              <button
                className="calendario-page__create-menu-item"
                onClick={() => {
                  setSelectedEventType('fechas-especiales');
                  setIsNewEventModalOpen(true);
                  setIsCreateMenuOpen(false);
                }}
              >
                <span className="material-symbols-outlined calendario-page__create-menu-icon">cake</span>
                <div>
                  <div className="calendario-page__create-menu-title">Fechas especiales</div>
                  <div className="calendario-page__create-menu-subtitle">Cumpleaños, aniversarios</div>
                </div>
              </button>
              <button
                className="calendario-page__create-menu-item"
                onClick={() => {
                  setSelectedEventType('pagos-cobros');
                  setIsNewEventModalOpen(true);
                  setIsCreateMenuOpen(false);
                }}
              >
                <span className="material-symbols-outlined calendario-page__create-menu-icon">payment</span>
                <div>
                  <div className="calendario-page__create-menu-title">Pagos y cobros</div>
                  <div className="calendario-page__create-menu-subtitle">Pendientes, vencidos</div>
                </div>
              </button>
              <button
                className="calendario-page__create-menu-item"
                onClick={() => {
                  setSelectedEventType('acciones-tareas');
                  setIsNewEventModalOpen(true);
                  setIsCreateMenuOpen(false);
                }}
              >
                <span className="material-symbols-outlined calendario-page__create-menu-icon">task_alt</span>
                <div>
                  <div className="calendario-page__create-menu-title">Acciones y tareas</div>
                  <div className="calendario-page__create-menu-subtitle">Seguimientos, acciones</div>
                </div>
              </button>
              <button
                className="calendario-page__create-menu-item"
                onClick={() => {
                  setSelectedEventType('viajes');
                  setIsNewEventModalOpen(true);
                  setIsCreateMenuOpen(false);
                }}
              >
                <span className="material-symbols-outlined calendario-page__create-menu-icon">flight_takeoff</span>
                <div>
                  <div className="calendario-page__create-menu-title">Viajes</div>
                  <div className="calendario-page__create-menu-subtitle">Salidas, regresos</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="calendario-page__header">
        <div className="calendario-page__header-left">
          <div className="calendario-page__controls">
            <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
              <span className="material-symbols-outlined">chevron_left</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleToday}>
              Hoy
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <span className="material-symbols-outlined">chevron_right</span>
            </Button>
            <h2 className="calendario-page__month-year">
              {format(currentDate, 'MMMM yyyy', { locale: es })}
            </h2>
          </div>
        </div>
        <div className="calendario-page__header-right">
          <Select value={filterType} onValueChange={(value) => setFilterType(value as FilterType)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="evento">Eventos</SelectItem>
              <SelectItem value="salida">Salidas</SelectItem>
            </SelectContent>
          </Select>
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
            <TabsList>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="mes">Calendario</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {viewMode === 'mes' ? (
        <div className="calendario-page__calendar">
          <div className="calendario-page__weekdays">
            {weekDays.map((day) => (
              <div key={day} className="calendario-page__weekday">
                {day}
              </div>
            ))}
          </div>
          <div className="calendario-page__days">
              {calendarDays.map((day, idx) => {
                const dayEvents = getEventsForDay(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isToday = isSameDay(day, new Date(2026, 0, 1));

                return (
                  <div
                    key={idx}
                    className={`calendario-page__day ${!isCurrentMonth ? 'calendario-page__day--other-month' : ''} ${isToday ? 'calendario-page__day--today' : ''}`}
                  >
                    <div className="calendario-page__day-number">
                      {format(day, 'd')}
                    </div>
                    <div className="calendario-page__day-events">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={`calendario-page__event-item calendario-page__event-item--${event.type}`}
                          title={`${event.title} - ${event.time}`}
                        >
                          <span className="calendario-page__event-time">{event.time}</span>
                          <span className="calendario-page__event-title">{event.title}</span>
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="calendario-page__event-more">
                          +{dayEvents.length - 3} más
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      ) : (
        <Card className="calendario-page__agenda-card">
          <div className="calendario-page__agenda">
            {/* Tabs de agenda */}
            <Tabs value={activeAgendaTab} onValueChange={(value) => setActiveAgendaTab(value as AgendaTab)} className="calendario-page__agenda-tabs">
              <TabsList className="calendario-page__agenda-tabs-list">
                <TabsTrigger value="hoy" className="calendario-page__agenda-tab">
                  <span className="material-symbols-outlined">today</span>
                  Hoy
                </TabsTrigger>
                <TabsTrigger value="estaSemana" className="calendario-page__agenda-tab">
                  <span className="material-symbols-outlined">calendar_view_week</span>
                  Esta semana
                </TabsTrigger>
                <TabsTrigger value="esteMes" className="calendario-page__agenda-tab">
                  <span className="material-symbols-outlined">calendar_month</span>
                  Este mes
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Contenido del tab activo - Grid de 4 categorías (2x2) */}
            <div className="calendario-page__agenda-content">
              <div className="calendario-page__categories-grid">
                {categoriesData[activeAgendaTab].map((category) => (
                  <Card key={category.id} className="calendario-page__category-card">
                    <div className="calendario-page__category-header">
                      <div className="calendario-page__category-header-left">
                        <span className={`material-symbols-outlined calendario-page__category-icon calendario-page__category-icon--${category.id}`}>
                          {category.icon}
                        </span>
                        <div className="calendario-page__category-title-wrapper">
                          <h3 className="calendario-page__category-title">{category.title}</h3>
                          <p className="calendario-page__category-subtitle">{category.subtitle}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="calendario-page__category-badge">
                        {category.items.length}
                      </Badge>
                    </div>
                    <div className="calendario-page__category-items">
                      {category.items.length > 0 ? (
                        <ul className="calendario-page__category-list">
                          {category.items.map((item) => {
                            // Formatear fecha para semana y mes
                            const formattedDate = item.date ? format(item.date, 'dd/MM/yyyy', { locale: es }) : null;
                            const showDate = activeAgendaTab !== 'hoy' && formattedDate;
                            const showTime = activeAgendaTab === 'hoy' && item.hora;
                            
                            return (
                              <li key={item.id} className="calendario-page__category-item-wrapper">
                                <div className="calendario-page__category-item">
                                  <div className="calendario-page__category-item-left">
                                    <span className={`material-symbols-outlined calendario-page__agenda-item-icon calendario-page__agenda-item-icon--${item.type}`}>
                                      {item.type === 'viaje' ? 'flight_takeoff' : 
                                       item.type === 'pago' ? 'payment' : 
                                       item.type === 'llamada' ? 'phone' : 
                                       item.type === 'salida' ? 'airplane_ticket' : 
                                       item.type === 'cumpleanos' ? 'cake' : 
                                       item.type === 'aniversario' ? 'favorite' : 
                                       item.type === 'tarea' ? 'task_alt' : 
                                       item.type === 'oportunidad' ? 'trending_up' : 
                                       item.type === 'cliente' ? 'group' : 
                                       'event'}
                                    </span>
                                    <span className="calendario-page__agenda-item-main">{item.text}</span>
                                  </div>
                                  <div className="calendario-page__category-item-right">
                                    {/* Resaltar hora para hoy, fecha para semana y mes */}
                                    {showTime && (
                                      <span className="calendario-page__agenda-item-time-highlight">{item.hora}</span>
                                    )}
                                    {showDate && (
                                      <span className="calendario-page__agenda-item-date-highlight">{formattedDate}</span>
                                    )}
                                  </div>
                                </div>
                                {(item.destino || item.cliente || item.numeroCotizacion || item.numeroVuelo || item.monto || item.fechaEspecial) && (
                                  <div className="calendario-page__agenda-item-details">
                                      {item.fechaEspecial && (
                                        <span className="calendario-page__agenda-item-detail">
                                          <span className="material-symbols-outlined">calendar_today</span>
                                          {item.fechaEspecial}
                                        </span>
                                      )}
                                      {item.numeroCotizacion && (
                                        <span className="calendario-page__agenda-item-detail">
                                          <span className="material-symbols-outlined">description</span>
                                          {item.numeroCotizacion}
                                        </span>
                                      )}
                                      {item.monto && (
                                        <span className="calendario-page__agenda-item-detail">
                                          <span className="material-symbols-outlined">attach_money</span>
                                          {item.monto}
                                        </span>
                                      )}
                                      {item.estado && (
                                        <span className={`calendario-page__agenda-item-detail calendario-page__agenda-item-detail--${item.estado}`}>
                                          <span className="material-symbols-outlined">
                                            {item.estado === 'vencido' ? 'error' : 
                                             item.estado === 'proximo' ? 'schedule' : 
                                             item.estado === 'completado' ? 'check_circle' : 
                                             'pending'}
                                          </span>
                                          {item.estado === 'vencido' ? 'Vencido' : 
                                           item.estado === 'proximo' ? 'Próximo' : 
                                           item.estado === 'completado' ? 'Completado' : 
                                           'Pendiente'}
                                        </span>
                                      )}
                                      {item.destino && (
                                        <span className="calendario-page__agenda-item-detail">
                                          <span className="material-symbols-outlined">location_on</span>
                                          {item.destino}
                                        </span>
                                      )}
                                      {item.numeroVuelo && (
                                        <span className="calendario-page__agenda-item-detail">
                                          <span className="material-symbols-outlined">flight</span>
                                          {item.numeroVuelo}
                                        </span>
                                      )}
                                      {item.aerolinea && (
                                        <span className="calendario-page__agenda-item-detail">
                                          <span className="material-symbols-outlined">airlines</span>
                                          {item.aerolinea}
                                        </span>
                                      )}
                                      {item.hora && activeAgendaTab !== 'hoy' && (
                                        <span className="calendario-page__agenda-item-detail">
                                          <span className="material-symbols-outlined">schedule</span>
                                          {item.hora}
                                        </span>
                                      )}
                                      {item.aeropuerto && (
                                        <span className="calendario-page__agenda-item-detail">
                                          <span className="material-symbols-outlined">airport_shuttle</span>
                                          {item.aeropuerto}
                                        </span>
                                      )}
                                      {item.clase && (
                                        <span className="calendario-page__agenda-item-detail">
                                          <span className="material-symbols-outlined">confirmation_number</span>
                                          {item.clase}
                                        </span>
                                      )}
                                      {item.pasajeros && (
                                        <span className="calendario-page__agenda-item-detail">
                                          <span className="material-symbols-outlined">group</span>
                                          {item.pasajeros} pasajero{item.pasajeros > 1 ? 's' : ''}
                                        </span>
                                      )}
                                      {item.cliente && (
                                        <span className="calendario-page__agenda-item-detail">
                                          <span className="material-symbols-outlined">person</span>
                                          {item.cliente}
                                        </span>
                                    )}
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <div className="calendario-page__category-empty">
                          <span className="material-symbols-outlined">inbox</span>
                          <p>No hay elementos en esta categoría</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Modal Nuevo Evento */}
      <Dialog open={isNewEventModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="calendario-page__event-modal">
          <DialogHeader>
            <DialogTitle className="calendario-page__event-modal-title">
              Nuevo {selectedEventType === 'fechas-especiales' ? 'Fecha Especial' :
                     selectedEventType === 'pagos-cobros' ? 'Pago/Cobro' :
                     selectedEventType === 'acciones-tareas' ? 'Acción/Tarea' :
                     selectedEventType === 'viajes' ? 'Viaje' : 'Evento'}
            </DialogTitle>
          </DialogHeader>
          <div className="calendario-page__event-modal-form">
            <div className="calendario-page__form-group">
              <Label htmlFor="text" className="calendario-page__form-label">
                Título
              </Label>
              <Input
                id="text"
                value={newEvent.text || ''}
                onChange={(e) => setNewEvent({ ...newEvent, text: e.target.value })}
                placeholder="Ingresa el título del evento"
                className="calendario-page__form-input"
              />
            </div>

            {/* Campos específicos según el tipo */}
            {selectedEventType === 'fechas-especiales' && (
              <>
                <div className="calendario-page__form-group">
                  <Label htmlFor="categoriaEspecial" className="calendario-page__form-label">
                    Categoría de Evento
                  </Label>
                  <Select 
                    value={newEvent.categoriaEspecial || 'cumpleanos'} 
                    onValueChange={(value) => setNewEvent({ ...newEvent, categoriaEspecial: value as 'cumpleanos' | 'aniversario' | 'boda' | 'graduacion' | 'otro' })}
                  >
                    <SelectTrigger className="calendario-page__form-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cumpleanos">Cumpleaños</SelectItem>
                      <SelectItem value="aniversario">Aniversario</SelectItem>
                      <SelectItem value="boda">Boda</SelectItem>
                      <SelectItem value="graduacion">Graduación</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="calendario-page__form-group">
                  <Label htmlFor="cliente" className="calendario-page__form-label">
                    Cliente / Persona
                  </Label>
                  <div className="relative">
                    <Input
                      id="cliente"
                      value={buscarCliente}
                      onChange={(e) => {
                        setBuscarCliente(e.target.value);
                        setMostrarSugerenciasCliente(e.target.value.length >= 2);
                      }}
                      onFocus={() => buscarCliente.length >= 2 && setMostrarSugerenciasCliente(true)}
                      placeholder="Buscar cliente por nombre o email"
                      className="calendario-page__form-input"
                    />
                    {buscarCliente && (
                      <button
                        type="button"
                        onClick={() => {
                          setBuscarCliente('');
                          setMostrarSugerenciasCliente(false);
                          setNewEvent({ ...newEvent, cliente: '', clienteId: undefined });
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    )}
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

                <div className="calendario-page__form-group">
                  <Label htmlFor="descripcion" className="calendario-page__form-label">
                    Descripción
                  </Label>
                  <textarea
                    id="descripcion"
                    value={newEvent.descripcion || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, descripcion: e.target.value })}
                    placeholder="Descripción adicional del evento"
                    className="calendario-page__form-input calendario-page__form-textarea"
                    rows={3}
                  />
                </div>

                <div className="calendario-page__form-group">
                  <Label htmlFor="archivos" className="calendario-page__form-label">
                    Archivos adjuntos (opcional)
                  </Label>
                  <div className="calendario-page__upload-area">
                    <label htmlFor="archivos-especiales" className="calendario-page__upload-label">
                      <div className="calendario-page__upload-icon">
                        <span className="material-symbols-outlined">cloud_upload</span>
                      </div>
                      <div className="calendario-page__upload-text">
                        <span className="calendario-page__upload-main">Haz clic para subir archivos</span>
                        <span className="calendario-page__upload-hint">o arrastra y suelta aquí</span>
                        <span className="calendario-page__upload-formats">PDF, DOC, DOCX, JPG, PNG (máx. 10MB)</span>
                      </div>
                      <Input
                        id="archivos-especiales"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const files = e.target.files ? Array.from(e.target.files) : [];
                          setNewEvent({ ...newEvent, archivos: [...(newEvent.archivos || []), ...files] });
                        }}
                        className="calendario-page__upload-input"
                      />
                    </label>
                  </div>
                  {newEvent.archivos && newEvent.archivos.length > 0 && (
                    <div className="calendario-page__archivos-lista">
                      {newEvent.archivos.map((archivo, index) => (
                        <div key={index} className="calendario-page__archivo-item">
                          <div className="calendario-page__archivo-info">
                            <span className="material-symbols-outlined">description</span>
                            <div className="calendario-page__archivo-details">
                              <span className="calendario-page__archivo-name">{archivo.name}</span>
                              <span className="calendario-page__archivo-size">
                                {(archivo.size / 1024).toFixed(2)} KB
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newArchivos = newEvent.archivos?.filter((_, i) => i !== index);
                              setNewEvent({ ...newEvent, archivos: newArchivos });
                            }}
                            className="calendario-page__archivo-delete"
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fecha y Hora */}
                <div className="calendario-page__form-group">
                  <Label htmlFor="date" className="calendario-page__form-label">
                    Fecha
                  </Label>
                  <DatePicker
                    date={newEvent.date}
                    dateRange={newEvent.endDate ? { from: newEvent.date, to: newEvent.endDate } : undefined}
                    onSelect={(date) => setNewEvent({ ...newEvent, date: date || new Date(), endDate: undefined, horaFin: undefined })}
                    onSelectRange={(range) => setNewEvent({ 
                      ...newEvent, 
                      date: range?.from || new Date(), 
                      endDate: range?.to 
                    })}
                    placeholder="Seleccionar fecha"
                    mode="single"
                  />
                </div>

                {/* Hora - Solo para fecha única */}
                {!newEvent.endDate && (
                  <div className="calendario-page__form-group">
                    <Label htmlFor="hora" className="calendario-page__form-label">
                      Hora (opcional)
                    </Label>
                    <Input
                      id="hora"
                      type="time"
                      value={newEvent.hora || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, hora: e.target.value })}
                      className="calendario-page__form-input"
                    />
                  </div>
                )}

                {/* Hora Inicio y Fin - Solo para rango de fechas */}
                {newEvent.endDate && (
                  <div className="calendario-page__form-row">
                    <div className="calendario-page__form-group">
                      <Label htmlFor="hora" className="calendario-page__form-label">
                        Hora de Inicio (opcional)
                      </Label>
                      <Input
                        id="hora"
                        type="time"
                        value={newEvent.hora || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, hora: e.target.value })}
                        className="calendario-page__form-input"
                      />
                    </div>
                    <div className="calendario-page__form-group">
                      <Label htmlFor="horaFin" className="calendario-page__form-label">
                        Hora de Fin (opcional)
                      </Label>
                      <Input
                        id="horaFin"
                        type="time"
                        value={newEvent.horaFin || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, horaFin: e.target.value })}
                        className="calendario-page__form-input"
                      />
                    </div>
                  </div>
                )}

                {/* Recordatorio */}
                <div className="calendario-page__form-group">
                  <Label className="calendario-page__form-label">
                    Recordatorio
                  </Label>
                  <div className="calendario-page__recordatorio-options">
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: 'ninguno' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === 'ninguno' || !newEvent.recordatorio ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">notifications_off</span>
                      Sin recordatorio
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: '15min' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === '15min' ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">schedule</span>
                      15 minutos antes
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: '1hora' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === '1hora' ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">schedule</span>
                      1 hora antes
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: '1dia' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === '1dia' ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">event</span>
                      1 día antes
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Prioridad solo para acciones-tareas */}
            {selectedEventType === 'acciones-tareas' && (
              <div className="calendario-page__form-group">
                <Label htmlFor="priority" className="calendario-page__form-label">
                  Prioridad
                </Label>
                <Select 
                  value={newEvent.priority || 'media'} 
                  onValueChange={(value) => setNewEvent({ ...newEvent, priority: value as 'alta' | 'media' | 'baja' })}
                >
                  <SelectTrigger className="calendario-page__form-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedEventType === 'pagos-cobros' && (
              <>
                <div className="calendario-page__form-group">
                  <Label htmlFor="pagoFactura" className="calendario-page__form-label">
                    Pago o Factura
                  </Label>
                  <div className="relative">
                    <Input
                      id="pagoFactura"
                      value={buscarPagoFactura}
                      onChange={(e) => {
                        setBuscarPagoFactura(e.target.value);
                        setMostrarSugerenciasPagoFactura(e.target.value.length >= 2);
                      }}
                      onFocus={() => buscarPagoFactura.length >= 2 && setMostrarSugerenciasPagoFactura(true)}
                      placeholder="Buscar por número, cliente o concepto"
                      className="calendario-page__form-input"
                    />
                    {buscarPagoFactura && (
                      <button
                        type="button"
                        onClick={() => {
                          setBuscarPagoFactura('');
                          setMostrarSugerenciasPagoFactura(false);
                          setNewEvent({ ...newEvent, pagoFacturaId: undefined, pagoFacturaTipo: undefined, pagoFacturaNumero: undefined });
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    )}
                    {mostrarSugerenciasPagoFactura && getPagosFacturasFiltrados().length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {getPagosFacturasFiltrados().map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleSeleccionarPagoFactura(item)}
                            className="px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-slate-900">
                                  {item.tipo === 'pago' ? 'Pago' : 'Factura'} {item.numero}
                                </div>
                                <div className="text-sm text-slate-600 mt-1">
                                  {item.cliente}
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                  {item.concepto}
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <div className="font-semibold text-slate-900">
                                  ${item.monto.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="calendario-page__form-helper">
                    Selecciona un pago o factura existente para asociar al evento
                  </p>
                </div>

                <div className="calendario-page__form-group">
                  <Label htmlFor="cliente" className="calendario-page__form-label">
                    Cliente
                  </Label>
                  <div className="relative">
                    <Input
                      id="cliente"
                      value={buscarCliente}
                      onChange={(e) => {
                        setBuscarCliente(e.target.value);
                        setMostrarSugerenciasCliente(e.target.value.length >= 2);
                      }}
                      onFocus={() => buscarCliente.length >= 2 && setMostrarSugerenciasCliente(true)}
                      placeholder="Buscar cliente por nombre o email"
                      className="calendario-page__form-input"
                    />
                    {buscarCliente && (
                      <button
                        type="button"
                        onClick={() => {
                          setBuscarCliente('');
                          setMostrarSugerenciasCliente(false);
                          setNewEvent({ ...newEvent, cliente: '', clienteId: undefined });
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    )}
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
                  <p className="calendario-page__form-helper">
                    Selecciona el cliente asociado al pago o cobro
                  </p>
                </div>

                <div className="calendario-page__form-group">
                  <Label htmlFor="descripcion" className="calendario-page__form-label">
                    Descripción
                  </Label>
                  <textarea
                    id="descripcion"
                    value={newEvent.descripcion || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, descripcion: e.target.value })}
                    placeholder="Descripción adicional del pago o cobro"
                    className="calendario-page__form-input calendario-page__form-textarea"
                    rows={3}
                  />
                </div>

                {/* Fecha y Hora */}
                <div className="calendario-page__form-group">
                  <Label htmlFor="date-pago" className="calendario-page__form-label">
                    Fecha
                  </Label>
                  <DatePicker
                    date={newEvent.date}
                    dateRange={newEvent.endDate ? { from: newEvent.date, to: newEvent.endDate } : undefined}
                    onSelect={(date) => setNewEvent({ ...newEvent, date: date || new Date(), endDate: undefined, horaFin: undefined })}
                    onSelectRange={(range) => setNewEvent({ 
                      ...newEvent, 
                      date: range?.from || new Date(), 
                      endDate: range?.to 
                    })}
                    placeholder="Seleccionar fecha"
                    mode="single"
                  />
                </div>

                {/* Hora - Solo para fecha única */}
                {!newEvent.endDate && (
                  <div className="calendario-page__form-group">
                    <Label htmlFor="hora-pago" className="calendario-page__form-label">
                      Hora (opcional)
                    </Label>
                    <Input
                      id="hora-pago"
                      type="time"
                      value={newEvent.hora || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, hora: e.target.value })}
                      className="calendario-page__form-input"
                    />
                  </div>
                )}

                {/* Hora Inicio y Fin - Solo para rango de fechas */}
                {newEvent.endDate && (
                  <div className="calendario-page__form-row">
                    <div className="calendario-page__form-group">
                      <Label htmlFor="hora-pago" className="calendario-page__form-label">
                        Hora de Inicio (opcional)
                      </Label>
                      <Input
                        id="hora-pago"
                        type="time"
                        value={newEvent.hora || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, hora: e.target.value })}
                        className="calendario-page__form-input"
                      />
                    </div>
                    <div className="calendario-page__form-group">
                      <Label htmlFor="horaFin-pago" className="calendario-page__form-label">
                        Hora de Fin (opcional)
                      </Label>
                      <Input
                        id="horaFin-pago"
                        type="time"
                        value={newEvent.horaFin || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, horaFin: e.target.value })}
                        className="calendario-page__form-input"
                      />
                    </div>
                  </div>
                )}

                {/* Recordatorio */}
                <div className="calendario-page__form-group">
                  <Label className="calendario-page__form-label">
                    Recordatorio
                  </Label>
                  <div className="calendario-page__recordatorio-options">
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: 'ninguno' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === 'ninguno' || !newEvent.recordatorio ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">notifications_off</span>
                      Sin recordatorio
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: '15min' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === '15min' ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">schedule</span>
                      15 minutos antes
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: '1hora' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === '1hora' ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">schedule</span>
                      1 hora antes
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: '1dia' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === '1dia' ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">event</span>
                      1 día antes
                    </button>
                  </div>
                </div>
              </>
            )}

            {selectedEventType === 'acciones-tareas' && (
              <>
                <div className="calendario-page__form-group">
                  <Label htmlFor="cliente" className="calendario-page__form-label">
                    Cliente
                  </Label>
                  <div className="relative">
                    <Input
                      id="cliente"
                      value={buscarCliente}
                      onChange={(e) => {
                        setBuscarCliente(e.target.value);
                        setMostrarSugerenciasCliente(e.target.value.length >= 2);
                      }}
                      onFocus={() => buscarCliente.length >= 2 && setMostrarSugerenciasCliente(true)}
                      placeholder="Buscar cliente por nombre o email"
                      className="calendario-page__form-input"
                    />
                    {buscarCliente && (
                      <button
                        type="button"
                        onClick={() => {
                          setBuscarCliente('');
                          setMostrarSugerenciasCliente(false);
                          setNewEvent({ ...newEvent, cliente: '', clienteId: undefined });
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    )}
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

                <div className="calendario-page__form-group">
                  <Label htmlFor="crm" className="calendario-page__form-label">
                    Asociar a CRM
                  </Label>
                  <div className="relative">
                    <Input
                      id="crm"
                      value={buscarCRM}
                      onChange={(e) => {
                        setBuscarCRM(e.target.value);
                        setMostrarSugerenciasCRM(e.target.value.length >= 2);
                      }}
                      onFocus={() => buscarCRM.length >= 2 && setMostrarSugerenciasCRM(true)}
                      placeholder="Buscar cotización, expediente, reserva o itinerario"
                      className="calendario-page__form-input"
                    />
                    {buscarCRM && (
                      <button
                        type="button"
                        onClick={() => {
                          setBuscarCRM('');
                          setMostrarSugerenciasCRM(false);
                          setNewEvent({ ...newEvent, crmId: undefined, crmTipo: undefined, crmNumero: undefined });
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    )}
                    {mostrarSugerenciasCRM && getCRMFiltrados().length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {getCRMFiltrados().map((item) => (
                          <div
                            key={`${item.tipo}-${item.id}`}
                            onClick={() => handleSeleccionarCRM(item)}
                            className="px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                          >
                            <div className="flex justify-between items-center font-medium text-slate-900">
                              <span>{item.tipo} {item.numero}</span>
                            </div>
                            <div className="text-sm text-slate-500 mt-1">
                              {item.titulo}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="calendario-page__form-helper">
                    Opcional: Vincula esta tarea con un documento del CRM
                  </p>
                </div>

                <div className="calendario-page__form-group">
                  <Label htmlFor="descripcion" className="calendario-page__form-label">
                    Descripción
                  </Label>
                  <textarea
                    id="descripcion"
                    value={newEvent.descripcion || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, descripcion: e.target.value })}
                    placeholder="Descripción de la acción o tarea"
                    className="calendario-page__form-input calendario-page__form-textarea"
                    rows={3}
                  />
                </div>

                <div className="calendario-page__form-group">
                  <Label htmlFor="archivos" className="calendario-page__form-label">
                    Archivos adjuntos (opcional)
                  </Label>
                  <div className="calendario-page__upload-area">
                    <label htmlFor="archivos-acciones" className="calendario-page__upload-label">
                      <div className="calendario-page__upload-icon">
                        <span className="material-symbols-outlined">cloud_upload</span>
                      </div>
                      <div className="calendario-page__upload-text">
                        <span className="calendario-page__upload-main">Haz clic para subir archivos</span>
                        <span className="calendario-page__upload-hint">o arrastra y suelta aquí</span>
                        <span className="calendario-page__upload-formats">PDF, DOC, DOCX, JPG, PNG (máx. 10MB)</span>
                      </div>
                      <Input
                        id="archivos-acciones"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const files = e.target.files ? Array.from(e.target.files) : [];
                          setNewEvent({ ...newEvent, archivos: [...(newEvent.archivos || []), ...files] });
                        }}
                        className="calendario-page__upload-input"
                      />
                    </label>
                  </div>
                  {newEvent.archivos && newEvent.archivos.length > 0 && (
                    <div className="calendario-page__archivos-lista">
                      {newEvent.archivos.map((archivo, index) => (
                        <div key={index} className="calendario-page__archivo-item">
                          <div className="calendario-page__archivo-info">
                            <span className="material-symbols-outlined">description</span>
                            <div className="calendario-page__archivo-details">
                              <span className="calendario-page__archivo-name">{archivo.name}</span>
                              <span className="calendario-page__archivo-size">
                                {(archivo.size / 1024).toFixed(2)} KB
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newArchivos = newEvent.archivos?.filter((_, i) => i !== index);
                              setNewEvent({ ...newEvent, archivos: newArchivos });
                            }}
                            className="calendario-page__archivo-delete"
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fecha y Hora */}
                <div className="calendario-page__form-group">
                  <Label htmlFor="date-accion" className="calendario-page__form-label">
                    Fecha
                  </Label>
                  <DatePicker
                    date={newEvent.date}
                    dateRange={newEvent.endDate ? { from: newEvent.date, to: newEvent.endDate } : undefined}
                    onSelect={(date) => setNewEvent({ ...newEvent, date: date || new Date(), endDate: undefined, horaFin: undefined })}
                    onSelectRange={(range) => setNewEvent({ 
                      ...newEvent, 
                      date: range?.from || new Date(), 
                      endDate: range?.to 
                    })}
                    placeholder="Seleccionar fecha"
                    mode="single"
                  />
                </div>

                {/* Hora - Solo para fecha única */}
                {!newEvent.endDate && (
                  <div className="calendario-page__form-group">
                    <Label htmlFor="hora-accion" className="calendario-page__form-label">
                      Hora (opcional)
                    </Label>
                    <Input
                      id="hora-accion"
                      type="time"
                      value={newEvent.hora || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, hora: e.target.value })}
                      className="calendario-page__form-input"
                    />
                  </div>
                )}

                {/* Hora Inicio y Fin - Solo para rango de fechas */}
                {newEvent.endDate && (
                  <div className="calendario-page__form-row">
                    <div className="calendario-page__form-group">
                      <Label htmlFor="hora-accion" className="calendario-page__form-label">
                        Hora de Inicio (opcional)
                      </Label>
                      <Input
                        id="hora-accion"
                        type="time"
                        value={newEvent.hora || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, hora: e.target.value })}
                        className="calendario-page__form-input"
                      />
                    </div>
                    <div className="calendario-page__form-group">
                      <Label htmlFor="horaFin-accion" className="calendario-page__form-label">
                        Hora de Fin (opcional)
                      </Label>
                      <Input
                        id="horaFin-accion"
                        type="time"
                        value={newEvent.horaFin || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, horaFin: e.target.value })}
                        className="calendario-page__form-input"
                      />
                    </div>
                  </div>
                )}

                {/* Recordatorio */}
                <div className="calendario-page__form-group">
                  <Label className="calendario-page__form-label">
                    Recordatorio
                  </Label>
                  <div className="calendario-page__recordatorio-options">
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: 'ninguno' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === 'ninguno' || !newEvent.recordatorio ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">notifications_off</span>
                      Sin recordatorio
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: '15min' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === '15min' ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">schedule</span>
                      15 minutos antes
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: '1hora' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === '1hora' ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">schedule</span>
                      1 hora antes
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: '1dia' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === '1dia' ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">event</span>
                      1 día antes
                    </button>
                  </div>
                </div>
              </>
            )}

            {selectedEventType === 'viajes' && (
              <>
                <div className="calendario-page__form-group">
                  <Label htmlFor="cliente" className="calendario-page__form-label">
                    Cliente
                  </Label>
                  <div className="relative">
                    <Input
                      id="cliente"
                      value={buscarCliente}
                      onChange={(e) => {
                        setBuscarCliente(e.target.value);
                        setMostrarSugerenciasCliente(e.target.value.length >= 2);
                      }}
                      onFocus={() => buscarCliente.length >= 2 && setMostrarSugerenciasCliente(true)}
                      placeholder="Buscar cliente por nombre o email"
                      className="calendario-page__form-input"
                    />
                    {buscarCliente && (
                      <button
                        type="button"
                        onClick={() => {
                          setBuscarCliente('');
                          setMostrarSugerenciasCliente(false);
                          setNewEvent({ ...newEvent, cliente: '', clienteId: undefined });
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    )}
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

                <div className="calendario-page__form-group">
                  <Label htmlFor="crm" className="calendario-page__form-label">
                    Asociar a CRM (opcional)
                  </Label>
                  <div className="relative">
                    <Input
                      id="crm"
                      value={buscarCRM}
                      onChange={(e) => {
                        setBuscarCRM(e.target.value);
                        setMostrarSugerenciasCRM(e.target.value.length >= 2);
                      }}
                      onFocus={() => buscarCRM.length >= 2 && setMostrarSugerenciasCRM(true)}
                      placeholder="Buscar cotización, expediente, reserva o itinerario"
                      className="calendario-page__form-input"
                    />
                    {buscarCRM && (
                      <button
                        type="button"
                        onClick={() => {
                          setBuscarCRM('');
                          setMostrarSugerenciasCRM(false);
                          setNewEvent({ ...newEvent, crmId: undefined, crmTipo: undefined, crmNumero: undefined });
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    )}
                    {mostrarSugerenciasCRM && getCRMFiltrados().length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {getCRMFiltrados().map((item) => (
                          <div
                            key={`${item.tipo}-${item.id}`}
                            onClick={() => handleSeleccionarCRM(item)}
                            className="px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                          >
                            <div className="flex justify-between items-center font-medium text-slate-900">
                              <span>{item.tipo} {item.numero}</span>
                            </div>
                            <div className="text-sm text-slate-500 mt-1">
                              {item.titulo}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="calendario-page__form-group">
                  <Label htmlFor="destino" className="calendario-page__form-label">
                    Destino
                  </Label>
                  <Input
                    id="destino"
                    value={newEvent.destino || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, destino: e.target.value })}
                    placeholder="Ej: Cancún, México"
                    className="calendario-page__form-input"
                  />
                </div>

                <div className="calendario-page__form-group">
                  <Label htmlFor="aeropuerto" className="calendario-page__form-label">
                    Aeropuerto
                  </Label>
                  <div className="relative">
                    <Input
                      id="aeropuerto"
                      value={buscarAeropuerto}
                      onChange={(e) => {
                        setBuscarAeropuerto(e.target.value);
                        setMostrarSugerenciasAeropuerto(e.target.value.length >= 2);
                      }}
                      onFocus={() => buscarAeropuerto.length >= 2 && setMostrarSugerenciasAeropuerto(true)}
                      placeholder="Buscar por código, nombre o país"
                      className="calendario-page__form-input"
                    />
                    {buscarAeropuerto && (
                      <button
                        type="button"
                        onClick={() => {
                          setBuscarAeropuerto('');
                          setMostrarSugerenciasAeropuerto(false);
                          setNewEvent({ ...newEvent, aeropuerto: '' });
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    )}
                    {mostrarSugerenciasAeropuerto && getAeropuertosFiltrados().length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {getAeropuertosFiltrados().map((aeropuerto) => (
                          <div
                            key={aeropuerto.codigo}
                            onClick={() => handleSeleccionarAeropuerto(aeropuerto)}
                            className="px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                          >
                            <div className="flex justify-between items-center font-medium text-slate-900">
                              <span>{aeropuerto.codigo}</span>
                              <span className="text-xs text-slate-500">{aeropuerto.pais}</span>
                            </div>
                            <div className="text-sm text-slate-500 mt-1">
                              {aeropuerto.nombre}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="calendario-page__form-row">
                  <div className="calendario-page__form-group">
                    <Label htmlFor="numeroVuelo" className="calendario-page__form-label">
                      N° Vuelo
                    </Label>
                    <Input
                      id="numeroVuelo"
                      value={newEvent.numeroVuelo || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, numeroVuelo: e.target.value })}
                      placeholder="Ej: AA 1234"
                      className="calendario-page__form-input"
                    />
                  </div>
                  <div className="calendario-page__form-group">
                    <Label htmlFor="aerolinea" className="calendario-page__form-label">
                      Aerolínea
                    </Label>
                    <Input
                      id="aerolinea"
                      value={newEvent.aerolinea || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, aerolinea: e.target.value })}
                      placeholder="Ej: American Airlines"
                      className="calendario-page__form-input"
                    />
                  </div>
                </div>

                <div className="calendario-page__form-group">
                  <Label htmlFor="descripcion" className="calendario-page__form-label">
                    Descripción (opcional)
                  </Label>
                  <textarea
                    id="descripcion"
                    value={newEvent.descripcion || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, descripcion: e.target.value })}
                    placeholder="Detalles adicionales del viaje"
                    className="calendario-page__form-input calendario-page__form-textarea"
                    rows={3}
                  />
                </div>

                {/* Fecha y Hora */}
                <div className="calendario-page__form-group">
                  <Label htmlFor="date-viaje" className="calendario-page__form-label">
                    Fecha
                  </Label>
                  <DatePicker
                    date={newEvent.date}
                    dateRange={newEvent.endDate ? { from: newEvent.date, to: newEvent.endDate } : undefined}
                    onSelect={(date) => setNewEvent({ ...newEvent, date: date || new Date(), endDate: undefined, horaFin: undefined })}
                    onSelectRange={(range) => setNewEvent({ 
                      ...newEvent, 
                      date: range?.from || new Date(), 
                      endDate: range?.to 
                    })}
                    placeholder="Seleccionar fecha"
                    mode="single"
                  />
                </div>

                {/* Hora - Solo para fecha única */}
                {!newEvent.endDate && (
                  <div className="calendario-page__form-group">
                    <Label htmlFor="hora-viaje" className="calendario-page__form-label">
                      Hora (opcional)
                    </Label>
                    <Input
                      id="hora-viaje"
                      type="time"
                      value={newEvent.hora || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, hora: e.target.value })}
                      className="calendario-page__form-input"
                    />
                  </div>
                )}

                {/* Hora Inicio y Fin - Solo para rango de fechas */}
                {newEvent.endDate && (
                  <div className="calendario-page__form-row">
                    <div className="calendario-page__form-group">
                      <Label htmlFor="hora-viaje" className="calendario-page__form-label">
                        Hora de Inicio (opcional)
                      </Label>
                      <Input
                        id="hora-viaje"
                        type="time"
                        value={newEvent.hora || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, hora: e.target.value })}
                        className="calendario-page__form-input"
                      />
                    </div>
                    <div className="calendario-page__form-group">
                      <Label htmlFor="horaFin-viaje" className="calendario-page__form-label">
                        Hora de Fin (opcional)
                      </Label>
                      <Input
                        id="horaFin-viaje"
                        type="time"
                        value={newEvent.horaFin || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, horaFin: e.target.value })}
                        className="calendario-page__form-input"
                      />
                    </div>
                  </div>
                )}

                {/* Recordatorio */}
                <div className="calendario-page__form-group">
                  <Label className="calendario-page__form-label">
                    Recordatorio
                  </Label>
                  <div className="calendario-page__recordatorio-options">
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: 'ninguno' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === 'ninguno' || !newEvent.recordatorio ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">notifications_off</span>
                      Sin recordatorio
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: '15min' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === '15min' ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">schedule</span>
                      15 minutos antes
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: '1hora' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === '1hora' ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">schedule</span>
                      1 hora antes
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, recordatorio: '1dia' })}
                      className={`calendario-page__recordatorio-option ${newEvent.recordatorio === '1dia' ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined">event</span>
                      1 día antes
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateEvent}
              className="bg-slate-700 hover:bg-slate-800 text-white"
              disabled={!newEvent.text}
            >
              Crear Evento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

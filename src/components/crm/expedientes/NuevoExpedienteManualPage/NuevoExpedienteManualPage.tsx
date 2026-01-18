'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ImageSearchModal } from '@/components/shared/ImageSearchModal';
import { DatePicker } from '@/components/ui/date-picker';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Cliente {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface ElementoExpediente {
  id: string;
  tipo: 'cotizacion' | 'reserva' | 'itinerario';
  numero: string;
  descripcion: string;
  monto: number;
  cliente?: string;
  destino?: string;
  fecha?: string;
}

interface Cotizacion {
  id: string;
  nroCotizacion: string;
  cliente: string;
  destino: string;
  fecha: string;
  monto: number;
  estado: string;
}

interface Reserva {
  id: string;
  localizador: string;
  cliente: string;
  destino: string;
  fechaSalida: string;
  monto: number;
  estado: string;
}

interface Itinerario {
  id: string;
  numeroItinerario: string;
  cliente: string;
  destino: string;
  fecha: string;
  monto: number;
  estado: string;
}

export function NuevoExpedienteManualPage() {
  const router = useRouter();
  const [coverImage, setCoverImage] = useState<string>('');
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [elementos, setElementos] = useState<ElementoExpediente[]>([]);
  const [travelers, setTravelers] = useState<Cliente[]>([]);
  const [mostrarSelectorTravelers, setMostrarSelectorTravelers] = useState(false);
  const [buscarTraveler, setBuscarTraveler] = useState('');
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  const [buscarElemento, setBuscarElemento] = useState('');
  const [tipoElementoBusqueda, setTipoElementoBusqueda] = useState<'cotizacion' | 'reserva' | 'itinerario'>('cotizacion');
  const [mostrarResultadosBusqueda, setMostrarResultadosBusqueda] = useState(false);
  const [isNewItinerarioModalOpen, setIsNewItinerarioModalOpen] = useState(false);
  
  // Datos mock de cotizaciones y reservas del sistema
  const cotizacionesMock: Cotizacion[] = [
    {
      id: '1',
      nroCotizacion: 'COT-001',
      cliente: 'Miguel Zabala',
      destino: 'Toscana, Italia',
      fecha: '15 feb 2026',
      monto: 476.00,
      estado: 'Enviada'
    },
    {
      id: '2',
      nroCotizacion: 'COT-002',
      cliente: 'Arieldi Marrero',
      destino: 'Punta Cana, República Dominicana',
      fecha: '20 mar 2026',
      monto: 2800.00,
      estado: 'Pendiente'
    }
  ];

  const reservasMock: Reserva[] = [
    {
      id: '1',
      localizador: 'AZC-2',
      cliente: 'Arieldi Marrero',
      destino: 'Cancún, México',
      fechaSalida: '24 ene 2026',
      monto: 651.55,
      estado: 'Finalizada'
    },
    {
      id: '2',
      localizador: 'AZC-1',
      cliente: 'Arieldi Marrero',
      destino: 'Punta Cana, RD',
      fechaSalida: '24 ene 2026',
      monto: 298.53,
      estado: 'Finalizada'
    }
  ];

  const itinerariosMock: Itinerario[] = [
    {
      id: '1',
      numeroItinerario: 'ITI-001',
      cliente: 'Miguel Zabala',
      destino: 'Toscana, Italia',
      fecha: '15 feb 2026',
      monto: 476.00,
      estado: 'Enviado'
    },
    {
      id: '2',
      numeroItinerario: 'ITI-002',
      cliente: 'Arieldi Marrero',
      destino: 'Punta Cana, República Dominicana',
      fecha: '20 mar 2026',
      monto: 2800.00,
      estado: 'Pendiente'
    }
  ];
  
  const [expediente, setExpediente] = useState({
    titulo: '',
    numeroExpediente: `EXP-${Date.now().toString().slice(-6)}`,
    // Cliente
    clienteNombre: '',
    clienteEmail: '',
    clienteTelefono: '',
    clienteDireccion: '',
    // Información del viaje
    destino: '',
    fechaViaje: '',
    fechaRegreso: '',
    // Pasajeros
    adultos: 1,
    ninos: 0,
    infantes: 0,
    // Estado
    estado: 'activo',
    // Notas
    notas: '',
    observaciones: '',
  });

  // Cargar clientes del localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm_clients');
      if (stored) {
        setClientes(JSON.parse(stored));
      }
    }
  }, []);

  // Buscar clientes mientras se escribe
  const handleBuscarCliente = (texto: string) => {
    setExpediente({...expediente, clienteNombre: texto});
    
    if (texto.length >= 2) {
      const filtrados = clientes.filter(cliente => {
        const nombreCompleto = `${cliente.firstName} ${cliente.lastName}`.toLowerCase();
        return nombreCompleto.includes(texto.toLowerCase());
      });
      setClientesFiltrados(filtrados);
      setMostrarSugerencias(filtrados.length > 0);
    } else {
      setClientesFiltrados([]);
      setMostrarSugerencias(false);
    }
  };

  // Seleccionar un cliente de las sugerencias
  const handleSeleccionarCliente = (cliente: Cliente) => {
    setClienteSeleccionado(cliente);
    setExpediente({
      ...expediente,
      clienteNombre: `${cliente.firstName} ${cliente.lastName}`,
      clienteEmail: cliente.email || '',
      clienteTelefono: cliente.phone || '',
      clienteDireccion: cliente.address || '',
    });
    setMostrarSugerencias(false);
  };

  // Agregar traveler
  const handleAgregarTraveler = (cliente: Cliente) => {
    if (!travelers.find(t => t.id === cliente.id)) {
      setTravelers([...travelers, cliente]);
    }
    setBuscarTraveler('');
  };

  // Eliminar traveler
  const handleEliminarTraveler = (clienteId: string) => {
    setTravelers(travelers.filter(t => t.id !== clienteId));
  };

  // Filtrar travelers para búsqueda
  const getTravelersDisponibles = () => {
    if (buscarTraveler.length < 2) return [];
    return clientes.filter(cliente => {
      const nombreCompleto = `${cliente.firstName} ${cliente.lastName}`.toLowerCase();
      const yaAgregado = travelers.find(t => t.id === cliente.id);
      return nombreCompleto.includes(buscarTraveler.toLowerCase()) && !yaAgregado;
    });
  };

  // Buscar cotizaciones
  const getCotizacionesDisponibles = (): Cotizacion[] => {
    if (buscarElemento.length < 2) return [];
    return cotizacionesMock.filter(cot => {
      const yaAgregado = elementos.find(e => e.id === cot.id && e.tipo === 'cotizacion');
      const coincide = 
        cot.nroCotizacion.toLowerCase().includes(buscarElemento.toLowerCase()) ||
        cot.cliente.toLowerCase().includes(buscarElemento.toLowerCase()) ||
        cot.destino.toLowerCase().includes(buscarElemento.toLowerCase());
      return coincide && !yaAgregado;
    });
  };

  // Buscar reservas
  const getReservasDisponibles = (): Reserva[] => {
    if (buscarElemento.length < 2) return [];
    return reservasMock.filter(res => {
      const yaAgregado = elementos.find(e => e.id === res.id && e.tipo === 'reserva');
      const coincide = 
        res.localizador.toLowerCase().includes(buscarElemento.toLowerCase()) ||
        res.cliente.toLowerCase().includes(buscarElemento.toLowerCase()) ||
        res.destino.toLowerCase().includes(buscarElemento.toLowerCase());
      return coincide && !yaAgregado;
    });
  };

  // Buscar itinerarios
  const getItinerariosDisponibles = (): Itinerario[] => {
    if (buscarElemento.length < 2) return [];
    return itinerariosMock.filter(iti => {
      const yaAgregado = elementos.find(e => e.id === iti.id && e.tipo === 'itinerario');
      const coincide = 
        iti.numeroItinerario.toLowerCase().includes(buscarElemento.toLowerCase()) ||
        iti.cliente.toLowerCase().includes(buscarElemento.toLowerCase()) ||
        iti.destino.toLowerCase().includes(buscarElemento.toLowerCase());
      return coincide && !yaAgregado;
    });
  };

  // Agregar cotización
  const handleAgregarCotizacion = (cotizacion: Cotizacion) => {
    const nuevoElemento: ElementoExpediente = {
      id: cotizacion.id,
      tipo: 'cotizacion',
      numero: cotizacion.nroCotizacion,
      descripcion: cotizacion.destino,
      monto: cotizacion.monto,
      cliente: cotizacion.cliente,
      destino: cotizacion.destino,
      fecha: cotizacion.fecha,
    };
    setElementos([...elementos, nuevoElemento]);
    setBuscarElemento('');
    setMostrarResultadosBusqueda(false);
  };

  // Agregar reserva
  const handleAgregarReserva = (reserva: Reserva) => {
    const nuevoElemento: ElementoExpediente = {
      id: reserva.id,
      tipo: 'reserva',
      numero: reserva.localizador,
      descripcion: reserva.destino,
      monto: reserva.monto,
      cliente: reserva.cliente,
      destino: reserva.destino,
      fecha: reserva.fechaSalida,
    };
    setElementos([...elementos, nuevoElemento]);
    setBuscarElemento('');
    setMostrarResultadosBusqueda(false);
  };

  // Agregar itinerario
  const handleAgregarItinerario = (itinerario: Itinerario) => {
    const nuevoElemento: ElementoExpediente = {
      id: itinerario.id,
      tipo: 'itinerario',
      numero: itinerario.numeroItinerario,
      descripcion: itinerario.destino,
      monto: itinerario.monto,
      cliente: itinerario.cliente,
      destino: itinerario.destino,
      fecha: itinerario.fecha,
    };
    setElementos([...elementos, nuevoElemento]);
    setBuscarElemento('');
    setMostrarResultadosBusqueda(false);
  };

  const handleEliminarElemento = (id: string) => {
    setElementos(elementos.filter(elem => elem.id !== id));
  };

  const calcularTotal = () => {
    return elementos.reduce((total, elem) => total + (elem.monto || 0), 0);
  };

  const handleGuardar = () => {
    console.log('Guardando expediente:', { expediente, elementos, coverImage });
    router.push('/es/crm/expedientes');
  };

  return (
    <div className="space-y-6 w-full">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink 
              onClick={() => router.push('/es/crm/expedientes')}
              className="cursor-pointer"
            >
              Expedientes
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Nuevo expediente</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Nuevo expediente</h1>
          <p className="text-slate-600 mt-1">Completa la información para crear un expediente de viaje</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.push('/es/crm/expedientes')}>
            <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>close</span>
            Cancelar
          </Button>
          <Button className="bg-slate-700 hover:bg-slate-800" onClick={handleGuardar}>
            <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>save</span>
            Guardar Expediente
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal - Formulario */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Información General */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>info</span>
                Información General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numeroExpediente">N° Expediente *</Label>
                  <Input
                    id="numeroExpediente"
                    value={expediente.numeroExpediente}
                    onChange={(e) => setExpediente({...expediente, numeroExpediente: e.target.value})}
                    className="bg-slate-50"
                  />
                </div>
                <div>
                  <Label htmlFor="estado">Estado *</Label>
                  <Select value={expediente.estado} onValueChange={(value) => setExpediente({...expediente, estado: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="cerrado">Cerrado</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="titulo">Título del Expediente *</Label>
                <Input
                  id="titulo"
                  placeholder="Ej: Viaje a Cancún - Familia Zabala"
                  value={expediente.titulo}
                  onChange={(e) => setExpediente({...expediente, titulo: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="cover">Imagen de Portada</Label>
                <input
                  type="file"
                  id="cover"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        alert('La imagen no debe superar 5MB');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setCoverImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                
                {!coverImage ? (
                  <div className="mt-2 space-y-3">
                    <div 
                      className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors cursor-pointer"
                      onClick={() => document.getElementById('cover')?.click()}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="material-symbols-outlined text-4xl text-slate-400" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                          upload
                        </span>
                        <p className="text-sm text-slate-600">Haz clic para subir una imagen desde tu dispositivo</p>
                        <p className="text-xs text-slate-500">PNG, JPG hasta 5MB</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex-1 border-t border-slate-200"></div>
                      <span className="text-xs text-slate-500 uppercase">o</span>
                      <div className="flex-1 border-t border-slate-200"></div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsImageSearchOpen(true)}
                    >
                      <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                        image_search
                      </span>
                      Buscar imagen en bibliotecas
                    </Button>
                  </div>
                ) : (
                  <div className="mt-2 relative rounded-lg overflow-hidden border-2 border-slate-200">
                    <img 
                      src={coverImage} 
                      alt="Cover" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => document.getElementById('cover')?.click()}
                      >
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                          upload
                        </span>
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => setIsImageSearchOpen(true)}
                      >
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                          image_search
                        </span>
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => setCoverImage('')}
                      >
                        <span className="material-symbols-outlined text-sm text-red-600" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                          delete
                        </span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Información del Cliente */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>person</span>
                Información del Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Label htmlFor="clienteNombre">Nombre del Cliente *</Label>
                <Input
                  id="clienteNombre"
                  placeholder="Buscar o escribir nombre completo"
                  value={expediente.clienteNombre}
                  onChange={(e) => handleBuscarCliente(e.target.value)}
                  className={clienteSeleccionado ? 'border-green-500' : ''}
                />
                {clienteSeleccionado && (
                  <div className="absolute right-3 top-9 text-green-600">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>
                      check_circle
                    </span>
                  </div>
                )}
                {mostrarSugerencias && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {clientesFiltrados.map((cliente) => (
                      <button
                        key={cliente.id}
                        type="button"
                        className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 border-b last:border-b-0"
                        onClick={() => handleSeleccionarCliente(cliente)}
                      >
                        <span className="material-symbols-outlined text-slate-400" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                          person
                        </span>
                        <div>
                          <div className="font-medium text-slate-900">{cliente.firstName} {cliente.lastName}</div>
                          {cliente.email && <div className="text-sm text-slate-500">{cliente.email}</div>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clienteEmail">Email</Label>
                  <Input
                    id="clienteEmail"
                    type="email"
                    placeholder="cliente@ejemplo.com"
                    value={expediente.clienteEmail}
                    onChange={(e) => setExpediente({...expediente, clienteEmail: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="clienteTelefono">Teléfono</Label>
                  <Input
                    id="clienteTelefono"
                    placeholder="+1 (555) 123-4567"
                    value={expediente.clienteTelefono}
                    onChange={(e) => setExpediente({...expediente, clienteTelefono: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="clienteDireccion">Dirección</Label>
                <Input
                  id="clienteDireccion"
                  placeholder="Dirección completa"
                  value={expediente.clienteDireccion}
                  onChange={(e) => setExpediente({...expediente, clienteDireccion: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pasajeros */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>group</span>
                Pasajeros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">Selecciona los clientes que viajarán en este expediente</p>
              
              {/* Selector de pasajeros */}
              <div className="relative">
                <Input
                  placeholder="Buscar clientes para agregar como pasajeros"
                  value={buscarTraveler}
                  onChange={(e) => {
                    setBuscarTraveler(e.target.value);
                    setMostrarSelectorTravelers(e.target.value.length >= 2);
                  }}
                  onFocus={() => buscarTraveler.length >= 2 && setMostrarSelectorTravelers(true)}
                />
                
                {mostrarSelectorTravelers && getTravelersDisponibles().length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {getTravelersDisponibles().map((cliente) => (
                      <button
                        key={cliente.id}
                        type="button"
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3 border-b last:border-b-0"
                        onClick={() => {
                          handleAgregarTraveler(cliente);
                          setMostrarSelectorTravelers(false);
                        }}
                      >
                        <span className="material-symbols-outlined text-slate-400" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                          person_add
                        </span>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">{cliente.firstName} {cliente.lastName}</div>
                          {cliente.email && <div className="text-sm text-slate-500">{cliente.email}</div>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Lista de pasajeros seleccionados */}
              {travelers.length > 0 && (
                <div className="space-y-2">
                  <Label>Pasajeros seleccionados ({travelers.length})</Label>
                  <div className="space-y-2">
                    {travelers.map((traveler) => (
                      <div key={traveler.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-600" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                            person
                          </span>
                          <div>
                            <div className="font-medium text-slate-900">{traveler.firstName} {traveler.lastName}</div>
                            {traveler.email && <div className="text-xs text-slate-500">{traveler.email}</div>}
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEliminarTraveler(traveler.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                            close
                          </span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {travelers.length === 0 && (
                <div className="text-center py-6 text-slate-500 border-2 border-dashed border-slate-200 rounded-lg">
                  <span className="material-symbols-outlined text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>person_search</span>
                  <p className="text-sm">No hay pasajeros agregados</p>
                  <p className="text-xs mt-1">Busca y agrega clientes del sistema</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Información del Viaje */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>public</span>
                Información del Viaje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="destino">Destino Principal *</Label>
                <Input
                  id="destino"
                  placeholder="Ej: Cancún, México"
                  value={expediente.destino}
                  onChange={(e) => setExpediente({...expediente, destino: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="fechaViaje">Fechas del Viaje *</Label>
                <DatePicker
                  date={expediente.fechaViaje ? new Date(expediente.fechaViaje) : undefined}
                  dateRange={expediente.fechaViaje && expediente.fechaRegreso ? { from: new Date(expediente.fechaViaje), to: new Date(expediente.fechaRegreso) } : undefined}
                  onSelect={(date) => setExpediente({...expediente, fechaViaje: date ? date.toISOString().split('T')[0] : '', fechaRegreso: ''})}
                  onSelectRange={(range) => setExpediente({...expediente, fechaViaje: range?.from ? range.from.toISOString().split('T')[0] : '', fechaRegreso: range?.to ? range.to.toISOString().split('T')[0] : ''})}
                  placeholder="Seleccionar fecha o rango"
                  mode="range"
                />
              </div>
            </CardContent>
          </Card>


          {/* Cotizaciones, Reservas e Itinerarios */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>folder_open</span>
                Cotizaciones, Reservas e Itinerarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">Busca y agrega cotizaciones, reservas o itinerarios existentes del sistema</p>
              
              {/* Selector de tipo y buscador */}
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant={tipoElementoBusqueda === 'cotizacion' ? 'default' : 'outline'}
                    onClick={() => {
                      setTipoElementoBusqueda('cotizacion');
                      setBuscarElemento('');
                      setMostrarResultadosBusqueda(false);
                    }}
                    className={tipoElementoBusqueda === 'cotizacion' ? 'bg-slate-700 hover:bg-slate-800' : ''}
                  >
                    <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                      description
                    </span>
                    Cotizaciones
                  </Button>
                  <Button
                    type="button"
                    variant={tipoElementoBusqueda === 'reserva' ? 'default' : 'outline'}
                    onClick={() => {
                      setTipoElementoBusqueda('reserva');
                      setBuscarElemento('');
                      setMostrarResultadosBusqueda(false);
                    }}
                    className={tipoElementoBusqueda === 'reserva' ? 'bg-slate-700 hover:bg-slate-800' : ''}
                  >
                    <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                      airplane_ticket
                    </span>
                    Reservas
                  </Button>
                  <Button
                    type="button"
                    variant={tipoElementoBusqueda === 'itinerario' ? 'default' : 'outline'}
                    onClick={() => {
                      setTipoElementoBusqueda('itinerario');
                      setBuscarElemento('');
                      setMostrarResultadosBusqueda(false);
                    }}
                    className={tipoElementoBusqueda === 'itinerario' ? 'bg-slate-700 hover:bg-slate-800' : ''}
                  >
                    <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                      route
                    </span>
                    Itinerarios
                  </Button>
                </div>

                <div className="relative">
                  <div className="flex gap-2">
                    <Input
                      placeholder={`Buscar ${tipoElementoBusqueda === 'cotizacion' ? 'cotizaciones' : tipoElementoBusqueda === 'reserva' ? 'reservas' : 'itinerarios'} por número, cliente o destino`}
                      value={buscarElemento}
                      onChange={(e) => {
                        setBuscarElemento(e.target.value);
                        setMostrarResultadosBusqueda(e.target.value.length >= 2);
                      }}
                      onFocus={() => buscarElemento.length >= 2 && setMostrarResultadosBusqueda(true)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (tipoElementoBusqueda === 'cotizacion') {
                          router.push('/es/crm/cotizaciones/nueva-manual');
                        } else if (tipoElementoBusqueda === 'reserva') {
                          router.push('/es/crm/reservas/nueva-manual');
                        } else {
                          setIsNewItinerarioModalOpen(true);
                        }
                      }}
                      className="whitespace-nowrap"
                    >
                      <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                        add
                      </span>
                      {tipoElementoBusqueda === 'cotizacion' ? 'Nueva Cotización' : tipoElementoBusqueda === 'reserva' ? 'Nueva Reserva' : 'Nuevo Itinerario'}
                    </Button>
                  </div>
                  
                  {mostrarResultadosBusqueda && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {tipoElementoBusqueda === 'cotizacion' ? (
                        // Resultados de cotizaciones
                        getCotizacionesDisponibles().map((cotizacion) => (
                          <button
                            key={cotizacion.id}
                            type="button"
                            className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3 border-b last:border-b-0"
                            onClick={() => handleAgregarCotizacion(cotizacion)}
                          >
                            <span className="material-symbols-outlined text-slate-400" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                              description
                            </span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-900">{cotizacion.nroCotizacion}</span>
                                <Badge variant="outline" className="text-xs">{cotizacion.estado}</Badge>
                              </div>
                              <div className="text-sm text-slate-600">{cotizacion.cliente} • {cotizacion.destino}</div>
                              <div className="text-xs text-slate-500">{cotizacion.fecha} • ${cotizacion.monto.toFixed(2)}</div>
                            </div>
                          </button>
                        ))
                      ) : tipoElementoBusqueda === 'reserva' ? (
                        // Resultados de reservas
                        getReservasDisponibles().map((reserva) => (
                          <button
                            key={reserva.id}
                            type="button"
                            className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3 border-b last:border-b-0"
                            onClick={() => handleAgregarReserva(reserva)}
                          >
                            <span className="material-symbols-outlined text-slate-400" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                              airplane_ticket
                            </span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-900">{reserva.localizador}</span>
                                <Badge variant="outline" className="text-xs">{reserva.estado}</Badge>
                              </div>
                              <div className="text-sm text-slate-600">{reserva.cliente} • {reserva.destino}</div>
                              <div className="text-xs text-slate-500">{reserva.fechaSalida} • ${reserva.monto.toFixed(2)}</div>
                            </div>
                          </button>
                        ))
                      ) : (
                        // Resultados de itinerarios
                        getItinerariosDisponibles().map((itinerario) => (
                          <button
                            key={itinerario.id}
                            type="button"
                            className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3 border-b last:border-b-0"
                            onClick={() => handleAgregarItinerario(itinerario)}
                          >
                            <span className="material-symbols-outlined text-slate-400" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                              route
                            </span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-900">{itinerario.numeroItinerario}</span>
                                <Badge variant="outline" className="text-xs">{itinerario.estado}</Badge>
                              </div>
                              <div className="text-sm text-slate-600">{itinerario.cliente} • {itinerario.destino}</div>
                              <div className="text-xs text-slate-500">{itinerario.fecha} • ${itinerario.monto.toFixed(2)}</div>
                            </div>
                          </button>
                        ))
                      )}
                      
                      {/* Empty state cuando no hay resultados */}
                      {tipoElementoBusqueda === 'cotizacion' && getCotizacionesDisponibles().length === 0 && (
                        <div className="px-4 py-6 text-center text-slate-500">
                          <p className="text-sm">No se encontraron cotizaciones</p>
                        </div>
                      )}
                      {tipoElementoBusqueda === 'reserva' && getReservasDisponibles().length === 0 && (
                        <div className="px-4 py-6 text-center text-slate-500">
                          <p className="text-sm">No se encontraron reservas</p>
                        </div>
                      )}
                      {tipoElementoBusqueda === 'itinerario' && getItinerariosDisponibles().length === 0 && (
                        <div className="px-4 py-6 text-center text-slate-500">
                          <p className="text-sm">No se encontraron itinerarios</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Lista de elementos agregados */}
              {elementos.length > 0 && (
                <div className="space-y-2">
                  <Label>Elementos agregados ({elementos.length})</Label>
                  <div className="space-y-2">
                    {elementos.map((elemento) => (
                      <div key={elemento.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-600" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                            {elemento.tipo === 'cotizacion' ? 'description' : elemento.tipo === 'reserva' ? 'airplane_ticket' : 'route'}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-900">{elemento.numero}</span>
                              <Badge variant="outline" className="text-xs capitalize">{elemento.tipo}</Badge>
                            </div>
                            <div className="text-sm text-slate-600">{elemento.cliente} • {elemento.destino}</div>
                            <div className="text-xs text-slate-500">{elemento.fecha} • ${elemento.monto.toFixed(2)}</div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEliminarElemento(elemento.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                            close
                          </span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {elementos.length === 0 && (
                <div className="text-center py-6 text-slate-500 border-2 border-dashed border-slate-200 rounded-lg">
                  <span className="material-symbols-outlined text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>search</span>
                  <p className="text-sm">No hay elementos agregados</p>
                  <p className="text-xs mt-1">Busca cotizaciones, reservas o itinerarios del sistema</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notas y Observaciones */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>note</span>
                Notas y Observaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="notas">Notas Internas</Label>
                <Textarea
                  id="notas"
                  placeholder="Notas para uso interno..."
                  rows={4}
                  value={expediente.notas}
                  onChange={(e) => setExpediente({...expediente, notas: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="observaciones">Observaciones para el Cliente</Label>
                <Textarea
                  id="observaciones"
                  placeholder="Observaciones que verá el cliente..."
                  rows={4}
                  value={expediente.observaciones}
                  onChange={(e) => setExpediente({...expediente, observaciones: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna lateral - Resumen */}
        <div className="lg:col-span-1">
          <Card className="shadow-none sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>summarize</span>
                Resumen del Expediente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Información básica */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">N° Expediente</span>
                  <span className="font-medium text-slate-900">{expediente.numeroExpediente || '-'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Estado</span>
                  <Badge variant="outline" className="capitalize">{expediente.estado}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Cliente</span>
                  <span className="font-medium text-slate-900 text-right">{expediente.clienteNombre || '-'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Destino</span>
                  <span className="font-medium text-slate-900 text-right">{expediente.destino || '-'}</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-slate-400" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>group</span>
                  <span className="text-slate-600">Pasajeros:</span>
                  <span className="font-medium text-slate-900">{travelers.length}</span>
                </div>
                {travelers.length > 0 && (
                  <div className="ml-7 space-y-1">
                    {travelers.map((traveler, index) => (
                      <div key={traveler.id} className="text-xs text-slate-500">
                        {index + 1}. {traveler.firstName} {traveler.lastName}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-slate-400" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>description</span>
                  <span className="text-slate-600">Elementos:</span>
                  <span className="font-medium text-slate-900">{elementos.length}</span>
                </div>
                {elementos.length > 0 && (
                  <div className="ml-7 space-y-1">
                    <div className="text-xs text-slate-500">
                      Cotizaciones: {elementos.filter(e => e.tipo === 'cotizacion').length}
                    </div>
                    <div className="text-xs text-slate-500">
                      Reservas: {elementos.filter(e => e.tipo === 'reserva').length}
                    </div>
                    <div className="text-xs text-slate-500">
                      Itinerarios: {elementos.filter(e => e.tipo === 'itinerario').length}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>payments</span>
                    <span className="font-semibold text-slate-900">Valor Total</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-900">
                    ${calcularTotal().toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Monto acumulado de cotizaciones y reservas
                </p>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de búsqueda de imágenes */}
      <ImageSearchModal
        isOpen={isImageSearchOpen}
        onClose={() => setIsImageSearchOpen(false)}
        onSelectImage={(imageUrl) => setCoverImage(imageUrl)}
      />

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
                window.open('https://azucartravel.com/?tripType=TRIP_PLANNER', '_blank', 'noopener,noreferrer');
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
                router.push('/es/crm/itinerarios-ia/nuevo-manual');
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
  );
}

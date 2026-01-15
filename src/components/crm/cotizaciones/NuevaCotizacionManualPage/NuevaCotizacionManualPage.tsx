'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ImageSearchModal } from '@/components/shared/ImageSearchModal';

interface Servicio {
  id: string;
  tipo: 'vuelo' | 'hotel' | 'traslado' | 'tren' | 'bus' | 'crucero' | 'actividad' | 'paquetes' | 'otro';
  datos: any;
}

interface Cliente {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
}

export function NuevaCotizacionManualPage() {
  const router = useRouter();
  const [coverImage, setCoverImage] = useState<string>('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [servicioSeleccionado, setServicioSeleccionado] = useState<string>('');
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  
  const [cotizacion, setCotizacion] = useState({
    titulo: '',
    // Cliente
    tipoCliente: 'persona' as 'persona' | 'empresa',
    clienteNombre: '',
    clienteEmail: '',
    clienteTelefono: '',
    clienteDireccion: '',
    clienteNacionalidad: '',
    nombreEmpresa: '',
    // Pasajeros
    adultos: 1,
    ninos: 0,
    infantes: 0,
    // Fechas
    fechaIda: '',
    fechaVuelta: '',
    // Notas
    notas: '',
    terminosCondiciones: '',
    notaInterna: '',
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
    setCotizacion({...cotizacion, clienteNombre: texto});
    
    if (texto.length >= 2) {
      const textoLower = texto.toLowerCase();
      const filtrados = clientes.filter(cliente => {
        const nombreCompleto = `${cliente.firstName} ${cliente.lastName}`.toLowerCase();
        const email = (cliente.email || '').toLowerCase();
        const telefono = (cliente.phone || '').toLowerCase();
        
        return nombreCompleto.includes(textoLower) || 
               email.includes(textoLower) || 
               telefono.includes(textoLower);
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
    setCotizacion({
      ...cotizacion,
      clienteNombre: `${cliente.firstName} ${cliente.lastName}`,
      clienteEmail: cliente.email || '',
      clienteTelefono: cliente.phone || '',
      clienteDireccion: cliente.address || '',
    });
    setMostrarSugerencias(false);
  };

  const handleAddServicio = (tipo: Servicio['tipo']) => {
    const nuevoServicio: Servicio = {
      id: Date.now().toString(),
      tipo,
      datos: getDefaultDatos(tipo),
    };
    setServicios([...servicios, nuevoServicio]);
    // Resetear el select para poder agregar más servicios
    setServicioSeleccionado('');
  };

  const getDefaultDatos = (tipo: Servicio['tipo']) => {
    switch (tipo) {
      case 'vuelo':
        return { origen: '', destino: '', fechaIda: '', fechaVuelta: '', aerolinea: '', clase: 'economica', precio: 0 };
      case 'hotel':
        return { nombre: '', ubicacion: '', checkIn: '', checkOut: '', noches: 1, tipoHabitacion: '', acomodacion: '', precio: 0 };
      case 'traslado':
        return { origen: '', destino: '', fecha: '', tipoVehiculo: '', precio: 0 };
      case 'tren':
        return { origen: '', destino: '', fecha: '', clase: '', precio: 0 };
      case 'bus':
        return { origen: '', destino: '', fecha: '', compania: '', precio: 0 };
      case 'paquetes':
        return { nombre: '', destino: '', fechaInicio: '', fechaFin: '', noches: 1, descripcion: '', precio: 0 };
      case 'crucero':
        return { naviera: '', itinerario: '', fechaInicio: '', fechaFin: '', cabina: '', precio: 0 };
      case 'actividad':
        return { nombre: '', ubicacion: '', fecha: '', duracion: '', precio: 0 };
      case 'otro':
        return { descripcion: '', fecha: '', precio: 0 };
      default:
        return {};
    }
  };

  const handleUpdateServicio = (id: string, datos: any) => {
    setServicios(servicios.map(s => s.id === id ? { ...s, datos } : s));
  };

  const handleDeleteServicio = (id: string) => {
    setServicios(servicios.filter(s => s.id !== id));
  };

  const calcularTotal = () => {
    return servicios.reduce((total, servicio) => total + (servicio.datos.precio || 0), 0);
  };

  const handleGuardar = () => {
    console.log('Guardando cotización:', { cotizacion, servicios, coverImage });
    router.push('/es/crm/cotizaciones');
  };

  const handleGenerarPDF = () => {
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink 
              onClick={() => router.push('/es/crm/cotizaciones')}
              className="cursor-pointer"
            >
              Cotizaciones
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Nueva Cotización Manual</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Nueva Cotización Manual</h1>
          <p className="text-slate-600 mt-1">Completa la información para crear una cotización personalizada</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleGenerarPDF}>
            <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>visibility</span>
            Vista Previa
          </Button>
          <Button className="bg-slate-700 hover:bg-slate-800" onClick={handleGuardar}>
            <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>save</span>
            Guardar Cotización
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
              <div>
                <Label htmlFor="titulo">Título de la Cotización *</Label>
                <Input
                  id="titulo"
                  placeholder="Ej: Viaje a Cancún - Vacaciones de Verano"
                  value={cotizacion.titulo}
                  onChange={(e) => setCotizacion({...cotizacion, titulo: e.target.value})}
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
                Datos del Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tipoCliente">Tipo de Cliente *</Label>
                <Select
                  value={cotizacion.tipoCliente}
                  onValueChange={(value: 'persona' | 'empresa') => setCotizacion({...cotizacion, tipoCliente: value, nombreEmpresa: value === 'persona' ? '' : cotizacion.nombreEmpresa})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="persona">Persona</SelectItem>
                    <SelectItem value="empresa">Empresa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {cotizacion.tipoCliente === 'empresa' && (
                <div>
                  <Label htmlFor="nombreEmpresa">Nombre de la Empresa *</Label>
                  <Input
                    id="nombreEmpresa"
                    placeholder="Nombre de la empresa"
                    value={cotizacion.nombreEmpresa}
                    onChange={(e) => setCotizacion({...cotizacion, nombreEmpresa: e.target.value})}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 relative">
                  <Label htmlFor="clienteNombre">{cotizacion.tipoCliente === 'empresa' ? 'Contacto Principal *' : 'Nombre Completo *'}</Label>
                  <div className="relative">
                    <Input
                      id="clienteNombre"
                      placeholder="Buscar por nombre, correo o teléfono..."
                      value={cotizacion.clienteNombre}
                      onChange={(e) => handleBuscarCliente(e.target.value)}
                      onFocus={() => {
                        if (clientesFiltrados.length > 0) {
                          setMostrarSugerencias(true);
                        }
                      }}
                      className={clienteSeleccionado ? 'border-green-500' : ''}
                    />
                    {clienteSeleccionado && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <span className="material-symbols-outlined text-green-600" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}>
                          check_circle
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Sugerencias de clientes */}
                  {mostrarSugerencias && clientesFiltrados.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {clientesFiltrados.map((cliente) => (
                        <button
                          key={cliente.id}
                          type="button"
                          className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors"
                          onClick={() => handleSeleccionarCliente(cliente)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold">
                              {cliente.firstName.charAt(0)}{cliente.lastName.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-slate-900">
                                {cliente.firstName} {cliente.lastName}
                              </p>
                              <div className="flex flex-col gap-0.5 mt-0.5">
                                {cliente.email && (
                                  <p className="text-sm text-slate-500 truncate">{cliente.email}</p>
                                )}
                                {cliente.phone && (
                                  <p className="text-sm text-slate-500 truncate">{cliente.phone}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {clienteSeleccionado && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 16" }}>info</span>
                      Cliente cargado desde la base de datos
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="clienteEmail">Email *</Label>
                  <Input
                    id="clienteEmail"
                    type="email"
                    placeholder="email@ejemplo.com"
                    value={cotizacion.clienteEmail}
                    onChange={(e) => setCotizacion({...cotizacion, clienteEmail: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="clienteTelefono">Teléfono *</Label>
                  <Input
                    id="clienteTelefono"
                    placeholder="+1 234 567 8900"
                    value={cotizacion.clienteTelefono}
                    onChange={(e) => setCotizacion({...cotizacion, clienteTelefono: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="clienteDireccion">Dirección</Label>
                  <Input
                    id="clienteDireccion"
                    placeholder="Dirección completa"
                    value={cotizacion.clienteDireccion}
                    onChange={(e) => setCotizacion({...cotizacion, clienteDireccion: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="clienteNacionalidad">Nacionalidad</Label>
                  <Input
                    id="clienteNacionalidad"
                    placeholder="Ej: Estadounidense, Mexicana, etc."
                    value={cotizacion.clienteNacionalidad}
                    onChange={(e) => setCotizacion({...cotizacion, clienteNacionalidad: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información de Pasajeros */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>group</span>
                Pasajeros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="adultos">Adultos *</Label>
                  <Input
                    id="adultos"
                    type="number"
                    min="1"
                    value={cotizacion.adultos}
                    onChange={(e) => setCotizacion({...cotizacion, adultos: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="ninos">Niños (2-11 años)</Label>
                  <Input
                    id="ninos"
                    type="number"
                    min="0"
                    value={cotizacion.ninos}
                    onChange={(e) => setCotizacion({...cotizacion, ninos: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="infantes">Infantes (0-2 años)</Label>
                  <Input
                    id="infantes"
                    type="number"
                    min="0"
                    value={cotizacion.infantes}
                    onChange={(e) => setCotizacion({...cotizacion, infantes: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fechaIda">Fecha de Ida *</Label>
                  <Input
                    id="fechaIda"
                    type="date"
                    value={cotizacion.fechaIda}
                    onChange={(e) => setCotizacion({...cotizacion, fechaIda: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="fechaVuelta">Fecha de Vuelta *</Label>
                  <Input
                    id="fechaVuelta"
                    type="date"
                    value={cotizacion.fechaVuelta}
                    onChange={(e) => setCotizacion({...cotizacion, fechaVuelta: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Servicios */}
          <Card className="shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>public</span>
                  Servicios Incluidos
                </CardTitle>
                <Select 
                  value={servicioSeleccionado} 
                  onValueChange={(value) => {
                    setServicioSeleccionado(value);
                    handleAddServicio(value as Servicio['tipo']);
                  }}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Agregar servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vuelo">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>flight_takeoff</span>
                        Vuelo
                      </span>
                    </SelectItem>
                    <SelectItem value="hotel">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>hotel</span>
                        Hotel
                      </span>
                    </SelectItem>
                    <SelectItem value="traslado">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>directions_car</span>
                        Traslado
                      </span>
                    </SelectItem>
                    <SelectItem value="tren">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>train</span>
                        Tren
                      </span>
                    </SelectItem>
                    <SelectItem value="bus">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>directions_bus</span>
                        Bus
                      </span>
                    </SelectItem>
                    <SelectItem value="crucero">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>directions_boat</span>
                        Crucero
                      </span>
                    </SelectItem>
                    <SelectItem value="paquetes">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>luggage</span>
                        Paquete
                      </span>
                    </SelectItem>
                    <SelectItem value="actividad">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>local_activity</span>
                        Actividad
                      </span>
                    </SelectItem>
                    <SelectItem value="otro">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>more_horiz</span>
                        Otro
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {servicios.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <span className="material-symbols-outlined text-5xl text-slate-300 mb-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                    add_circle
                  </span>
                  <p>No hay servicios agregados. Selecciona un tipo de servicio para comenzar.</p>
                </div>
              ) : (
                servicios.map((servicio) => (
                  <ServicioCard
                    key={servicio.id}
                    servicio={servicio}
                    onUpdate={(datos) => handleUpdateServicio(servicio.id, datos)}
                    onDelete={() => handleDeleteServicio(servicio.id)}
                  />
                ))
              )}
            </CardContent>
          </Card>

          {/* Notas y Términos */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>description</span>
                Información Adicional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="notas">Notas y Observaciones</Label>
                <Textarea
                  id="notas"
                  placeholder="Incluye cualquier información adicional relevante para el cliente..."
                  rows={4}
                  value={cotizacion.notas}
                  onChange={(e) => setCotizacion({...cotizacion, notas: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="terminos">Términos y Condiciones</Label>
                <Textarea
                  id="terminos"
                  placeholder="Especifica los términos y condiciones de la cotización..."
                  rows={4}
                  value={cotizacion.terminosCondiciones}
                  onChange={(e) => setCotizacion({...cotizacion, terminosCondiciones: e.target.value})}
                />
              </div>
              <div className="border-t pt-4 mt-4">
                <Label htmlFor="notaInterna" className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-500 text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>lock</span>
                  Nota Interna
                  <span className="text-xs text-slate-500 font-normal">(Solo visible para el agente)</span>
                </Label>
                <Textarea
                  id="notaInterna"
                  placeholder="Notas internas que solo tú podrás ver. No aparecerán en la cotización para el cliente..."
                  rows={3}
                  value={cotizacion.notaInterna}
                  onChange={(e) => setCotizacion({...cotizacion, notaInterna: e.target.value})}
                  className="mt-2"
                />
                <p className="text-xs text-slate-500 mt-1">Esta nota no se mostrará en la vista previa ni en el PDF de la cotización.</p>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Columna lateral - Resumen */}
        <div className="space-y-6">
          <Card className="shadow-none sticky top-6">
            <CardHeader>
              <CardTitle>Resumen de Cotización</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Pasajeros:</span>
                  <span className="font-medium">
                    {cotizacion.adultos + cotizacion.ninos + cotizacion.infantes}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Servicios:</span>
                  <span className="font-medium">{servicios.length}</span>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-slate-900">Total:</span>
                  <span className="text-2xl font-bold text-slate-900">
                    ${calcularTotal().toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Precio por persona: ${((calcularTotal()) / (cotizacion.adultos + cotizacion.ninos)).toFixed(2)}</p>
              </div>

              <div className="border-t pt-4 space-y-2">
                <Button 
                  className="w-full bg-slate-700 hover:bg-slate-800"
                  onClick={handleGuardar}
                >
                  Guardar Cotización
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={handleGenerarPDF}
                >
                  <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>picture_as_pdf</span>
                  Generar PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Vista Previa/PDF */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Vista Previa de Cotización</DialogTitle>
          </DialogHeader>
          <CotizacionPreview cotizacion={cotizacion} servicios={servicios} coverImage={coverImage} />
        </DialogContent>
      </Dialog>

      {/* Modal de búsqueda de imágenes */}
      <ImageSearchModal
        isOpen={isImageSearchOpen}
        onClose={() => setIsImageSearchOpen(false)}
        onSelectImage={(imageUrl) => setCoverImage(imageUrl)}
      />
    </div>
  );
}

// Componente para cada tipo de servicio
function ServicioCard({ servicio, onUpdate, onDelete }: { servicio: Servicio; onUpdate: (datos: any) => void; onDelete: () => void }) {
  const iconos = {
    vuelo: 'flight_takeoff',
    hotel: 'hotel',
    traslado: 'directions_car',
    tren: 'train',
    bus: 'directions_bus',
    crucero: 'directions_boat',
    paquetes: 'luggage',
    actividad: 'local_activity',
    otro: 'more_horiz',
  };

  const nombres = {
    vuelo: 'Vuelo',
    hotel: 'Hotel',
    traslado: 'Traslado',
    tren: 'Tren',
    bus: 'Bus',
    crucero: 'Crucero',
    paquetes: 'Paquete',
    actividad: 'Actividad',
    otro: 'Otro Servicio',
  };

  return (
    <div className="border border-slate-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-slate-900 flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
            {iconos[servicio.tipo]}
          </span>
          {nombres[servicio.tipo]}
        </h4>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <span className="material-symbols-outlined text-red-600" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>delete</span>
        </Button>
      </div>

      {servicio.tipo === 'vuelo' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Origen</Label>
            <Input placeholder="Ciudad origen" value={servicio.datos.origen} onChange={(e) => onUpdate({...servicio.datos, origen: e.target.value})} />
          </div>
          <div>
            <Label>Destino</Label>
            <Input placeholder="Ciudad destino" value={servicio.datos.destino} onChange={(e) => onUpdate({...servicio.datos, destino: e.target.value})} />
          </div>
          <div>
            <Label>Fecha Ida</Label>
            <Input type="date" value={servicio.datos.fechaIda} onChange={(e) => onUpdate({...servicio.datos, fechaIda: e.target.value})} />
          </div>
          <div>
            <Label>Fecha Vuelta</Label>
            <Input type="date" value={servicio.datos.fechaVuelta} onChange={(e) => onUpdate({...servicio.datos, fechaVuelta: e.target.value})} />
          </div>
          <div>
            <Label>Aerolínea</Label>
            <Input placeholder="Nombre aerolínea" value={servicio.datos.aerolinea} onChange={(e) => onUpdate({...servicio.datos, aerolinea: e.target.value})} />
          </div>
          <div>
            <Label>Clase</Label>
            <Select value={servicio.datos.clase} onValueChange={(value) => onUpdate({...servicio.datos, clase: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economica">Económica</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="primera">Primera Clase</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <Label>Precio (USD)</Label>
            <Input type="number" placeholder="0.00" value={servicio.datos.precio} onChange={(e) => onUpdate({...servicio.datos, precio: parseFloat(e.target.value)})} />
          </div>
        </div>
      )}

      {servicio.tipo === 'hotel' && (
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label>Nombre del Hotel</Label>
            <Input placeholder="Nombre" value={servicio.datos.nombre} onChange={(e) => onUpdate({...servicio.datos, nombre: e.target.value})} />
          </div>
          <div className="col-span-2">
            <Label>Ubicación</Label>
            <Input placeholder="Ciudad, País" value={servicio.datos.ubicacion} onChange={(e) => onUpdate({...servicio.datos, ubicacion: e.target.value})} />
          </div>
          <div>
            <Label>Check-in</Label>
            <Input type="date" value={servicio.datos.checkIn} onChange={(e) => onUpdate({...servicio.datos, checkIn: e.target.value})} />
          </div>
          <div>
            <Label>Check-out</Label>
            <Input type="date" value={servicio.datos.checkOut} onChange={(e) => onUpdate({...servicio.datos, checkOut: e.target.value})} />
          </div>
          <div>
            <Label>Noches</Label>
            <Input type="number" min="1" value={servicio.datos.noches} onChange={(e) => onUpdate({...servicio.datos, noches: parseInt(e.target.value)})} />
          </div>
          <div>
            <Label>Tipo de Habitación</Label>
            <Input placeholder="Ej: Suite, Doble" value={servicio.datos.tipoHabitacion} onChange={(e) => onUpdate({...servicio.datos, tipoHabitacion: e.target.value})} />
          </div>
          <div>
            <Label>Acomodación</Label>
            <Input placeholder="Ej: 2 adultos" value={servicio.datos.acomodacion} onChange={(e) => onUpdate({...servicio.datos, acomodacion: e.target.value})} />
          </div>
          <div>
            <Label>Precio (USD)</Label>
            <Input type="number" placeholder="0.00" value={servicio.datos.precio} onChange={(e) => onUpdate({...servicio.datos, precio: parseFloat(e.target.value)})} />
          </div>
        </div>
      )}

      {servicio.tipo === 'traslado' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Origen</Label>
            <Input placeholder="Punto de origen" value={servicio.datos.origen} onChange={(e) => onUpdate({...servicio.datos, origen: e.target.value})} />
          </div>
          <div>
            <Label>Destino</Label>
            <Input placeholder="Punto de destino" value={servicio.datos.destino} onChange={(e) => onUpdate({...servicio.datos, destino: e.target.value})} />
          </div>
          <div>
            <Label>Fecha</Label>
            <Input type="date" value={servicio.datos.fecha} onChange={(e) => onUpdate({...servicio.datos, fecha: e.target.value})} />
          </div>
          <div>
            <Label>Tipo de Vehículo</Label>
            <Input placeholder="Ej: Van, Sedan" value={servicio.datos.tipoVehiculo} onChange={(e) => onUpdate({...servicio.datos, tipoVehiculo: e.target.value})} />
          </div>
          <div className="col-span-2">
            <Label>Precio (USD)</Label>
            <Input type="number" placeholder="0.00" value={servicio.datos.precio} onChange={(e) => onUpdate({...servicio.datos, precio: parseFloat(e.target.value)})} />
          </div>
        </div>
      )}

      {(servicio.tipo === 'tren' || servicio.tipo === 'bus') && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Origen</Label>
            <Input placeholder="Estación origen" value={servicio.datos.origen} onChange={(e) => onUpdate({...servicio.datos, origen: e.target.value})} />
          </div>
          <div>
            <Label>Destino</Label>
            <Input placeholder="Estación destino" value={servicio.datos.destino} onChange={(e) => onUpdate({...servicio.datos, destino: e.target.value})} />
          </div>
          <div>
            <Label>Fecha</Label>
            <Input type="date" value={servicio.datos.fecha} onChange={(e) => onUpdate({...servicio.datos, fecha: e.target.value})} />
          </div>
          <div>
            <Label>{servicio.tipo === 'tren' ? 'Clase' : 'Compañía'}</Label>
            <Input placeholder={servicio.tipo === 'tren' ? 'Ej: Primera clase' : 'Nombre compañía'} value={servicio.tipo === 'tren' ? servicio.datos.clase : servicio.datos.compania} onChange={(e) => onUpdate({...servicio.datos, [servicio.tipo === 'tren' ? 'clase' : 'compania']: e.target.value})} />
          </div>
          <div className="col-span-2">
            <Label>Precio (USD)</Label>
            <Input type="number" placeholder="0.00" value={servicio.datos.precio} onChange={(e) => onUpdate({...servicio.datos, precio: parseFloat(e.target.value)})} />
          </div>
        </div>
      )}

      {servicio.tipo === 'crucero' && (
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label>Naviera</Label>
            <Input placeholder="Nombre de la naviera" value={servicio.datos.naviera} onChange={(e) => onUpdate({...servicio.datos, naviera: e.target.value})} />
          </div>
          <div className="col-span-2">
            <Label>Itinerario</Label>
            <Input placeholder="Puertos de escala" value={servicio.datos.itinerario} onChange={(e) => onUpdate({...servicio.datos, itinerario: e.target.value})} />
          </div>
          <div>
            <Label>Fecha Inicio</Label>
            <Input type="date" value={servicio.datos.fechaInicio} onChange={(e) => onUpdate({...servicio.datos, fechaInicio: e.target.value})} />
          </div>
          <div>
            <Label>Fecha Fin</Label>
            <Input type="date" value={servicio.datos.fechaFin} onChange={(e) => onUpdate({...servicio.datos, fechaFin: e.target.value})} />
          </div>
          <div>
            <Label>Tipo de Cabina</Label>
            <Input placeholder="Ej: Interior, Balcón" value={servicio.datos.cabina} onChange={(e) => onUpdate({...servicio.datos, cabina: e.target.value})} />
          </div>
          <div>
            <Label>Precio (USD)</Label>
            <Input type="number" placeholder="0.00" value={servicio.datos.precio} onChange={(e) => onUpdate({...servicio.datos, precio: parseFloat(e.target.value)})} />
          </div>
        </div>
      )}

      {servicio.tipo === 'paquetes' && (
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label>Nombre del Paquete</Label>
            <Input placeholder="Nombre del paquete" value={servicio.datos.nombre} onChange={(e) => onUpdate({...servicio.datos, nombre: e.target.value})} />
          </div>
          <div className="col-span-2">
            <Label>Destino</Label>
            <Input placeholder="Ciudad, País" value={servicio.datos.destino} onChange={(e) => onUpdate({...servicio.datos, destino: e.target.value})} />
          </div>
          <div>
            <Label>Fecha Inicio</Label>
            <Input type="date" value={servicio.datos.fechaInicio} onChange={(e) => onUpdate({...servicio.datos, fechaInicio: e.target.value})} />
          </div>
          <div>
            <Label>Fecha Fin</Label>
            <Input type="date" value={servicio.datos.fechaFin} onChange={(e) => onUpdate({...servicio.datos, fechaFin: e.target.value})} />
          </div>
          <div>
            <Label>Noches</Label>
            <Input type="number" placeholder="Número de noches" value={servicio.datos.noches} onChange={(e) => onUpdate({...servicio.datos, noches: parseInt(e.target.value) || 1})} />
          </div>
          <div className="col-span-2">
            <Label>Descripción</Label>
            <Textarea placeholder="Descripción del paquete" rows={3} value={servicio.datos.descripcion} onChange={(e) => onUpdate({...servicio.datos, descripcion: e.target.value})} />
          </div>
          <div className="col-span-2">
            <Label>Precio (USD)</Label>
            <Input type="number" placeholder="0.00" value={servicio.datos.precio} onChange={(e) => onUpdate({...servicio.datos, precio: parseFloat(e.target.value)})} />
          </div>
        </div>
      )}

      {servicio.tipo === 'actividad' && (
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label>Nombre de la Actividad</Label>
            <Input placeholder="Descripción breve" value={servicio.datos.nombre} onChange={(e) => onUpdate({...servicio.datos, nombre: e.target.value})} />
          </div>
          <div>
            <Label>Ubicación</Label>
            <Input placeholder="Lugar" value={servicio.datos.ubicacion} onChange={(e) => onUpdate({...servicio.datos, ubicacion: e.target.value})} />
          </div>
          <div>
            <Label>Fecha</Label>
            <Input type="date" value={servicio.datos.fecha} onChange={(e) => onUpdate({...servicio.datos, fecha: e.target.value})} />
          </div>
          <div>
            <Label>Duración</Label>
            <Input placeholder="Ej: 3 horas" value={servicio.datos.duracion} onChange={(e) => onUpdate({...servicio.datos, duracion: e.target.value})} />
          </div>
          <div>
            <Label>Precio (USD)</Label>
            <Input type="number" placeholder="0.00" value={servicio.datos.precio} onChange={(e) => onUpdate({...servicio.datos, precio: parseFloat(e.target.value)})} />
          </div>
        </div>
      )}

      {servicio.tipo === 'otro' && (
        <div className="space-y-3">
          <div>
            <Label>Descripción</Label>
            <Textarea placeholder="Describe el servicio" rows={3} value={servicio.datos.descripcion} onChange={(e) => onUpdate({...servicio.datos, descripcion: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Fecha</Label>
              <Input type="date" value={servicio.datos.fecha} onChange={(e) => onUpdate({...servicio.datos, fecha: e.target.value})} />
            </div>
            <div>
              <Label>Precio (USD)</Label>
              <Input type="number" placeholder="0.00" value={servicio.datos.precio} onChange={(e) => onUpdate({...servicio.datos, precio: parseFloat(e.target.value)})} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente de Vista Previa para PDF
function CotizacionPreview({ cotizacion, servicios, coverImage }: { cotizacion: any; servicios: Servicio[]; coverImage?: string }) {
  const calcularTotal = () => {
    return servicios.reduce((total, servicio) => total + (servicio.datos.precio || 0), 0);
  };

  return (
    <div className="bg-white p-8 space-y-6" id="cotizacion-pdf">
      {/* Header con Logo */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <svg width="180" height="36" viewBox="0 0 472 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_267_2)">
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
              <clipPath id="clip0_267_2">
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

      {/* Imagen de Portada con Título */}
      {coverImage && (
        <div className="w-full rounded-lg overflow-hidden relative">
          <img 
            src={coverImage} 
            alt="Portada de cotización" 
            className="w-full h-64 object-cover"
          />
          {cotizacion.titulo && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
              <h2 className="text-white text-3xl font-bold p-6 text-left">
                {cotizacion.titulo}
              </h2>
            </div>
          )}
        </div>
      )}

      {/* Información del Cliente */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900">Información del Cliente</h3>
          {cotizacion.tipoCliente === 'empresa' && cotizacion.nombreEmpresa && (
            <p className="text-sm"><strong>Empresa:</strong> {cotizacion.nombreEmpresa}</p>
          )}
          <p className="text-sm"><strong>{cotizacion.tipoCliente === 'empresa' ? 'Contacto Principal:' : 'Nombre:'}</strong> {cotizacion.clienteNombre}</p>
          <p className="text-sm"><strong>Email:</strong> {cotizacion.clienteEmail}</p>
          <p className="text-sm"><strong>Teléfono:</strong> {cotizacion.clienteTelefono}</p>
          {cotizacion.clienteNacionalidad && (
            <p className="text-sm"><strong>Nacionalidad:</strong> {cotizacion.clienteNacionalidad}</p>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900">Detalles del Viaje</h3>
          <p className="text-sm"><strong>Pasajeros:</strong> {cotizacion.adultos} adultos, {cotizacion.ninos} niños, {cotizacion.infantes} infantes</p>
          <p className="text-sm"><strong>Fecha de Ida:</strong> {cotizacion.fechaIda}</p>
          <p className="text-sm"><strong>Fecha de Vuelta:</strong> {cotizacion.fechaVuelta}</p>
        </div>
      </div>

      {/* Servicios Incluidos */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900 text-lg">Servicios Incluidos</h3>
        {servicios.map((servicio, index) => (
          <div key={servicio.id} className="border rounded-lg p-4">
            <h4 className="font-medium text-slate-900 mb-2">{servicio.tipo.charAt(0).toUpperCase() + servicio.tipo.slice(1)}</h4>
            <div className="text-sm text-slate-600 space-y-1">
              {Object.entries(servicio.datos)
                .filter(([key, value]) => key !== 'precio' && value)
                .map(([key, value]) => (
                  <p key={key}><strong>{key}:</strong> {String(value)}</p>
                ))}
              <p className="text-right font-semibold text-slate-900">Precio: ${servicio.datos.precio?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900">Total</h3>
          <p className="text-3xl font-bold text-slate-900">${calcularTotal().toFixed(2)}</p>
        </div>
      </div>

      {/* Notas y Términos */}
      {cotizacion.notas && (
        <div>
          <h3 className="font-semibold text-slate-900 mb-2">Notas</h3>
          <p className="text-sm text-slate-600">{cotizacion.notas}</p>
        </div>
      )}

      {cotizacion.terminosCondiciones && (
        <div>
          <h3 className="font-semibold text-slate-900 mb-2">Términos y Condiciones</h3>
          <p className="text-sm text-slate-600">{cotizacion.terminosCondiciones}</p>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import './MaterialesPage.scss';

interface Material {
  id: string;
  nombre: string;
  categoria: 'documentos' | 'plantillas' | 'formatos';
  tipo: string;
  tamaño: string;
  fechaSubida: string;
  url: string;
}

const categorias = [
  { id: 'documentos', label: 'Documentos', icon: 'description' },
  { id: 'plantillas', label: 'Plantillas', icon: 'file_copy' },
  { id: 'formatos', label: 'Formatos', icon: 'article' },
];

const materialesMock: Material[] = [
  {
    id: '1',
    nombre: 'Guía de Destinos 2024',
    categoria: 'documentos',
    tipo: 'application/pdf',
    tamaño: '2.5 MB',
    fechaSubida: '15/01/2024',
    url: '#',
  },
  {
    id: '2',
    nombre: 'Políticas de Cancelación',
    categoria: 'documentos',
    tipo: 'application/pdf',
    tamaño: '856 KB',
    fechaSubida: '10/01/2024',
    url: '#',
  },
  {
    id: '3',
    nombre: 'Catálogo de Hoteles Premium',
    categoria: 'documentos',
    tipo: 'application/pdf',
    tamaño: '5.2 MB',
    fechaSubida: '08/01/2024',
    url: '#',
  },
  {
    id: '4',
    nombre: 'Plantilla Cotización Estándar',
    categoria: 'plantillas',
    tipo: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    tamaño: '125 KB',
    fechaSubida: '20/01/2024',
    url: '#',
  },
  {
    id: '5',
    nombre: 'Plantilla Itinerario de Viaje',
    categoria: 'plantillas',
    tipo: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    tamaño: '98 KB',
    fechaSubida: '18/01/2024',
    url: '#',
  },
  {
    id: '6',
    nombre: 'Plantilla Email Seguimiento Cliente',
    categoria: 'plantillas',
    tipo: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    tamaño: '45 KB',
    fechaSubida: '12/01/2024',
    url: '#',
  },
  {
    id: '7',
    nombre: 'Formato Ficha de Cliente',
    categoria: 'formatos',
    tipo: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    tamaño: '78 KB',
    fechaSubida: '22/01/2024',
    url: '#',
  },
  {
    id: '8',
    nombre: 'Formato Registro de Comisiones',
    categoria: 'formatos',
    tipo: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    tamaño: '62 KB',
    fechaSubida: '19/01/2024',
    url: '#',
  },
  {
    id: '9',
    nombre: 'Formato Control de Reservas',
    categoria: 'formatos',
    tipo: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    tamaño: '95 KB',
    fechaSubida: '16/01/2024',
    url: '#',
  },
];

export function MaterialesPage() {
  const [materiales, setMateriales] = useState<Material[]>(materialesMock);
  const [categoriaActiva, setCategoriaActiva] = useState<'documentos' | 'plantillas' | 'formatos'>('documentos');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [categoriaArchivo, setCategoriaArchivo] = useState<'documentos' | 'plantillas' | 'formatos'>('documentos');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  const materialesFiltrados = materiales.filter(m => m.categoria === categoriaActiva);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setArchivoSeleccionado(file);
      setNombreArchivo(file.name);
    }
  };

  const handleUpload = () => {
    if (!archivoSeleccionado || !nombreArchivo.trim()) return;

    const nuevoMaterial: Material = {
      id: Date.now().toString(),
      nombre: nombreArchivo,
      categoria: categoriaArchivo,
      tipo: archivoSeleccionado.type || 'application/octet-stream',
      tamaño: `${(archivoSeleccionado.size / 1024).toFixed(2)} KB`,
      fechaSubida: new Date().toLocaleDateString('es-ES'),
      url: URL.createObjectURL(archivoSeleccionado),
    };

    setMateriales([...materiales, nuevoMaterial]);
    setArchivoSeleccionado(null);
    setNombreArchivo('');
    setIsUploadModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setMateriales(materiales.filter(m => m.id !== id));
  };

  const getFileIcon = (tipo: string) => {
    if (tipo.includes('pdf')) return 'picture_as_pdf';
    if (tipo.includes('word') || tipo.includes('document')) return 'description';
    if (tipo.includes('excel') || tipo.includes('spreadsheet')) return 'table_chart';
    if (tipo.includes('image')) return 'image';
    return 'insert_drive_file';
  };

  return (
    <div className="materiales-page">
      <div className="materiales-page__header">
        <div>
          <h1 className="materiales-page__title">Materiales del agente</h1>
          <p className="materiales-page__subtitle">
            Accede a todos tus materiales y documentos de trabajo
          </p>
        </div>
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-700 hover:bg-slate-800">
              <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                upload_file
              </span>
              Subir Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Subir nuevo documento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="archivo">Seleccionar archivo</Label>
                <Input
                  id="archivo"
                  type="file"
                  onChange={handleFileSelect}
                  className="mt-2"
                />
                {archivoSeleccionado && (
                  <p className="text-sm text-slate-600 mt-2">
                    Archivo seleccionado: {archivoSeleccionado.name}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="nombre">Nombre del documento</Label>
                <Input
                  id="nombre"
                  value={nombreArchivo}
                  onChange={(e) => setNombreArchivo(e.target.value)}
                  placeholder="Ej: Plantilla de cotización"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="categoria">Categoría</Label>
                <Select value={categoriaArchivo} onValueChange={(value: 'documentos' | 'plantillas' | 'formatos') => setCategoriaArchivo(value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="documentos">Documentos</SelectItem>
                    <SelectItem value="plantillas">Plantillas</SelectItem>
                    <SelectItem value="formatos">Formatos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleUpload} disabled={!archivoSeleccionado || !nombreArchivo.trim()}>
                  Subir
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="materiales-page__content">
        <Tabs value={categoriaActiva} onValueChange={(value) => setCategoriaActiva(value as typeof categoriaActiva)}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid w-auto grid-cols-3">
              {categorias.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                    {cat.icon}
                  </span>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => setViewMode('list')}
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>view_list</span>
              </button>
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>grid_view</span>
              </button>
            </div>
          </div>

          {categorias.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-6">
              {materialesFiltrados.length === 0 ? (
                <div className="materiales-page__empty-state">
                  <span className="material-symbols-outlined materiales-page__empty-icon">
                    folder_copy
                  </span>
                  <h2 className="materiales-page__empty-title">No hay {cat.label.toLowerCase()} aún</h2>
                  <p className="materiales-page__empty-description">
                    Sube tu primer {cat.label.toLowerCase()} para comenzar
                  </p>
                </div>
              ) : (
                <>
                  {viewMode === 'grid' ? (
                    <div className="materiales-page__grid">
                      {materialesFiltrados.map((material) => (
                        <Card key={material.id} className="materiales-page__card">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined materiales-page__file-icon" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                  {getFileIcon(material.tipo)}
                                </span>
                                <div>
                                  <CardTitle className="text-base">{material.nombre}</CardTitle>
                                  <p className="text-sm text-slate-500 mt-1">
                                    {material.tamaño} • {material.fechaSubida}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(material.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                  delete
                                </span>
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(material.url, '_blank')}
                                className="flex-1"
                              >
                                <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                  download
                                </span>
                                Descargar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(material.url, '_blank')}
                                className="flex-1"
                              >
                                <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                  visibility
                                </span>
                                Ver
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="materiales-page__list">
                      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 uppercase items-center mb-4">
                        <div className="col-span-1">Icono</div>
                        <div className="col-span-4">Nombre</div>
                        <div className="col-span-2">Tamaño</div>
                        <div className="col-span-2">Fecha</div>
                        <div className="col-span-3 text-right">Acciones</div>
                      </div>
                      <div className="space-y-2">
                        {materialesFiltrados.map((material) => (
                          <Card key={material.id} className="materiales-page__list-item">
                            <CardContent className="p-4">
                              <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-1">
                                  <span className="material-symbols-outlined materiales-page__file-icon" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                    {getFileIcon(material.tipo)}
                                  </span>
                                </div>
                                <div className="col-span-4">
                                  <p className="text-sm font-medium text-slate-900">{material.nombre}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-sm text-slate-600">{material.tamaño}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-sm text-slate-600">{material.fechaSubida}</p>
                                </div>
                                <div className="col-span-3 flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(material.url, '_blank')}
                                  >
                                    <span className="material-symbols-outlined mr-1" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                      download
                                    </span>
                                    Descargar
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(material.url, '_blank')}
                                  >
                                    <span className="material-symbols-outlined mr-1" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                      visibility
                                    </span>
                                    Ver
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(material.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                      delete
                                    </span>
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

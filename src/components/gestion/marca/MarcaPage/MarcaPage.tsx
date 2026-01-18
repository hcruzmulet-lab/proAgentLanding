'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import './MarcaPage.scss';

interface ElementoMarca {
  id: string;
  nombre: string;
  categoria: 'logos' | 'manual' | 'colores' | 'tipografia';
  tipo: string;
  tamaño: string;
  fechaSubida: string;
  url: string;
  preview?: string;
}

const categorias = [
  { 
    id: 'logos', 
    label: 'Logos', 
    icon: 'branding_watermark',
    descripcion: 'Logotipos de tu agencia en diferentes formatos y versiones (principal, blanco, negro, icono).'
  },
  { 
    id: 'manual', 
    label: 'Manual de Marca', 
    icon: 'menu_book',
    descripcion: 'Documentos con lineamientos de identidad visual, uso de logo, paleta de colores y aplicaciones.'
  },
  { 
    id: 'colores', 
    label: 'Paleta de Colores', 
    icon: 'palette',
    descripcion: 'Colores institucionales de tu marca con códigos HEX, RGB y CMYK para diferentes aplicaciones.'
  },
  { 
    id: 'tipografia', 
    label: 'Tipografías', 
    icon: 'text_format',
    descripcion: 'Fuentes tipográficas oficiales de tu marca y archivos de instalación para uso en diseños.'
  },
];

const elementosMock: ElementoMarca[] = [
  {
    id: '1',
    nombre: 'Logo Principal - Color',
    categoria: 'logos',
    tipo: 'image/svg+xml',
    tamaño: '45 KB',
    fechaSubida: '20/01/2024',
    url: '#',
    preview: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    nombre: 'Logo Principal - Blanco',
    categoria: 'logos',
    tipo: 'image/svg+xml',
    tamaño: '42 KB',
    fechaSubida: '20/01/2024',
    url: '#',
    preview: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    nombre: 'Icono Redondo',
    categoria: 'logos',
    tipo: 'image/png',
    tamaño: '125 KB',
    fechaSubida: '19/01/2024',
    url: '#',
    preview: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    nombre: 'Manual de Identidad Corporativa',
    categoria: 'manual',
    tipo: 'application/pdf',
    tamaño: '5.2 MB',
    fechaSubida: '15/01/2024',
    url: '#',
  },
  {
    id: '5',
    nombre: 'Guía de Uso de Logo',
    categoria: 'manual',
    tipo: 'application/pdf',
    tamaño: '1.8 MB',
    fechaSubida: '15/01/2024',
    url: '#',
  },
  {
    id: '6',
    nombre: 'Paleta Institucional 2024',
    categoria: 'colores',
    tipo: 'image/png',
    tamaño: '856 KB',
    fechaSubida: '18/01/2024',
    url: '#',
    preview: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop',
  },
  {
    id: '7',
    nombre: 'Colores Complementarios',
    categoria: 'colores',
    tipo: 'image/png',
    tamaño: '654 KB',
    fechaSubida: '18/01/2024',
    url: '#',
    preview: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop',
  },
  {
    id: '8',
    nombre: 'Montserrat Font Family',
    categoria: 'tipografia',
    tipo: 'application/zip',
    tamaño: '2.1 MB',
    fechaSubida: '16/01/2024',
    url: '#',
  },
  {
    id: '9',
    nombre: 'Poppins Font Family',
    categoria: 'tipografia',
    tipo: 'application/zip',
    tamaño: '1.9 MB',
    fechaSubida: '16/01/2024',
    url: '#',
  },
];

export function MarcaPage() {
  const [elementos, setElementos] = useState<ElementoMarca[]>(elementosMock);
  const [categoriaActiva, setCategoriaActiva] = useState<'logos' | 'manual' | 'colores' | 'tipografia'>('logos');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [categoriaArchivo, setCategoriaArchivo] = useState<'logos' | 'manual' | 'colores' | 'tipografia'>('logos');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const elementosFiltrados = elementos
    .filter(e => e.categoria === categoriaActiva)
    .filter(e => 
      searchTerm === '' || 
      e.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setArchivoSeleccionado(file);
      setNombreArchivo(file.name);
    }
  };

  const handleUpload = () => {
    if (!archivoSeleccionado || !nombreArchivo.trim()) return;

    const nuevoElemento: ElementoMarca = {
      id: Date.now().toString(),
      nombre: nombreArchivo,
      categoria: categoriaArchivo,
      tipo: archivoSeleccionado.type || 'application/octet-stream',
      tamaño: `${(archivoSeleccionado.size / 1024).toFixed(2)} KB`,
      fechaSubida: new Date().toLocaleDateString('es-ES'),
      url: URL.createObjectURL(archivoSeleccionado),
      preview: archivoSeleccionado.type.startsWith('image/') ? URL.createObjectURL(archivoSeleccionado) : undefined,
    };

    setElementos([...elementos, nuevoElemento]);
    setArchivoSeleccionado(null);
    setNombreArchivo('');
    setIsUploadModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setElementos(elementos.filter(e => e.id !== id));
  };

  const getFileIcon = (tipo: string) => {
    if (tipo.includes('pdf')) return 'picture_as_pdf';
    if (tipo.includes('word') || tipo.includes('document')) return 'description';
    if (tipo.includes('image') || tipo.includes('svg')) return 'image';
    if (tipo.includes('zip')) return 'folder_zip';
    return 'insert_drive_file';
  };

  return (
    <div className="marca-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.1px', margin: 0, lineHeight: '1.5' }}>Marca</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Input
              type="text"
              placeholder="Buscar elementos de marca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <span 
              className="material-symbols-outlined" 
              style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                fontSize: '20px',
                color: '#64748b',
                pointerEvents: 'none'
              }}
            >
              search
            </span>
          </div>
          <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-700 hover:bg-slate-800">
              <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                upload_file
              </span>
              Subir Elemento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Subir nuevo elemento de marca</DialogTitle>
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
                <Label htmlFor="nombre">Nombre del elemento</Label>
                <Input
                  id="nombre"
                  value={nombreArchivo}
                  onChange={(e) => setNombreArchivo(e.target.value)}
                  placeholder="Ej: Logo Principal - Color"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="categoria">Categoría</Label>
                <Select value={categoriaArchivo} onValueChange={(value: 'logos' | 'manual' | 'colores' | 'tipografia') => setCategoriaArchivo(value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="logos">Logos</SelectItem>
                    <SelectItem value="manual">Manual de Marca</SelectItem>
                    <SelectItem value="colores">Paleta de Colores</SelectItem>
                    <SelectItem value="tipografia">Tipografías</SelectItem>
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
      </div>

      <div className="marca-page__content">
        <Tabs value={categoriaActiva} onValueChange={(value) => setCategoriaActiva(value as typeof categoriaActiva)}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid w-auto grid-cols-4">
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
              <div style={{ 
                backgroundColor: '#f8fafc', 
                padding: '16px 20px', 
                borderRadius: '8px', 
                marginBottom: '24px',
                border: '1px solid #e2e8f0'
              }}>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#475569', 
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {cat.descripcion}
                </p>
              </div>
              {elementosFiltrados.length === 0 ? (
                <div className="marca-page__empty-state">
                  <span className="material-symbols-outlined marca-page__empty-icon">
                    branding_watermark
                  </span>
                  <h2 className="marca-page__empty-title">No hay elementos en {cat.label.toLowerCase()} aún</h2>
                  <p className="marca-page__empty-description">
                    Sube tu primer elemento para comenzar
                  </p>
                </div>
              ) : (
                <>
                  {viewMode === 'grid' ? (
                    <div className="marca-page__grid">
                      {elementosFiltrados.map((elemento) => (
                        <Card key={elemento.id} className="marca-page__card">
                          <CardContent className="marca-page__card-content">
                            <div className="marca-page__icon-wrapper">
                              {elemento.preview ? (
                                <div className="marca-page__preview">
                                  <Image
                                    src={elemento.preview}
                                    alt={elemento.nombre}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                  />
                                </div>
                              ) : (
                                <span className="material-symbols-outlined marca-page__file-icon">
                                  {getFileIcon(elemento.tipo)}
                                </span>
                              )}
                            </div>
                            <div className="marca-page__card-info">
                              <h3 className="marca-page__card-title">{elemento.nombre}</h3>
                              <p className="marca-page__card-meta">
                                {elemento.tamaño} • {elemento.fechaSubida}
                              </p>
                            </div>
                            <div className="marca-page__card-actions">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="marca-page__action-button"
                              >
                                <span className="material-symbols-outlined">download</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="marca-page__action-button marca-page__action-button--delete"
                                onClick={() => handleDelete(elemento.id)}
                              >
                                <span className="material-symbols-outlined">delete</span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="marca-page__list">
                      {elementosFiltrados.map((elemento) => (
                        <div key={elemento.id} className="marca-page__list-item">
                          <div className="marca-page__list-icon">
                            {elemento.preview ? (
                              <div className="marca-page__list-preview">
                                <Image
                                  src={elemento.preview}
                                  alt={elemento.nombre}
                                  fill
                                  className="object-contain"
                                  unoptimized
                                />
                              </div>
                            ) : (
                              <span className="material-symbols-outlined">
                                {getFileIcon(elemento.tipo)}
                              </span>
                            )}
                          </div>
                          <div className="marca-page__list-info">
                            <h3 className="marca-page__list-title">{elemento.nombre}</h3>
                            <p className="marca-page__list-meta">
                              {elemento.tamaño} • {elemento.fechaSubida}
                            </p>
                          </div>
                          <div className="marca-page__list-actions">
                            <Button variant="ghost" size="sm">
                              <span className="material-symbols-outlined">download</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="marca-page__action-button--delete"
                              onClick={() => handleDelete(elemento.id)}
                            >
                              <span className="material-symbols-outlined">delete</span>
                            </Button>
                          </div>
                        </div>
                      ))}
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

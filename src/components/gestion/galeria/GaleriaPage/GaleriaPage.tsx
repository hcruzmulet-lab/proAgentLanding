'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs as ImageTabs, TabsContent as ImageTabsContent, TabsList as ImageTabsList, TabsTrigger as ImageTabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { ImageSearchModal } from '@/components/shared/ImageSearchModal';
import './GaleriaPage.scss';

interface Imagen {
  id: string;
  url: string;
  categoria: 'promociones' | 'ofertas' | 'destinos' | 'comunicados' | 'clientes';
  nombre?: string;
  fechaSubida: string;
}

const categorias = [
  { id: 'promociones', label: 'Promociones', icon: 'local_offer' },
  { id: 'ofertas', label: 'Ofertas', icon: 'sell' },
  { id: 'destinos', label: 'Destinos', icon: 'place' },
  { id: 'comunicados', label: 'Comunicados', icon: 'campaign' },
  { id: 'clientes', label: 'Clientes', icon: 'people' },
];

const imagenesMock: Imagen[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    categoria: 'promociones',
    nombre: 'Promoción Verano 2024',
    fechaSubida: '20/01/2024',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    categoria: 'promociones',
    nombre: 'Oferta Especial Caribe',
    fechaSubida: '18/01/2024',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    categoria: 'ofertas',
    nombre: 'Descuento Hoteles 5 Estrellas',
    fechaSubida: '22/01/2024',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    categoria: 'ofertas',
    nombre: 'Paquetes Todo Incluido',
    fechaSubida: '19/01/2024',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop',
    categoria: 'destinos',
    nombre: 'París, Francia',
    fechaSubida: '15/01/2024',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
    categoria: 'destinos',
    nombre: 'Nueva York, USA',
    fechaSubida: '14/01/2024',
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop',
    categoria: 'destinos',
    nombre: 'Tokio, Japón',
    fechaSubida: '13/01/2024',
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
    categoria: 'comunicados',
    nombre: 'Nuevos Destinos Disponibles',
    fechaSubida: '21/01/2024',
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop',
    categoria: 'comunicados',
    nombre: 'Actualización de Políticas',
    fechaSubida: '17/01/2024',
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
    categoria: 'clientes',
    nombre: 'Testimonio Cliente Satisfecho',
    fechaSubida: '16/01/2024',
  },
  {
    id: '11',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    categoria: 'clientes',
    nombre: 'Grupo Familiar en Viaje',
    fechaSubida: '12/01/2024',
  },
];

export function GaleriaPage() {
  const [imagenes, setImagenes] = useState<Imagen[]>(imagenesMock);
  const [categoriaActiva, setCategoriaActiva] = useState<'promociones' | 'ofertas' | 'destinos' | 'comunicados' | 'clientes'>('promociones');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
  const [categoriaImagen, setCategoriaImagen] = useState<'promociones' | 'ofertas' | 'destinos' | 'comunicados' | 'clientes'>('promociones');
  const [uploadMethod, setUploadMethod] = useState<'file' | 'search'>('file');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const imagenesFiltradas = imagenes
    .filter(img => img.categoria === categoriaActiva)
    .filter(img => 
      searchTerm === '' || 
      (img.nombre && img.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setArchivoSeleccionado(file);
    }
  };

  const handleUploadFromFile = () => {
    if (!archivoSeleccionado) return;

    const nuevaImagen: Imagen = {
      id: Date.now().toString(),
      url: URL.createObjectURL(archivoSeleccionado),
      categoria: categoriaImagen,
      nombre: archivoSeleccionado.name,
      fechaSubida: new Date().toLocaleDateString('es-ES'),
    };

    setImagenes([...imagenes, nuevaImagen]);
    setArchivoSeleccionado(null);
    setIsUploadModalOpen(false);
  };

  const handleSelectImageFromSearch = (imageUrl: string) => {
    const nuevaImagen: Imagen = {
      id: Date.now().toString(),
      url: imageUrl,
      categoria: categoriaImagen,
      fechaSubida: new Date().toLocaleDateString('es-ES'),
    };

    setImagenes([...imagenes, nuevaImagen]);
    setIsImageSearchOpen(false);
    setIsUploadModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setImagenes(imagenes.filter(img => img.id !== id));
  };

  return (
    <div className="galeria-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.1px', margin: 0, lineHeight: '1.5' }}>Galería de imágenes</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Input
              type="text"
              placeholder="Buscar imágenes..."
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
                add_photo_alternate
              </span>
              Agregar Imagen
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Agregar nueva imagen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="categoria">Categoría</Label>
                <Select value={categoriaImagen} onValueChange={(value: typeof categoriaImagen) => setCategoriaImagen(value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="promociones">Promociones</SelectItem>
                    <SelectItem value="ofertas">Ofertas</SelectItem>
                    <SelectItem value="destinos">Destinos</SelectItem>
                    <SelectItem value="comunicados">Comunicados</SelectItem>
                    <SelectItem value="clientes">Clientes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ImageTabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as typeof uploadMethod)}>
                <ImageTabsList className="grid w-full grid-cols-2">
                  <ImageTabsTrigger value="file">Subir desde PC</ImageTabsTrigger>
                  <ImageTabsTrigger value="search">Buscar en bibliotecas</ImageTabsTrigger>
                </ImageTabsList>
                <ImageTabsContent value="file" className="mt-4">
                  <div>
                    <Label htmlFor="imagen">Seleccionar imagen</Label>
                    <Input
                      id="imagen"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="mt-2"
                    />
                    {archivoSeleccionado && (
                      <div className="mt-4">
                        <p className="text-sm text-slate-600 mb-2">Vista previa:</p>
                        <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                          <Image
                            src={URL.createObjectURL(archivoSeleccionado)}
                            alt="Preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleUploadFromFile} disabled={!archivoSeleccionado}>
                        Subir
                      </Button>
                    </div>
                  </div>
                </ImageTabsContent>
                <ImageTabsContent value="search" className="mt-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-4">
                      Busca imágenes gratuitas de alta calidad en Unsplash y Pexels
                    </p>
                    <Button
                      onClick={() => {
                        setIsImageSearchOpen(true);
                      }}
                      className="w-full"
                    >
                      <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                        search
                      </span>
                      Buscar Imágenes
                    </Button>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </ImageTabsContent>
              </ImageTabs>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      <ImageSearchModal
        isOpen={isImageSearchOpen}
        onClose={() => setIsImageSearchOpen(false)}
        onSelectImage={handleSelectImageFromSearch}
      />

      <div className="galeria-page__content">
        <Tabs value={categoriaActiva} onValueChange={(value) => setCategoriaActiva(value as typeof categoriaActiva)}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid w-auto grid-cols-5">
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
              {imagenesFiltradas.length === 0 ? (
                <div className="galeria-page__empty-state">
                  <span className="material-symbols-outlined galeria-page__empty-icon">
                    imagesmode
                  </span>
                  <h2 className="galeria-page__empty-title">No hay imágenes en {cat.label.toLowerCase()} aún</h2>
                  <p className="galeria-page__empty-description">
                    Agrega tu primera imagen para comenzar
                  </p>
                </div>
              ) : (
                <>
                  {viewMode === 'grid' ? (
                    <div className="galeria-page__grid">
                      {imagenesFiltradas.map((imagen) => (
                        <Card key={imagen.id} className="galeria-page__card">
                          <div className="galeria-page__image-wrapper">
                            <Image
                              src={imagen.url}
                              alt={imagen.nombre || 'Imagen'}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                            <div className="galeria-page__overlay">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(imagen.url, '_blank')}
                                className="text-white hover:bg-white/20"
                              >
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                  visibility
                                </span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(imagen.id)}
                                className="text-white hover:bg-white/20"
                              >
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                  delete
                                </span>
                              </Button>
                            </div>
                          </div>
                          {imagen.nombre && (
                            <CardContent className="pt-3">
                              <p className="text-sm font-medium truncate">{imagen.nombre}</p>
                              <p className="text-xs text-slate-500 mt-1">{imagen.fechaSubida}</p>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="galeria-page__list">
                      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 uppercase items-center mb-4">
                        <div className="col-span-2">Imagen</div>
                        <div className="col-span-4">Nombre</div>
                        <div className="col-span-2">Categoría</div>
                        <div className="col-span-2">Fecha</div>
                        <div className="col-span-2 text-right">Acciones</div>
                      </div>
                      <div className="space-y-2">
                        {imagenesFiltradas.map((imagen) => (
                          <Card key={imagen.id} className="galeria-page__list-item">
                            <CardContent className="p-4">
                              <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-2">
                                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                                    <Image
                                      src={imagen.url}
                                      alt={imagen.nombre || 'Imagen'}
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />
                                  </div>
                                </div>
                                <div className="col-span-4">
                                  <p className="text-sm font-medium text-slate-900">{imagen.nombre || 'Sin nombre'}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-sm text-slate-600 capitalize">{imagen.categoria}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-sm text-slate-600">{imagen.fechaSubida}</p>
                                </div>
                                <div className="col-span-2 flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(imagen.url, '_blank')}
                                  >
                                    <span className="material-symbols-outlined mr-1" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                      visibility
                                    </span>
                                    Ver
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(imagen.id)}
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

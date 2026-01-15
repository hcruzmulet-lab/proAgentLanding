'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import './PromptsPage.scss';

interface Prompt {
  id: string;
  categoria: 'paquetes' | 'aniversario' | 'familiares';
  titulo: string;
  contenido: string;
  fechaCreacion: string;
}

const categorias = [
  { id: 'paquetes', label: 'Paquetes de viajes', icon: 'luggage' },
  { id: 'aniversario', label: 'Viajes de aniversario', icon: 'favorite' },
  { id: 'familiares', label: 'Viajes familiares', icon: 'family_restroom' },
];

const promptsMock: Prompt[] = [
  {
    id: '1',
    categoria: 'paquetes',
    titulo: 'Paquete Todo Incluido Caribe',
    contenido: 'Crea un paquete de viaje todo incluido de 7 días y 6 noches para el Caribe mexicano. Incluye vuelos, hotel 5 estrellas con todo incluido, traslados aeropuerto-hotel, y actividades acuáticas. El paquete debe ser para 2 personas en habitación estándar con vista al mar. Incluye desayuno, almuerzo y cena buffet, bebidas ilimitadas, y acceso a todas las instalaciones del resort.',
    fechaCreacion: '20/01/2024',
  },
  {
    id: '2',
    categoria: 'paquetes',
    titulo: 'Paquete Cultural Europa',
    contenido: 'Diseña un paquete cultural de 10 días visitando París, Roma y Barcelona. Incluye vuelos internacionales, hoteles 4 estrellas en el centro de cada ciudad, desayunos, tours guiados a los principales museos y monumentos históricos, y traslados entre ciudades en tren de alta velocidad. El paquete es para 2 personas que buscan una experiencia cultural enriquecedora.',
    fechaCreacion: '18/01/2024',
  },
  {
    id: '3',
    categoria: 'paquetes',
    titulo: 'Paquete Aventura Costa Rica',
    contenido: 'Crea un paquete de aventura de 8 días en Costa Rica. Incluye vuelos, alojamiento en eco-lodges, desayunos, tours de canopy, rafting, visitas a parques nacionales, avistamiento de fauna, y guías naturalistas. El paquete es para 2 personas amantes de la naturaleza y la aventura.',
    fechaCreacion: '15/01/2024',
  },
  {
    id: '4',
    categoria: 'aniversario',
    titulo: 'Luna de Miel Romántica',
    contenido: 'Diseña una luna de miel romántica de 10 días en las Maldivas. Incluye vuelos, villa sobre el agua con jacuzzi privado, todo incluido premium, cena romántica en la playa, spa para parejas, excursión en velero al atardecer, y decoración especial de la habitación. El paquete es para una pareja recién casada buscando una experiencia inolvidable y exclusiva.',
    fechaCreacion: '22/01/2024',
  },
  {
    id: '5',
    categoria: 'aniversario',
    titulo: 'Aniversario de Bodas en París',
    contenido: 'Crea un paquete romántico de 5 días en París para celebrar un aniversario de bodas. Incluye vuelos, hotel boutique en el barrio de Montmartre, desayunos, cena en restaurante con vista a la Torre Eiffel, crucero por el Sena, tour privado de la ciudad, y sesión de fotos profesional. El paquete es para una pareja que celebra su 25 aniversario.',
    fechaCreacion: '19/01/2024',
  },
  {
    id: '6',
    categoria: 'aniversario',
    titulo: 'Escape Romántico Toscana',
    contenido: 'Diseña un escape romántico de 7 días en la Toscana italiana. Incluye vuelos, alojamiento en villa rural con piscina, desayunos, cenas en restaurantes locales, tour de viñedos con degustación, clase de cocina italiana para parejas, y paseos en bicicleta por el campo. El paquete es para una pareja que busca tranquilidad y romance.',
    fechaCreacion: '17/01/2024',
  },
  {
    id: '7',
    categoria: 'familiares',
    titulo: 'Vacaciones Familiares Disney',
    contenido: 'Crea un paquete familiar de 6 días en Orlando, Florida. Incluye vuelos, hotel familiar cerca de los parques, desayunos, entradas a Magic Kingdom, Epcot, Animal Kingdom y Hollywood Studios, traslados al hotel, y una cena especial con personajes de Disney. El paquete es para una familia de 4 personas (2 adultos, 2 niños de 8 y 10 años).',
    fechaCreacion: '21/01/2024',
  },
  {
    id: '8',
    categoria: 'familiares',
    titulo: 'Aventura Familiar en Costa Rica',
    contenido: 'Diseña un paquete familiar de 9 días en Costa Rica. Incluye vuelos, hoteles familiares, desayunos, tours adaptados para niños (observación de animales, canopy suave, playas seguras), guías especializados en turismo familiar, y actividades educativas sobre la naturaleza. El paquete es para una familia de 5 personas (2 adultos, 3 niños de 6, 9 y 12 años).',
    fechaCreacion: '16/01/2024',
  },
  {
    id: '9',
    categoria: 'familiares',
    titulo: 'Viaje Multigeneracional Europa',
    contenido: 'Crea un paquete multigeneracional de 12 días visitando Londres, París y Roma. Incluye vuelos, hoteles con habitaciones familiares, desayunos, tours adaptados para todas las edades, acceso prioritario a atracciones, y tiempo libre para actividades individuales. El paquete es para una familia extendida de 6 personas (abuelos, padres y 2 adolescentes).',
    fechaCreacion: '14/01/2024',
  },
];

export function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>(promptsMock);
  const [categoriaActiva, setCategoriaActiva] = useState<'paquetes' | 'aniversario' | 'familiares'>('paquetes');
  const [isNewPromptModalOpen, setIsNewPromptModalOpen] = useState(false);
  const [nuevoPrompt, setNuevoPrompt] = useState({
    categoria: 'paquetes' as 'paquetes' | 'aniversario' | 'familiares',
    titulo: '',
    contenido: '',
  });
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  const promptsFiltrados = prompts.filter(p => p.categoria === categoriaActiva);

  const handleCreatePrompt = () => {
    if (!nuevoPrompt.titulo.trim() || !nuevoPrompt.contenido.trim()) return;

    const prompt: Prompt = {
      id: Date.now().toString(),
      categoria: nuevoPrompt.categoria,
      titulo: nuevoPrompt.titulo,
      contenido: nuevoPrompt.contenido,
      fechaCreacion: new Date().toLocaleDateString('es-ES'),
    };

    setPrompts([...prompts, prompt]);
    setNuevoPrompt({ categoria: 'paquetes', titulo: '', contenido: '' });
    setIsNewPromptModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setPrompts(prompts.filter(p => p.id !== id));
  };

  const handleEdit = (prompt: Prompt) => {
    setNuevoPrompt({
      categoria: prompt.categoria,
      titulo: prompt.titulo,
      contenido: prompt.contenido,
    });
    handleDelete(prompt.id);
    setIsNewPromptModalOpen(true);
  };

  return (
    <div className="prompts-page">
      <div className="prompts-page__header">
        <div>
          <h1 className="prompts-page__title">Prompts IA</h1>
          <p className="prompts-page__subtitle">
            Gestiona tus prompts de IA para mejorar tus consultas
          </p>
        </div>
        <Dialog open={isNewPromptModalOpen} onOpenChange={setIsNewPromptModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-slate-700 hover:bg-slate-800">
              <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                add
              </span>
              Agregar Prompt
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nuevo prompt</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="categoria">Categoría</Label>
                <Select
                  value={nuevoPrompt.categoria}
                  onValueChange={(value: 'paquetes' | 'aniversario' | 'familiares') =>
                    setNuevoPrompt({ ...nuevoPrompt, categoria: value })
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paquetes">Paquetes de viajes</SelectItem>
                    <SelectItem value="aniversario">Viajes de aniversario</SelectItem>
                    <SelectItem value="familiares">Viajes familiares</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="titulo">Título del prompt</Label>
                <Input
                  id="titulo"
                  value={nuevoPrompt.titulo}
                  onChange={(e) => setNuevoPrompt({ ...nuevoPrompt, titulo: e.target.value })}
                  placeholder="Ej: Crear paquete de luna de miel en el Caribe"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="contenido">Contenido del prompt</Label>
                <Textarea
                  id="contenido"
                  value={nuevoPrompt.contenido}
                  onChange={(e) => setNuevoPrompt({ ...nuevoPrompt, contenido: e.target.value })}
                  placeholder="Escribe aquí el prompt completo..."
                  className="mt-2 min-h-[200px]"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => {
                  setIsNewPromptModalOpen(false);
                  setNuevoPrompt({ categoria: 'paquetes', titulo: '', contenido: '' });
                }}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreatePrompt}
                  disabled={!nuevoPrompt.titulo.trim() || !nuevoPrompt.contenido.trim()}
                >
                  Guardar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="prompts-page__content">
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
              {promptsFiltrados.length === 0 ? (
                <div className="prompts-page__empty-state">
                  <span className="material-symbols-outlined prompts-page__empty-icon">
                    chat
                  </span>
                  <h2 className="prompts-page__empty-title">No hay prompts en {cat.label.toLowerCase()} aún</h2>
                  <p className="prompts-page__empty-description">
                    Crea tu primer prompt para comenzar
                  </p>
                </div>
              ) : (
                <>
                  {viewMode === 'grid' ? (
                    <div className="prompts-page__grid">
                      {promptsFiltrados.map((prompt) => (
                        <Card key={prompt.id} className="prompts-page__card">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg">{prompt.titulo}</CardTitle>
                                <p className="text-sm text-slate-500 mt-1">{prompt.fechaCreacion}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(prompt)}
                                >
                                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                    edit
                                  </span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(prompt.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                    delete
                                  </span>
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-slate-700 whitespace-pre-wrap line-clamp-4">{prompt.contenido}</p>
                            <div className="mt-4 pt-4 border-t">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigator.clipboard.writeText(prompt.contenido)}
                                className="w-full"
                              >
                                <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                  content_copy
                                </span>
                                Copiar prompt
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="prompts-page__list">
                      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 uppercase items-center mb-4">
                        <div className="col-span-4">Título</div>
                        <div className="col-span-5">Contenido</div>
                        <div className="col-span-1">Fecha</div>
                        <div className="col-span-2 text-right">Acciones</div>
                      </div>
                      <div className="space-y-2">
                        {promptsFiltrados.map((prompt) => (
                          <Card key={prompt.id} className="prompts-page__list-item">
                            <CardContent className="p-4">
                              <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-4">
                                  <p className="text-sm font-medium text-slate-900">{prompt.titulo}</p>
                                </div>
                                <div className="col-span-5">
                                  <p className="text-sm text-slate-700 line-clamp-2">{prompt.contenido}</p>
                                </div>
                                <div className="col-span-1">
                                  <p className="text-xs text-slate-500">{prompt.fechaCreacion}</p>
                                </div>
                                <div className="col-span-2 flex justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigator.clipboard.writeText(prompt.contenido)}
                                    title="Copiar"
                                  >
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                      content_copy
                                    </span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEdit(prompt)}
                                    title="Editar"
                                  >
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                      edit
                                    </span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(prompt.id)}
                                    className="text-red-600 hover:text-red-700"
                                    title="Eliminar"
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

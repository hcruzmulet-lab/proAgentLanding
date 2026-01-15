'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ImageSearchModal } from '@/components/shared/ImageSearchModal';
import './PerfilPage.scss';

interface Experiencia {
  id: string;
  empresa: string;
  cargo: string;
  fechaInicio: string;
  fechaFin?: string;
  descripcion: string;
}

interface Certificacion {
  id: string;
  nombre: string;
  institucion: string;
  fecha: string;
  url?: string;
}

interface Review {
  id: string;
  cliente: string;
  calificacion: number;
  comentario: string;
  fecha: string;
  destino?: string;
}

export function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [perfil, setPerfil] = useState({
    nombre: 'Arieldi Marrero',
    titulo: 'Asesor de Viajes Profesional',
    email: 'arieldi@proagent.com',
    telefono: '+1 (786) 554-3673',
    ubicacion: 'Miami, Florida',
    bio: 'Soy una asesora de viajes apasionada con más de 10 años de experiencia ayudando a las personas a descubrir destinos increíbles alrededor del mundo. Especializada en viajes de lujo, luna de miel y experiencias personalizadas.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
    fotoFondo: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop&q=80',
    especialidades: ['Viajes de Lujo', 'Luna de Miel', 'Aventura', 'Familias'],
    redesSociales: {
      instagram: '@arielditravels',
      facebook: 'Arieldi Travels',
      linkedin: 'Arieldi Marrero'
    }
  });

  const [experiencias, setExperiencias] = useState<Experiencia[]>([
    {
      id: '1',
      empresa: 'ProAgent Travel',
      cargo: 'Asesor de Viajes Senior',
      fechaInicio: '2020',
      fechaFin: 'Presente',
      descripcion: 'Especializada en crear experiencias de viaje personalizadas para clientes de alto nivel.'
    },
    {
      id: '2',
      empresa: 'Azúcar Travel',
      cargo: 'Agente de Viajes',
      fechaInicio: '2015',
      fechaFin: '2020',
      descripcion: 'Asesoramiento en destinos del Caribe y América Latina.'
    }
  ]);

  const [certificaciones, setCertificaciones] = useState<Certificacion[]>([
    {
      id: '1',
      nombre: 'Certificación Azúcar Travel',
      institucion: 'Azúcar Travel Academy',
      fecha: '2020',
      url: 'https://example.com/certificado'
    },
    {
      id: '2',
      nombre: 'Especialista en Viajes de Lujo',
      institucion: 'Luxury Travel Institute',
      fecha: '2019',
      url: 'https://example.com/certificado'
    }
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      cliente: 'María González',
      calificacion: 5,
      comentario: 'Arieldi hizo que nuestro viaje de luna de miel a Bora Bora fuera absolutamente perfecto. Cada detalle fue cuidado y superó nuestras expectativas.',
      fecha: '15 ene 2026',
      destino: 'Bora Bora'
    },
    {
      id: '2',
      cliente: 'Carlos Rodríguez',
      calificacion: 5,
      comentario: 'Excelente servicio y atención personalizada. Nos ayudó a planificar un viaje familiar increíble a Disney World.',
      fecha: '10 dic 2025',
      destino: 'Orlando, Florida'
    },
    {
      id: '3',
      cliente: 'Ana Martínez',
      calificacion: 5,
      comentario: 'Profesional, detallista y siempre disponible. Recomiendo sus servicios sin dudarlo.',
      fecha: '5 nov 2025',
      destino: 'París, Francia'
    }
  ]);

  const [editingExperiencia, setEditingExperiencia] = useState<Experiencia | null>(null);
  const [editingCertificacion, setEditingCertificacion] = useState<Certificacion | null>(null);
  const [newExperiencia, setNewExperiencia] = useState<Partial<Experiencia>>({});
  const [newCertificacion, setNewCertificacion] = useState<Partial<Certificacion>>({});
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  const [imageSearchType, setImageSearchType] = useState<'avatar' | 'cover'>('avatar');

  const handleSavePerfil = () => {
    // Aquí se guardaría en el backend
    setIsEditing(false);
  };

  const handleAddExperiencia = () => {
    if (editingExperiencia) {
      setExperiencias(experiencias.map(exp => exp.id === editingExperiencia.id ? editingExperiencia : exp));
      setEditingExperiencia(null);
    } else if (newExperiencia.empresa && newExperiencia.cargo) {
      const nueva: Experiencia = {
        id: Date.now().toString(),
        empresa: newExperiencia.empresa || '',
        cargo: newExperiencia.cargo || '',
        fechaInicio: newExperiencia.fechaInicio || '',
        fechaFin: newExperiencia.fechaFin,
        descripcion: newExperiencia.descripcion || ''
      };
      setExperiencias([...experiencias, nueva]);
      setNewExperiencia({});
    }
  };

  const handleDeleteExperiencia = (id: string) => {
    setExperiencias(experiencias.filter(exp => exp.id !== id));
  };

  const handleAddCertificacion = () => {
    if (editingCertificacion) {
      setCertificaciones(certificaciones.map(cert => cert.id === editingCertificacion.id ? editingCertificacion : cert));
      setEditingCertificacion(null);
    } else if (newCertificacion.nombre && newCertificacion.institucion) {
      const nueva: Certificacion = {
        id: Date.now().toString(),
        nombre: newCertificacion.nombre || '',
        institucion: newCertificacion.institucion || '',
        fecha: newCertificacion.fecha || '',
        url: newCertificacion.url
      };
      setCertificaciones([...certificaciones, nueva]);
      setNewCertificacion({});
    }
  };

  const handleDeleteCertificacion = (id: string) => {
    setCertificaciones(certificaciones.filter(cert => cert.id !== id));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`material-symbols-outlined ${i < rating ? 'text-yellow-400' : 'text-slate-300'}`}
        style={{ fontVariationSettings: i < rating ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
      >
        star
      </span>
    ));
  };

  return (
    <div className="perfil-page">
      <div className="perfil-page__header">
        <div className="flex items-center justify-between">
          <h1 className="perfil-page__title">Perfil público</h1>
          <Button
            onClick={() => isEditing ? handleSavePerfil() : setIsEditing(true)}
            className={isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-700 hover:bg-slate-800'}
          >
            <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
              {isEditing ? 'save' : 'edit'}
            </span>
            {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
          </Button>
        </div>
      </div>

      {!isEditing ? (
        /* Vista de Perfil Público */
        <div className="perfil-page__view">
          {/* Header con foto de fondo y avatar */}
          <div className="perfil-page__header-section">
            <div className="perfil-page__cover-image">
              <Image
                src={perfil.fotoFondo}
                alt="Cover"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="perfil-page__profile-info">
              <div className="perfil-page__avatar-wrapper">
                <Image
                  src={perfil.avatar}
                  alt={perfil.nombre}
                  width={150}
                  height={150}
                  className="perfil-page__avatar"
                  unoptimized
                />
              </div>
              <div className="perfil-page__info-content">
                <div className="perfil-page__info-left">
                  <h2 className="perfil-page__name">{perfil.nombre}</h2>
                  <div className="perfil-page__title-row">
                    <p className="perfil-page__title-text">{perfil.titulo}</p>
                    <div className="perfil-page__specialties">
                      {perfil.especialidades.map((esp, idx) => (
                        <Badge key={idx} variant="outline" className="bg-white/90">
                          {esp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="perfil-page__location">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                      location_on
                    </span>
                    {perfil.ubicacion}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="perfil-page__content-grid">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                    person
                  </span>
                  Sobre Mí
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">{perfil.bio}</p>
                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-slate-500" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                      mail
                    </span>
                    {perfil.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-slate-500" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                      phone
                    </span>
                    {perfil.telefono}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experiencia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                    work
                  </span>
                  Experiencia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiencias.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-slate-200 pl-4 pb-4 last:pb-0">
                    <h3 className="font-semibold text-slate-900">{exp.cargo}</h3>
                    <p className="text-slate-600 text-sm">{exp.empresa}</p>
                    <p className="text-slate-500 text-xs mt-1">{exp.fechaInicio} - {exp.fechaFin || 'Presente'}</p>
                    <p className="text-slate-700 text-sm mt-2">{exp.descripcion}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certificaciones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                    verified
                  </span>
                  Certificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {certificaciones.map((cert) => (
                  <div key={cert.id} className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-slate-900">{cert.nombre}</h3>
                      <p className="text-slate-600 text-sm">{cert.institucion}</p>
                      <p className="text-slate-500 text-xs mt-1">{cert.fecha}</p>
                    </div>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                          open_in_new
                        </span>
                      </a>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                    star
                  </span>
                  Reseñas de Clientes
                  <Badge variant="outline" className="ml-auto">
                    {reviews.length} reseñas
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900">{review.cliente}</h3>
                        {review.destino && (
                          <p className="text-slate-500 text-xs">{review.destino}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.calificacion)}
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{review.comentario}</p>
                    <p className="text-slate-500 text-xs mt-2">{review.fecha}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Marketing / Redes Sociales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                    share
                  </span>
                  Conecta Conmigo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-600" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                      photo_camera
                    </span>
                    <span className="text-slate-700">{perfil.redesSociales.instagram}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-600" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                      thumb_up
                    </span>
                    <span className="text-slate-700">{perfil.redesSociales.facebook}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-600" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>
                      business_center
                    </span>
                    <span className="text-slate-700">{perfil.redesSociales.linkedin}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Modo de Edición */
        <div className="perfil-page__edit">
          <div className="space-y-6">
            {/* Información Básica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre Completo</Label>
                    <Input
                      id="nombre"
                      value={perfil.nombre}
                      onChange={(e) => setPerfil({...perfil, nombre: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="titulo">Título Profesional</Label>
                    <Input
                      id="titulo"
                      value={perfil.titulo}
                      onChange={(e) => setPerfil({...perfil, titulo: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={perfil.email}
                      onChange={(e) => setPerfil({...perfil, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={perfil.telefono}
                      onChange={(e) => setPerfil({...perfil, telefono: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="ubicacion">Ubicación</Label>
                  <Input
                    id="ubicacion"
                    value={perfil.ubicacion}
                    onChange={(e) => setPerfil({...perfil, ubicacion: e.target.value})}
                  />
                </div>
                {/* Avatar */}
                <div>
                  <Label>Avatar</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="relative">
                      <Image
                        src={perfil.avatar}
                        alt="Avatar"
                        width={100}
                        height={100}
                        className="rounded-full border-2 border-slate-200 object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="file"
                          id="avatar-upload"
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
                                setPerfil({...perfil, avatar: reader.result as string});
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('avatar-upload')?.click()}
                        >
                          <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                            upload
                          </span>
                          Subir Imagen
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setImageSearchType('avatar');
                            setIsImageSearchOpen(true);
                          }}
                        >
                          <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                            image_search
                          </span>
                          Buscar Imagen
                        </Button>
                      </div>
                      <Input
                        value={perfil.avatar}
                        onChange={(e) => setPerfil({...perfil, avatar: e.target.value})}
                        placeholder="O ingresa una URL"
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Foto de Fondo */}
                <div>
                  <Label>Foto de Fondo</Label>
                  <div className="mt-2 space-y-2">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-slate-200">
                      <Image
                        src={perfil.fotoFondo}
                        alt="Cover"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        id="cover-upload"
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
                              setPerfil({...perfil, fotoFondo: reader.result as string});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('cover-upload')?.click()}
                      >
                        <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                          upload
                        </span>
                        Subir Imagen
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setImageSearchType('cover');
                          setIsImageSearchOpen(true);
                        }}
                      >
                        <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                          image_search
                        </span>
                        Buscar Imagen
                      </Button>
                    </div>
                    <Input
                      value={perfil.fotoFondo}
                      onChange={(e) => setPerfil({...perfil, fotoFondo: e.target.value})}
                      placeholder="O ingresa una URL"
                      className="text-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea
                    id="bio"
                    rows={5}
                    value={perfil.bio}
                    onChange={(e) => setPerfil({...perfil, bio: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Experiencia */}
            <Card>
              <CardHeader>
                <CardTitle>Experiencia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiencias.map((exp) => (
                  <div key={exp.id} className="p-4 border rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        value={exp.empresa}
                      onChange={(e) => setExperiencias(experiencias.map(expItem => expItem.id === exp.id ? {...expItem, empresa: e.target.value} : expItem))}
                      placeholder="Empresa"
                    />
                    <Input
                      value={exp.cargo}
                      onChange={(e) => setExperiencias(experiencias.map(expItem => expItem.id === exp.id ? {...expItem, cargo: e.target.value} : expItem))}
                      placeholder="Cargo"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      value={exp.fechaInicio}
                      onChange={(e) => setExperiencias(experiencias.map(expItem => expItem.id === exp.id ? {...expItem, fechaInicio: e.target.value} : expItem))}
                      placeholder="Fecha inicio"
                    />
                    <Input
                      value={exp.fechaFin || ''}
                      onChange={(e) => setExperiencias(experiencias.map(expItem => expItem.id === exp.id ? {...expItem, fechaFin: e.target.value} : expItem))}
                      placeholder="Fecha fin (o 'Presente')"
                    />
                  </div>
                  <Textarea
                    value={exp.descripcion}
                    onChange={(e) => setExperiencias(experiencias.map(expItem => expItem.id === exp.id ? {...expItem, descripcion: e.target.value} : expItem))}
                      placeholder="Descripción"
                      rows={3}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteExperiencia(exp.id)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
                <div className="p-4 border-2 border-dashed rounded-lg space-y-3">
                  <h4 className="font-medium">Agregar Nueva Experiencia</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      value={newExperiencia.empresa || ''}
                      onChange={(e) => setNewExperiencia({...newExperiencia, empresa: e.target.value})}
                      placeholder="Empresa"
                    />
                    <Input
                      value={newExperiencia.cargo || ''}
                      onChange={(e) => setNewExperiencia({...newExperiencia, cargo: e.target.value})}
                      placeholder="Cargo"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      value={newExperiencia.fechaInicio || ''}
                      onChange={(e) => setNewExperiencia({...newExperiencia, fechaInicio: e.target.value})}
                      placeholder="Fecha inicio"
                    />
                    <Input
                      value={newExperiencia.fechaFin || ''}
                      onChange={(e) => setNewExperiencia({...newExperiencia, fechaFin: e.target.value})}
                      placeholder="Fecha fin"
                    />
                  </div>
                  <Textarea
                    value={newExperiencia.descripcion || ''}
                    onChange={(e) => setNewExperiencia({...newExperiencia, descripcion: e.target.value})}
                    placeholder="Descripción"
                    rows={3}
                  />
                  <Button onClick={handleAddExperiencia} size="sm">
                    Agregar Experiencia
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Certificaciones */}
            <Card>
              <CardHeader>
                <CardTitle>Certificaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {certificaciones.map((cert) => (
                  <div key={cert.id} className="p-4 border rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        value={cert.nombre}
                        onChange={(e) => setCertificaciones(certificaciones.map(c => c.id === cert.id ? {...c, nombre: e.target.value} : c))}
                        placeholder="Nombre de certificación"
                      />
                      <Input
                        value={cert.institucion}
                        onChange={(e) => setCertificaciones(certificaciones.map(c => c.id === cert.id ? {...c, institucion: e.target.value} : c))}
                        placeholder="Institución"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        value={cert.fecha}
                        onChange={(e) => setCertificaciones(certificaciones.map(c => c.id === cert.id ? {...c, fecha: e.target.value} : c))}
                        placeholder="Fecha"
                      />
                      <Input
                        value={cert.url || ''}
                        onChange={(e) => setCertificaciones(certificaciones.map(c => c.id === cert.id ? {...c, url: e.target.value} : c))}
                        placeholder="URL del certificado (opcional)"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCertificacion(cert.id)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
                <div className="p-4 border-2 border-dashed rounded-lg space-y-3">
                  <h4 className="font-medium">Agregar Nueva Certificación</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      value={newCertificacion.nombre || ''}
                      onChange={(e) => setNewCertificacion({...newCertificacion, nombre: e.target.value})}
                      placeholder="Nombre de certificación"
                    />
                    <Input
                      value={newCertificacion.institucion || ''}
                      onChange={(e) => setNewCertificacion({...newCertificacion, institucion: e.target.value})}
                      placeholder="Institución"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      value={newCertificacion.fecha || ''}
                      onChange={(e) => setNewCertificacion({...newCertificacion, fecha: e.target.value})}
                      placeholder="Fecha"
                    />
                    <Input
                      value={newCertificacion.url || ''}
                      onChange={(e) => setNewCertificacion({...newCertificacion, url: e.target.value})}
                      placeholder="URL del certificado (opcional)"
                    />
                  </div>
                  <Button onClick={handleAddCertificacion} size="sm">
                    Agregar Certificación
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Redes Sociales */}
            <Card>
              <CardHeader>
                <CardTitle>Redes Sociales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={perfil.redesSociales.instagram}
                    onChange={(e) => setPerfil({...perfil, redesSociales: {...perfil.redesSociales, instagram: e.target.value}})}
                    placeholder="@usuario"
                  />
                </div>
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={perfil.redesSociales.facebook}
                    onChange={(e) => setPerfil({...perfil, redesSociales: {...perfil.redesSociales, facebook: e.target.value}})}
                    placeholder="Nombre de página"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={perfil.redesSociales.linkedin}
                    onChange={(e) => setPerfil({...perfil, redesSociales: {...perfil.redesSociales, linkedin: e.target.value}})}
                    placeholder="Nombre completo"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Modal de búsqueda de imágenes */}
      <ImageSearchModal
        isOpen={isImageSearchOpen}
        onClose={() => setIsImageSearchOpen(false)}
        onSelectImage={(imageUrl) => {
          if (imageSearchType === 'avatar') {
            setPerfil({...perfil, avatar: imageUrl});
          } else {
            setPerfil({...perfil, fotoFondo: imageUrl});
          }
          setIsImageSearchOpen(false);
        }}
      />
    </div>
  );
}

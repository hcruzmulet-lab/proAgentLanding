'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    username: string;
  };
  description: string | null;
}

interface PexelsImage {
  id: number;
  src: {
    large: string;
    medium: string;
    small: string;
  };
  photographer: string;
  alt: string;
}

export function ImageSearchModal({ isOpen, onClose, onSelectImage }: ImageSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [unsplashImages, setUnsplashImages] = useState<UnsplashImage[]>([]);
  const [pexelsImages, setPexelsImages] = useState<PexelsImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('unsplash');

  const searchUnsplash = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      // Usando Unsplash API real con tu Access Key
      const accessKey = 'o3Tb9PFmy5QF0Z2wvaqe8jkasnf7koGiiDwFfhwwH4s';
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12&client_id=${accessKey}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setUnsplashImages(data.results);
      } else {
        console.error('Error al buscar en Unsplash:', response.status);
        setUnsplashImages([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setUnsplashImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const searchPexels = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      // Usando Pixabay API que es gratuita y no requiere registro para desarrollo
      const response = await fetch(
        `https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=${encodeURIComponent(query)}&image_type=photo&per_page=12&safesearch=true&page=2`
      );
      
      if (response.ok) {
        const data = await response.json();
        // Convertir formato de Pixabay a formato Pexels
        const convertedImages: PexelsImage[] = data.hits.map((hit: any) => ({
          id: hit.id,
          src: {
            large: hit.largeImageURL,
            medium: hit.webformatURL,
            small: hit.previewURL,
          },
          photographer: hit.user,
          alt: hit.tags,
        }));
        setPexelsImages(convertedImages);
      } else {
        console.error('Error al buscar imágenes');
        setPexelsImages([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setPexelsImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (activeTab === 'unsplash') {
      searchUnsplash(searchQuery);
    } else {
      searchPexels(searchQuery);
    }
  };

  const handleSelectImage = (imageUrl: string) => {
    onSelectImage(imageUrl);
    onClose();
    // Reset
    setSearchQuery('');
    setUnsplashImages([]);
    setPexelsImages([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-slate-900">
            Buscar Imagen
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Buscador */}
          <div className="flex gap-2">
            <Input
              placeholder="Ej: cancún beach, paris eiffel tower, mountains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={!searchQuery.trim() || isLoading}
              className="bg-slate-700 hover:bg-slate-800"
            >
              <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                search
              </span>
              Buscar
            </Button>
          </div>

          {/* Tabs de fuentes */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="unsplash">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                    photo_library
                  </span>
                  Unsplash
                </span>
              </TabsTrigger>
              <TabsTrigger value="pexels">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                    collections
                  </span>
                  Pixabay
                </span>
              </TabsTrigger>
            </TabsList>

            {/* Resultados de Unsplash */}
            <TabsContent value="unsplash" className="flex-1 overflow-y-auto mt-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-5xl text-slate-400 animate-pulse" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                      image_search
                    </span>
                    <p className="text-slate-600 mt-2">Buscando imágenes...</p>
                  </div>
                </div>
              ) : unsplashImages.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {unsplashImages.map((image) => (
                    <button
                      key={image.id}
                      onClick={() => handleSelectImage(image.urls.regular)}
                      className="group relative aspect-video overflow-hidden rounded-lg border-2 border-slate-200 hover:border-slate-700 transition-all"
                    >
                      <img
                        src={image.urls.small}
                        alt={image.description || 'Unsplash image'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity text-4xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
                          check_circle
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs">Por {image.user.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center text-slate-500">
                    <span className="material-symbols-outlined text-5xl mb-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                      travel_explore
                    </span>
                    <p>Busca imágenes de destinos, hoteles, playas y más</p>
                    <p className="text-sm mt-1">Escribe palabras clave en inglés (ej: beach, paris, mountains)</p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Resultados de Pexels */}
            <TabsContent value="pexels" className="flex-1 overflow-y-auto mt-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-5xl text-slate-400 animate-pulse" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                      image_search
                    </span>
                    <p className="text-slate-600 mt-2">Buscando imágenes...</p>
                  </div>
                </div>
              ) : pexelsImages.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {pexelsImages.map((image) => (
                    <button
                      key={image.id}
                      onClick={() => handleSelectImage(image.src.large)}
                      className="group relative aspect-video overflow-hidden rounded-lg border-2 border-slate-200 hover:border-slate-700 transition-all"
                    >
                      <img
                        src={image.src.medium}
                        alt={image.alt || 'Pexels image'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity text-4xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
                          check_circle
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs">Por {image.photographer}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center text-slate-500">
                    <span className="material-symbols-outlined text-5xl mb-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                      photo_camera
                    </span>
                    <p>Busca imágenes de destinos, hoteles, playas y más</p>
                    <p className="text-sm mt-1">Escribe palabras clave en inglés (ej: hotel, sunset, city)</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Nota sobre atribución */}
          <div className="border-t pt-3">
            <p className="text-xs text-slate-500 text-center">
              Las imágenes son proporcionadas por {activeTab === 'unsplash' ? 'Unsplash' : 'Pixabay'} y son de uso libre.
              Todas las imágenes están bajo licencia de uso comercial.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

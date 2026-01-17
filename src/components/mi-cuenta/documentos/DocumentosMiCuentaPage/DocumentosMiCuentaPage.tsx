'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import './DocumentosMiCuentaPage.scss';

interface Documento {
  id: string;
  nombre: string;
  tipo: 'contrato' | 'certificado' | 'registro';
  fecha: string;
  estado: 'vigente' | 'vencido' | 'pendiente';
  descripcion?: string;
}

const documentosMock: Documento[] = [
  {
    id: '1',
    nombre: 'Contrato con Proagent',
    tipo: 'contrato',
    fecha: '15/01/2024',
    estado: 'vigente',
    descripcion: 'Contrato de servicios como agente de viajes independiente'
  },
  {
    id: '2',
    nombre: 'Certificado de Agente de Viajes',
    tipo: 'certificado',
    fecha: '20/03/2023',
    estado: 'vigente',
    descripcion: 'Certificación profesional como agente de viajes'
  },
  {
    id: '3',
    nombre: 'Certificado Azúcar Travel',
    tipo: 'certificado',
    fecha: '10/05/2024',
    estado: 'vigente',
    descripcion: 'Certificación oficial de Azúcar Travel'
  },
  {
    id: '4',
    nombre: 'Registro Mercantil',
    tipo: 'registro',
    fecha: '05/02/2023',
    estado: 'vigente',
    descripcion: 'Registro mercantil de la empresa'
  },
  {
    id: '5',
    nombre: 'Licencia de Operación',
    tipo: 'registro',
    fecha: '12/01/2023',
    estado: 'vigente',
    descripcion: 'Licencia para operar como agente de viajes'
  }
];

const getDocumentIcon = (tipo: string) => {
  switch (tipo) {
    case 'contrato':
      return 'description';
    case 'certificado':
      return 'verified';
    case 'registro':
      return 'folder';
    default:
      return 'description';
  }
};

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case 'vigente':
      return { text: 'Vigente', className: 'documentos-mi-cuenta-page__badge--vigente' };
    case 'vencido':
      return { text: 'Vencido', className: 'documentos-mi-cuenta-page__badge--vencido' };
    case 'pendiente':
      return { text: 'Pendiente', className: 'documentos-mi-cuenta-page__badge--pendiente' };
    default:
      return { text: estado, className: '' };
  }
};

export function DocumentosMiCuentaPage() {
  const handleDownload = (documento: Documento) => {
    console.log('Descargando documento:', documento.nombre);
    // Aquí se implementaría la descarga del documento
  };

  const handleView = (documento: Documento) => {
    console.log('Viendo documento:', documento.nombre);
    // Aquí se implementaría la visualización del documento
  };

  return (
    <div className="documentos-mi-cuenta-page">
      <div className="documentos-mi-cuenta-page__header">
        <h1 className="documentos-mi-cuenta-page__title">Documentos del agente</h1>
        <p className="documentos-mi-cuenta-page__subtitle">
          Gestiona tus documentos personales y certificaciones
        </p>
      </div>

      <div className="documentos-mi-cuenta-page__content">
        <div className="documentos-mi-cuenta-page__documents-list">
          {documentosMock.map((documento) => {
            const estadoBadge = getEstadoBadge(documento.estado);
            
            return (
              <Card key={documento.id} className="documentos-mi-cuenta-page__document-card">
                <div className="documentos-mi-cuenta-page__document-content">
                  <div className="documentos-mi-cuenta-page__document-icon-wrapper">
                    <span 
                      className={`material-symbols-outlined documentos-mi-cuenta-page__document-icon documentos-mi-cuenta-page__document-icon--${documento.tipo}`}
                    >
                      {getDocumentIcon(documento.tipo)}
                    </span>
                  </div>
                  
                  <div className="documentos-mi-cuenta-page__document-info">
                    <div className="documentos-mi-cuenta-page__document-header">
                      <h3 className="documentos-mi-cuenta-page__document-name">
                        {documento.nombre}
                      </h3>
                      <span className={`documentos-mi-cuenta-page__badge ${estadoBadge.className}`}>
                        {estadoBadge.text}
                      </span>
                    </div>
                    
                    {documento.descripcion && (
                      <p className="documentos-mi-cuenta-page__document-description">
                        {documento.descripcion}
                      </p>
                    )}
                    
                    <div className="documentos-mi-cuenta-page__document-meta">
                      <span className="documentos-mi-cuenta-page__document-date">
                        <span className="material-symbols-outlined">calendar_today</span>
                        Fecha: {documento.fecha}
                      </span>
                    </div>
                  </div>
                  
                  <div className="documentos-mi-cuenta-page__document-actions">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(documento)}
                      className="documentos-mi-cuenta-page__action-button"
                    >
                      <span className="material-symbols-outlined">visibility</span>
                      Ver
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(documento)}
                      className="documentos-mi-cuenta-page__action-button"
                    >
                      <span className="material-symbols-outlined">download</span>
                      Descargar
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

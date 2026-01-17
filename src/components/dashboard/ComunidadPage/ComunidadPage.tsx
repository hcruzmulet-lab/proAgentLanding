'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import './ComunidadPage.scss';

export function ComunidadPage() {
  const handleWhatsAppClick = () => {
    // Link al grupo de WhatsApp de Proagent
    window.open('https://chat.whatsapp.com/your-group-link', '_blank');
  };

  const handleFacebookClick = () => {
    // Link a la página de Facebook de Proagent
    window.open('https://www.facebook.com/proagent', '_blank');
  };

  return (
    <div className="comunidad-page">
      <h1 className="comunidad-page__title">Comunidad</h1>

      <div className="comunidad-page__cards">
        <Card className="comunidad-page__card comunidad-page__card--whatsapp">
          <div className="comunidad-page__card-content">
            <div className="comunidad-page__card-icon">
              <svg 
                version="1.1" 
                id="fi_733585" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" 
                x="0px" 
                y="0px" 
                viewBox="0 0 512 512" 
                xmlSpace="preserve"
                className="comunidad-page__whatsapp-icon"
              >
                <path 
                  style={{ fill: '#4CAF50' }} 
                  d="M256.064,0h-0.128l0,0C114.784,0,0,114.816,0,256c0,56,18.048,107.904,48.736,150.048l-31.904,95.104
                  l98.4-31.456C155.712,496.512,204,512,256.064,512C397.216,512,512,397.152,512,256S397.216,0,256.064,0z"
                ></path>
                <path 
                  style={{ fill: '#FAFAFA' }} 
                  d="M405.024,361.504c-6.176,17.44-30.688,31.904-50.24,36.128c-13.376,2.848-30.848,5.12-89.664-19.264
                  C189.888,347.2,141.44,270.752,137.664,265.792c-3.616-4.96-30.4-40.48-30.4-77.216s18.656-54.624,26.176-62.304
                  c6.176-6.304,16.384-9.184,26.176-9.184c3.168,0,6.016,0.16,8.576,0.288c7.52,0.32,11.296,0.768,16.256,12.64
                  c6.176,14.88,21.216,51.616,23.008,55.392c1.824,3.776,3.648,8.896,1.088,13.856c-2.4,5.12-4.512,7.392-8.288,11.744
                  c-3.776,4.352-7.36,7.68-11.136,12.352c-3.456,4.064-7.36,8.416-3.008,15.936c4.352,7.36,19.392,31.904,41.536,51.616
                  c28.576,25.44,51.744,33.568,60.032,37.024c6.176,2.56,13.536,1.952,18.048-2.848c5.728-6.176,12.8-16.416,20-26.496
                  c5.12-7.232,11.584-8.128,18.368-5.568c6.912,2.4,43.488,20.48,51.008,24.224c7.52,3.776,12.48,5.568,14.304,8.736
                  C411.2,329.152,411.2,344.032,405.024,361.504z"
                ></path>
              </svg>
            </div>
            <div className="comunidad-page__card-info">
              <h2 className="comunidad-page__card-title">Grupo de WhatsApp</h2>
              <p className="comunidad-page__card-description">
                Únete a nuestra comunidad de asesores de viajes en WhatsApp. Comparte experiencias, 
                resuelve dudas y mantente conectado con el equipo de Proagent.
              </p>
            </div>
            <Button 
              onClick={handleWhatsAppClick}
              className="comunidad-page__card-button"
              size="lg"
            >
              <span className="material-symbols-outlined">open_in_new</span>
              Unirse al grupo
            </Button>
          </div>
        </Card>

        <Card className="comunidad-page__card comunidad-page__card--facebook">
          <div className="comunidad-page__card-content">
            <div className="comunidad-page__card-icon">
              <svg 
                version="1.1" 
                id="fi_145802" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" 
                x="0px" 
                y="0px" 
                viewBox="0 0 112.196 112.196" 
                xmlSpace="preserve"
                className="comunidad-page__facebook-icon"
              >
                <g>
                  <circle style={{ fill: '#3B5998' }} cx="56.098" cy="56.098" r="56.098"></circle>
                  <path 
                    style={{ fill: '#FFFFFF' }} 
                    d="M70.201,58.294h-10.01v36.672H45.025V58.294h-7.213V45.406h7.213v-8.34
                    c0-5.964,2.833-15.303,15.301-15.303L71.56,21.81v12.51h-8.151c-1.337,0-3.217,0.668-3.217,3.513v7.585h11.334L70.201,58.294z"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="comunidad-page__card-info">
              <h2 className="comunidad-page__card-title">Página de Facebook</h2>
              <p className="comunidad-page__card-description">
                Síguenos en Facebook para estar al día con las últimas ofertas, promociones, 
                novedades y contenido exclusivo para asesores de viajes.
              </p>
            </div>
            <Button 
              onClick={handleFacebookClick}
              className="comunidad-page__card-button"
              size="lg"
              variant="outline"
            >
              <span className="material-symbols-outlined">open_in_new</span>
              Visitar página
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

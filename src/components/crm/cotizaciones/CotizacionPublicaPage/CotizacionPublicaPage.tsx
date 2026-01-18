'use client';

import Image from 'next/image';
import './CotizacionPublicaPage.scss';

interface Servicio {
  id: string;
  tipo: 'vuelo' | 'hotel' | 'traslado' | 'actividad';
  icono: string;
  titulo: string;
  detalles: string[];
  precio: number;
  imagen?: string;
}

export function CotizacionPublicaPage() {
  // Datos mock de la cotización COT-002 (en producción vendrían del servidor)
  const cotizacion = {
    numero: 'COT-002',
    titulo: 'Vacaciones Soñadas en Punta Cana',
    fechaCreacion: '12 ene 2026',
    fechaViaje: '20 mar 2026',
    fechaVuelta: '27 mar 2026',
    estado: 'pendiente',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=600&fit=crop',
    
    cliente: {
      tipoCliente: 'persona',
      nombre: 'Arieldi Marrero',
      email: 'arieldi.marrero@gmail.com',
      telefono: '+1 (809) 555-1234',
      direccion: 'Calle Principal #123, Santo Domingo',
      nacionalidad: 'Dominicana',
    },
    
    pasajeros: {
      adultos: 2,
      ninos: 2,
      infantes: 0,
      total: 4,
    },
    
    notas: {
      cliente: 'La familia Marrero busca un resort todo incluido con actividades para niños. Preferencia por habitaciones con vista al mar.',
      terminosCondiciones: 'Precios sujetos a disponibilidad. Depósito no reembolsable del 30%. Balance final 30 días antes del viaje.',
    }
  };

  const servicios: Servicio[] = [
    {
      id: '1',
      tipo: 'vuelo',
      icono: 'flight_takeoff',
      titulo: 'Vuelos Ida y Vuelta',
      detalles: [
        'Aerolínea: American Airlines',
        'Ruta: Santo Domingo (SDQ) → Punta Cana (PUJ)',
        'Fecha ida: 20 mar 2026, 10:30 AM',
        'Fecha vuelta: 27 mar 2026, 3:45 PM',
        'Clase: Económica Premium',
        '2 maletas incluidas por pasajero',
      ],
      precio: 1200.00,
      imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      tipo: 'hotel',
      icono: 'hotel',
      titulo: 'Resort Todo Incluido',
      detalles: [
        'Hotel: Hard Rock Hotel & Casino Punta Cana',
        'Ubicación: Bávaro, Punta Cana',
        'Check-in: 20 mar 2026',
        'Check-out: 27 mar 2026',
        'Habitación: Suite Familiar Vista al Mar',
        'Régimen: Todo Incluido Premium',
        '7 noches / 2 adultos + 2 niños',
      ],
      precio: 2800.00,
      imagen: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      tipo: 'traslado',
      icono: 'directions_car',
      titulo: 'Traslados Aeropuerto - Hotel',
      detalles: [
        'Tipo: Traslado privado VIP',
        'Vehículo: SUV con aire acondicionado',
        'Incluye: Ida y vuelta',
        'Capacidad: Hasta 6 pasajeros',
        'Agua y snacks de cortesía',
      ],
      precio: 150.00,
      imagen: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop',
    },
    {
      id: '4',
      tipo: 'actividad',
      icono: 'local_activity',
      titulo: 'Excursiones y Actividades',
      detalles: [
        'Isla Saona - Tour de día completo',
        'Snorkel en arrecifes de coral',
        'Paseo en catamarán',
        'Almuerzo buffet en la playa',
        'Bebidas ilimitadas incluidas',
        'Guía turístico en español',
      ],
      precio: 280.00,
      imagen: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    },
  ];

  const calcularSubtotal = () => {
    return servicios.reduce((total, servicio) => total + servicio.precio, 0);
  };

  const calcularImpuestos = () => {
    return calcularSubtotal() * 0.18;
  };

  const calcularTotal = () => {
    return calcularSubtotal() + calcularImpuestos();
  };

  return (
    <div className="cotizacion-publica">
      {/* Navbar simple */}
      <nav className="cotizacion-publica__navbar">
        <div className="cotizacion-publica__navbar-content">
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
              <path d="M351.351 21H350.535V69.9474H351.351V21Z" fill="#1B2340"/>
            </g>
            <defs>
              <clipPath id="clip0_267_2">
                <rect width="472" height="93" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="cotizacion-publica__content">
        {/* Header con Cover Image */}
        <div className="cotizacion-publica__header">
          <Image
            src={cotizacion.coverImage}
            alt={cotizacion.titulo}
            fill
            className="cotizacion-publica__cover-image"
            unoptimized
          />
          <div className="cotizacion-publica__cover-overlay" />
          <div className="cotizacion-publica__cover-content">
            <div className="cotizacion-publica__badge">
              {cotizacion.numero}
            </div>
            <h1 className="cotizacion-publica__title">{cotizacion.titulo}</h1>
            <div className="cotizacion-publica__meta">
              <span>
                <span className="material-symbols-outlined">calendar_today</span>
                {cotizacion.fechaViaje} - {cotizacion.fechaVuelta}
              </span>
              <span>
                <span className="material-symbols-outlined">group</span>
                {cotizacion.pasajeros.total} pasajeros
              </span>
            </div>
          </div>
        </div>

        <div className="cotizacion-publica__container">
          {/* Información del Cliente y Viaje */}
          <div className="cotizacion-publica__grid">
            <div className="cotizacion-publica__card">
              <h2 className="cotizacion-publica__card-title">
                <span className="material-symbols-outlined">person</span>
                Información del Cliente
              </h2>
              <div className="cotizacion-publica__info">
                <div className="cotizacion-publica__info-item">
                  <span className="cotizacion-publica__info-label">Nombre</span>
                  <span className="cotizacion-publica__info-value">{cotizacion.cliente.nombre}</span>
                </div>
                <div className="cotizacion-publica__info-item">
                  <span className="cotizacion-publica__info-label">Email</span>
                  <span className="cotizacion-publica__info-value">{cotizacion.cliente.email}</span>
                </div>
                <div className="cotizacion-publica__info-item">
                  <span className="cotizacion-publica__info-label">Teléfono</span>
                  <span className="cotizacion-publica__info-value">{cotizacion.cliente.telefono}</span>
                </div>
              </div>
            </div>

            <div className="cotizacion-publica__card">
              <h2 className="cotizacion-publica__card-title">
                <span className="material-symbols-outlined">group</span>
                Pasajeros
              </h2>
              <div className="cotizacion-publica__passengers">
                <div className="cotizacion-publica__passenger">
                  <span className="cotizacion-publica__passenger-count">{cotizacion.pasajeros.adultos}</span>
                  <span className="cotizacion-publica__passenger-label">Adultos</span>
                </div>
                <div className="cotizacion-publica__passenger">
                  <span className="cotizacion-publica__passenger-count">{cotizacion.pasajeros.ninos}</span>
                  <span className="cotizacion-publica__passenger-label">Niños</span>
                </div>
                <div className="cotizacion-publica__passenger">
                  <span className="cotizacion-publica__passenger-count">{cotizacion.pasajeros.infantes}</span>
                  <span className="cotizacion-publica__passenger-label">Infantes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div className="cotizacion-publica__section">
            <h2 className="cotizacion-publica__section-title">
              <span className="material-symbols-outlined">public</span>
              Servicios Incluidos
            </h2>

            <div className="cotizacion-publica__services">
              {servicios.map((servicio) => (
                <div key={servicio.id} className="cotizacion-publica__service">
                  <div className="cotizacion-publica__service-image-container">
                    {servicio.imagen && (
                      <>
                        <Image
                          src={servicio.imagen}
                          alt={servicio.titulo}
                          fill
                          className="cotizacion-publica__service-image"
                          unoptimized
                        />
                        <div className="cotizacion-publica__service-overlay" />
                      </>
                    )}
                    <div className="cotizacion-publica__service-icon">
                      <span className="material-symbols-outlined">{servicio.icono}</span>
                    </div>
                  </div>
                  <div className="cotizacion-publica__service-content">
                    <div className="cotizacion-publica__service-header">
                      <h3>{servicio.titulo}</h3>
                      <span className="cotizacion-publica__service-price">
                        ${servicio.precio.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <ul className="cotizacion-publica__service-details">
                      {servicio.detalles.map((detalle, index) => (
                        <li key={index}>
                          <span className="material-symbols-outlined">check_circle</span>
                          <span>{detalle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen y Notas */}
          <div className="cotizacion-publica__footer-grid">
            <div className="cotizacion-publica__card">
              <h2 className="cotizacion-publica__card-title">
                <span className="material-symbols-outlined">receipt_long</span>
                Resumen de Costos
              </h2>
              <div className="cotizacion-publica__summary">
                <div className="cotizacion-publica__summary-item">
                  <span>Subtotal</span>
                  <span>${calcularSubtotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="cotizacion-publica__summary-item">
                  <span>Impuestos y Tasas (18%)</span>
                  <span>${calcularImpuestos().toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="cotizacion-publica__summary-total">
                  <span>Total</span>
                  <span>${calcularTotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            <div className="cotizacion-publica__card">
              <h2 className="cotizacion-publica__card-title">
                <span className="material-symbols-outlined">info</span>
                Información Importante
              </h2>
              <div className="cotizacion-publica__notes">
                <p><strong>Notas:</strong> {cotizacion.notas.cliente}</p>
                <p><strong>Términos y Condiciones:</strong> {cotizacion.notas.terminosCondiciones}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="cotizacion-publica__footer">
        <p>© 2026 Proagent by Azúcar Travel. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

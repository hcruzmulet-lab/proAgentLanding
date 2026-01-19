'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import './DetalleItinerarioPage.scss';

interface DetalleItinerarioPageProps {
  id: string;
}

export function DetalleItinerarioPage({ id }: DetalleItinerarioPageProps) {
  const router = useRouter();

  // Mock data - en producción vendría de una API o base de datos
  const itinerario = {
    id: '3',
    numeroItinerario: 'ITI-003',
    titulo: 'Viaje a Europa desde Quito',
    subtitulo: 'Madrid • Barcelona • Roma • Madrid',
    fechaSalida: 'sábado, 24 de enero de 2026',
    ideaRef: '43082394',
    pasajeros: 2,
    precio: 2749.00,
    imagen: 'https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&fit=crop'
  };

  if (id !== '3') {
    return (
      <div className="detalle-itinerario-page">
        <div className="detalle-itinerario-page__not-found">
          <span className="material-symbols-outlined" style={{ fontSize: '64px' }}>folder_off</span>
          <h2>Itinerario no disponible</h2>
          <Button onClick={() => router.back()}>Volver</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="detalle-itinerario-page">
      {/* Header con botón volver */}
      <div className="detalle-itinerario-page__header">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="detalle-itinerario-page__back-button"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Volver
        </Button>
      </div>

      {/* Cover Image */}
      <div className="detalle-itinerario-page__cover">
        <img src={itinerario.imagen} alt={itinerario.titulo} />
        <div className="detalle-itinerario-page__cover-overlay">
          <div className="detalle-itinerario-page__cover-content">
            <h1 className="detalle-itinerario-page__title">{itinerario.titulo}</h1>
            <p className="detalle-itinerario-page__subtitle">{itinerario.subtitulo}</p>
          </div>
        </div>
      </div>

      {/* Información Principal */}
      <Card className="detalle-itinerario-page__info-card">
        <div className="detalle-itinerario-page__info-grid">
          <div className="detalle-itinerario-page__info-item">
            <span className="material-symbols-outlined">calendar_today</span>
            <div>
              <span className="detalle-itinerario-page__info-label">Salida</span>
              <span className="detalle-itinerario-page__info-value">{itinerario.fechaSalida}</span>
            </div>
          </div>
          <div className="detalle-itinerario-page__info-item">
            <span className="material-symbols-outlined">confirmation_number</span>
            <div>
              <span className="detalle-itinerario-page__info-label">Idea Ref</span>
              <span className="detalle-itinerario-page__info-value">{itinerario.ideaRef}</span>
            </div>
          </div>
          <div className="detalle-itinerario-page__info-item">
            <span className="material-symbols-outlined">group</span>
            <div>
              <span className="detalle-itinerario-page__info-label">Pasajeros</span>
              <span className="detalle-itinerario-page__info-value">{itinerario.pasajeros} adultos</span>
            </div>
          </div>
          <div className="detalle-itinerario-page__info-item">
            <span className="material-symbols-outlined">payments</span>
            <div>
              <span className="detalle-itinerario-page__info-label">Precio</span>
              <span className="detalle-itinerario-page__info-value">US$ {itinerario.precio.toLocaleString()} por persona</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Contenido Principal */}
      <div className="detalle-itinerario-page__content">
        
        {/* Introducción */}
        <Card className="detalle-itinerario-page__section">
          <div className="detalle-itinerario-page__section-header">
            <span className="material-symbols-outlined">info</span>
            <h2>Descripción del viaje</h2>
          </div>
          <p className="detalle-itinerario-page__text">
            Este recorrido está diseñado con una lógica muy clara: comenzar con varios días completos en Madrid para entrar en ritmo, pasar a Barcelona en tren (cómodo y directo), volar a Roma para vivir Italia sin traslados largos por tierra, y cerrar con una última noche en Madrid para que el regreso a Quito sea simple y controlado.
          </p>
        </Card>

        {/* Itinerario día por día */}
        <Card className="detalle-itinerario-page__section">
          <div className="detalle-itinerario-page__section-header">
            <span className="material-symbols-outlined">event_note</span>
            <h2>Itinerario día por día</h2>
          </div>

          {/* Día 1 */}
          <div className="detalle-itinerario-page__day">
            <div className="detalle-itinerario-page__day-header">
              <span className="material-symbols-outlined">flight_takeoff</span>
              <h3>Día 1 — Sáb, 24 ene | Quito → Madrid (llegada el mismo día)</h3>
            </div>
            <p className="detalle-itinerario-page__text">
              Tu viaje empieza temprano: vuelas con <strong>Avianca</strong> desde <strong>Quito (UIO)</strong> a las <strong>05:05</strong>, con conexión en <strong>Bogotá (BOG)</strong>, y aterrizas en <strong>Madrid (MAD)</strong> a las <strong>23:20</strong>.
            </p>
            <p className="detalle-itinerario-page__text">
              Este horario de llegada —tarde y ya de noche— es útil porque convierte el primer día en un día de traslado sin presiones: llegas, te instalas y descansas, dejando Madrid "lista" para empezar fuerte al día siguiente.
            </p>
            <p className="detalle-itinerario-page__text">
              Para este vuelo internacional, te recomiendo presentarte en el aeropuerto con al menos <strong>3 horas de antelación</strong>, así haces check-in, migración y controles con calma.
            </p>
            <div className="detalle-itinerario-page__accommodation">
              <span className="material-symbols-outlined">hotel</span>
              <div>
                <strong>Alojamiento (Madrid, 4 noches):</strong> Hotel Santos Praga — Habitación Doble, solo alojamiento.
                <p className="detalle-itinerario-page__text">Es una elección práctica para Madrid porque está a unos 10 minutos de Atocha y muy bien conectado con el eje cultural (Prado / Reina Sofía / Thyssen), lo que facilita moverte con eficiencia durante estos primeros días.</p>
              </div>
            </div>
            <div className="detalle-itinerario-page__note">
              <span className="material-symbols-outlined">restaurant</span>
              <p><strong>Nota de estilo:</strong> al ser room only (sin desayuno incluido), Madrid se presta perfecto para desayunar como local: cafeterías de barrio, tostadas con tomate, y —si te apetece— churros con chocolate en algún clásico del centro.</p>
            </div>
          </div>

          {/* Día 2 */}
          <div className="detalle-itinerario-page__day">
            <div className="detalle-itinerario-page__day-header">
              <span className="material-symbols-outlined">explore</span>
              <h3>Día 2 — Dom, 25 ene | Madrid a tu ritmo (primer día completo)</h3>
            </div>
            <p className="detalle-itinerario-page__text">
              Día ideal para comenzar con el Madrid más caminable: Puerta del Sol, la zona de Austrias, y un primer vistazo al entorno del Palacio Real. Es un día para ajustar el ritmo del viaje, ubicarse, y disfrutar sin reloj.
            </p>
          </div>

          {/* Día 3 */}
          <div className="detalle-itinerario-page__day">
            <div className="detalle-itinerario-page__day-header">
              <span className="material-symbols-outlined">museum</span>
              <h3>Día 3 — Lun, 26 ene | Madrid cultural</h3>
            </div>
            <p className="detalle-itinerario-page__text">
              Madrid brilla especialmente en su "triángulo del arte". Puedes dedicar el día a museos (Prado / Reina Sofía / Thyssen) y cerrar con un paseo por algún mercado gastronómico. Este tipo de día funciona muy bien aquí porque tu hotel te deja bien conectado con las zonas culturales.
            </p>
          </div>

          {/* Día 4 */}
          <div className="detalle-itinerario-page__day">
            <div className="detalle-itinerario-page__day-header">
              <span className="material-symbols-outlined">restaurant_menu</span>
              <h3>Día 4 — Mar, 27 ene | Madrid gastronómico y barrios</h3>
            </div>
            <p className="detalle-itinerario-page__text">
              Un día perfecto para explorar barrios con personalidad (y hacer compras con calma), alternando tapas, cafés y paseos largos. Madrid se disfruta mucho así: sin itinerario rígido, dejando que la ciudad marque el ritmo.
            </p>
          </div>

          {/* Día 5 */}
          <div className="detalle-itinerario-page__day">
            <div className="detalle-itinerario-page__day-header">
              <span className="material-symbols-outlined">train</span>
              <h3>Día 5 — Mié, 28 ene | Madrid → Barcelona en tren (directo)</h3>
            </div>
            <p className="detalle-itinerario-page__text">
              Cambio de ciudad muy bien resuelto: viajas con <strong>Iryo (I606151)</strong> desde <strong>Madrid Atocha</strong> a las <strong>15:52</strong> y llegas a <strong>Barcelona Sants</strong> a las <strong>18:29</strong> (trayecto directo, 2h 37m).
            </p>
            <p className="detalle-itinerario-page__text">
              La salida a media tarde es una gran decisión logística: te permite aprovechar la mañana en Madrid con calma y llegar a Barcelona a una hora muy cómoda para instalarte y cenar.
            </p>
            <p className="detalle-itinerario-page__text">
              En tren, mi recomendación es llegar a la estación con <strong>30–45 minutos de antelación</strong> para embarcar sin estrés y ubicar tu coche con tranquilidad.
            </p>
            <div className="detalle-itinerario-page__accommodation">
              <span className="material-symbols-outlined">hotel</span>
              <div>
                <strong>Alojamiento (Barcelona):</strong> Catalonia Atenas — Habitación Doble, solo alojamiento.
                <p className="detalle-itinerario-page__text">Está en la zona de Sant Martí y queda a pocos minutos en coche de Sagrada Familia y Plaça de Catalunya, lo que te da una base práctica para moverte entre iconos y zonas vivas de la ciudad.</p>
              </div>
            </div>
          </div>

          {/* Día 6 */}
          <div className="detalle-itinerario-page__day">
            <div className="detalle-itinerario-page__day-header">
              <span className="material-symbols-outlined">church</span>
              <h3>Día 6 — Jue, 29 ene | Barcelona completo</h3>
            </div>
            <p className="detalle-itinerario-page__text">
              Día entero para Barcelona: puedes priorizar Sagrada Familia y paseos por zonas emblemáticas, combinando barrios, arquitectura y tiempo libre. Este "día completo sin traslados" es clave para sentir la ciudad con calma (y no solo "verla").
            </p>
          </div>

          {/* Día 7 */}
          <div className="detalle-itinerario-page__day">
            <div className="detalle-itinerario-page__day-header">
              <span className="material-symbols-outlined">flight</span>
              <h3>Día 7 — Vie, 30 ene | Barcelona → Roma (vuelo directo) + llegada a Italia</h3>
            </div>
            <p className="detalle-itinerario-page__text">
              Vuelas con <strong>Wizz Air (W46018)</strong> desde <strong>Barcelona (BCN)</strong> a las <strong>10:00</strong> y llegas a <strong>Roma Fiumicino (FCO)</strong> a las <strong>11:55</strong> (vuelo directo).
            </p>
            <p className="detalle-itinerario-page__text">
              Este horario es muy conveniente: aterrizas a media mañana, lo que normalmente te permite instalarte y tener aún medio día útil para empezar a vivir Roma desde el primer momento.
            </p>
            <p className="detalle-itinerario-page__text">
              Para este vuelo dentro de Europa/Zona Schengen, recomiendo llegar al aeropuerto con al menos <strong>2 horas de antelación</strong>, así el proceso es fluido.
            </p>
            <div className="detalle-itinerario-page__accommodation">
              <span className="material-symbols-outlined">hotel</span>
              <div>
                <strong>Alojamiento (Roma, 2 noches):</strong> Aparthotel Colombo Roma — Habitación Doble, solo alojamiento.
                <p className="detalle-itinerario-page__text">Está en la zona de Ostiense y funciona muy bien como base práctica porque te mantiene con buen acceso a puntos fuertes como el Coliseo o Campo de' Fiori (en desplazamientos cortos), sin depender de estar literalmente encima del centro histórico.</p>
              </div>
            </div>
          </div>

          {/* Día 8 */}
          <div className="detalle-itinerario-page__day">
            <div className="detalle-itinerario-page__day-header">
              <span className="material-symbols-outlined">account_balance</span>
              <h3>Día 8 — Sáb, 31 ene | Roma completo</h3>
            </div>
            <p className="detalle-itinerario-page__text">
              Roma es una ciudad para alternar "iconos" con pausas: fuentes, plazas, cafés… y ese momento de sentarte a ver la vida pasar. Este día es perfecto para un recorrido clásico y dejar espacio para improvisar (Roma recompensa muchísimo esa libertad).
            </p>
          </div>

          {/* Día 9 */}
          <div className="detalle-itinerario-page__day">
            <div className="detalle-itinerario-page__day-header">
              <span className="material-symbols-outlined">connecting_airports</span>
              <h3>Día 9 — Dom, 1 feb | Roma → Madrid (vuelo temprano) + última noche en Madrid</h3>
            </div>
            <p className="detalle-itinerario-page__text">
              Vuelas con <strong>Wizz Air (W46011)</strong> desde <strong>Roma (FCO)</strong> a las <strong>06:00</strong> y llegas a <strong>Madrid (MAD)</strong> a las <strong>08:40</strong> (directo).
            </p>
            <p className="detalle-itinerario-page__text">
              La llegada temprano es estratégica: te devuelve a Madrid con el día por delante, ideal para un último paseo, compras finales o una cena de despedida sin prisas.
            </p>
            <p className="detalle-itinerario-page__text">
              Al ser un vuelo europeo, te recomiendo llegar al aeropuerto con al menos <strong>2 horas de antelación</strong>. Al salir tan temprano, lo más cómodo es preparar lo esencial la noche anterior.
            </p>
            <div className="detalle-itinerario-page__accommodation">
              <span className="material-symbols-outlined">hotel</span>
              <div>
                <strong>Alojamiento (Madrid, 1 noche):</strong> Exe Moncloa — habitación Double/Twin, solo alojamiento.
                <p className="detalle-itinerario-page__text">Está en el distrito Chamberí, una zona con buen ambiente y, sobre todo, con excelentes conexiones de transporte público, lo que viene perfecto para una estancia corta antes del vuelo internacional.</p>
              </div>
            </div>
          </div>

          {/* Día 10 */}
          <div className="detalle-itinerario-page__day">
            <div className="detalle-itinerario-page__day-header">
              <span className="material-symbols-outlined">flight_land</span>
              <h3>Día 10 — Lun, 2 feb | Madrid → Quito (llegada el mismo día)</h3>
            </div>
            <p className="detalle-itinerario-page__text">
              Regresas con <strong>Avianca</strong> desde <strong>Madrid (MAD)</strong> a la <strong>01:20</strong>, con conexión en <strong>Bogotá (BOG)</strong>, llegando a <strong>Quito (UIO)</strong> a las <strong>08:55</strong>.
            </p>
            <p className="detalle-itinerario-page__text">
              Este regreso nocturno tiene una ventaja clara: "te llevas" la noche en el vuelo y aterrizas en Quito por la mañana, un horario muy manejable para retomar rutina ese mismo día.
            </p>
            <p className="detalle-itinerario-page__text">
              Para este vuelo internacional, la recomendación es estar en el aeropuerto con al menos <strong>3 horas de antelación</strong>. Al salir a la 01:20, esto implica planificar la noche con calma para evitar prisas.
            </p>
          </div>
        </Card>

        {/* Hoteles incluidos */}
        <Card className="detalle-itinerario-page__section">
          <div className="detalle-itinerario-page__section-header">
            <span className="material-symbols-outlined">bed</span>
            <h2>Hoteles incluidos (resumen)</h2>
          </div>
          <div className="detalle-itinerario-page__hotel-list">
            <div className="detalle-itinerario-page__hotel-item">
              <span className="material-symbols-outlined">location_city</span>
              <div>
                <strong>Madrid (4 noches):</strong> Hotel Santos Praga — Habitación Doble, solo alojamiento (buena lógica por conexión con Atocha y eje cultural).
              </div>
            </div>
            <div className="detalle-itinerario-page__hotel-item">
              <span className="material-symbols-outlined">location_city</span>
              <div>
                <strong>Barcelona:</strong> Catalonia Atenas — Habitación Doble, solo alojamiento (base práctica para moverte hacia Sagrada Familia y Plaça de Catalunya).
              </div>
            </div>
            <div className="detalle-itinerario-page__hotel-item">
              <span className="material-symbols-outlined">location_city</span>
              <div>
                <strong>Roma (2 noches):</strong> Aparthotel Colombo Roma — Habitación Doble, solo alojamiento (zona Ostiense, buen acceso a puntos clave).
              </div>
            </div>
            <div className="detalle-itinerario-page__hotel-item">
              <span className="material-symbols-outlined">location_city</span>
              <div>
                <strong>Madrid (1 noche):</strong> Exe Moncloa — Double/Twin, solo alojamiento (Chamberí, excelente transporte y logística para regreso).
              </div>
            </div>
          </div>
        </Card>

        {/* Vuelos y transportes */}
        <Card className="detalle-itinerario-page__section">
          <div className="detalle-itinerario-page__section-header">
            <span className="material-symbols-outlined">airplanemode_active</span>
            <h2>Vuelos y transportes (resumen)</h2>
          </div>
          <div className="detalle-itinerario-page__transport-list">
            <div className="detalle-itinerario-page__transport-item">
              <span className="material-symbols-outlined">flight_takeoff</span>
              <div>
                <strong>24 ene:</strong> Avianca Quito (UIO) 05:05 → Madrid (MAD) 23:20, conexión en Bogotá.
              </div>
            </div>
            <div className="detalle-itinerario-page__transport-item">
              <span className="material-symbols-outlined">train</span>
              <div>
                <strong>28 ene:</strong> Tren Iryo Madrid Atocha 15:52 → Barcelona Sants 18:29 (directo).
              </div>
            </div>
            <div className="detalle-itinerario-page__transport-item">
              <span className="material-symbols-outlined">flight</span>
              <div>
                <strong>30 ene:</strong> Wizz Air Barcelona (BCN) 10:00 → Roma (FCO) 11:55 (directo).
              </div>
            </div>
            <div className="detalle-itinerario-page__transport-item">
              <span className="material-symbols-outlined">flight</span>
              <div>
                <strong>1 feb:</strong> Wizz Air Roma (FCO) 06:00 → Madrid (MAD) 08:40 (directo).
              </div>
            </div>
            <div className="detalle-itinerario-page__transport-item">
              <span className="material-symbols-outlined">flight_land</span>
              <div>
                <strong>2 feb:</strong> Avianca Madrid (MAD) 01:20 → Quito (UIO) 08:55, conexión en Bogotá.
              </div>
            </div>
          </div>
        </Card>

        {/* Experiencias destacadas */}
        <Card className="detalle-itinerario-page__section">
          <div className="detalle-itinerario-page__section-header">
            <span className="material-symbols-outlined">star</span>
            <h2>Experiencias destacadas del viaje</h2>
          </div>
          <div className="detalle-itinerario-page__highlight-list">
            <div className="detalle-itinerario-page__highlight-item">
              <span className="material-symbols-outlined">check_circle</span>
              <p><strong>Madrid al inicio (4 noches):</strong> te da base, ritmo y profundidad para disfrutar la ciudad sin correr.</p>
            </div>
            <div className="detalle-itinerario-page__highlight-item">
              <span className="material-symbols-outlined">check_circle</span>
              <p><strong>Madrid → Barcelona en tren:</strong> un salto cómodo y directo que mantiene el viaje fluido.</p>
            </div>
            <div className="detalle-itinerario-page__highlight-item">
              <span className="material-symbols-outlined">check_circle</span>
              <p><strong>Barcelona → Roma con vuelo corto:</strong> te cambia completamente el escenario sin "perder" días enteros en traslados.</p>
            </div>
            <div className="detalle-itinerario-page__highlight-item">
              <span className="material-symbols-outlined">check_circle</span>
              <p><strong>Cierre en Madrid (1 noche):</strong> decisión logística inteligente para que el regreso a Quito sea sencillo y controlado.</p>
            </div>
          </div>
        </Card>

        {/* Cierre */}
        <Card className="detalle-itinerario-page__section detalle-itinerario-page__section--conclusion">
          <div className="detalle-itinerario-page__section-header">
            <span className="material-symbols-outlined">travel_explore</span>
            <h2>Cierre</h2>
          </div>
          <p className="detalle-itinerario-page__text detalle-itinerario-page__text--large">
            Este itinerario está armado con criterio de viaje real: tiempos bien colocados, cambios de ciudad con lógica, y suficiente margen para disfrutar cada destino sin convertirlo en una carrera. Es el tipo de ruta que se siente "bien pensada" cuando ya estás en el camino.
          </p>
        </Card>

        {/* Precio final */}
        <Card className="detalle-itinerario-page__section detalle-itinerario-page__section--price">
          <div className="detalle-itinerario-page__price-content">
            <h2 className="detalle-itinerario-page__price-title">Precio final del viaje</h2>
            <p className="detalle-itinerario-page__price-amount">US$ 2,749</p>
            <p className="detalle-itinerario-page__price-detail">por persona, basado en 2 adultos</p>
            <p className="detalle-itinerario-page__price-note">(Sujeto a disponibilidad al momento de la confirmación.)</p>
          </div>
        </Card>

      </div>
    </div>
  );
}

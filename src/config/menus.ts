export const inicioMenuItems = [
  { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'calendario', icon: 'calendar_month', label: 'Calendario', href: '/dashboard/calendario' },
  { id: 'comunidad', icon: 'hive', label: 'Comunidad', href: '/dashboard/comunidad' },
  { id: 'novedades', icon: 'newsmode', label: 'Novedades', href: '/dashboard/novedades' },
];

export const crmMenuItems = [
  { id: 'clientes', icon: 'person', label: 'Clientes', href: '/crm/clientes' },
  { id: 'expedientes', icon: 'folder', label: 'Expedientes', href: '/crm/expedientes' },
  { id: 'cotizaciones', icon: 'docs', label: 'Cotizaciones', href: '/crm/cotizaciones' },
  { id: 'reservas', icon: 'airplane_ticket', label: 'Reservas', href: '/crm/reservas' },
  { id: 'itinerarios-ia', icon: 'wand_shine', label: 'Itinerarios IA', href: '/crm/itinerarios-ia' },
  { id: 'facturas', icon: 'receipt', label: 'Facturas', href: '/crm/facturas' },
  { id: 'pagos', icon: 'credit_card', label: 'Pagos', href: '/crm/pagos' },
  { id: 'comisiones', icon: 'finance_chip', label: 'Comisiones', href: '/crm/comisiones' },
];

export const reservasMenuItems = [
  { id: 'vuelo-hotel', icon: 'globe', label: 'Reservas', href: '/reservas/vuelo-hotel' },
  { id: 'vuelos', icon: 'flight_takeoff', label: 'Vuelo', href: '/reservas/vuelos' },
  { id: 'hoteles', icon: 'hotel', label: 'Hotel', href: '/reservas/hoteles' },
  { id: 'traslados', icon: 'directions_bus', label: 'Traslados', href: '/reservas/traslados' },
  { id: 'paquetes', icon: 'luggage', label: 'Paquetes', href: '/reservas/paquetes' },
  { id: 'actividades', icon: 'directions_walk', label: 'Actividades', href: '/reservas/actividades' },
  { id: 'cruceros', icon: 'directions_boat', label: 'Cruceros', href: '/reservas/cruceros' },
  { id: 'autos', icon: 'directions_car', label: 'Autos', href: '/reservas/autos' },
  { id: 'seguros', icon: 'shield_with_heart', label: 'Seguros', href: '/reservas/seguros' },
  { id: 'sports-events', icon: 'local_activity', label: 'Sports & Events', href: '/reservas/sports-events' },
  { id: 'divider-1', isDivider: true },
  { id: 'grupos', icon: 'groups', label: 'Grupos', href: '/reservas/grupos' },
  { id: 'divider-2', isDivider: true },
  { id: 'disney-parques', icon: 'attractions', label: 'Disney & Parques', href: '/reservas/disney-parques' },
  { id: 'alg-vacations', icon: 'beach_access', label: 'ALG Vacations', href: '/reservas/alg-vacations' },
  { id: 'expedia', icon: 'arrow_outward', label: 'Expedia TAAP', href: '/reservas/expedia' },
  { id: 'especializados', icon: 'travel_luggage_and_bags', label: "Especializados & DMC's", href: '/reservas/especializados' },
  { id: 'divider-3', isDivider: true },
  { id: 'lujo', icon: 'diamond_shine', label: 'Lujo', href: '/reservas/lujo' },
];

export const gestionMenuItems = [
  { id: 'perfil', icon: 'account_circle', label: 'Perfil público', href: '/gestion/perfil' },
  { id: 'materiales', icon: 'folder_copy', label: 'Materiales del agente', href: '/gestion/materiales' },
  { id: 'galeria', icon: 'imagesmode', label: 'Galería de imágenes', href: '/gestion/galeria' },
  { id: 'prompts', icon: 'chat', label: 'Prompts IA', href: '/gestion/prompts' },
];

export const academiaMenuItems = [
  { id: 'imprescindibles', icon: 'assignment_turned_in', label: 'Imprescindibles', href: '/academia/imprescindibles' },
  { id: 'proveedores', icon: 'storefront', label: 'Proveedores', href: '/academia/proveedores' },
  { id: 'destinos', icon: 'south_america', label: 'Destinos', href: '/academia/destinos' },
  { id: 'marketing', icon: 'ads_click', label: 'Marketing & Ventas', href: '/academia/marketing' },
  { id: 'operacion', icon: 'support_agent', label: 'Operación & Soporte', href: '/academia/operacion' },
  { id: 'webinar', icon: 'nest_cam_iq', label: 'Webinars', href: '/academia/webinar' },
  { id: 'todos-cursos', icon: 'book_2', label: 'Todos los cursos', href: '/academia/todos-cursos' },
];

export const miCuentaMenuItems = [
  { id: 'perfil', icon: 'badge', label: 'Mi Cuenta', href: '/mi-cuenta/perfil' },
  { id: 'preferencias', icon: 'tune', label: 'Preferencias plataforma', href: '/mi-cuenta/preferencias' },
  { id: 'documentos', icon: 'folder_open', label: 'Documentos del agente', href: '/mi-cuenta/documentos' },
  { id: 'estado', icon: 'ads_click', label: 'Estado de Suscripción', href: '/mi-cuenta/estado' },
  { id: 'soporte', icon: 'task', label: 'Soporte (Tickets)', href: '/mi-cuenta/soporte' },
  { id: 'certificado', icon: 'developer_guide', label: 'Certificación Azúcar Travel', href: '/mi-cuenta/certificado' },
  { id: 'seguridad', icon: 'lock', label: 'Seguridad', href: '/mi-cuenta/seguridad' },
];

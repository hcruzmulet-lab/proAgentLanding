'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const checkAuth = () => {
      try {
        const authToken = localStorage.getItem('proagent_auth_token');
        const isLoggedIn = authToken === 'authenticated';
        
        setIsAuthenticated(isLoggedIn);

        if (!isLoggedIn) {
          // Guardar la ruta intentada para redirigir después del login
          const currentPath = pathname;
          if (currentPath && currentPath !== '/login') {
            localStorage.setItem('proagent_redirect_after_login', currentPath);
          }
          
          // Redirigir al login
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        setIsAuthenticated(false);
        router.replace('/login');
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Mostrar loading mientras verifica autenticación
  if (isAuthenticated === null) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #334155',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#64748b', fontSize: '14px' }}>Verificando autenticación...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (ya está redirigiendo)
  if (!isAuthenticated) {
    return null;
  }

  // Si está autenticado, mostrar el contenido
  return <>{children}</>;
}

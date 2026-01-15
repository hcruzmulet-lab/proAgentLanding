# Configuración de Búsqueda de Imágenes

El módulo de búsqueda de imágenes permite a los usuarios buscar y seleccionar imágenes gratuitas de alta calidad de **Unsplash** y **Pexels** para usar en expedientes, cotizaciones y reservas.

## APIs Utilizadas

### 1. Unsplash API
- **Website**: https://unsplash.com/developers
- **Registro**: https://unsplash.com/oauth/applications
- **Límites gratuitos**: 50 requests por hora

### 2. Pexels API
- **Website**: https://www.pexels.com/api/
- **Registro**: https://www.pexels.com/api/new/
- **Límites gratuitos**: 200 requests por hora

## Configuración

### Paso 1: Obtener las API Keys

#### Unsplash:
1. Ve a https://unsplash.com/developers
2. Crea una cuenta o inicia sesión
3. Click en "Your apps" → "New Application"
4. Acepta los términos y condiciones
5. Completa el formulario de la aplicación
6. Copia tu **Access Key**

#### Pexels:
1. Ve a https://www.pexels.com/api/
2. Crea una cuenta o inicia sesión
3. Click en "Your API Key"
4. Copia tu **API Key**

### Paso 2: Configurar Variables de Entorno

Crea o edita el archivo `.env.local` en la raíz del proyecto:

```env
# Unsplash API
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=tu_access_key_de_unsplash_aqui

# Pexels API
NEXT_PUBLIC_PEXELS_API_KEY=tu_api_key_de_pexels_aqui
```

### Paso 3: Actualizar el Componente

Edita el archivo `src/components/shared/ImageSearchModal/ImageSearchModal.tsx`:

#### Para Unsplash (línea ~31):
```typescript
// Reemplaza esto:
const accessKey = 'YOUR_UNSPLASH_ACCESS_KEY';

// Por esto:
const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
```

#### Para Pexels (línea ~52):
```typescript
// Reemplaza esto:
const apiKey = 'YOUR_PEXELS_API_KEY';

// Por esto:
const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
```

### Paso 4: Reiniciar el Servidor

Después de agregar las variables de entorno, reinicia el servidor de desarrollo:

```bash
npm run dev
```

## Uso

El componente `ImageSearchModal` ya está integrado en:

- ✅ **Nuevo Expediente Manual** (`/crm/expedientes/nuevo-manual`)
- ✅ **Nueva Cotización Manual** (`/crm/cotizaciones/nueva-manual`)

### Características:

1. **Búsqueda en dos fuentes**: Unsplash y Pexels
2. **Grid de resultados**: 12 imágenes por búsqueda
3. **Preview al hover**: Muestra el nombre del fotógrafo
4. **Selección fácil**: Click para seleccionar
5. **Alta calidad**: Imágenes optimizadas para web

### Ejemplo de búsqueda:
- "cancún beach"
- "paris eiffel tower"
- "mountains landscape"
- "tropical sunset"
- "hotel luxury"

## Notas Importantes

⚠️ **Atribución**: Aunque las imágenes son gratuitas, se recomienda dar crédito al fotógrafo.

⚠️ **Límites de Rate**: 
- Unsplash: 50 requests/hora
- Pexels: 200 requests/hora

⚠️ **Términos de Uso**: Revisa los términos de uso de cada plataforma:
- Unsplash: https://unsplash.com/license
- Pexels: https://www.pexels.com/license/

## Troubleshooting

### Error: "No se encontraron imágenes"
- Verifica que las API keys estén correctamente configuradas
- Revisa la consola del navegador para ver errores específicos
- Asegúrate de no haber excedido los límites de rate

### Error: CORS
- Las APIs de Unsplash y Pexels permiten CORS por defecto
- Si tienes problemas, verifica que estés usando las URLs correctas

### Error: "Invalid Access Key"
- Verifica que copiaste correctamente la API key
- Asegúrate de que la aplicación esté activa en el dashboard de la API
- Reinicia el servidor después de agregar las variables de entorno

## Soporte

Para más información, consulta la documentación oficial:
- [Unsplash API Docs](https://unsplash.com/documentation)
- [Pexels API Docs](https://www.pexels.com/api/documentation/)

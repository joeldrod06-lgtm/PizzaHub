# PizzaHub

PizzaHub es una landing page para una pizzería con panel de administración integrado. El sitio público consume contenido desde Supabase y el panel admin permite editar textos, imágenes, visibilidad de secciones y productos del menú sin tocar código.

## Demo en producción

Puedes ver el proyecto desplegado en:

[https://pizza-hub-phi-one.vercel.app/](https://pizza-hub-phi-one.vercel.app/)

## Contenido

- [Resumen](#resumen)
- [Funciones principales](#funciones-principales)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Configuración esperada en Supabase](#configuración-esperada-en-supabase)
- [Scripts disponibles](#scripts-disponibles)
- [Uso del panel admin](#uso-del-panel-admin)
- [Flujo de trabajo](#flujo-de-trabajo)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Desarrollo con ngrok](#desarrollo-con-ngrok)
- [Archivos importantes](#archivos-importantes)

## Resumen

Este proyecto fue construido para administrar una landing comercial de una pizzería con un enfoque CMS sencillo:

- la landing pública renderiza contenido dinámico
- el panel admin protege el acceso con autenticación
- las imágenes se almacenan en Supabase Storage
- los cambios del admin se reflejan en la web pública sin rebuild de contenido

## Funciones principales

- Hero editable desde el panel admin.
- Menú público administrable desde el panel.
- Carrusel automático cuando existen más de 3 pizzas.
- Sección "Nosotros" editable con imagen.
- Datos de contacto editables.
- Gestión de imágenes: subir, reemplazar y eliminar.
- Revalidación del contenido público después de cambios.
- Login admin con mejor feedback de estados y errores.

## Tecnologías

### Frontend

- `Next.js 16.2.1`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `framer-motion`
- `lucide-react`

### Utilidades de UI

- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `radix-ui`

### Backend / Datos

- `Supabase Auth`
- `Supabase Database`
- `Supabase Storage`

### Calidad y tooling

- `ESLint`
- `Turbopack`

## Arquitectura

### Sitio público

La página principal está en [src/app/page.tsx](C:\Users\UPQ\Desktop\pizzahub\src\app\page.tsx) y renderiza:

- `Hero`
- `Features`
- `Menu`
- `About`
- `Contact`
- `Footer`

El contenido se obtiene desde [src/lib/cms.ts](C:\Users\UPQ\Desktop\pizzahub\src\lib\cms.ts), que consulta Supabase y normaliza la información pública.

### Panel admin

El panel se encuentra bajo [src/app/admin](C:\Users\UPQ\Desktop\pizzahub\src\app\admin) e incluye:

- login
- rutas protegidas
- vistas separadas por sección
- gestión de contenido
- gestión de imágenes

Vistas principales:

- [src/components/admin/views/AdminHeroView.tsx](C:\Users\UPQ\Desktop\pizzahub\src\components\admin\views\AdminHeroView.tsx)
- [src/components/admin/views/AdminMenuView.tsx](C:\Users\UPQ\Desktop\pizzahub\src\components\admin\views\AdminMenuView.tsx)
- [src/components/admin/views/AdminAboutView.tsx](C:\Users\UPQ\Desktop\pizzahub\src\components\admin\views\AdminAboutView.tsx)
- [src/components/admin/views/AdminContactView.tsx](C:\Users\UPQ\Desktop\pizzahub\src\components\admin\views\AdminContactView.tsx)

### Autenticación

La autenticación interna usa:

- Supabase Auth para credenciales
- cookies HTTP-only para sesión del panel
- middleware/proxy para proteger rutas admin

Archivos clave:

- [src/lib/auth.ts](C:\Users\UPQ\Desktop\pizzahub\src\lib\auth.ts)
- [src/app/api/auth/session/route.ts](C:\Users\UPQ\Desktop\pizzahub\src\app\api\auth\session\route.ts)
- [src/proxy.ts](C:\Users\UPQ\Desktop\pizzahub\src\proxy.ts)

### Revalidación del contenido público

Después de guardar desde el admin, el proyecto invalida la caché del sitio público para reflejar los cambios:

- [src/app/api/revalidate/route.ts](C:\Users\UPQ\Desktop\pizzahub\src\app\api\revalidate\route.ts)
- [src/lib/revalidate-client.ts](C:\Users\UPQ\Desktop\pizzahub\src\lib\revalidate-client.ts)

## Estructura del proyecto

```text
src/
  app/
    admin/
    api/
    page.tsx
  components/
    admin/
    layout/
    sections/
    ui/
  data/
  hooks/
  lib/
  types/
```

## Requisitos

Antes de ejecutar el proyecto necesitas:

- `Node.js 20` o superior
- `npm`
- un proyecto de Supabase configurado

## Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd pizzahub
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear el archivo de entorno

Crea un archivo `.env.local` en la raíz del proyecto.

## Variables de entorno

Ejemplo mínimo:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_SUPABASE_ANON_KEY
```

## Configuración esperada en Supabase

El proyecto espera tablas para contenido tipo CMS:

- `site_sections`
- `hero_content`
- `menu_items`
- `about_content`
- `contact_content`
- `admin_profiles`

También utiliza un bucket de storage llamado:

- `site-media`

El acceso al panel depende de que el usuario autenticado tenga un registro activo en `admin_profiles`.

## Scripts disponibles

### Desarrollo

```bash
npm run dev
```

Abre:

```text
http://localhost:3000
```

### Build de producción

```bash
npm run build
```

### Ejecutar producción local

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## Uso del panel admin

Ruta de acceso:

```text
/admin/login
```

Desde el panel puedes:

- editar el contenido de inicio
- administrar pizzas del menú
- cambiar imagen y texto de "Nosotros"
- modificar datos de contacto
- activar o desactivar secciones

## Flujo de trabajo

### Cambios de contenido desde el admin

No requieren rebuild del proyecto. Ejemplos:

- cambiar textos
- cambiar precios
- subir o reemplazar imágenes
- activar o desactivar secciones

### Cambios de código

Sí requieren:

```bash
npm run build
```

y después un nuevo deploy o reinicio de la aplicación.

## Despliegue en Vercel

### 1. Subir la rama principal

```bash
git push origin main
```

### 2. Importar el repositorio en Vercel

En Vercel:

- crea un nuevo proyecto
- conecta el repositorio
- selecciona la rama de despliegue

### 3. Configurar variables de entorno

Agrega en Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 4. Revisar configuración de Supabase Auth

En Supabase debes validar:

- `Site URL`
- `Redirect URLs`

Incluye tus dominios de Vercel para evitar problemas de sesión.

### 5. Prueba recomendada post deploy

- entrar a `/admin/login`
- navegar entre las secciones del admin
- crear una pizza
- editar una pizza
- subir una imagen
- borrar una imagen
- revisar que la landing se actualice

## Desarrollo con ngrok

Para pruebas por túnel:

- ejecuta `npm run dev`
- expón el puerto con `ngrok`
- reinicia el servidor si cambias `next.config.ts`

El proyecto ya incluye soporte para orígenes de desarrollo de ngrok en [next.config.ts](C:\Users\UPQ\Desktop\pizzahub\next.config.ts).

## Archivos importantes

- [next.config.ts](C:\Users\UPQ\Desktop\pizzahub\next.config.ts)
- [package.json](C:\Users\UPQ\Desktop\pizzahub\package.json)
- [src/app/page.tsx](C:\Users\UPQ\Desktop\pizzahub\src\app\page.tsx)
- [src/lib/cms.ts](C:\Users\UPQ\Desktop\pizzahub\src\lib\cms.ts)
- [src/lib/supabase.ts](C:\Users\UPQ\Desktop\pizzahub\src\lib\supabase.ts)
- [src/lib/auth.ts](C:\Users\UPQ\Desktop\pizzahub\src\lib\auth.ts)
- [src/proxy.ts](C:\Users\UPQ\Desktop\pizzahub\src\proxy.ts)
- [src/components/sections/Menu.tsx](C:\Users\UPQ\Desktop\pizzahub\src\components\sections\Menu.tsx)

## Estado actual

El proyecto actualmente cuenta con:

- landing pública funcional
- panel admin protegido
- edición de contenido desde Supabase
- carga y gestión de imágenes
- revalidación del contenido público
- carrusel automático del menú para más de 3 productos
- login admin con mejor experiencia de validación
- build y lint estables

## Comandos rápidos

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```


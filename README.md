# Fintech Admin Dashboard

Mini portal administrativo fullstack para visualizar órdenes y pagos en un entorno tipo fintech.

El sistema está pensado para operadores internos que necesitan revisar transacciones, monitorear estados de pago, filtrar órdenes y detectar errores rápidamente desde una interfaz moderna, responsiva y preparada para un flujo administrativo real.

## Live Demo

| Item | URL |
|---|---|
| Frontend | https://fintech-dashboard-phi-navy.vercel.app/login |
| Backend API | https://fintech-dashboard-production-225e.up.railway.app/ |
| Repository | https://github.com/axelag10/fintech-dashboard |

## Credenciales de prueba

```txt
Email: admin@test.com
Password: 123456
```

## Tech Stack

### Frontend

- Next.js
- TypeScript
- TailwindCSS
- shadcn/ui
- TanStack Query
- Axios
- next-themes
- lucide-react
- Vercel

### Backend

- Laravel 13
- PostgreSQL
- Laravel API Resources
- Factories / Seeders
- Railway

## Funcionalidades principales

- Página de login con estados de carga y error
- Dashboard de órdenes
- Tarjetas de resumen:
  - Total de órdenes
  - Ingresos totales
  - Pagos fallidos
  - Pagos pendientes
- Tabla de órdenes
- Búsqueda por nombre o email del cliente
- Filtro por estado de pago
- Respuesta de API preparada para paginación
- Estructura de API preparada para ordenamiento
- Página de detalle de orden
- Metadata de pago
- Badges de estado
- Layout responsivo
- Sidebar móvil
- Dark mode
- Loading skeletons
- Estados vacíos
- Acción de logout

## Estructura del proyecto

```txt
fintech-dashboard/
├── backend/
│   ├── app/
│   │   ├── Enums/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/
│   │   │   └── Resources/
│   │   ├── Models/
|   |   ├── Providers/
│   │   └── Services/
│   ├── database/
│   │   ├── factories/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
│       └── api.php
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── login/
    │   │   └── (dashboard)/
    │   ├── components/
    |   |   ├── auth/
    │   │   ├── dashboard/
    │   │   ├── layout/
    │   │   ├── orders/
    │   │   └── ui/
    │   ├── services/
    │   ├── hooks/
    │   ├── providers/
    │   ├── types/
    │   └── lib/
    └── package.json
```

## Decisiones de arquitectura

### Enfoque API-first

El backend fue construido como una aplicación Laravel con enfoque API-first. Esto permite mantener el frontend y el backend desacoplados, facilitar el escalamiento y desplegar cada parte de forma independiente.

También deja abierta la posibilidad de integrar otros clientes en el futuro, como aplicaciones móviles o herramientas internas.

### Estructura monorepo

El proyecto usa una estructura monorepo con directorios separados para `backend` y `frontend`.

Esto permite mantener ambas aplicaciones dentro del mismo repositorio, pero con límites claros entre la API y la interfaz de usuario.

### PostgreSQL

Se eligió PostgreSQL como base de datos porque es una opción ampliamente usada en entornos fintech y de producto.

Además, permite trabajar correctamente con datos estructurados y semi-estructurados. En este proyecto, la columna `metadata` usa JSON para almacenar información adicional del pago sin crear tablas extra para este alcance.

### Laravel API Resources

Se usan Laravel API Resources para separar los modelos de base de datos de las respuestas expuestas por la API.

Esto da mayor control sobre la estructura de respuesta y facilita cambios futuros sin afectar directamente los modelos internos.

### TanStack Query

TanStack Query se usa en el frontend para manejar server state, estados de carga, caché, refetching y errores de API de forma ordenada.

### shadcn/ui + TailwindCSS

La interfaz utiliza shadcn/ui y TailwindCSS para construir un dashboard moderno, consistente, responsivo y basado en componentes reutilizables.

## Ejecutar con Docker

Este proyecto incluye un Docker Compose setup con:

- Laravel API
- Next.js frontend
- PostgreSQL database

### Requerimientos

- Docker Desktop
- Docker Compose

### Configuración

Clonar el repositorio:

```bash
git clone https://github.com/axelag10/fintech-dashboard
cd fintech-dashboard
```

Crear archivos .env:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

Iniciar contenedores:

```bash
docker compose up -d --build
``` 

Generar App Key para Laravel:

```bash
docker compose exec backend php artisan key:generate
``` 

Correr migraciones y seeders:

```bash
docker compose exec backend php artisan migrate:fresh --seed
``` 

Acceder a la app:

```bash
Frontend: http://localhost:3000
Backend API: http://localhost:8002
``` 

Comandos:
Ver logs
Detener docker compose
Detener docker compose y elimina volumen

```bash
docker compose logs -f.
docker compose down
docker compose down -v
``` 

## Configuración del backend manualmente

### Requisitos previos

Instala las siguientes herramientas antes de ejecutar el backend localmente:

- PHP
- Composer
- PostgreSQL
- Entorno local compatible con Laravel

### 1. Entra a la carpeta del backend

```bash
cd backend
```

### 2. Instala las dependencias

```bash
composer install
```

### 3. Crea el archivo de entorno

```bash
cp .env.example .env
```

### 4. Genera la app key

```bash
php artisan key:generate
```

### 5. Configura la base de datos

Actualiza tu archivo `.env` con tus credenciales locales de PostgreSQL:

```env
APP_NAME="Site Orders"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=fintech_dashboard
DB_USERNAME=fintech_user
DB_PASSWORD=fintech_password
```

### 6. Ejecuta migraciones y seeders

```bash
php artisan migrate:fresh --seed
```

### 7. Inicia el servidor del backend

```bash
php artisan serve
```

La API estará disponible en:

```txt
http://127.0.0.1:8000/api
```

## Configuración del frontend manualmente

### Requisitos previos

Instala las siguientes herramientas antes de ejecutar el frontend localmente:

- Node.js
- npm

### 1. Entra a la carpeta del frontend

```bash
cd frontend
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Crea el archivo de entorno

```bash
cp .env.example .env.local
```

### 4. Agrega la URL de la API

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

### 5. Inicia el servidor de desarrollo

```bash
npm run dev
```

El frontend estará disponible en:

```txt
http://localhost:3000
```

## Variables de entorno

### Backend

```env
APP_NAME=
APP_ENV=
APP_KEY=
APP_DEBUG=
APP_URL=

DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

FRONTEND_URL=
```

### Frontend

```env
NEXT_PUBLIC_API_URL=
```

En producción, `NEXT_PUBLIC_API_URL` debe incluir `/api` al final:

```env
NEXT_PUBLIC_API_URL=https://TU-BACKEND.up.railway.app/api
```

## API Endpoints

### Auth

#### `POST /api/login`

Autentica al usuario administrador y devuelve un mock token.

#### Request

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

#### Response

```json
{
  "token": "fake-jwt-token",
  "user": {
    "name": "Admin",
    "email": "admin@test.com"
  }
}
```

### Orders

#### `GET /api/orders`

Devuelve una lista de órdenes.

Soporta los siguientes query parameters:

| Parameter | Descripción |
|---|---|
| `search` | Busca por nombre o email del cliente |
| `status` | Filtra por estado de pago |
| `sort` | Campo usado para ordenar |
| `direction` | Dirección del ordenamiento |
| `page` | Número de página |

#### Ejemplo

```http
GET /api/orders?search=john&status=paid&sort=created_at&direction=desc&page=1
```

### Order Detail

#### `GET /api/orders/{id}`

Devuelve el detalle de una orden específica.

#### Ejemplo

```http
GET /api/orders/1
```

### Dashboard Metrics

#### `GET /api/dashboard/metrics`

Devuelve las métricas principales del dashboard.

#### Response de ejemplo

```json
{
  "total_orders": 100,
  "total_revenue": "120000.00",
  "failed_payments": 12,
  "pending_payments": 20
}
```

## Modelo de datos

### Order

| Campo | Descripción |
|---|---|
| `id` | Identificador de la orden |
| `customer_name` | Nombre del cliente |
| `customer_email` | Email del cliente |
| `amount` | Monto del pago |
| `status` | Estado del pago |
| `payment_method` | Método de pago utilizado |
| `metadata` | Información adicional del pago |
| `created_at` | Fecha de creación |
| `updated_at` | Fecha de última actualización |

### Valores de estado

```txt
paid
pending
failed
refunded
```

### Ejemplo de metadata

```json
{
  "bank": "BBVA",
  "ip": "192.168.1.10",
  "country": "Mexico",
  "transaction_id": "uuid-value"
}
```

## Deployment

## Backend Deployment

El backend se despliega en Railway.

### Configuración recomendada en Railway

| Setting | Value |
|---|---|
| Root Directory | `backend` |

### Variables requeridas

```env
APP_NAME=Site Orders
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:generar_key
APP_URL=https://fintech-dashboard-production-225e.up.railway.app/

DB_CONNECTION=pgsql
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

FRONTEND_URL=https://fintech-dashboard-phi-navy.vercel.app
```

### Después del deployment

Ejecuta las migraciones de producción:

```bash
php artisan migrate --force
```

Ejecuta los seeders:

```bash
php artisan db:seed --force
```

## Frontend Deployment

El frontend se despliega en Vercel.

### Configuración recomendada en Vercel

| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Install Command | `npm install` |
| Output Directory | Default |

### Variable requerida

```env
NEXT_PUBLIC_API_URL=https://fintech-dashboard-production-225e.up.railway.app/
```

Después de cambiar variables de entorno, vuelve a desplegar el frontend.

## Tradeoffs

### Autenticación

La autenticación fue implementada usando un mock token almacenado en `localStorage`.

Esta decisión fue tomada porque el challenge se enfoca principalmente en desarrollo fullstack de producto, diseño de API, experiencia de dashboard, filtros, responsividad y deployment.

Un sistema de autenticación productivo con refresh tokens, rotación de tokens, sesiones del lado del servidor o autenticación basada en cookies quedó fuera del alcance por la restricción de tiempo.

### Protección de rutas

No se agregó protección estricta de rutas del lado del servidor porque el flujo de autenticación usa un mock token y no cuenta con una capa real de validación JWT.

El flujo de login/logout está implementado para demostrar la experiencia de usuario y el comportamiento esperado de autenticación.

### CORS

CORS puede configurarse de forma abierta durante la evaluación técnica para simplificar el deployment entre Vercel y Railway.

En producción, debería restringirse únicamente al dominio del frontend desplegado.

### Tests

No se incluyeron tests automatizados por restricciones de tiempo.

La arquitectura permite agregar más adelante feature tests para los endpoints de Laravel y tests de componentes en el frontend.

## Mejoras futuras

- Autenticación con JWT real
- Refresh tokens
- Autenticación con secure HTTP-only cookies
- Permisos basados en roles
- Protección de rutas en backend
- Tests para endpoints de API
- Tests de componentes en frontend
- UI avanzada para ordenamiento
- Controles completos de paginación
- Mejores gráficas de analítica
- Exportación de órdenes a CSV
- Audit logs
- WebSockets para actualizaciones de pagos en tiempo real
- Caché con Redis
- Configuración con Docker
- Pipeline de CI/CD
- Configuración de CORS lista para producción
- Error tracking y observabilidad

## Checklist de desarrollo local

### 1. Ejecuta el backend

```bash
cd backend
php artisan serve
```

### 2. Ejecuta el frontend

```bash
cd frontend
npm run dev
```

### 3. Visita la app

```txt
http://localhost:3000
```

### 4. Inicia sesión

```txt
Email: admin@test.com
Password: 123456
```

## Checklist de producción

- Backend desplegado en Railway
- PostgreSQL conectado
- Migraciones ejecutadas
- Seeders ejecutados
- Dominio público del backend generado
- Frontend desplegado en Vercel
- `NEXT_PUBLIC_API_URL` configurado
- Login probado
- Dashboard probado
- Filtros probados
- Detalle de orden probado
- Dark mode probado
- Layout responsivo probado

## Licencia

Este proyecto fue desarrollado como technical challenge / proyecto de portfolio.

## Authors

- [@axelag10](https://www.github.com/axelag10)
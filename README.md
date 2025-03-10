
# Proyecto de React Forms - David Ruiz

## Descripción

Este es un proyecto desarrollado con React que permite crear formularios dinamicos con n preguntas y sus respectivas respuestas. La aplicación incluye formularios con diferentes tipos de preguntas, y los usuarios pueden interactuar con ellos para responder a las preguntas.

## Requisitos

- [Node.js](https://nodejs.org/) (preferentemente la versión LTS).
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) (gestores de paquetes).
- [Cuenta de Vercel](https://vercel.com/) para despliegue.
- [Cuenta de Supabase](https://supabase.io/) para la base de datos.

---

## 1. **Instalación y Configuración Local**

### Clonar el repositorio

Primero clona el repositorio del proyecto:

```bash
git clone https://github.com/Sennt03/Forms-React-App.git
```

### Navegar al directorio del proyecto

```bash
cd Forms-React-App
```

### Instalar dependencias

Ejecuta el siguiente comando para instalar las dependencias necesarias:

#### Si usas npm:

```bash
npm install
```

#### Si usas yarn:

```bash
yarn install
```

### Iniciar el proyecto localmente

Una vez que todo esté configurado, puedes iniciar el servidor de desarrollo:

#### Si usas npm:

```bash
npm start
```

#### Si usas yarn:

```bash
yarn start
```

Esto abrirá el proyecto en `http://localhost:3000`.

---

## 2. **Configuración en Supabase**

**Supabase** es un servicio de backend como servicio (BaaS) que ofrece bases de datos PostgreSQL, autenticación y más. Para configurar tu base de datos en Supabase:

1. **Crear una cuenta en Supabase**: Si aún no tienes una cuenta, ve a [Supabase](https://supabase.io) y regístrate.
2. **Crear un nuevo proyecto en Supabase**:
   - Una vez dentro de tu cuenta de Supabase, haz clic en **New Project** y proporciona un nombre y una contraseña para tu base de datos.
3. **Obtener las credenciales de tu proyecto**:
   - En el panel de control de tu proyecto, ve a la sección **Settings** > **API** y obtén el `SUPABASE_URL` y la `SUPABASE_ANON_KEY`. Estas son las variables que deberás agregar a tu archivo `.env` en tu proyecto de React.
4. **Configurar las tablas y datos**:
   - Crea las tablas necesarias para tu aplicación utilizando el panel de SQL en Supabase. Ejecuta el sql para crear la tabla 'forms':

   ```sql
   -- Crear la tabla de formularios con preguntas en formato JSONB
    create table if not exists forms (
        id serial primary key,
        title text not null,
        published boolean default true,
        questions jsonb not null, -- Aquí almacenamos las preguntas como un campo JSONB
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp
    );

   ```

5. **Configurar reglas de seguridad**:
   - Asegúrate de configurar reglas de acceso adecuadas para la API de Supabase, según las necesidades de tu aplicación. Por ejemplo, si tu aplicación requiere autenticación, puedes configurarlo desde la sección de **Authentication** en Supabase.

---

## 3. **Configuración en Vercel**

**Vercel** es una plataforma de despliegue en la nube para aplicaciones frontend. Para configurar tu proyecto en Vercel:

1. **Crear una cuenta en Vercel**: Si aún no tienes una cuenta, ve a [Vercel](https://vercel.com) y regístrate.
2. **Conectar tu repositorio de Git**:
   - Inicia sesión en Vercel y haz clic en **New Project**.
   - Conecta tu cuenta de GitHub, GitLab o Bitbucket (dependiendo de dónde esté almacenado tu código).
   - Selecciona el repositorio de tu proyecto y sigue los pasos para desplegarlo.
3. **Configurar las variables de entorno**:
   - En el panel de configuración del proyecto en Vercel, ve a **Environment Variables** y agrega las variables necesarias para tu aplicación (por ejemplo, `SUPABASE_URL` y `SUPABASE_ANON_KEY`).
4. **Despliegue automático**:
   - Una vez que tu proyecto esté conectado a Vercel, cada vez que hagas un `git push` a tu repositorio, Vercel automáticamente desplegará la nueva versión de tu aplicación.

---

## 4. **Despliegue Continuo**

Vercel te permite configurar despliegue continuo para tu proyecto. Esto significa que cada vez que realices un cambio en tu repositorio y lo subas a GitHub (o el sistema de control de versiones que uses), Vercel automáticamente desplegará la nueva versión de tu aplicación sin intervención manual.

---

## 5. **Tecnologías Usadas**

- **React**: Framework principal para la interfaz de usuario.
- **Supabase**: Backend como servicio para manejar la base de datos y autenticación.
- **Vercel**: Plataforma para desplegar y alojar la aplicación.
- **CSS**: Estilización de la aplicación.

---

## 7. **Licencia**

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).

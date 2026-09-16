# CEIP El Santo · La Solana

Nueva web del colegio público CEIP El Santo (La Solana, Ciudad Real).

## Qué incluye

- **Web pública** para familias: inicio, el centro, documentos, proyectos, familias/AMPA, noticias, galería y contacto.
- **Panel del profesorado** en `/admin` (Payload CMS) para publicar y actualizar el contenido sin tocar código.
- Roles: **admin** (gestiona usuarios) y **editor** (profesorado que edita contenidos).

## Arranque local

```bash
cp .env.example .env
npm install
npm run dev
```

En otra terminal, tras el primer arranque (o con la API disponible):

```bash
npm run seed
```

- Web: http://localhost:3000  
- Panel: http://localhost:3000/admin  

Usuarios de desarrollo (cámbialos tras el seed):

| Email | Contraseña | Rol |
| --- | --- | --- |
| admin@ceipelsanto.es | Cambiar123! | admin |
| profesor@ceipelsanto.es | Cambiar123! | editor |

## Stack

- Next.js (App Router)
- Payload CMS 3 + SQLite
- TypeScript

## Notas

Sustituye `PAYLOAD_SECRET` en producción y migra los PDF/fotos definitivos desde el sitio Wix anterior (`ceipelsanto.es` → Wix).

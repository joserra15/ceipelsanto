import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = { title: 'Galería' }
export const dynamic = 'force-dynamic'

export default async function GaleriaPage() {
  const payload = await getPayloadClient()
  const albums = await payload.find({
    collection: 'gallery',
    limit: 50,
    sort: '-schoolYear',
    where: { _status: { equals: 'published' } },
  })

  return (
    <div className="container page-hero">
      <span className="eyebrow">Memoria visual</span>
      <h1>Galería</h1>
      <p>Álbumes por curso y actividades. Las fotos se gestionan desde el panel del profesorado.</p>

      <div className="grid-3" style={{ marginTop: '2rem' }}>
        {albums.docs.length === 0 ? (
          <div className="empty">Crea el primer álbum del curso en el panel de administración.</div>
        ) : (
          albums.docs.map((album) => (
            <Link className="tile" key={album.id} href={`/galeria/${album.slug}`}>
              <span className="meta">Curso {album.schoolYear}</span>
              <h3>{album.title}</h3>
              <p>{album.description || 'Ver álbum'}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = { title: 'Noticias' }
export const dynamic = 'force-dynamic'

export default async function NoticiasPage() {
  const payload = await getPayloadClient()
  const news = await payload.find({
    collection: 'news',
    limit: 50,
    sort: '-publishedAt',
    where: { _status: { equals: 'published' } },
  })

  return (
    <div className="container page-hero">
      <span className="eyebrow">Actualidad</span>
      <h1>Noticias</h1>
      <p>Actividades, reconocimientos y vida del colegio. Publicadas por el equipo docente.</p>

      <div className="grid-3" style={{ marginTop: '2rem' }}>
        {news.docs.length === 0 ? (
          <div className="empty">No hay noticias todavía.</div>
        ) : (
          news.docs.map((item) => (
            <Link className="tile" key={item.id} href={`/noticias/${item.slug}`}>
              <span className="meta">
                {item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'Noticia'}
              </span>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

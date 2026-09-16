import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'gallery',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    limit: 1,
  })
  return { title: result.docs[0]?.title || 'Álbum' }
}

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'gallery',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    limit: 1,
  })
  const album = result.docs[0]
  if (!album) notFound()

  return (
    <div className="container page-hero">
      <span className="eyebrow">Curso {album.schoolYear}</span>
      <h1>{album.title}</h1>
      {album.description ? <p>{album.description}</p> : null}

      <div className="grid-3" style={{ marginTop: '2rem' }}>
        {(album.photos || []).map((photo, index) => {
          const image = photo.image
          if (!image || typeof image !== 'object' || !('url' in image) || !image.url) return null
          return (
            <figure className="tile" key={photo.id || index} style={{ padding: 0, overflow: 'hidden' }}>
              <Image
                src={String(image.url)}
                alt={('alt' in image && image.alt) || photo.caption || album.title}
                width={640}
                height={420}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
              {photo.caption ? (
                <figcaption style={{ padding: '0.9rem 1rem', color: 'var(--ink-soft)' }}>
                  {photo.caption}
                </figcaption>
              ) : null}
            </figure>
          )
        })}
      </div>
    </div>
  )
}

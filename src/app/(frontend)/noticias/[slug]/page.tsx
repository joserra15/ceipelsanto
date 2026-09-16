import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RichText } from '@/components/RichText'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'news',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    limit: 1,
  })
  return { title: result.docs[0]?.title || 'Noticia' }
}

export default async function NoticiaDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'news',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    limit: 1,
  })
  const item = result.docs[0]
  if (!item) notFound()

  return (
    <div className="container page-hero">
      <span className="meta">
        {item.publishedAt
          ? new Date(item.publishedAt).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          : null}
      </span>
      <h1>{item.title}</h1>
      <p>{item.excerpt}</p>
      <div style={{ marginTop: '2rem' }}>
        <RichText data={item.content as never} />
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RichText } from '@/components/RichText'
import { programCategoryLabels } from '@/lib/labels'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'programs',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    limit: 1,
  })
  return { title: result.docs[0]?.title || 'Proyecto' }
}

export default async function ProyectoDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'programs',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    limit: 1,
  })
  const program = result.docs[0]
  if (!program) notFound()

  return (
    <div className="container page-hero">
      <span className="eyebrow">{programCategoryLabels[program.category] || program.category}</span>
      <h1>{program.title}</h1>
      <p>{program.summary}</p>
      <div style={{ marginTop: '2rem' }}>
        <RichText data={program.content as never} />
      </div>
    </div>
  )
}

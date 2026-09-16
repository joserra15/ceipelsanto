import type { Metadata } from 'next'
import Link from 'next/link'

import { programCategoryLabels } from '@/lib/labels'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = { title: 'Proyectos' }
export const dynamic = 'force-dynamic'

export default async function ProyectosPage() {
  const payload = await getPayloadClient()
  const programs = await payload.find({
    collection: 'programs',
    limit: 50,
    where: { _status: { equals: 'published' } },
  })

  return (
    <div className="container page-hero">
      <span className="eyebrow">Señas de identidad</span>
      <h1>Proyectos y programas</h1>
      <p>
        Bilingüismo, innovación, radio escolar, Erasmus+, huerto ecológico, lectura y hábitos
        saludables: así late el día a día del colegio.
      </p>

      <div className="grid-3" style={{ marginTop: '2rem' }}>
        {programs.docs.length === 0 ? (
          <div className="empty">Publica los programas del centro desde el panel del profesorado.</div>
        ) : (
          programs.docs.map((item) => (
            <Link className="tile" key={item.id} href={`/proyectos/${item.slug}`}>
              <span className="meta">{programCategoryLabels[item.category] || item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

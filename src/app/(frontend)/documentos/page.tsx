import type { Metadata } from 'next'

import { documentCategoryLabels } from '@/lib/labels'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = { title: 'Documentos' }
export const dynamic = 'force-dynamic'

function mediaUrl(file: unknown): string | null {
  if (file && typeof file === 'object' && 'url' in file && typeof file.url === 'string') {
    return file.url
  }
  return null
}

export default async function DocumentosPage() {
  const payload = await getPayloadClient()
  const documents = await payload.find({
    collection: 'documents',
    limit: 100,
    sort: 'category',
  })

  const grouped = Object.keys(documentCategoryLabels).map((category) => ({
    category,
    label: documentCategoryLabels[category],
    items: documents.docs.filter((doc) => doc.category === category),
  }))

  return (
    <div className="container page-hero">
      <span className="eyebrow">Descargas</span>
      <h1>Documentos del centro</h1>
      <p>
        PGA, memoria, normas de convivencia, Plan Digital, libros de texto, horarios y calendario. El
        profesorado actualiza estos archivos desde el panel.
      </p>

      <div className="stack" style={{ marginTop: '2rem' }}>
        {documents.docs.length === 0 ? (
          <div className="empty">Todavía no hay documentos publicados.</div>
        ) : (
          grouped
            .filter((group) => group.items.length)
            .map((group) => (
              <section key={group.category} className="section" style={{ padding: '1rem 0' }}>
                <div className="section-head">
                  <h2>{group.label}</h2>
                </div>
                <div className="stack">
                  {group.items.map((doc) => {
                    const href = doc.externalUrl || mediaUrl(doc.file) || '#'
                    return (
                      <div className="list-row" key={doc.id}>
                        <div>
                          <h3>{doc.title}</h3>
                          <span className="meta">
                            {[doc.schoolYear, doc.description].filter(Boolean).join(' · ')}
                          </span>
                        </div>
                        <a className="btn btn-dark" href={href} target="_blank" rel="noreferrer">
                          Abrir
                        </a>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))
        )}
      </div>
    </div>
  )
}

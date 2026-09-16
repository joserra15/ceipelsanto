import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { programCategoryLabels } from '@/lib/labels'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayloadClient()
  const [settings, news, programs, documents] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({
      collection: 'news',
      limit: 3,
      sort: '-publishedAt',
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'programs',
      limit: 3,
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'documents',
      limit: 4,
      sort: '-updatedAt',
    }),
  ])

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-brand">{settings.schoolName || 'CEIP El Santo'}</div>
          <h1>{settings.tagline || 'Progreso e innovación'}</h1>
          <p>
            {settings.homeIntro ||
              'Colegio público de Infantil y Primaria en La Solana. Un centro abierto a las familias, con proyectos de bilingüismo, innovación y vida saludable.'}
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/documentos">
              Documentos y libros
            </Link>
            <Link className="btn btn-secondary" href="/contacto">
              Contactar con el centro
            </Link>
          </div>
        </div>
      </section>

      {settings.highlightTitle ? (
        <aside className="highlight">
          <strong>{settings.highlightTitle}</strong>
          {settings.highlightBody ? <p>{settings.highlightBody}</p> : null}
          {settings.highlightLink ? (
            <Link href={settings.highlightLink}>Más información →</Link>
          ) : null}
        </aside>
      ) : null}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Para familias</span>
            <h2>Lo esencial, a un clic</h2>
            <p>Horarios, libros, comunicación con el centro y la vida del colegio sin rodeos.</p>
          </div>
          <div className="grid-3">
            <Link className="tile" href="/documentos">
              <span className="meta">Trámites</span>
              <h3>Documentos del curso</h3>
              <p>PGA, Plan Digital, libros de texto, horarios y calendario escolar.</p>
            </Link>
            <Link className="tile" href="/familias">
              <span className="meta">Participación</span>
              <h3>Familias y AMPA</h3>
              <p>Escuela de padres, junta de la AMPA y canales de comunicación.</p>
            </Link>
            <Link className="tile" href="/proyectos">
              <span className="meta">Señas de identidad</span>
              <h3>Proyectos del centro</h3>
              <p>Bilingüismo, TIC, Erasmus+, huerto, lectura y vida saludable.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Actualidad</span>
            <h2>Últimas noticias</h2>
          </div>
          {news.docs.length === 0 ? (
            <div className="empty">Aún no hay noticias publicadas. El profesorado puede añadirlas desde el panel.</div>
          ) : (
            <div className="grid-3">
              {news.docs.map((item) => (
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
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Proyectos</span>
            <h2>Cómo aprendemos</h2>
          </div>
          {programs.docs.length === 0 ? (
            <div className="empty">Los proyectos del centro aparecerán aquí cuando se publiquen.</div>
          ) : (
            <div className="grid-3">
              {programs.docs.map((item) => (
                <Link className="tile" key={item.id} href={`/proyectos/${item.slug}`}>
                  <span className="meta">{programCategoryLabels[item.category] || item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Descargas</span>
            <h2>Documentos recientes</h2>
          </div>
          <div className="stack">
            {documents.docs.length === 0 ? (
              <div className="empty">Sube PDFs desde el panel para que las familias los encuentren aquí.</div>
            ) : (
              documents.docs.map((doc) => (
                <div className="list-row" key={doc.id}>
                  <div>
                    <h3>{doc.title}</h3>
                    <span className="meta">{doc.schoolYear || 'Documento'}</span>
                  </div>
                  <Link className="btn btn-ghost" href="/documentos">
                    Ver documentos
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}

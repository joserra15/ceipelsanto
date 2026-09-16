import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = { title: 'Familias' }
export const dynamic = 'force-dynamic'

export default async function FamiliasPage() {
  const payload = await getPayloadClient()
  const [ampa, settings] = await Promise.all([
    payload.find({
      collection: 'people',
      where: { group: { equals: 'ampa' } },
      sort: 'order',
      limit: 50,
    }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  return (
    <div className="container page-hero">
      <span className="eyebrow">Comunidad</span>
      <h1>Familias</h1>
      <p>
        Espacio para la AMPA, la escuela de padres y la comunicación con el centro. Aquí encontrarás
        cómo participar en la vida del colegio.
      </p>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="grid-3">
          <div className="tile">
            <span className="meta">Comunicación</span>
            <h3>Secretaría y tutorías</h3>
            <p>Secretaría: {settings.officeHours}</p>
            <p>Tutorías: {settings.tutoringHours}</p>
            <Link href="/contacto">Contactar →</Link>
          </div>
          <div className="tile">
            <span className="meta">Formación</span>
            <h3>Escuela de padres</h3>
            <p>
              Sesiones y materiales para acompañar el aprendizaje y la convivencia. Los documentos se
              publican en la sección de descargas.
            </p>
            <Link href="/documentos">Ver documentos →</Link>
          </div>
          <div className="tile">
            <span className="meta">EducamosCLM</span>
            <h3>Portal de familias</h3>
            <p>Acceso a la plataforma oficial de Castilla-La Mancha para comunicaciones y trámites.</p>
            <a href="https://educamosclm.castillalamancha.es/" target="_blank" rel="noreferrer">
              Abrir EducamosCLM →
            </a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Junta directiva de la AMPA</h2>
          <p>La asociación de madres y padres dinamiza actividades, fiestas y colaboración con el claustro.</p>
        </div>
        <div className="stack">
          {ampa.docs.length === 0 ? (
            <div className="empty">Añade los cargos de la AMPA desde el panel (grupo AMPA).</div>
          ) : (
            ampa.docs.map((person) => (
              <div className="list-row" key={person.id}>
                <div>
                  <h3>{person.name}</h3>
                  <span className="meta">{person.roleTitle}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

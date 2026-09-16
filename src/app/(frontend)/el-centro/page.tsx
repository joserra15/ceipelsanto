import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = { title: 'El centro' }
export const dynamic = 'force-dynamic'

export default async function ElCentroPage() {
  const payload = await getPayloadClient()
  const [settings, people, page] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({ collection: 'people', limit: 100, sort: 'order' }),
    payload.find({
      collection: 'pages',
      where: { slug: { equals: 'el-centro' }, _status: { equals: 'published' } },
      limit: 1,
    }),
  ])

  const byGroup = {
    directivo: people.docs.filter((p) => p.group === 'directivo'),
    claustro: people.docs.filter((p) => p.group === 'claustro'),
    consejo: people.docs.filter((p) => p.group === 'consejo'),
  }

  return (
    <div className="container page-hero">
      <span className="eyebrow">Quiénes somos</span>
      <h1>El centro</h1>
      <p>
        {page.docs[0]?.lead ||
          `${settings.schoolName} es un colegio público de Educación Infantil y Primaria en La Solana, con una comunidad educativa activa y proyectos de innovación.`}
      </p>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="section-head">
          <h2>Datos del centro</h2>
        </div>
        <div className="grid-3">
          <div className="tile">
            <span className="meta">Dirección</span>
            <h3>Dónde estamos</h3>
            <p>{settings.address}</p>
          </div>
          <div className="tile">
            <span className="meta">Teléfono</span>
            <h3>{settings.phone}</h3>
            <p>
              <a href={`mailto:${settings.emailOfficial}`}>{settings.emailOfficial}</a>
            </p>
          </div>
          <div className="tile">
            <span className="meta">Atención</span>
            <h3>Familias</h3>
            <p>Secretaría: {settings.officeHours}</p>
            <p>Tutorías: {settings.tutoringHours}</p>
          </div>
        </div>
      </section>

      {Object.entries({
        'Equipo directivo': byGroup.directivo,
        Claustro: byGroup.claustro,
        'Consejo Escolar': byGroup.consejo,
      }).map(([title, members]) =>
        members.length ? (
          <section className="section" style={{ paddingTop: 0 }} key={title}>
            <div className="section-head">
              <h2>{title}</h2>
            </div>
            <div className="stack">
              {members.map((person) => (
                <div className="list-row" key={person.id}>
                  <div>
                    <h3>{person.name}</h3>
                    <span className="meta">{person.roleTitle}</span>
                  </div>
                  {person.email ? <a href={`mailto:${person.email}`}>{person.email}</a> : null}
                </div>
              ))}
            </div>
          </section>
        ) : null,
      )}

      <p style={{ marginTop: '2rem' }}>
        <Link className="btn btn-dark" href="/contacto">
          Ir a contacto
        </Link>
      </p>
    </div>
  )
}

import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = { title: 'Contacto' }
export const dynamic = 'force-dynamic'

export default async function ContactoPage() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <div className="container page-hero">
      <span className="eyebrow">Hablamos</span>
      <h1>Contacto</h1>
      <p>Estamos en La Solana. Escríbenos o llama en horario de atención a familias.</p>

      <div className="contact-grid" style={{ marginTop: '2rem' }}>
        <div className="contact-card">
          <h2 style={{ color: 'white' }}>{settings.schoolName}</h2>
          <p>{settings.address}</p>
          <p>
            Teléfono:{' '}
            <a href={`tel:${settings.phone?.replace(/\s/g, '')}`}>{settings.phone}</a>
          </p>
          <p>
            Email oficial:{' '}
            <a href={`mailto:${settings.emailOfficial}`}>{settings.emailOfficial}</a>
          </p>
          {settings.emailSecondary ? (
            <p>
              Email del centro:{' '}
              <a href={`mailto:${settings.emailSecondary}`}>{settings.emailSecondary}</a>
            </p>
          ) : null}
          <p style={{ marginTop: '1.25rem' }}>Secretaría: {settings.officeHours}</p>
          <p>Tutorías: {settings.tutoringHours}</p>
        </div>

        <div className="tile">
          <span className="meta">Cómo llegar</span>
          <h3>La Solana, Ciudad Real</h3>
          <p>
            C/ Cruz de Hierro 32, 13240 La Solana. Si necesitas atención presencial, te recomendamos
            llamar antes para confirmar disponibilidad.
          </p>
          <a
            className="btn btn-dark"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address || 'CEIP El Santo La Solana')}`}
            target="_blank"
            rel="noreferrer"
          >
            Abrir en Google Maps
          </a>
        </div>
      </div>
    </div>
  )
}

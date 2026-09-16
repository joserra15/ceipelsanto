import Link from 'next/link'

type Settings = {
  schoolName?: string | null
  address?: string | null
  phone?: string | null
  emailOfficial?: string | null
  emailSecondary?: string | null
  social?: {
    facebook?: string | null
    instagram?: string | null
    youtube?: string | null
    x?: string | null
  } | null
}

export function SiteFooter({ settings }: { settings: Settings | null }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">{settings?.schoolName || 'CEIP El Santo'}</div>
          <p>Colegio público de Educación Infantil y Primaria en La Solana (Ciudad Real).</p>
        </div>
        <div>
          <h3>Contacto</h3>
          <p>{settings?.address}</p>
          <p>
            Tel:{' '}
            <a href={`tel:${settings?.phone?.replace(/\s/g, '') || ''}`}>{settings?.phone}</a>
          </p>
          <p>
            <a href={`mailto:${settings?.emailOfficial || ''}`}>{settings?.emailOfficial}</a>
          </p>
          {settings?.emailSecondary ? (
            <p>
              <a href={`mailto:${settings.emailSecondary}`}>{settings.emailSecondary}</a>
            </p>
          ) : null}
        </div>
        <div>
          <h3>Enlaces útiles</h3>
          <p>
            <Link href="/documentos">Documentos del centro</Link>
          </p>
          <p>
            <Link href="/familias">Familias y AMPA</Link>
          </p>
          <p>
            <a href="https://educamosclm.castillalamancha.es/" target="_blank" rel="noreferrer">
              EducamosCLM
            </a>
          </p>
          <p>
            <Link href="/admin">Panel del profesorado</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

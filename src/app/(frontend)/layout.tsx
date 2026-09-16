import type { Metadata } from 'next'
import { Bricolage_Grotesque, Figtree } from 'next/font/google'

import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getPayloadClient } from '@/lib/payload'

import './styles.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display-loaded',
  display: 'swap',
})

const body = Figtree({
  subsets: ['latin'],
  variable: '--font-body-loaded',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CEIP El Santo · La Solana',
    template: '%s · CEIP El Santo',
  },
  description:
    'Colegio público de Infantil y Primaria en La Solana (Ciudad Real). Información para familias, documentos, proyectos y noticias.',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  let settings = null
  try {
    const payload = await getPayloadClient()
    settings = await payload.findGlobal({ slug: 'site-settings' })
  } catch {
    settings = {
      schoolName: 'CEIP El Santo',
      tagline: 'Progreso e innovación',
      address: 'C/ Cruz de Hierro 32, 13240 La Solana (Ciudad Real)',
      phone: '926 648 513',
      emailOfficial: '13002940.cp@edu.jccm.es',
      emailSecondary: 'cpelsantolasolana@gmail.com',
    }
  }

  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body
        style={
          {
            '--font-display': 'var(--font-display-loaded), system-ui, sans-serif',
            '--font-body': 'var(--font-body-loaded), system-ui, sans-serif',
          } as React.CSSProperties
        }
      >
        <div className="site-shell">
          <SiteHeader schoolName={settings?.schoolName || 'CEIP El Santo'} tagline={settings?.tagline} />
          <main className="site-main">{children}</main>
          <SiteFooter settings={settings} />
        </div>
      </body>
    </html>
  )
}

import 'dotenv/config'
import { getPayload } from 'payload'

import config from './payload.config'
import { lexicalParagraph } from './components/RichText'

async function seed() {
  const payload = await getPayload({ config })

  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@ceipelsanto.es',
        password: 'Cambiar123!',
        name: 'Administración',
        role: 'admin',
      },
    })
    await payload.create({
      collection: 'users',
      data: {
        email: 'profesor@ceipelsanto.es',
        password: 'Cambiar123!',
        name: 'Profesorado editor',
        role: 'editor',
      },
    })
    console.log('Usuarios creados: admin@ceipelsanto.es / profesor@ceipelsanto.es (Cambiar123!)')
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      schoolName: 'CEIP El Santo',
      tagline: 'Progreso e innovación',
      address: 'C/ Cruz de Hierro 32, 13240 La Solana (Ciudad Real)',
      phone: '926 648 513',
      emailOfficial: '13002940.cp@edu.jccm.es',
      emailSecondary: 'cpelsantolasolana@gmail.com',
      tutoringHours: 'Consultar con el tutor/a',
      officeHours: 'Lunes a viernes en horario lectivo',
      homeIntro:
        'Colegio público de Infantil y Primaria en La Solana. Un centro abierto a las familias, con proyectos de bilingüismo, innovación y vida saludable.',
      highlightTitle: 'Premio Mejor Experiencia Rural · SIMO 2023',
      highlightBody:
        'Nuestro centro fue reconocido por su proyecto de innovación educativa. Descubre nuestros programas.',
      highlightLink: '/proyectos',
      social: {
        facebook: 'https://www.facebook.com/ceip.elsanto',
        instagram: 'https://www.instagram.com/CEIPELSANTO',
        youtube: 'https://www.youtube.com/@CANALELSANTO',
        x: 'https://twitter.com/COLEELSANTO',
      },
    },
  })

  const peopleSeed = [
    { name: 'Equipo directivo', roleTitle: 'Actualizar cargos del curso', group: 'directivo', order: 1 },
    { name: 'Antonia G.S.', roleTitle: 'Presidenta AMPA', group: 'ampa', order: 1 },
    { name: 'Gregoria D.G.', roleTitle: 'Vicepresidenta AMPA', group: 'ampa', order: 2 },
    { name: 'Felicia G.T.', roleTitle: 'Secretaria AMPA', group: 'ampa', order: 3 },
    { name: 'M. Carmen T.B.', roleTitle: 'Tesorera AMPA', group: 'ampa', order: 4 },
  ]

  const existingPeople = await payload.find({ collection: 'people', limit: 1 })
  if (existingPeople.totalDocs === 0) {
    for (const person of peopleSeed) {
      await payload.create({ collection: 'people', data: person })
    }
  }

  const existingPrograms = await payload.find({ collection: 'programs', limit: 1 })
  if (existingPrograms.totalDocs === 0) {
    const programs = [
      {
        title: 'Bilingüismo',
        slug: 'bilinguismo',
        category: 'bilinguismo',
        summary:
          'Inglés vivo en el centro: teatro, festividades culturales y proyectos ABP en lengua extranjera.',
        content: lexicalParagraph(
          'El proyecto de bilingüismo del CEIP El Santo conecta el aprendizaje del inglés con la vida cultural del colegio: Halloween, Thanksgiving, Saint Patrick’s Day, teatro en inglés y actividades creativas para Infantil y Primaria.',
        ),
        _status: 'published',
      },
      {
        title: 'Escuela TIC y radio',
        slug: 'escuela-tic',
        category: 'tic',
        summary:
          'Code Week, ciencia y el podcast escolar «De boca en boca» para dar voz al alumnado.',
        content: lexicalParagraph(
          'La Escuela TIC impulsa la competencia digital con Code Week, estaciones STEAM y el podcast «De boca en boca», que recoge la vida cotidiana del colegio y del barrio.',
        ),
        _status: 'published',
      },
      {
        title: 'Erasmus+ · I Stop Bullying',
        slug: 'erasmus-ka229',
        category: 'erasmus',
        summary:
          'Proyecto europeo «I STOP BULLYING WITH ART AND SPORT» con centros socios internacionales.',
        content: lexicalParagraph(
          'Mediante el arte y el deporte, el alumnado trabaja la convivencia y la prevención del acoso en colaboración con centros europeos socios.',
        ),
        _status: 'published',
      },
      {
        title: 'Huerto escolar ecológico',
        slug: 'huerto-escolar',
        category: 'sostenibilidad',
        summary: 'Sembrar, cuidar y cosechar: del patio a la mesa con alimentación saludable.',
        content: lexicalParagraph(
          'El huerto permite al alumnado experimentar el ciclo de los alimentos, desde preparar la tierra hasta cocinar lo cultivado, fomentando hábitos sostenibles.',
        ),
        _status: 'published',
      },
      {
        title: 'Talleres extraescolares',
        slug: 'talleres-extraescolares',
        category: 'extraescolares',
        summary: 'Oferta de octubre a junio: deporte e inglés, con grupos que se forman en septiembre.',
        content: lexicalParagraph(
          'Los talleres extraescolares se ofertan de lunes a viernes entre octubre y junio. La organización de grupos se realiza en septiembre.',
        ),
        _status: 'published',
      },
    ]

    for (const program of programs) {
      await payload.create({ collection: 'programs', data: program as never })
    }
  }

  const existingNews = await payload.find({ collection: 'news', limit: 1 })
  if (existingNews.totalDocs === 0) {
    await payload.create({
      collection: 'news',
      data: {
        title: 'Bienvenida a la nueva web del colegio',
        slug: 'bienvenida-nueva-web',
        excerpt:
          'Estrenamos una web más clara para familias y un panel para que el profesorado publique noticias y documentos.',
        publishedAt: new Date().toISOString(),
        content: lexicalParagraph(
          'Esta nueva web del CEIP El Santo sustituye el sitio anterior en Wix. Las familias encontrarán documentos, proyectos, noticias y contacto de forma más sencilla. El profesorado puede iniciar sesión en /admin para actualizar el contenido.',
        ),
        _status: 'published',
      } as never,
    })
  }

  const existingDocs = await payload.find({ collection: 'documents', limit: 1 })
  if (existingDocs.totalDocs === 0) {
    const docs = [
      {
        title: 'Listado de libros de texto 2024-2025',
        category: 'libros',
        schoolYear: '2024-2025',
        description: 'Listado oficial del curso (enlace heredado del sitio anterior).',
        externalUrl:
          'https://e744d009-8b4e-4452-a230-8cb12dc8b070.filesusr.com/ugd/a6c1d9_4c11ff0b40b9458ab75cf9fbfb13d662.pdf',
      },
      {
        title: 'Plan Digital de Centro 2024-2025',
        category: 'plan-digital',
        schoolYear: '2024-2025',
        description: 'Documento del Plan Digital (enlace heredado).',
        externalUrl:
          'https://e744d009-8b4e-4452-a230-8cb12dc8b070.filesusr.com/ugd/a6c1d9_01ded5e1cf9d4b26a8542c2de2d269d2.pdf',
      },
      {
        title: 'Horarios del alumnado 2023-2024',
        category: 'horarios',
        schoolYear: '2023-2024',
        description: 'Pendiente de actualizar al curso vigente.',
        externalUrl:
          'https://e744d009-8b4e-4452-a230-8cb12dc8b070.filesusr.com/ugd/a6c1d9_d5fa1a1ab65641a0a7fe4e90a97f0f38.pdf',
      },
    ]

    for (const doc of docs) {
      await payload.create({ collection: 'documents', data: doc as never })
    }
  }

  console.log('Seed completado.')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})

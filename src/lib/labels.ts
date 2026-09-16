export const navItems = [
  { href: '/el-centro', label: 'El centro' },
  { href: '/documentos', label: 'Documentos' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/familias', label: 'Familias' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/galeria', label: 'Galería' },
  { href: '/contacto', label: 'Contacto' },
] as const

export const documentCategoryLabels: Record<string, string> = {
  pec: 'Proyecto Educativo',
  pga: 'PGA',
  memoria: 'Memoria anual',
  ncof: 'Convivencia (NCOF)',
  'plan-digital': 'Plan Digital',
  libros: 'Libros de texto',
  horarios: 'Horarios',
  calendario: 'Calendario escolar',
  otros: 'Otros',
}

export const programCategoryLabels: Record<string, string> = {
  bilinguismo: 'Bilingüismo',
  innovacion: 'Innovación / ABP',
  tic: 'TIC y radio',
  erasmus: 'Erasmus+',
  salud: 'Salud y deporte',
  sostenibilidad: 'Sostenibilidad',
  lectura: 'Lectura',
  extraescolares: 'Extraescolares',
  otros: 'Otros',
}

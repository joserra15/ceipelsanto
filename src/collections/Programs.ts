import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor, publishedOrAuthenticated } from '../access'

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: {
    singular: 'Proyecto / Programa',
    plural: 'Proyectos y programas',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', '_status'],
    group: 'Contenido',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: publishedOrAuthenticated,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Ámbito',
      required: true,
      options: [
        { label: 'Bilingüismo', value: 'bilinguismo' },
        { label: 'Innovación / ABP', value: 'innovacion' },
        { label: 'TIC y radio', value: 'tic' },
        { label: 'Erasmus+', value: 'erasmus' },
        { label: 'Salud y deporte', value: 'salud' },
        { label: 'Sostenibilidad', value: 'sostenibilidad' },
        { label: 'Lectura', value: 'lectura' },
        { label: 'Extraescolares', value: 'extraescolares' },
        { label: 'Otros', value: 'otros' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Resumen',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido',
      required: true,
    },
  ],
}

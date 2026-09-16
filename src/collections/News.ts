import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor, publishedOrAuthenticated } from '../access'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Noticia',
    plural: 'Noticias',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status'],
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Resumen',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Fecha de publicación',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de portada',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido',
      required: true,
    },
  ],
}

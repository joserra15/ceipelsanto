import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor, publishedOrAuthenticated } from '../access'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: 'Álbum',
    plural: 'Galería de fotos',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'schoolYear', '_status'],
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
      label: 'Título del álbum',
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
      name: 'schoolYear',
      type: 'text',
      label: 'Curso',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Portada',
    },
    {
      name: 'photos',
      type: 'array',
      label: 'Fotos',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Pie',
        },
      ],
    },
  ],
}

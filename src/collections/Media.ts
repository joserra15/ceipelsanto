import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Archivo',
    plural: 'Archivos / Media',
  },
  admin: {
    group: 'Contenido',
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Pie de foto',
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
  },
}

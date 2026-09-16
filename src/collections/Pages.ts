import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor, publishedOrAuthenticated } from '../access'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Página',
    plural: 'Páginas',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status'],
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
        description: 'Ejemplos: el-centro, familias, contacto, escuela-de-padres',
      },
    },
    {
      name: 'lead',
      type: 'textarea',
      label: 'Entradilla',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido',
      required: true,
    },
  ],
}

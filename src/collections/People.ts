import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor } from '../access'

export const People: CollectionConfig = {
  slug: 'people',
  labels: {
    singular: 'Persona',
    plural: 'Equipo y AMPA',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'group', 'roleTitle'],
    group: 'El centro',
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      required: true,
    },
    {
      name: 'group',
      type: 'select',
      label: 'Grupo',
      required: true,
      options: [
        { label: 'Equipo directivo', value: 'directivo' },
        { label: 'Claustro', value: 'claustro' },
        { label: 'Consejo Escolar', value: 'consejo' },
        { label: 'AMPA', value: 'ampa' },
      ],
    },
    {
      name: 'roleTitle',
      type: 'text',
      label: 'Cargo',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email de contacto',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

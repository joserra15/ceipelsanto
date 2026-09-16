import type { CollectionConfig } from 'payload'

import { adminFieldAccess, authenticated, isAdmin, isAdminOrEditor } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role'],
    group: 'Administración',
  },
  auth: true,
  access: {
    admin: authenticated,
    create: isAdmin,
    delete: isAdmin,
    read: isAdminOrEditor,
    update: ({ req: { user }, id }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return user.id === id
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Editor (profesorado)', value: 'editor' },
      ],
      access: {
        create: adminFieldAccess,
        update: adminFieldAccess,
      },
      admin: {
        description:
          'Los editores pueden publicar noticias, documentos y el resto del contenido público. Solo administradores gestionan usuarios.',
      },
    },
  ],
}

import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor } from '../access'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'Documento',
    plural: 'Documentos',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'schoolYear', 'updatedAt'],
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
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categoría',
      required: true,
      options: [
        { label: 'Proyecto Educativo (PEC)', value: 'pec' },
        { label: 'PGA', value: 'pga' },
        { label: 'Memoria anual', value: 'memoria' },
        { label: 'NCOF / Convivencia', value: 'ncof' },
        { label: 'Plan Digital', value: 'plan-digital' },
        { label: 'Libros de texto', value: 'libros' },
        { label: 'Horarios', value: 'horarios' },
        { label: 'Calendario escolar', value: 'calendario' },
        { label: 'Otros', value: 'otros' },
      ],
    },
    {
      name: 'schoolYear',
      type: 'text',
      label: 'Curso escolar',
      admin: {
        description: 'Ejemplo: 2025-2026',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción breve',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Archivo PDF',
    },
    {
      name: 'externalUrl',
      type: 'text',
      label: 'Enlace externo (opcional)',
      admin: {
        description: 'Si el documento está en Drive u otro sitio, puedes poner la URL aquí.',
      },
      validate: (value: string | null | undefined, { data }: { data: { file?: unknown } }) => {
        if (!value && !data?.file) {
          return 'Sube un PDF o indica un enlace externo.'
        }
        return true
      },
    },
  ],
}

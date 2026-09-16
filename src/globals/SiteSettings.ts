import type { GlobalConfig } from 'payload'

import { anyone, isAdminOrEditor } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Datos del centro',
  access: {
    read: anyone,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'schoolName',
      type: 'text',
      label: 'Nombre del centro',
      required: true,
      defaultValue: 'CEIP El Santo',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Lema',
      defaultValue: 'Progreso e innovación',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Dirección',
      required: true,
      defaultValue: 'C/ Cruz de Hierro 32, 13240 La Solana (Ciudad Real)',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Teléfono',
      required: true,
      defaultValue: '926 648 513',
    },
    {
      name: 'emailOfficial',
      type: 'email',
      label: 'Email oficial (JCCM)',
      required: true,
      defaultValue: '13002940.cp@edu.jccm.es',
    },
    {
      name: 'emailSecondary',
      type: 'email',
      label: 'Email secundario',
      defaultValue: 'cpelsantolasolana@gmail.com',
    },
    {
      name: 'tutoringHours',
      type: 'text',
      label: 'Horario de tutorías',
      defaultValue: 'Consultar con el tutor/a',
    },
    {
      name: 'officeHours',
      type: 'text',
      label: 'Horario de secretaría',
      defaultValue: 'Lunes a viernes en horario lectivo',
    },
    {
      name: 'social',
      type: 'group',
      label: 'Redes sociales',
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook' },
        { name: 'instagram', type: 'text', label: 'Instagram' },
        { name: 'youtube', type: 'text', label: 'YouTube' },
        { name: 'x', type: 'text', label: 'X / Twitter' },
      ],
    },
    {
      name: 'homeIntro',
      type: 'textarea',
      label: 'Texto de bienvenida (inicio)',
      defaultValue:
        'Colegio público de Infantil y Primaria en La Solana. Un centro abierto a las familias, con proyectos de bilingüismo, innovación y vida saludable.',
    },
    {
      name: 'highlightTitle',
      type: 'text',
      label: 'Aviso destacado (título)',
    },
    {
      name: 'highlightBody',
      type: 'textarea',
      label: 'Aviso destacado (texto)',
    },
    {
      name: 'highlightLink',
      type: 'text',
      label: 'Aviso destacado (enlace)',
    },
  ],
}

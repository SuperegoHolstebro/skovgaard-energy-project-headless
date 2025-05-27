import { paddingIndicator } from '../../utils/paddingindicator'
import { Envelope } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export default {
  name: 'formular',
  title: 'Kontaktformular',
  type: 'document',
  groups: [
    { title: 'Content', name: 'content' },
    { title: 'Indstillinger', name: 'settings' },
  ],
  fieldsets: [
    {
      name: 'advanced',
      title: 'Avanceret',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Titel',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'fields',
      title: 'Formularfelter',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'formField',
          title: 'Felt',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            {
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
              hidden: ({ parent }) => ['radio', 'checkbox'].includes(parent?.type),
            },
            {
              name: 'type',
              title: 'Felttype',
              type: 'string',
              options: {
                list: [
                  { title: 'Tekst', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Telefon', value: 'tel' },
                  { title: 'Tekstområde', value: 'textarea' },
                  { title: 'Dropdown', value: 'select' },
                  { title: 'Radioknapper', value: 'radio' },
                  { title: 'Afkrydsningsfelter', value: 'checkbox' },
                ],
              },
            },
            { name: 'required', title: 'Obligatorisk', type: 'boolean' },
            // Only used when type === 'select'
            {
              name: 'options',
              title: 'Valgmuligheder',
              type: 'array',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => !['select', 'radio', 'checkbox'].includes(parent?.type),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'recipientEmail',
      title: 'Modtager-email',
      description:
        'Email-adresse til modtageren af formularen. Hvis ikke angivet, vil standardmodtageren blive brugt.',
      type: 'string',
      group: 'settings',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Knaptekst',
      type: 'string',
      fieldset: 'advanced',
      group: 'settings',
      description:
        'Tekst på knappen til at sende formularen. Dette er valgtfrit. Standard er "Send"',
    }),
    defineField({
      name: 'loadingButtonText',
      title: 'Knaptekst under afsendelse',
      type: 'string',
      fieldset: 'advanced',
      group: 'settings',
      description:
        'Tekst på knappen mens formularen sendes. Dette er valgtfrit. Standard er "Sender..."',
    }),
    defineField({
      name: 'redirectAfterSubmit',
      title: 'Redirect efter afsendelse?',
      type: 'boolean',
      fieldset: 'advanced',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'redirectPage',
      title: 'Redirect-side',
      type: 'reference',
      fieldset: 'advanced',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => !parent?.redirectAfterSubmit,
      group: 'settings',
    }),
    defineField({
      name: 'successMessage',
      title: 'Succesbesked',
      type: 'string',
      fieldset: 'advanced',
      group: 'settings',
      description:
        'Besked der vises når formularen er sendt. Valgfri. Standard er "Tak for din besked".',
      hidden: ({ parent }) => parent?.redirectAfterSubmit === true,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      description: 'recipientEmail',
    },
    prepare({ title, description }) {
      return {
        title: title,
        subtitle: description,
        media: Envelope,
      }
    },
  },
}

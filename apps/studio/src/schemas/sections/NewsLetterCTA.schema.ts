// ./schemas/textWithIllustration.js

import { defineArrayMember, defineField, defineType } from "sanity";

export const NewsLetterCTA = defineType({
  name: "NewsLetterCTA",
  type: "object",
  title: "Nyhedbrev CTA",
  groups: [
    { title: "Indhold", name: "content" },
    { title: "Design", name: "design" },
    { title: 'Medie', name: 'media' },
    { title: 'Indstillinger', name: 'settings'},
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
    }),
    {
      name: 'body',
      title: 'Body',
      group: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          title: 'Block',
        }),
      ],
    },
    defineField({
      name: 'link',
      type: 'link',
      group: 'content',
    }),
    {
      name: "design",
      type: "design",
      group: "design",
    },
    {
      name: 'overflow',
      type: 'boolean',
      title: 'Overflow?',
      description: 'Fjern padding på bunden først.',
      group: 'design',
    },
    {
      name: 'SectionSettings',
      type: 'SectionSettings',
      group: 'settings',
    },
  ],
  preview: {
    select: {
      title: "title.heading",
      tagline: "tagline",
      type: "type",
      media: "image",
    },
    prepare({ media }) {
      return {
        title: "Nyhedbrev CTA",
        type: "Nyhedbrev CTA",
        subtitle: "Nyhedbrev CTA",
        media,
      };
    },
  }
});

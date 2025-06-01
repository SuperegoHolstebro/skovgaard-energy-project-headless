// ./schemas/downloadables.ts

import { defineField, defineType } from "sanity";

export const Downloadables = defineType({
  name: "Downloadables",
  type: "object",
  description: "En sektion hvor brugeren kan downloade elementer.",
  title: "Download elementer",
  groups: [
    { title: "Indhold", name: "content" },
    { title: "Design", name: "design" },
    { title: 'Indstillinger', name: 'settings'},
  ],
  fields: [
    defineField({
      type: "heading",
      name: "heading",
      title: "Overskrift",
      group: "content",
    }),
    {
      group: "content",
      name: "dataBox",
      title: "",
      type: "array",
      of: [
        defineField({
          type: "link",
          name: "link",
          title: "Link",
        }),
        {
          name: 'Fileobject',
          title: 'Fil',
          type: 'object',
          fields: [
            defineField({
              type: 'string',
              name: 'title',
              title: 'Overskrift',
              description: 'Overskrift til filen',
            }),
            defineField({
              type: 'file',
              name: 'file',
              title: 'Fil',
            }),
          ],
        },
      ],
    },
    {
      name: "design",
      type: "design",
      group: "design",
    },
    {
      name: 'SectionSettings',
      type: 'SectionSettings',
      group: 'settings',
    },
  ],
  preview: {
    select: {
      title: "heading",
      heading: "heading",
      subtitle: "datBox",
      dataBox: "dataBox",
    },
    prepare({ heading, dataBox }) {
      return {
        title: heading.heading.heading,
        subtitle: `Der er ${dataBox.length} kasser i denne sektion.`,
      };
    },
  },
});

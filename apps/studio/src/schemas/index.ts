import { SchemaTypeDefinition } from 'sanity'
import * as Documents from '../schemas/documents/_index'
import * as Atoms from '../schemas/atoms/_index'
import * as Sections from '../schemas/sections/_index'
import * as Modules from '../schemas/modules/_index'

const documentTypes = [...Object.values(Documents)]
const sectionTypes = [...Object.values(Sections)]
const atomTypes = [...Object.values(Atoms)]
const moduleTypes = [...Object.values(Modules)]

export const schema: { types: SchemaTypeDefinition[]; templates: any } = {
  types: [
    ...documentTypes, // Documents
    ...atomTypes, // Atoms
    ...sectionTypes, // Sections
    ...moduleTypes, // Modules
  ],
  templates: (prev) =>
    prev.filter((template) => !['page', 'article', 'event'].includes(template.id)),
}

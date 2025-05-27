export function resolveDocumentType(documentType?: string): string | undefined {
  switch (documentType) {
    case 'page':
      return documentType ? 'Side' : undefined
    case 'event':
      return documentType ? 'Begivenheder' : undefined
    case 'article':
      return documentType ? 'Nyhed' : undefined
    case 'FatherGuides':
      return documentType ? 'Fædre guide' : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

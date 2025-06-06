export function extractPlainText(richText: any) {
  if (!Array.isArray(richText)) return ''
  return richText
    .map((block) => {
      if (block._type === 'block' && Array.isArray(block.children)) {
        return block.children
          .map((child: any) => (child._type === 'span' ? child.text : ''))
          .join('')
      }
      return ''
    })
    .join('\n') // Join blocks with a newline for readability
}

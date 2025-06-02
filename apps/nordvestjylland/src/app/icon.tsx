import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  let fill = '#fafafa' // Transparent by default
  if (process.env.NODE_ENV === 'development') {
    fill = '#FF0000' // Red for development
  }
  if (process.env.NODE_ENV === 'production') {
    fill = '#fafafa' // Transparent for production
  }
  return new ImageResponse(
    (
      <svg width="87" height="87"
        viewBox="0 0 256 256"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.4399 53.1599L1.6499 97.3799H22.5299C25.7499 97.3799 29.0999 95.3299 30.7699 92.5699L41.5299 74.7499L28.4499 53.1499L28.4399 53.1599Z" fill="#003B52" />
        <path d="M30.1599 0L43.6499 22.29L57.1399 0H30.1599Z" fill="#00A381" />
        <path d="M26.36 0H0L43.41 71.65L56.59 49.89L26.36 0Z" fill="#00A381" />
        <path d="M58.4699 46.78L86.8099 0H60.6399L45.3899 25.19L58.4699 46.78Z" fill="#00A381" />
      </svg>

    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}

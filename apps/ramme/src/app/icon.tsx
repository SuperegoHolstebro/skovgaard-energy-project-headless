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
      <svg
        width="32"
        height="32"
        viewBox="0 0 512 512"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H512V512H0V0Z" fill={fill} />
        <path d="M210.96 275.954L113.694 437H189.477C201.725 436.485 212.92 429.934 219.391 419.493L258.472 354.61L210.952 275.962L210.96 275.954Z" fill="#132C3F" />
        <path d="M203.065 84H108L264.592 343.463L312.154 264.669L203.065 84Z" fill="#30B8C9" />
        <path d="M319.275 253.18L421.145 84H327.093L272.3 175.082L319.275 253.18Z" fill="#132C3F" />
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

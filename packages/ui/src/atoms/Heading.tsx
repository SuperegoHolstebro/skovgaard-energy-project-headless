import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { HeadingProps } from '../types/Heading.types'
import { cn } from '@repo/utils/twMerge'
import { clean } from '@repo/utils/sanitize'

/**
 *
 * @returns: En overskriftskomponent med brugerdefineret styling
 * @example: <Heading >Overskrift</Heading>
 * @alias: Heading
 * @summary: Denne komponent bruges til at oprette en ny overskrift med brugerdefinerede stilarter.
 * @version: 1.0.0
 * @property: [fontFamily, size, tag, spacing, maxWidth, clamp, text]
 * @author: Kasper Buchholtz
 *
 **/

const Heading_Variants = cva(' rwx text-inherit', {
  variants: {
    text: {
      balance: 'text-balance',
      pretty: 'text-pretty',
      nowrap: 'text-nowrap',
      wrap: 'text-wrap',
    },
    size: {
      '2xl': 'text-giant leading-none font-heading tracking-normal', // h1 - 2xl
      xl: 'text-huge leading-none font-heading tracking-normal', // h2 - xl
      lg: 'text-large tracking-[0.005em] font-semibold font-heading', // h3 - lg
      md: 'text-medium tracking-[0.005em] font-heading font-semibold', // h4 - md
      sm: 'text-increased tracking-[0.005em] font-heading font-medium', // h5 - sm
      xs: 'text-regular tracking-[0.005em] font-heading font-medium', // h6 - xs
      span: 'text-small tracking-[0.005em] font-heading font-medium ',
      p: 'text-regular font-paragraph leading-normal tracking-tight',

    },
    fontFamily: {
      sans: 'font-heading',
      paragraph: 'font-paragraph',
      serif: 'font-serif',
      heading: 'font-heading',
      mono: 'font-mono',
    },

    hyphens: {
      none: 'hyphens-none',
      auto: 'hyphens-auto',
      manual: 'hyphens-manual',
    },
    tag: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      span: 'span',
      p: 'p',
    },
    spacing: {
      large: 'mb-12',
      default: 'mb-8',
      small: 'mb-4',
      none: '',
    },
    maxWidth: {
      default: 'max-w-prose',
      none: '',
    },
    clamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
      5: 'line-clamp-5',
      6: 'line-clamp-6',
      none: '',
    },
  },
  defaultVariants: {
    size: 'xl',
    fontFamily: 'sans',
    tag: 'h2',
    spacing: 'none',
    maxWidth: 'default',
    clamp: 'none',
    text: 'balance',
    hyphens: 'auto',
  },
})
type ExtendedHeadingProps = HeadingProps & VariantProps<typeof Heading_Variants>

const Heading: React.FC<ExtendedHeadingProps> = ({
  size,
  text,
  children,
  clamp,
  tag,
  hyphens,
  fontFamily,
  spacing,
  className,
  maxWidth,
  dangerouslySetInnerHTML,
  data,
  ...props
}) => {
  const HeadingTag = tag || data?.tag || 'h2'
  return (
    <HeadingTag
      data-size={size}
      data-tag={tag}
      {...props}
      className={clean(
        cn(
          className,
          Heading_Variants({
            text,
            fontFamily,
            clamp,
            spacing,
            hyphens,
            maxWidth,
            size: size ?? ((data ? clean(data?.size) : 'xl') as any),
          }),
        ),
      )}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {children}
    </HeadingTag>
  )
}

export default Heading

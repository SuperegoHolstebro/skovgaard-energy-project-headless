import { cva, VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { SectionProps } from '../types/Section.types'
import { cn } from '@repo/utils/twMerge'
import { clean } from '@repo/utils/sanitize'

/**
 * @returns: En sektion.
 * @example: <Section />
 * @alias: Section
 * @summary: Denne komponent bruges til at oprette en ny sektion.
 * @version: 1.1.0
 * @property: [children, variant, columns, gap, paddingX, paddingTop, paddingBottom, className, tag, ...props, data]
 * @todo: bedre navngivning af props
 * @author: Kasper Buchholtz
 **/

export const Section_Variants = cva('grid group/theme', {
  variants: {
    variant: {
      default: "bg-skovgaard-white text-primary prose-headings:text-primary prose-h1:text-secondary ",// standard
      secondary: "bg-primary/10 prose-headings:text-primary text-primary prose-h1:text-secondary", // Støvet Grøn
      tertiary: "bg-primary prose-headings:!text-skovgaard-white prose-p:text-skovgaard-white text-skovgaard-white prose-h1:text-skovgaard-white", // Grøn
      quaternary: "bg-skovgaard-cleanWhite prose-headings:text-primary text-primary prose-h1:text-secondary", // Hvid

    },
    columns: {
      default:
        'grid-cols-4 xs:grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-24 2xl:grid-cols-24',
      secondary: '',
    },
    gap: {
      default: 'gap-4 xs:gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6',
      secondary: '',
    },
    paddingX: {
      default: 'px-4 xs:px-4 sm:px-13 md:px-24 lg:px-19 xl:px-36 2xl:px-52',
      none: '',
      right: 'pr-4 xs:pr-4 sm:pr-13 md:pr-24 lg:pr-19 xl:pr-36 2xl:pr-52',
      left: 'pl-4 xs:pl-4 sm:pl-13 md:pl-24 lg:pl-19 xl:pl-36 2xl:pl-52',
    },
    marginX: {
      default: "mx-4 xs:mx-4 sm:mx-13 md:mx-24 lg:mx-19 xl:mx-36 2xl:mx-52 ",
      none: "",
      almost: " mx-4 xs:mx-4 sm:mx-4 md:mx-6 lg:mx-6 xl:mx-6 2xl:mx-6 rounded",
      right: "mr-4 xs:mr-4 sm:mr-13 md:mr-24 lg:mr-19 xl:mr-36 2xl:mr-52",
      left: "ml-4 xs:ml-4 sm:ml-13 md:ml-24 lg:ml-19 xl:ml-36 2xl:ml-52",
    },

    paddingTop: {
      default: 'pt-16 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-40 2xl:pt-48',
      none: '',
    },
    paddingBottom: {
      default: 'pb-16 sm:pb-20 md:pb-24 lg:pb-32 xl:pb-40 2xl:pb-48',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    columns: 'default',
    gap: 'default',
    paddingX: 'default',
    marginX: 'none',
    paddingTop: 'default',
    paddingBottom: 'default',
  },
})
type ExtendedSectionProps = SectionProps & VariantProps<typeof Section_Variants>

export default function Section({
  data,
  children,
  variant,
  columns,
  paddingBottom,
  paddingTop,
  marginX,
  paddingX,
  gap,
  className = '',
  tag,
  ...props
}: ExtendedSectionProps & { tag?: React.ElementType }) {
  const SectionComponent: React.ElementType = tag || 'div'
  return (
    <>
      <SectionComponent
        data-block={data?._type}
        data-theme={clean(data?.design?.color?.color) || undefined}
        id={clean(data?.SectionSettings?.anchor?.current) || undefined}
        {...props}
        className={cn(
          Section_Variants({
            variant: variant ?? (clean(data?.design?.color?.color) as any),
            columns,
            gap,
            marginX,
            paddingX,
            paddingBottom:
              paddingBottom ??
              ((data?.design?.padding
                ? clean(data?.design?.padding.spacingBottom)
                : 'default') as any),
            paddingTop:
              paddingTop ??
              ((data?.design?.padding
                ? clean(data?.design?.padding.spacingTop)
                : 'default') as any),
            className,
          }),
        )}
      >
        {children}
      </SectionComponent>
    </>
  )
}

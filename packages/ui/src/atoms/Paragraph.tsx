import { PortableText } from '@portabletext/react'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '@repo/utils/src/twMerge'
import { ParagraphProps } from '../types/Paragraph.types'
import Heading from './Heading'
import { SanityLink } from '@repo/link-field/src/sanity-link'

/**
 *
 * @returns: En tekstboks-komponent, der kan bruges til at indtaste tekst.
 * @example: <Paragraph />
 * @alias: Paragraph
 * @summary: Denne komponent bruges til at vise en tekstboks-komponent, der kan bruges til at indtaste tekst.
 * @version: 1.0.0
 * @property: [size, isPortableText]
 * @author: Kasper Buchholtz
 *
 **/
/* .has-text-wrap>:not(:first-child) */
const Paragraph_Variants = cva('font-paragraph font-normal', {
  variants: {
    size: {
      regular: 'text-regular',
      increased: 'text-increased',
      medium: 'text-medium',
    },
  },
  defaultVariants: {
    size: 'regular',
  },
})

type ExtendedParagraphProps = ParagraphProps & VariantProps<typeof Paragraph_Variants>

const Paragraph: React.FC<ExtendedParagraphProps> = ({
  size,
  children,
  isPortableText,
  className,
  ...props
}) => {
  return (
    <>
      {isPortableText ? (
        <div {...props} className={`space-y-4 ${cn(Paragraph_Variants({ size, className }))}`}>
          <TextComponent value={children} />
        </div>
      ) : (
        <>
          <p {...props} className={cn(Paragraph_Variants({ size, className }))}>
            {children}
          </p>
        </>
      )}
    </>
  )
}

const myPortableTextComponents = {
  types: {
    myBlock: ({ children }: any) => <div className="my-block">{children}</div>,
  },
  marks: {
    em: ({ children }: any) => <em className="italic font-semibold">{children}</em>,
    link: ({ children, value }: any) => {
      return (
        <SanityLink
          link={value}
          className="underline transition-all custom-a underline-offset-2 hover:underline-offset-4"
          title={value.label}
        >
          {children}
        </SanityLink>
      )
    },
  },
  block: {
    normal: ({ children }: any) => <Paragraph>{children}</Paragraph>,
    h1: ({ children }: any) => (
      <Heading tag="h1" size="2xl">
        {children}
      </Heading>
    ),
    h2: ({ children }: any) => (
      <Heading tag="h2" size="xl">
        {children}
      </Heading>
    ),
    h3: ({ children }: any) => (
      <Heading tag="h3" size="lg">
        {children}
      </Heading>
    ),
    h4: ({ children }: any) => (
      <Heading tag="h4" size="md">
        {children}
      </Heading>
    ),
    h5: ({ children }: any) => (
      <Heading tag="h5" size="sm">
        {children}
      </Heading>
    ),
    h6: ({ children }: any) => (
      <Heading tag="h6" size="xs">
        {children}
      </Heading>
    ),
    ul: ({ children }: any) => <ul className="ml-5 list-disc list-outside"> {children} </ul>,
    ol: ({ children }: any) => <ol className="">{children}</ol>,
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => <code className="px-1 py-0 bg-gray-200 rounded">{children}</code>,
    sub: ({ children }: any) => <sub>{children}</sub>,
    sup: ({ children }: any) => <sup>{children}</sup>,
    blockquote: ({ children }: any) => (
      <blockquote className="pl-4 italic border-l-2 border-superego-grey/50 ">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => <ul className="space-y-2">{children}</ul>,
    number: ({ children }: any) => (
      <ol className="prose-li:ml-6 prose-li:list-decimal prose-li:list-item">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-4 list-disc list-item">{children}</li>,
    number: ({ children }: any) => <li className="py-2 list-decimal list-outside">{children}</li>,
  },
}

const TextComponent = (props: any) => {
  return <PortableText value={props.value} components={myPortableTextComponents as any} />
}

export default Paragraph

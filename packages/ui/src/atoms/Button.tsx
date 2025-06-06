import { cn } from '@repo/utils/twMerge'
import React, { type ElementType, type ForwardedRef, forwardRef } from 'react'
import { getLinkText } from '@repo/link-field/src/helpers/getLinkText'
import { AdvancedButton, advancedButton_Variants } from './AdvancedButton'
import { clean } from '@repo/utils/sanitize'
import { LinkProps, SanityLink } from '@repo/link-field/src/sanity-link'
import { VariantProps } from 'class-variance-authority'
import { resolveHref } from '@repo/utils/resolveHref'
import { InternalLink, LinkValue } from '@repo/link-field/src/types'

/**
 *
 * @returns: En knap-komponent med brugerdefineret styling
 * @example:
 * <Button link={}>Knap</Link></Button>
 * @alias: Button
 * @summary: En knap-komponent med brugerdefineret styling
 * @version: 2.1.0
 * @property: [link, variant, size]
 * @author: Kasper Buchholtz
 *
 **/

type extendedLinkProps = {
  link?: LinkValue
  ref?: ForwardedRef<HTMLAnchorElement>
} & LinkProps &
  VariantProps<typeof advancedButton_Variants> & {
    as?: ElementType
    hrefResolver?: (link: InternalLink) => string
    children?: any
  }

const Button = forwardRef(
  (
    { variant, link, as, hrefResolver, children, className = '', ...props }: extendedLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    if (!link) {
      return null
    }

    // If no link text is provided, try and find a fallback
    if (!children) {
      // eslint-disable-next-line no-param-reassign
      children = getLinkText(link)
    }

    return (
      <AdvancedButton asChild variant={variant} className={cn(variant, className)}>
        <SanityLink
          {...props}
          ref={ref}
          link={clean(link as any) as any}
          aria-label={clean(link.label as any)}
          title={clean(link.label as any)}
          hrefResolver={({ internalLink }) =>
            clean(
              resolveHref(internalLink?.locale, internalLink?._type, internalLink?.slug?.current),
            )
          }
        >
          {children}
        </SanityLink>
      </AdvancedButton>
    )
  },
)

Button.displayName = 'Button'

export { Button, type LinkProps }

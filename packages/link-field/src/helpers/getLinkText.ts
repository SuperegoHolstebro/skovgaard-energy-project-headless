import { LinkValue } from '../types.js'
import {
  isCustomLink,
  isEmailLink,
  isExternalLink,
  isInternalLink,
  isPhoneLink,
} from './typeGaurds'

/**
 * Get the text to display for the given link.
 */
export const getLinkText = (link: LinkValue): string =>
  link.label ||
  (isInternalLink(link)
    ? // Naively try to get the title or slug of the internal link
      link.internalLink?.title || link.internalLink?.slug?.current
    : isExternalLink(link)
      ? link.url
      : isPhoneLink(link)
        ? link.phone
        : isEmailLink(link)
          ? link.email
          : isCustomLink(link)
            ? link.value
            : undefined) ||
  '#'

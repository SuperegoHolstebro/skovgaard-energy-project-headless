import type {
  CustomLink,
  EmailLink,
  ExternalLink,
  FileLink,
  InternalLink,
  LinkValue,
  PhoneLink,
} from '../types.js'

export const isInternalLink = (link: LinkValue): link is InternalLink => link.type === 'internal'

export const isExternalLink = (link: LinkValue): link is ExternalLink => link.type === 'external'

export const isEmailLink = (link: LinkValue): link is EmailLink => link.type === 'email'

export const isPhoneLink = (link: LinkValue): link is PhoneLink => link.type === 'phone'

export const isFileLink = (link: LinkValue): link is FileLink => link.type === 'file'

export const isCustomLink = (link: LinkValue): link is CustomLink =>
  !['internal', 'external', 'email', 'phone', 'file'].includes(link.type)

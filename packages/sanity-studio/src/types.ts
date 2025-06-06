import { Language as Locale } from '@sanity/document-internationalization'
import {
  NavigatorOptions as PresentationNavigatorOptions,
  PresentationPluginOptions,
} from 'sanity/presentation'
import { LocalizeslugFn } from '@repo/sanity-web/src/types'
import {
  FieldDefinitionBase,
  ObjectDefinition,
  ObjectFieldProps,
  ObjectOptions,
  ObjectSchemaType,
  Path,
  SanityDocument,
  SlugDefinition,
  SlugOptions,
  SlugValue,
} from 'sanity'

import { SlugContext } from './hooks/usePathnameContext'

export type NormalizedCreatablePage = {
  title: string
  type: string
}

export type FolderTitleFn = (item: TreeNode, locale?: string) => string

export type FoldersConfig = {
  [slug: string]: {
    title?: string | FolderTitleFn
    icon?: React.ElementType
  }
}

export type PagesNavigatorOptions = {
  i18n?: {
    locales: Locale[]
    defaultLocaleId?: string
    requireLocale?: boolean
    localizeslug?: LocalizeslugFn
  }
  creatablePages?: Array<NormalizedCreatablePage>
  folders?: FoldersConfig
}

export type PagesNavigatorPluginOptions = PresentationPluginOptions & {
  i18n?: {
    locales: Locale[]
    defaultLocaleId?: string
    requireLocale?: boolean
    localizeslug?: LocalizeslugFn
  }
  navigator?: Pick<PresentationNavigatorOptions, 'maxWidth' | 'minWidth'>
  creatablePages?: Array<NormalizedCreatablePage | string>
  folders?: FoldersConfig
  title?: string
}

export type Page = {
  _rev: string
  _id: string
  _originalId: string
  _type: Exclude<'string', 'folder'>
  _updatedAt: string
  _createdAt: string
  slug: string | null
  locale?: string
  children: {}
}

export type PageTreeNode = Page & {
  title: string
  edited?: boolean
}

export type FolderTreeNode = Omit<Page, '_type'> & {
  _type: 'folder'
  title: string
  children: Tree
}

export type Tree = Record<string, TreeNode>

export type TreeNode = PageTreeNode | FolderTreeNode

export type NavigatorContextType = {
  rootTree: Tree
  currentDir: string
  setCurrentDir: (dir: string) => void
  searchTerm: string
  handleSearch: (value: string) => void
  locale?: string
  defaultLocaleId?: string
  localizeslug: LocalizeslugFn
  setLocale?: (value: string) => void
  folders?: FoldersConfig
  items: TreeNode[]
}

export type HeaderProps = {
  children?: React.ReactNode
  locales?: string[]
  domRef?: React.RefObject<HTMLDivElement>
  pages?: NormalizedCreatablePage[]
}

export type ListItemProps = {
  item: TreeNode
  active?: string
  setActive?: (value: string) => void
  idx?: number
  virtualChild?: Record<string, any>
}

export type SkeletonListItemsProps = {
  items: number
}

export type LocaleProps = {
  locales: Locale[]
  domRef?: React.RefObject<HTMLDivElement>
}

export type ReducerAction = {
  type: string
  payload?: any
}

export interface DocumentWithLocale extends SanityDocument {
  locale: Locale['id']
}

export interface SectionOptions extends ObjectOptions {
  variants?: SectionVariant[]
}

/**
 * Pass any of the properties of Sanity object types described here: https://www.sanity.io/docs/object-type
 *
 * The `custom` property is strictly typed to include what the toolkit needs for scaffolding the website & studio.
 */
export interface SectionSchema extends Omit<ObjectDefinition, 'options'> {
  options: SectionOptions
}

export interface SectionVariant {
  /**
   * URl to an image, video or GIF that shows what this block variant looks like.
   */
  assetUrl: string
  /**
   * What shows in the block selector in the editor.
   */
  title?: string
  /**
   * What initial value to use for this variant when creating the block.
   *
   * @example
   * {
   *  title: "Title Centered, dark background",
   *  initialValue: { centeredTitle: true, bg: "dark" }
   * }
   */
  initialValue?: {}
}

export type SectionType = ObjectSchemaType & {
  options: SectionOptions
}

export type SectionVariantType = {
  sectionName: string
  title: string
  assetUrl?: string
  initialValue?: any
}

export type SectionAddHandler = (params: { sectionName: string; initialValue?: any }) => void

export type slugPrefix =
  | string
  | ((doc: SanityDocument, context: SlugContext) => Promise<string> | string)

export type slugSourceFn = (
  document: SanityDocument,
  context: SlugContext,
) => string | Promise<string>

export type slugOptions = Pick<SlugOptions, 'isUnique'> & {
  source?: string | Path | slugSourceFn
  prefix?: slugPrefix
  folder?: {
    canUnlock?: boolean
  }
  i18n?: {
    enabled?: boolean
    defaultLocaleId?: string
    localizeslug?: LocalizeslugFn
  }
  autoNavigate?: boolean
}

export type slugParams = Omit<SlugDefinition & FieldDefinitionBase, 'type' | 'options' | 'name'> & {
  name?: string
  options?: slugOptions
}

export type slugInputProps = ObjectFieldProps<SlugValue> & {
  schemaType: { options?: slugOptions }
}

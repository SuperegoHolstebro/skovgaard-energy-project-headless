'use client'
import React from 'react'
import { motion } from 'motion/react'
import useNavigationData from '@repo/utils/hooks/useNavigationData'
import NavigationItem from '../atoms/NavigationItem'
import { defaultOptions } from '@repo/utils/hooks/useAnimate'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Icon from '../atoms/Icons'
import LocaleSwitcher from '../atoms/LocaleSwitcher'

/**
 *
 * @returns: Navigationen for hjemmesiden.
 * @example: <Navigation />
 * @alias: Navigation
 * @summary: Denne komponent bruges til at vise navigationen for hjemmesiden.
 * @version: 1.0.0
 * @property: [onClose]
 * @author: Kasper Buchholtz
 *
 **/

export default function Navigation({
  onClose,
  isMobile,
}: {
  onClose?: () => void
  isMobile?: boolean
}) {
  const locale = useParams().locale
  const data = useNavigationData(locale) as any

  return (
    <>
      {isMobile ? (
        <>
          <motion.nav
            role="navigation"
            data-lenis-prevent="true"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{
              duration: defaultOptions.duration * 1,
              ease: defaultOptions.ease,
            }}
            className="fixed z-[999] top-0 right-0 w-full h-screen sm:w-[50vw] md:w-[50vw] lg:w-[33vw] overflow-auto bg-skovgaard-white"
          >
            <ul className="h-full px-6 pb-6 overflow-auto md:px-24 lg:px-19 xl:px-16 sm:px-13 pt-44 sm:pt-32 md:pt-44 lg:pt-40 text-medium">
              {data?.links?.map((item: any, index: number) => (
                <NavigationItem key={index} item={item} />
              ))}
              <LocaleSwitcher
                position="absolute"
                className="bottom-4 right-4"
                view="desktop"
                /* @ts-ignore */
                locale={locale}
              />
              <Sociale />
            </ul>
          </motion.nav>
          <motion.button
            title="Luk menu"
            className="fixed z-[998] top-0 right-0 w-screen h-screen bg-skovgaard-dark/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: defaultOptions.duration * 0.5,
              ease: defaultOptions.ease,
            }}
            onClick={onClose}
          />
        </>
      ) : (
        <nav className="hidden my-auto font-heading lg:block  lg:-col-end-1 lg:col-start-4 xl:-col-end-1 xl:col-start-5">
          <ul className="flex justify-end h-full gap-4 ">
            {data?.links?.map((item: any, index: number) => (
              <NavigationItem key={index} item={item} />
            ))}
            <li className="relative -ml-2 flex gap-4">
              <span className=" block my-auto w-px h-4 lg:bg-skovgaard-dark " />
              <LocaleSwitcher
                className="h-full my-auto "
                view="desktop"
                /* @ts-ignore */
                locale={locale}
              />
            </li>
          </ul>
        </nav>
      )}
    </>
  )
}

const Sociale = () => {
  return (
    <div className="absolute bottom-0 left-0 px-6 pb-6 space-y-3 overflow-auto md:pl-24 lg:pl-19 xl:pl-16 xl:pr-36 sm:pl-13 pt-44 sm:pt-32 md:pt-28 lg:pt-28">
      <span className="text-[12px]">SOCIALE MEDIER</span>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 ">
        <li>
          <Link
            href={'item?.url'}
            target="_blank"
            rel="noreferrer"
            className="transition-all group"
          >
            <Icon
              className="transition-all size-6 fill-primary group-hover:fill-secondary"
              type={'linkedin'}
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}

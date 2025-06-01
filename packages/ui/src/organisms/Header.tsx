import { AnimatePresence } from 'motion/react'
import Link from 'next/link'
import * as React from 'react'
import { useEffect } from 'react'
import Navigation from '../organisms/Navigation'
import Logo, { LogoProps } from '../atoms/Logo'
import Section from '../sections/Section'
import NavigationGroup from './NavigationGroup'
import { useParams } from 'next/navigation'
import { resolveHomeHref } from '@repo/utils/resolveHref'

type HeaderProps = {
  logoVariant?: LogoProps['variant']
}

export default function Header({ logoVariant = 'SkovgaardEnergy'
}: HeaderProps) {
  const locale = useParams().locale
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  const handleCloseNav = () => {
    setIsOpen(false)
  }

  const handleScroll = () => {
    if (window.scrollY > 420) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    // Check scroll position on mount
    handleScroll()

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Section
        paddingBottom="none"
        paddingTop="none"
        tag="header"
        data-scroll={isScrolled}

        className={`fixed top-0 right-0 w-full py-4 se-grid  z-[9999999999] duration-735 ease-custom transition-all data-[scroll=true]:bg-skovgaard-white bg-transparent`}
      >
        <Link
          className="col-span-2 col-start-1 md:col-span-3 xl:col-span-4"
          href={resolveHomeHref(locale as string)}
        >
          <Logo className="w-full h-auto max-w-3xs" variant={logoVariant as any} />
        </Link>
        <NavigationGroup isOpen={isOpen} setIsOpen={setIsOpen} />
        <Navigation />
      </Section>
      <AnimatePresence mode="wait">
        {isOpen && <Navigation isMobile onClose={handleCloseNav} />}
      </AnimatePresence>
    </>
  )
}

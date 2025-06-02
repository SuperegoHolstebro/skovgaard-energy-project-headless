import Link from 'next/link'
import Heading from '../atoms/Heading'
import Icon from '../atoms/Icons'
import Logo, { LogoProps } from '../atoms/Logo'
import useFooterData from '@repo/utils/hooks/useFooterData'
import { clean } from '@repo/utils/sanitize'
import { useParams } from 'next/navigation'
import Paragraph from '../atoms/Paragraph'
import { Button } from '../atoms/Button'

/**
 *
 * @returns: En footer, der viser virksomhedsoplysninger og links til sociale medier.
 * @example: <Footer />
 * @alias: Footer
 * @summary: Denne komponent bruges til at vise virksomhedsoplysninger og links til sociale medier.
 * @version: 1.0.0
 * @property: []
 * @author: Kasper Buchholtz
 *
 **/


type FooterProps = {
  logoVariant?: LogoProps['variant']
}

export default function Footer({ logoVariant = 'SkovgaardEnergy' }: FooterProps) {
  const locale = useParams().locale
  const data = useFooterData(locale) as any
  const social = data?.social
  const about = data?.about
  const companyName = data?.object?.companyName
  const gridCols =
    'xs:grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-24 2xl:grid-cols-24'
  const gridGap = 'gap-4 xs:gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6'
  const paddingX = 'px-4 xs:px-4 sm:px-13 md:px-24 lg:px-19 xl:px-36 2xl:px-52'
  const paddingY = 'pt-[15vw] sm:pt-[5vw]'

  return (
    <footer
      className={`${gridCols} ${gridGap} ${paddingX} ${paddingY} grid pb-20 text-primary bg-primary/10 *:mx-auto md:*:mx-0 xs:gap-y-8`}
    >
      {/* Column one */}
      <div className="col-span-full sm:col-span-full md:col-span-6 lg:col-span-4 xl:col-span-8">
        <div className="">
          <Link className="" href="/" title="">
            <Logo className="w-full h-auto max-w-3xs" variant={logoVariant as any} />
          </Link>
        </div>
        <ul className="flex flex-wrap justify-center mx-auto mt-8 max-w-64 md:mx-0 gap-x-3 gap-y-2 md:justify-start">
          <li>Find os her: </li>
          {social?.map((item: any, index: number) => (
            <li key={index}>
              <Link
                className="fill-primary *:size-6 hover:fill-secondary transition-colors"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <Icon className="" type={clean(item.platform)} />
                <span className="sr-only">{item.platform}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column two */}
      <div className=" col-span-full sm:col-span-full md:col-span-6 lg:col-span-4 xl:col-span-8">
        <div className="pb-4 *:mx-auto md:*:mx-0">

          <Heading
            className="text-center text-primary md:text-left"
            tag='h5'
            size='sm'
            spacing='none'>
            Skovgaard Energy
          </Heading>
        </div>
        <div className="space-y-2 text-center md:text-left">
          <Paragraph>
            {data?.object?.adressBook.street}
            <br />
            {data?.object?.adressBook.zip}
            <br />
            <br />
            {data?.object?.cvr && 'CVR.  ' + data?.object?.cvr}
            <br />
          </Paragraph>
        </div>
      </div>

      {/* Column Four */}
      <div className=" col-span-full sm:col-span-full md:col-span-full lg:col-span-4 xl:col-span-8">
        <div className="pb-4 *:mx-auto md:*:mx-0">
          {about && about?.title && (
            <Heading
              className="text-center text-primary md:text-left"
              spacing='none'
              tag="h5"
              size="sm"
            >
              {about?.title}
            </Heading>
          )}
        </div>
        <div className="space-y-3 text-center md:text-left">
          {about?.description && (
            <Paragraph size="regular" spacing="none">
              {about?.description}
            </Paragraph>
          )}
          {about?.link.label && (
            <Button link={about?.link}>
              <span>{about?.link?.label}</span>
            </Button>
          )}
        </div>
      </div>
      <div className="space-y-6 col-span-full">
        <div className="hidden w-full h-px sm:block bg-primary/40"></div>
        <div className="flex flex-col justify-between gap-1 text-center sm:text-left sm:flex-row sm:justify-between text-[14px] text-skovgaard-turkis  ">
          <p className="transition-all ">{`© ${new Date().getFullYear()} ${companyName}`}</p>
          <a
            className="transition-all hover:text-primary"
            href="/cookiepolitik"
            target="_self"
            rel="noreferrer"
          >
            Cookiepolitik
          </a>
          <p className="relative transition-all group hover:text-primary ">
            <a
              className="before:absolute before:-right-[11px] before:rounded-full before:animate-bounce duration-1000 before:bottom-[5px] before:size-[7px] before:block before:transition-all ease-linear transition-all group-hover:before:bg-superego-green"
              href="https://superego.nu/kontakt/holstebro"
              target="_blank"
              rel="noreferrer"
            >
              Website by
              <span className="transition-all decoration-green ">
                &nbsp;Superego
              </span>
            </a>
          </p>
        </div>
      </div>
    </footer>

  )
}

Footer.ColumnOne = ColumnOne
Footer.ColumnTwo = ColumnTwo
Footer.ColumnThree = ColumnThree
Footer.ColumnFour = ColumnFour
Footer.Legal = Legal

function ColumnOne({ data, className }: any) {
  const social = data?.social
  return (
    <div className={className}>
      <Link title="Gå til forside" className="text-superego-light-base" href="/">
        <Logo className="w-full h-auto max-w-xs" variant='SkovgaardEnergy' />
      </Link>
      <ul className="flex flex-wrap justify-center mx-auto mt-8 max-w-64 md:mx-0 gap-x-4 gap-y-2 md:justify-start">
        {social?.map((item: any, index: number) => (
          <li key={index}>
            <Link
              className="fill-white *:size-6 hover:fill-superego-green transition-colors"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <Icon className="" type={clean(item.platform)} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ColumnTwo({ data, className }: any) {
  const address = data?.object?.adressBook
  const cvr = data?.object?.cvr
  return (
    <div className={className}>
      <div className="pb-4 uppercase ">
        <Heading
          className="text-center text-superego-light-light md:text-left"
          spacing="none"
          tag="h5"
          size="xs"
        >
          Addresse
        </Heading>
      </div>
      <div className="space-y-2 text-center md:text-left">
        <p>
          {address?.street} <br /> {address?.zip}
        </p>
        <p>{cvr}</p>
      </div>
    </div>
  )
}

function ColumnThree({ data, className }: any) {
  const phone = data?.object?.telephone
  const email = data?.object?.email
  return (
    <div className={className}>
      <div className="pb-4 uppercase ">
        <Heading
          className="text-center text-superego-light-light md:text-left"
          spacing="none"
          tag="h5"
          size="xs"
        >
          Kontakt
        </Heading>
      </div>
      <div className="*:block space-y-2 text-center md:text-left">
        <a href={`tel:${phone}`}>{phone}</a>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </div>
  )
}

function ColumnFour({ data, className }: any) {
  const openingHours = data?.openingHours
  return (
    <div className={className}>
      <div className="pb-4 uppercase ">
        <Heading
          className="text-center text-superego-light-light md:text-left"
          spacing="none"
          tag="h5"
          size="xs"
        >
          Åbningstider
        </Heading>
      </div>

      <ul className="space-y-2 text-center md:text-left">
        {openingHours?.map((item: any, listIndex: number) => (
          <li className="text-center md:text-left" key={listIndex}>
            <span>{item.day}</span>
            <span> - </span>
            <span>{item.hours}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Legal({ data }: any) {
  const companyName = data?.object?.companyName
  return (
    <div className="space-y-6 col-span-full">
      <div className="flex flex-col justify-center gap-1 text-center sm:text-left sm:flex-row sm:justify-between text-[14px]">
        <p className="text-[14px]">{`© ${new Date().getFullYear()} ${companyName}`}</p>
        <p className="text-[14px]">
          <Link href="/privacy-policy">Privatlivspolitik</Link>
        </p>
        <p className="text-[14px]">
          <Link href="/cookiepolitik">Cookiepolitik</Link>
        </p>
        <p className="relative text-[14px] ">
          <a
            className="before:absolute before:-right-[11px] before:rounded-full before:animate-bounce duration-1000 before:bottom-[5px] before:size-[7px] before:block  hover:before:bg-superego-green"
            href="https://superego.nu/kontakt/holstebro"
            target="_blank"
            rel="noreferrer"
          >
            Website by
            <span className="transition-all">&nbsp;Superego</span>
          </a>
        </p>
      </div>
    </div>
  )
}

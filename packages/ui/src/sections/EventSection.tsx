import React from 'react'
import Section, { Section_Variants } from './Section'
import Heading from '../atoms/Heading'
import EventCard from '../molecules/EventCard'
import { clean } from '@repo/utils/sanitize'
import { cn } from '@repo/utils/twMerge'

/**
 *
 * @returns: En sektion med events.
 * @example: <EventSection />
 * @alias: EventSection
 * @summary: Denne komponent bruges til at vise en sektion med events.
 * @version: 1.0.0
 * @property: [section, amount]
 * @author: Kasper Buchholtz
 *
 **/

const EventSection = ({ data }: any) => {
  return (
    <>
      <Section data={data}>
        <EventSection.Title section={data} />
        <ul
          className={cn(
            Section_Variants({
              paddingX: 'none',
              paddingTop: 'none',
              paddingBottom: 'none',
              className: 'col-span-full',
            }),
          )}
        >
          <EventSection.All section={data} />
          <EventSection.Manual section={data} />
          <EventSection.Newest section={data} />
        </ul>
      </Section>
    </>
  )
}

export default EventSection

EventSection.Title = Title
EventSection.All = All
EventSection.Manual = Manual
EventSection.Newest = Newest

function Newest({ section }: any) {
  return (
    <>
      {clean(section?.view) === 'newest' && (
        <>{section?.events?.map((event: any, index: number) => <EventCard key={index} event={event} />)}</>
      )}
    </>
  )
}

function Manual({ section }: any) {
  return (
    <>
      {clean(section?.view) === 'manual' && (
        <>{section?.events?.map((event: any, index: number) => <EventCard key={index} event={event} />)}</>
      )}
    </>
  )
}

function All({ section }: any) {
  return (
    <>
      {clean(section?.view) === 'all' && (
        <>{section?.events?.map((event: any, index: number) => <EventCard key={index} event={event} />)}</>
      )}
    </>
  )
}

function Title({ section }: any) {
  return (
    <div className="col-span-full">
      <Heading size="xl">{section.heading}</Heading>
    </div>
  )
}

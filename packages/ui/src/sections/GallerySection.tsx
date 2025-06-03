import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../organisms/Carousel'
import Section from './Section'
import Photo from '../atoms/Photo'
import Paragraph from '../atoms/Paragraph'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../molecules/Modal'
import PlayIcon from '../atoms/PlayIcon'
import Heading from '../atoms/Heading'
import { clean } from '@repo/utils/sanitize'

/**
 *
 * @returns: En sektion med galleri.
 * @example: <GallerySection />
 * @alias: GallerySection
 * @summary: Denne komponent bruges til at oprette en ny sektion med galleri.
: src/components/sections/GallerySection.tsx
 * @version: 1.0.0
 * @property: [section]
 * @author: Kasper Buchholtz
 *
 **/

const GallerySection = ({ data }: any) => {
  return (
    <Section data={data} className='px-4 xs:px-4 sm:px-4 md:px-6 lg:px-6 xl:px-6 2xl:px-6 ' paddingX={'none'}>

      {clean(data.select) === 'media' ? (
        <div className='col-span-full flex gap-6 w-full h-full md:h-screen/1.5 w-full lg:h-screen/1.5 xl:h-screen/1.2 flex-col sm:flex-row'>
          {data?.medie?.map((item: any, index: number) => (
            <div className='basis-full even:basis-full sm:basis-1/2 sm:even:basis-1/2 md:basis-2/5 md:even:basis-3/5 only:!basis-full w-full' key={index}>
              {item?._type === 'videoObject' ? (
                <div className='relative overflow-hidden rounded size-full group'>
                  <Dialog>
                    <Photo image={item?.poster} className='group-hover:scale-110 ease-custom transition-all duration-700' aspectRatio='16/9' />
                    <DialogTrigger className='absolute  z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer'>
                      <PlayIcon />
                      <span className='text-skovgaard-white prose-headings:text-skovgaard-white'>
                        <Heading tag="h5" size="sm"
                          className="mx-auto text-center text-skovgaard-white">
                          {item.title}
                        </Heading>
                      </span>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <video
                          className=""
                          autoPlay
                          controls
                          playsInline
                        >
                          <source src={item?.video?.asset.url} type="video/mp4" />
                        </video>
                        <div className='hidden'>
                          <DialogTitle></DialogTitle>
                          <DialogDescription></DialogDescription>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : null}

              {item?._type === 'image' ? (
                <div className='relative overflow-hidden rounded size-full'>
                  <Photo
                    aspectRatio='4/3'
                    image={item} />
                  {item?.alt ? (
                    <div className='absolute size-full inset-0 bg-gradient-to-t from-primary/60 to-transparent inset-0 z-50 to-45% w-full h-full z-[99] flex items-end justify-start h-full p-4 text-skovgaard-white isolate'>
                      <div className="!text-small text-skovgaard-white md:!text-regular">
                        <Paragraph spacing="none">{item?.alt}</Paragraph>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {clean(data.select) === 'carousel' ? (
        <Carousel
          opts={{
            align: 'start',
          }}
          className="col-span-full overflow-hidden relative"
        >
          <CarouselContent className='w-full h-screen/2 md:h-screen/1.5 w-full lg:h-screen/1.5 xl:h-screen/1.2'>
            {data?.images?.map((image: any, index: number) => (
              <CarouselItem key={index} className="basis-full odd:basis-full sm:basis-1/2 sm:odd:basis-1/2 md:basis-2/5 md:odd:basis-3/5">
                {image?._type === 'image' ? (
                  <div className='relative overflow-hidden text-skovgaard-white rounded size-full'>
                    <Photo
                      image={image} />
                    {image?.alt ? (
                      <div className='absolute size-full inset-0 bg-gradient-to-t from-primary/60 to-transparent inset-0 z-50 to-45% w-full h-full z-[99] flex items-end justify-start h-full p-4 text-skovgaard-white isolate'>
                        <div className="!text-small md:!text-regular">
                          <Paragraph spacing="none">{image?.alt}</Paragraph>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className='relative overflow-hidden rounded size-full !text-skovgaard-white'>
                    <Dialog>
                      <Photo image={image?.poster} className='' />
                      <DialogTrigger className='absolute  z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer'>
                        <PlayIcon />
                        <span className='text-skovgaard-white prose-headings:text-skovgaard-white'>
                          <Heading tag="h5" size="sm"
                            className="mx-auto text-center prose-headings:text-skovgaard-white">
                            {image.alt}
                          </Heading>
                        </span>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <video
                            className=""
                            autoPlay
                            controls
                            playsInline
                          >
                            <source src={image?.video?.asset.url} type="video/mp4" />
                          </video>
                          <div className='hidden'>
                            <DialogTitle></DialogTitle>
                            <DialogDescription></DialogDescription>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className=' absolute bottom-0 right-0 z-10 flex pb-6 pr-6 md:pr-12 xl:pr-32 isolate gap-1.5 '>
            <CarouselPrevious variant="default" className="disabled:bg-transparent disabled:border-transparent disabled:text-secondary disabled:opacity-100  disabled:cursor-not-allowed" />
            <CarouselNext variant="default" className="disabled:bg-transparent disabled:border-transparent disabled:text-secondary disabled:opacity-100 disabled:cursor-not-allowed" />
          </div>

        </Carousel>
      ) : null}

    </Section>
  )
}

export default GallerySection

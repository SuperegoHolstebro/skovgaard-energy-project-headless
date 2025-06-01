import React from 'react'
import Photo from './Photo'
import { SanityImageProps } from './SanityImage'
import PlayIcon from './PlayIcon'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../molecules/Modal'

/**
 *
 * @returns: En Video-komponent til at vise videoer.
 * @example: <Video video={video} thumbnail={thumbnail} showInPopup={true} />
 * @alias: Video
 * @summary: Denne komponent bruges til at vise videoer.
 * @version: 1.5.0
 * @property: [video, thumbnail, popup]
 * @author: Kasper Buchholtz
 *
 **/

export interface VideoProps {
  video: any
  thumbnail: any
  showInPopup?: boolean
  videoThumbnail?: Omit<SanityImageProps, 'image'> // Allow external props except image
}

const Video = ({ video, thumbnail, showInPopup, videoThumbnail, ...props }: VideoProps) => {
  return (
    <div className="relative group h-full overflow-hidden">
      <Photo image={thumbnail} {...props} className='group-hover:scale-110 ease-custom transition-all duration-700' />
      {showInPopup ? <Popup video={video} /> : <VideoPreview video={video} />}
    </div>
  )
}

export default Video

const Popup = ({ video }: any) => (
  <>
    <Dialog>
      <DialogTrigger className='absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer'>
        <PlayIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <video
            className=""
            autoPlay
            controls
            playsInline
          >
            <source src={video?.asset.url} type="video/mp4" />
          </video>
          <div className='hidden'>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    {/* <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="absolute translate-x-1/2 -translate-y-1/2 right-1/2 top-1/2 ">
        <PlayIcon />
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-superego-dark/60 data-[state=open]:animate-overlayShow" />
      <Dialog.Content className="fixed left-1/2 z-50 top-1/2 h-full max-h-screen/1.6 md:max-h-screen/1.2 w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] focus:outline-none data-[state=open]:animate-contentShow">
        <Dialog.Title>{video?.asset?.description}</Dialog.Title>
        <video
          className="absolute inset-0 object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
          aria-label={video?.asset.description}
        >
          <source src={video?.asset.url} type="video/mp4" />
        </video>
        <Dialog.Close asChild>
          <button
            className="absolute right-2.5 top-2.5 inline-flex size-6 appearance-none items-center justify-center rounded-full"
            aria-label="Close"
          >
            <X />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root> */}
  </>
)

const VideoPreview = ({ video }: any) => {
  return (
    <video
      className="absolute inset-0 object-cover w-full h-full"
      autoPlay
      loop
      muted
      playsInline
      aria-label={video?.asset?.description}
    >
      <source src={video?.asset?.url} type="video/mp4" />
    </video>
  )
}

import groq from 'groq'
export const LogoGallery2Query = groq`
    _type == 'LogoGallery2' => {
    ...,
    // images[]{
    //         image{
    //     ...,
    //     "altText": asset->altText,
    //     "description": asset->description,
    //     "title": asset->title,
    //   }
    // },
  }`

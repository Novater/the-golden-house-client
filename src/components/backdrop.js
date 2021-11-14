import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function Backdrop({ image }) {
  if (!image) return null
  return (
    <LazyLoadImage
      src={image.default}
      className="banner-img"
      effect="opacity"
      alt="banner"
    />
  )
}

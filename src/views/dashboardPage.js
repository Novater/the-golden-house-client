import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function DashboardPage({ backgroundImage }) {
  function renderBackdrop(image) {
    if (!image) return null
    return (
      <LazyLoadImage
        src={image.default}
        className="banner-img"
        effect="opacity"
        alt="banner"
        style={{ zIndex: -1 }}
      />
    )
  }

  return (
    <>
      <div className="dashboard-container">Coming soon...</div>
      {renderBackdrop(backgroundImage)}
    </>
  )
}

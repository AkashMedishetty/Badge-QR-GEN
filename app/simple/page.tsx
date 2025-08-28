export default function SimplePDFViewer() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      willChange: 'transform',
      contain: 'layout style paint'
    }}>
      <iframe
        src="/brochure.pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH&zoom=50"
        style={{
          width: '100vw',
          height: '100vh',
          border: 'none',
          margin: 0,
          padding: 0,
          willChange: 'transform',
          contain: 'layout style paint',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden'
        }}
        title="Event Brochure"
        loading="eager"
        allow="fullscreen"
      />
    </div>
  )
}

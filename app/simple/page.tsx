export default function SimplePDFViewer() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <iframe
        src="/api/pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH&zoom=50"
        style={{
          width: '100vw',
          height: '100vh',
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="Event Brochure"
      />
    </div>
  )
}

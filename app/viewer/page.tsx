'use client'

import { useEffect, useState } from 'react'

export default function LightweightViewer() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setError('PDF is taking too long to load. Please try again.')
        setLoading(false)
      }
    }, 15000) // 15 second timeout

    return () => clearTimeout(timeout)
  }, [loading])

  if (loading) {
    return (
      <div className="pdf-container">
        <div className="pdf-loading">
          <div className="loading-spinner"></div>
          <h1>Loading Event Brochure...</h1>
          <p>Optimizing for mobile viewing...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pdf-container">
        <div className="pdf-error">
          <h1>Event Brochure</h1>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              background: '#0070f3',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pdf-container">
      <iframe
        src="/api/pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH&zoom=50"
        className="pdf-viewer"
        title="Event Brochure"
        onLoad={() => setLoading(false)}
        onError={() => setError('Failed to load PDF. Please try again.')}
        style={{
          width: '100vw',
          height: '100vh',
          border: 'none',
          background: 'white'
        }}
      />
    </div>
  )
}

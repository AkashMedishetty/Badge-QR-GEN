'use client'

import { useEffect, useState } from 'react'

export default function PDFViewer() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simple timeout
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 5000) // 5 second timeout

    return () => clearTimeout(timeout)
  }, [])

  if (loading) {
    return (
      <div className="pdf-container">
        <div className="pdf-loading">
          <div className="loading-spinner"></div>
          <h1>Loading Event Brochure...</h1>
          <p>Please wait while we load the brochure for you.</p>
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
        onError={() => setError('Failed to load PDF. Please try again.')}
      />
    </div>
  )
}

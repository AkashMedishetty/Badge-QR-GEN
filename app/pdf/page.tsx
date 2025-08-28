'use client'

import { useEffect, useState } from 'react'

export default function PDFViewer() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Detect iOS devices (including Chrome on iOS)
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    
    // Check for iOS in user agent (covers Safari, Chrome, Firefox, etc. on iOS)
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream
    
    // Additional iOS detection methods
    const isIOSByPlatform = /iPad|iPhone|iPod/.test(navigator.platform)
    const isIOSByTouchPoints = navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform)
    
    // Check if it's Chrome on iOS (Chrome on iOS has PDF iframe limitations)
    const isChromeOnIOS = /CriOS/.test(userAgent) || (/Chrome/.test(userAgent) && /iPad|iPhone|iPod/.test(userAgent))
    
    const isIOS = isIOSDevice || isIOSByPlatform || isIOSByTouchPoints || isChromeOnIOS
    setIsIOS(isIOS)

    // Simple timeout
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 2000) // 2 second timeout

    return () => clearTimeout(timeout)
  }, [])

  const handleIOSDownload = () => {
    // Download PDF directly on iOS - works in all browsers
    const link = document.createElement('a')
    link.href = '/api/pdf'
    link.download = 'Event Brochure.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleIOSView = () => {
    // Open PDF in new tab for iOS - works in all browsers
    window.open('/api/pdf', '_blank')
  }

  if (loading) {
    return (
      <div className="pdf-container">
        <div className="pdf-loading">
          <div className="loading-spinner"></div>
          <h1>Loading Event Brochure...</h1>
          <p>Optimizing for your device...</p>
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
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // iOS-specific rendering - try iframe first, fallback to buttons if needed
  if (isIOS) {
    return (
      <div className="pdf-container">
        <iframe
          src="/brochure.pdf"
          className="pdf-viewer"
          title="Event Brochure"
          onLoad={() => setLoading(false)}
          onError={() => {
            // If iframe fails, show the button interface
            setError('iframe-failed')
          }}
          style={{
            width: '100vw',
            height: '100vh',
            border: 'none',
            background: 'white'
          }}
        />
        {error === 'iframe-failed' && (
          <div className="ios-pdf-container">
                      <div className="ios-pdf-header">
            <h1>Event Brochure</h1>
            <p>Download the PDF to view all pages with full functionality</p>
          </div>
          
          <div className="ios-pdf-preview">
            <div className="pdf-icon">📄</div>
            <h2>Event Brochure.pdf</h2>
            <p>Download to view all pages with full functionality</p>
          </div>

          <div className="ios-button-group">
            <button 
              onClick={handleIOSDownload}
              className="ios-view-button"
            >
              📥 Download PDF
            </button>
            
            <button 
              onClick={handleIOSView}
              className="ios-view-button ios-view-button-secondary"
            >
              Open in New Tab
            </button>
          </div>

          <div className="ios-instructions">
            <h3>Best Experience on iOS:</h3>
            <ul>
              <li><strong>📥 Download PDF:</strong> Get the full PDF with all pages (recommended)</li>
              <li><strong>Open in New Tab:</strong> View in browser (may show only first page)</li>
              <li>Downloaded PDF opens in your default PDF app</li>
              <li>Full zoom, scroll, and navigation features</li>
              <li>Works offline after download</li>
              <li>No browser limitations</li>
            </ul>
          </div>
          </div>
        )}
      </div>
    )
  }

  // Non-iOS rendering with iframe
  return (
    <div className="pdf-container">
      <iframe
        src="/brochure.pdf"
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

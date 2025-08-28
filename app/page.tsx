'use client'

import { useEffect, useState } from 'react'

export default function PDFViewer() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
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

  const handleIOSView = () => {
    // Open PDF in new tab for iOS - works in all browsers
    window.open('/api/pdf', '_blank')
  }

  const handleDirectView = () => {
    // Direct navigation to PDF - works in all browsers
    window.location.href = '/api/pdf'
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
            <p>iOS browsers have PDF viewing limitations. Choose your preferred method:</p>
          </div>
            
            <div className="ios-pdf-preview">
              <div className="pdf-icon">📄</div>
              <h2>Event Brochure.pdf</h2>
              <p>Select your preferred viewing method</p>
            </div>

            <div className="ios-button-group">
              <button 
                onClick={handleIOSView}
                className="ios-view-button"
              >
                Open in New Tab
              </button>
              
              <button 
                onClick={handleDirectView}
                className="ios-view-button ios-view-button-secondary"
              >
                View in Current Tab
              </button>
            </div>

            <div className="ios-instructions">
              <h3>Why This Happens:</h3>
              <ul>
                <li><strong>iOS Limitation:</strong> Chrome, Safari, and other iOS browsers can't display full PDFs in iframes</li>
                <li><strong>New Tab:</strong> Opens PDF in a new tab (recommended)</li>
                <li><strong>Current Tab:</strong> Replaces this page with the PDF</li>
                <li>Use pinch-to-zoom to navigate</li>
                <li>Scroll vertically to read all pages</li>
                <li>This is normal behavior for iOS browsers</li>
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

'use client'

import { useEffect, useState } from 'react'

export default function PDFViewer() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Comprehensive iOS detection
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    const platform = navigator.platform || ''
    
    // Multiple iOS detection methods
    const isIOSUserAgent = /iPad|iPhone|iPod/.test(userAgent)
    const isIOSPlatform = /iPad|iPhone|iPod/.test(platform)
    const isIOSVendor = /iPad|iPhone|iPod/.test(navigator.vendor || '')
    
    // Check for iOS-specific features
    const hasIOSFeatures = (
      'ontouchend' in document ||
      navigator.maxTouchPoints > 1 ||
      /MacIntel/.test(platform) && navigator.maxTouchPoints > 1
    )
    
    // Check for specific iOS browsers
    const isSafariIOS = /Safari/.test(userAgent) && /iPad|iPhone|iPod/.test(userAgent)
    const isChromeIOS = /CriOS/.test(userAgent) || (/Chrome/.test(userAgent) && /iPad|iPhone|iPod/.test(userAgent))
    const isFirefoxIOS = /FxiOS/.test(userAgent)
    const isEdgeIOS = /EdgiOS/.test(userAgent)
    
    // Final iOS detection
    const isIOS = isIOSUserAgent || isIOSPlatform || isIOSVendor || 
                  (hasIOSFeatures && (isSafariIOS || isChromeIOS || isFirefoxIOS || isEdgeIOS))
    
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

  // iOS-specific rendering - show download interface directly
  if (isIOS) {
    return (
      <div className="pdf-container">
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
      </div>
    )
  }

  // Fallback for iOS if detection fails - show download interface
  if (error === 'ios-fallback') {
    return (
      <div className="pdf-container">
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
      </div>
    )
  }

  // Legacy iOS fallback (if iframe fails)
  if (error === 'iframe-failed') {
    return (
      <div className="pdf-container">
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
        onError={() => {
          // If iframe fails on what might be iOS, show download interface
          const userAgent = navigator.userAgent || ''
          if (/iPad|iPhone|iPod/.test(userAgent)) {
            setError('ios-fallback')
          } else {
            setError('Failed to load PDF. Please try again.')
          }
        }}
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

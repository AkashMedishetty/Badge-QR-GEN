'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function AdminPage() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')

  useEffect(() => {
    // Get the current domain
    const currentUrl = window.location.origin
    setQrCodeUrl(currentUrl)
    
    // Generate QR code
    QRCode.toDataURL(currentUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }).then(setQrCodeDataUrl)
  }, [])

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>QR Badge Brochure System</h1>
        <p>Simple PDF viewer for event badges</p>
      </div>

      <div className="qr-section">
        <h2>QR Code for Badges</h2>
        <p>Use this QR code on your event badges. It will always point to the current brochure.</p>
        
        {qrCodeDataUrl && (
          <div className="qr-code">
            <img src={qrCodeDataUrl} alt="QR Code" />
          </div>
        )}
        
        <div className="qr-url">
          <strong>URL:</strong> {qrCodeUrl}
        </div>
        
        <div style={{ marginTop: '2rem', textAlign: 'left' }}>
          <h3>How to update the brochure:</h3>
          <ol style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
            <li>Replace the file <code>public/brochure.pdf</code> with your new brochure</li>
            <li>Deploy the updated app to Vercel</li>
            <li>The QR code will automatically show the new brochure</li>
            <li>No need to reprint badges - the QR code stays the same!</li>
          </ol>
        </div>
      </div>

      <div className="upload-section">
        <h2>Current Setup</h2>
        <p>Your app is configured to serve the PDF file located at:</p>
        <div className="qr-url">
          <code>public/brochure.pdf</code>
        </div>
        <p style={{ marginTop: '1rem' }}>
          To update the brochure, simply replace this file and redeploy to Vercel.
        </p>
      </div>
    </div>
  )
}

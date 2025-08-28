import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(request: NextRequest) {
  try {
    // Path to your PDF file - you can place your brochure PDF here
    const pdfPath = join(process.cwd(), 'public', 'brochure.pdf')
    
    // Read the PDF file
    const pdfBuffer = await readFile(pdfPath)
    
    // Get range header for partial content support
    const range = request.headers.get('range')
    
    if (range) {
      // Handle range requests for better mobile loading
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : pdfBuffer.length - 1
      const chunksize = (end - start) + 1
      const chunk = pdfBuffer.slice(start, end + 1)
      
      return new NextResponse(chunk, {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${pdfBuffer.length}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize.toString(),
          'Content-Type': 'application/pdf',
        },
      })
    }
    
    // Return the PDF with proper headers for mobile optimization
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=86400',
        'Content-Length': pdfBuffer.length.toString(),
        'Accept-Ranges': 'bytes',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Error serving PDF:', error)
    return new NextResponse('PDF not found', { status: 404 })
  }
}

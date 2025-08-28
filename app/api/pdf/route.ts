import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Try multiple possible paths for the PDF file
    const possiblePaths = [
      join(process.cwd(), 'public', 'brochure.pdf'),
      join(process.cwd(), 'brochure.pdf'),
      join(process.cwd(), 'app', 'public', 'brochure.pdf'),
      '/tmp/brochure.pdf', // Vercel temp directory
    ]
    
    let pdfBuffer: Buffer | null = null
    let pdfPath = ''
    
    // Try to read from each possible path
    for (const path of possiblePaths) {
      try {
        pdfBuffer = await readFile(path)
        pdfPath = path
        break
      } catch (error) {
        // Continue to next path
        continue
      }
    }
    
    if (!pdfBuffer) {
      console.error('PDF not found in any of the expected locations:', possiblePaths)
      return new NextResponse('PDF not found', { status: 404 })
    }
    
    // Get range header for partial content support
    const range = request.headers.get('range')
    
    if (range) {
      // Handle range requests for better mobile loading
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : pdfBuffer.length - 1
      const chunksize = (end - start) + 1
      const chunk = pdfBuffer.slice(start, end + 1)
      
      return new NextResponse(chunk as any, {
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
    return new NextResponse(pdfBuffer as any, {
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

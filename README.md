# QR Badge Brochure Viewer

A simple Next.js app that serves a PDF brochure via QR code for event badges.

## Features

- **Direct PDF viewing**: No download required, PDF opens directly in browser
- **Mobile-friendly**: Responsive design that works on all devices
- **No borders or scroll bars**: Clean, full-screen PDF viewing experience
- **Static QR code**: Same QR code works forever, just update the PDF file
- **Easy updates**: Replace the PDF file and redeploy to update the brochure

## How it works

1. The app serves a PDF file from `public/brochure.pdf`
2. QR codes point to your domain (e.g., `https://your-app.vercel.app`)
3. When scanned, the QR code opens the PDF directly in the browser
4. To update the brochure, simply replace `public/brochure.pdf` and redeploy

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your brochure:**
   - Replace `public/brochure.pdf` with your event brochure PDF

3. **Deploy to Vercel:**
   ```bash
   npm run build
   ```
   - Connect your GitHub repo to Vercel
   - Deploy automatically

4. **Get your QR code:**
   - Visit `https://your-app.vercel.app/admin`
   - Copy the QR code for your badges

## File Structure

```
├── app/
│   ├── page.tsx          # Main PDF viewer page
│   ├── admin/page.tsx    # Admin page with QR code
│   ├── api/pdf/route.ts  # API endpoint to serve PDF
│   └── layout.tsx        # App layout
├── public/
│   └── brochure.pdf      # Your event brochure (replace this)
└── package.json
```

## Updating the Brochure

1. Replace `public/brochure.pdf` with your new brochure
2. Commit and push to GitHub
3. Vercel will automatically redeploy
4. The same QR code will now show the updated brochure

## Customization

- **Domain**: The QR code automatically uses your current domain
- **Styling**: Modify `app/globals.css` for different colors/layouts
- **PDF name**: Change the filename in `app/api/pdf/route.ts` if needed

## Mobile Optimization

The app is fully responsive and optimized for mobile devices:
- Full-screen PDF viewing
- No browser UI elements
- Touch-friendly interface
- Fast loading times

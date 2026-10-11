# Asqar Islyamov Memorial Website

This is a multilingual (Kazakh/Russian/English) memorial and educational website dedicated to Asqar Islyamov.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Runtime:** Node.js 20.16 or newer (Node.js 22 recommended)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

## Getting Started

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `src/app/[locale]`: Pages and layouts for each locale (kz/ru/en).
- `src/components`: Reusable UI components.
- `src/content`: Static content files (TypeScript).
- `src/lib`: Utilities (i18n).
- `public`: Static assets (images, PDFs).

## Internationalization

The project uses a path-based internationalization strategy (`/kz`, `/ru`, `/en`).
Content is stored in `src/content` and loaded based on the current locale.
`src/proxy.ts` redirects to the default locale (`kz`) when none is specified, preserving query parameters. The URL prefix stays `/kz`; HTML and SEO language tags use `kk`.

## Validation

```bash
npm run lint
npm run typecheck
npm audit --omit=dev
npm run build
npm run start
```

With the production server running, `npm run test:smoke` checks all 42 pages, metadata, the sitemap, redirects, missing pages, PDF responses, and books without digital editions. Set `BASE_URL` to test a different local port.

The PDF worker is bundled locally. PDF character maps and standard fonts are loaded from versioned PDF.js resources on unpkg. Google Fonts are downloaded during the production build.

## Deployment

Production: [askarislyamov.kz](https://askarislyamov.kz/). Repository: [naimaaan/askar_islyamov](https://github.com/naimaaan/askar_islyamov).
Vercel builds the Next.js app from the repository. Review and publish changes through the existing Git workflow. Local preview does not update production.

`next.config.ts` also generates a standalone Node.js bundle. A self-hosted standalone deployment must include `public` and `.next/static`; Vercel handles these assets automatically.

## Archive materials added in October 2026

`src/content/archive-materials.ts` contains 26 photographs, newspaper clippings and document sheets extracted from the supplied 28-page `фото.pdf`, with captions in all three languages and source page numbers. Sixteen repeated images or articles were excluded after comparison with the existing gallery, including articles already present in `газет.jpeg`. The gallery has a **New materials** filter and links to full-resolution images.

The memoir **Өткен өмір естеліктері** now uses the supplied 151-page electronic PDF at `/pdf/otken-omir.pdf` (1.2 MB). The previous PDF address also serves this electronic edition to preserve existing links. The book bytes are copied unchanged. The CDR cover was converted locally with libcdr; the front panel is stored at `public/images/books/otken-omir-cover.webp`. The unavailable Academy.kz font is replaced with Times New Roman, with the original lettering, line breaks, portrait and landscape retained.

Temporary inspection files and the original scan backup are in ignored `tmp/pdfs/materials-2026-10-11/`; they are not website assets.

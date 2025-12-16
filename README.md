# Asqar Islyamov Memorial Website

This is a multilingual (Russian/Kazakh) memorial and educational website dedicated to Asqar Islyamov.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `src/app/[locale]`: Pages and layouts for each locale (ru/kz).
- `src/components`: Reusable UI components.
- `src/content`: Static content files (TypeScript).
- `src/lib`: Utilities (i18n).
- `public`: Static assets (images, PDFs).

## Internationalization

The project uses a path-based internationalization strategy (`/ru`, `/kz`).
Content is stored in `src/content` and loaded based on the current locale.
Middleware handles redirection to the default locale (`ru`) if none is specified.

## Deployment

The project is ready for deployment on Vercel or any other Next.js hosting provider.
Run `npm run build` to build the project for production.

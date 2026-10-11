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

With the local server running, `npm run test:smoke` checks all 57 pages, metadata, the sitemap, navigation, redirects, missing pages, PDF responses, news media and video range responses, and books without digital editions. It also checks the consolidated news feed, document carousel and meeting photographs without visible captions. Set `BASE_URL` to test a different local port.

The PDF worker is bundled locally. PDF character maps and standard fonts are loaded from versioned PDF.js resources on unpkg. Google Fonts are downloaded during the production build.

## Deployment

Production: [askarislyamov.kz](https://askarislyamov.kz/). Repository: [naimaaan/askar_islyamov](https://github.com/naimaaan/askar_islyamov).
Vercel builds the Next.js app from the repository. Review and publish changes through the existing Git workflow. Local preview does not update production.

`next.config.ts` also generates a standalone Node.js bundle. A self-hosted standalone deployment must include `public` and `.next/static`; Vercel handles these assets automatically.

## Archive materials added in October 2026

`src/content/archive-materials.ts` contains 26 photographs, newspaper clippings and document sheets extracted from the supplied 28-page `фото.pdf`, with captions in all three languages and source page numbers. Sixteen repeated images or articles were excluded after comparison with the existing gallery, including articles already present in `газет.jpeg`. All additions are integrated into the gallery's thematic albums, with links to full-resolution images.

The gallery has five themes: family and life, teaching, public activity, documents and publications, and memory and legacy. The last album contains present-day memorial classrooms, exhibitions and commemorative events. Historical classroom and staff photographs belong to teaching; newspaper pages and certificates belong to documents. `src/content/gallery-sequence.ts` defines the shared viewing order for all three languages, placing related photographs and publications together. The homepage retains its existing preview selection.

The gallery contains 106 materials after removing five repeated entries: two byte-identical copies of the memorial display and college gathering, plus smaller copies of the classroom discussion, assembly-hall address and teachers' congress (640 pixels wide versus the retained 827-pixel versions). Nine existing photographs use more detailed source versions from the supplied PDF, copied byte-for-byte into `public/images/archive-originals/`. These replace the corresponding gallery entries without adding copies; original files remain available at their previous addresses.

The memoir **Өткен өмір естеліктері** now uses the supplied 151-page electronic PDF at `/pdf/otken-omir.pdf` (1.2 MB). The previous PDF address also serves this electronic edition to preserve existing links. The book bytes are copied unchanged. The CDR cover was converted locally with libcdr; the front panel is stored at `public/images/books/otken-omir-cover.webp`. The unavailable Academy.kz font is replaced with Times New Roman, with the original lettering, line breaks, portrait and landscape retained.

Temporary inspection files and the original scan backup are in ignored `tmp/pdfs/materials-2026-10-11/`; they are not website assets.

## News and event reports

`src/content/news.ts` is the shared publication registry for `/ru/news/`, `/kz/news/` and `/en/news/`. Each entry has a stable slug, category, event date (optional), translated title, summary and paragraphs, photographs and an optional video. `showPhotoCaptions: false` hides photo captions in both the article and lightbox while preserving accessible image descriptions. Add an entry and its media to publish another story; the feed, related stories, homepage preview and sitemap derive from this registry. Publication is currently managed through the repository; there is no browser administration panel.

The three main publications cover the college classroom opening in 2021, the school geography classroom opening in 2022 and the district geography olympiad in 2025. The college story also covers subsequent activity, including the 2025 educational session and its video. An undated meetings page retains its six photographs without visible captions and appears below the main stories. Supporting invitations, programmes and the essay collection cover are in `newsDocuments`, displayed as a horizontal strip of cards with short captions and an image lightbox; they have no standalone article pages. Several cards are visible at once. The strip moves slowly while visible, pauses on hover, focus or interaction, and supports touch scrolling, mouse dragging and keyboard arrows. Automatic motion is disabled for reduced-motion preferences. The geography plaque is embedded after the opening paragraph of the school classroom article, in a compact inset about the teacher’s name, with an optional enlarged view.

Images are in `public/images/news/`; the three H.264/AAC videos in `public/videos/news/` use fast-start MP4 and load when played. Sixteen unique supplied photographs were imported, `IMG_1354.JPG` reuses `/images/колледж7.jpeg`, and the byte-identical `IMG_1367.JPG` copy of `IMG_1361.JPG` was omitted. Three video stills serve as posters. Original source files are unchanged.

Documents use individual `frame` settings: the collection cover and photographed programmes are cropped to the document and corrected for perspective; the article's plaque inset excludes technical dimension markings. Digital invitations retain their complete layout. `FramedPhoto` applies a CSS projective transform from four source-image corners, also used when opening an image in the lightbox. Printed text and portraits retain the original pixels. The cards follow the document's proportions rather than adding blurred backgrounds or padding. The original-image link remains available in the lightbox.

The user confirmed that the existing biographical chronology is authoritative: the college classroom opened in **2021**, and the school geography classroom in **2022**. The supplied invitation's **29 April 2024** date is retained as a document date, without redefining the school classroom's founding year. Photographs without event dates remain an undated photo journal; videos are not given unsupported precise dates. Event programmes are described as programmes of events, not academic curricula.

The essay contest is a News publication at `/[locale]/news/pedagogical-essay-contest/`. `ContestReport` retains the 2023–2025 history, six 2024 winners, three event photographs, video and original results link. The first group photograph is the clickable article cover. The scholarship certificate dated 2021 is placed in the college story, after the scholarship paragraph. The contest's 11–12 December 2024 dates, essay theme and awards are supported by the linked official education department report; media filenames are not used to infer dates. Results precede the photo journal and historical timeline. The old `/[locale]/contest/` address permanently redirects to the publication (308) and is excluded from the sitemap.

Full classroom institution names are used in all three languages, including the news sidebar, article headings, summaries and relevant biographical chronology. `src/content/institutions.ts` holds the display names: Абай атындағы Шығыс Қазақстан гуманитарлық колледжі and Тарбағатай ауданы Ақжар ауылының Абай атындағы орта мектебі, with Russian and English translations.

The header links to News and highlights the active section in desktop and mobile navigation. Contacts in the footer opens the existing contact page. News filters use `?category=` and survive browser navigation, article return links and language changes. Supporting documents and the history sidebar appear in the full feed; on mobile the history follows the publications. Explicit translated month names keep dates consistent between browser and server. Article sections distinguish classroom founding from later activity, without changing the authoritative 2021/2022 chronology.

News photographs retain their supplied proportions; clicking an article cover opens the full image. The contest video uses its native 4:3 frame, portrait videos have a narrower player, and lightbox captions sit below the image. The meetings page keeps all six photographs without visible captions. Documents use short strip captions and fuller context in the enlarged view, including the distinction between the 2024 invitation date and the school classroom's 2022 founding year.

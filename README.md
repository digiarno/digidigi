# Lukkan.fi — Next.js Jamstack

Suomenkielinen markkinointisivusto terassilaseille, lasiterasseille, parvekelasitukselle ja kaiteille. Rakennettu Next.js App Routerilla (SSG-sivut + serverless API-reitit), Tailwind CSS v4 ja TypeScript.

WordPress-hintalaskuri säilyy kansiossa [`lukkan-hintalaskuri/`](lukkan-hintalaskuri/README.md).

## SSG vs API-reitit (ei `output: 'export'`)

**Emme käytä** `output: 'export'`. Staattinen HTML-export estää Route Handlerit (`app/api/*`), joten se ei sovi yhteydenottolomakkeelle eikä Lukkan Studion visualisoijalle.

Vercel-natiivinen malli:

| Osa | Tapa | Miksi |
| --- | --- | --- |
| Markkinointisivut (`/`, `/tuotteet`, `/blogi`, …) | Staattinen generointi, `generateStaticParams`, `generateMetadata` | Nopein TTFB, CDN-cache |
| `/api/contact`, `/api/visualize` | Serverless Route Handlers | Lomake ja tekoäly vaativat palvelimen |
| `robots.ts`, `sitemap.ts` | App Router metadata-reitit | Dynaaminen kanoninen domain envistä |

Paikallisesti `next build` tuottaa staattiset sivut ja lambda-yhteensopivat API-reitit. Vercel havaitsee Next.js-projektin ilman erillistä `vercel.json`-tiedostoa.

## Pikakäynnistys

```bash
cp .env.example .env.local
npm install
npm run dev
```

Avaa [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # tuotantobuild
npm run start   # palvele buildia
npm run lint
```

## Ympäristömuuttujat

Kaikki avaimet ovat `.env.example`-tiedostossa. Älä commitoi `.env.local`-tiedostoa.

| Muuttuja | Käyttö |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Kanoniset URL:t, sitemap, Open Graph, JSON-LD |
| `NEXT_PUBLIC_COOKIEYES_ID` | CookieYes GDPR-banneri, ladataan **ensimmäisenä** `<head>`-osassa |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (`afterInteractive`) |
| `NEXT_PUBLIC_GA4_ID` | GA4, jos ei kulje GTM:n kautta |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel |
| `NEXT_PUBLIC_CHAT_WIDGET_URL` | HubSpot/Zendesk-chat, lazy client-komponentti |
| `NEXT_PUBLIC_CONTACT_RECEIVER` | Tarjouspyyntöjen vastaanottaja (ei kovakoodattuja sähköposteja) |
| `RESEND_API_KEY` | Sähköposti. Tyhjä = stub/demo |
| `RESEND_FROM_EMAIL` | Resend From (verifioitu domain) |
| `REPLICATE_API_TOKEN` | Lukkan Studio. Tyhjä = mock-demo |
| `REPLICATE_MODEL_VERSION` | Flux/SD inpainting -malli |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Jälleenmyyjäkartta. Tyhjä = lista + placeholder |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | Hero-videon mp4. Tyhjä = staattinen poster |

## CookieYes, GTM ja suorituskyky

CookieYes **täytyy** olla HTML `<head>`-osan ensimmäinen seurantaskripti (EU/GDPR). Siksi `app/layout.tsx` lisää raa'an `<script>`-tagin `<head>`-elementin ensimmäiseksi lapseksi. `next/script` `beforeInteractive` injektoi skriptin alkuperäiseen HTML:ään ennen hydraatiota, mutta Next ei takaa, että se on kirjaimellisesti ensimmäinen `head`-solmu. Raaka tagi on tarkoituksellinen.

GTM, GA4 ja Meta Pixel käyttävät `afterInteractive`-strategiaa, jotta ne eivät estä LCP:tä. Chat-widget (`components/layout/ChatWidget.tsx`) ladataan viiveellä ja kuuntelee `cookieyes_consent_update`-tapahtumaa, jos banneri on käytössä.

## Sisällön muokkaus (ei JSX-copya)

Kaikki markkinointitekstit, tuotteet ja blogit ovat konfiguraatiossa:

```
config/
  site.ts              # brändi, osoite, puhelin, URL-helper
  site-content.ts      # navigaatio, herot, FAQ, lomake, UI-copy
  products.ts          # tuotearray → /tuotteet/[slug]
  blog.ts              # artikkelit → /blogi/[slug]
  resellers.json       # jälleenmyyjät
  postal-centroids.ts  # FI-postinumeroiden centroidit (Haversine)
  types.ts
```

**Uusi tuote:** lisää objekti `config/products.ts`-arrayhin. `featured: true` näyttää sen `/tuotteet`-ruudukossa. Uutta sivutiedostoa ei tarvita.

**Uusi blogi:** lisää objekti `config/blog.ts`-arrayhin.

`lib/cms.ts` on ohut adapteri. Nykyään se lukee paikallisen konfigin. Sanity/Contentful kytketään vaihtamalla tämän tiedoston sisäosat — sivut jäävät ennalleen.

## Palveluiden vaihto

| Tarve | Tiedosto | Vaihto |
| --- | --- | --- |
| Sähköposti | `lib/services/email.ts` | Resend → Mailchimp/HubSpot/Salesforce |
| Tekoälyvisualisointi | `lib/services/visualizer.ts` | Mock → Replicate SDK (`REPLICATE_API_TOKEN`) |
| Headless CMS | `lib/cms.ts` | Paikallinen config → Sanity/Contentful |
| GDPR-loki | kommentti `email.ts`:ssä | Google Sheets tai Supabase |

## Mediat

- Brändi- ja tuotekuvat: `public/` (WebP/SVG). `next/image` hoitaa koot ja lazy loadin.
- Hero-video: aseta `NEXT_PUBLIC_HERO_VIDEO_URL` tai pudota mp4 ja päivitä env. Ilman videota käytetään `public/images/hero-poster.svg`.
- Blogikuvat tuotannossa: pidä kevyet tiedostot `public/images/`-kansiossa **tai** siirrä Vercel Blobille ja lisää hostname `next.config.ts` `images.remotePatterns`-listaan (`**.public.blob.vercel-storage.com` on valmiina).

Nykyiset tuotekuvat ovat kevyitä SVG-placeholderia. Korvaa ne valokuvilla pitämällä samat polut tai päivitä `imageSrc` tuote-/blogiobjekteissa.

## Reitit

- `/` etusivu (hero, tuotteet, luottamus, FAQ, tarjouspyyntö)
- `/tuotteet` ruudukko
- `/tuotteet/[slug]` dynaaminen tuote
- `/jalleenmyyjat` haku + kartta
- `/lukkan-studio` AI-visualisoija
- `/blogi`, `/blogi/[slug]`
- `/yhteystiedot` tarjouspyyntö
- `/api/contact` POST
- `/api/visualize` POST
- `/sitemap.xml`, `/robots.txt`

## Vercel + GitHub

1. Tuo GitHub-repositorio Verceliin.
2. Framework preset: Next.js (automaattinen). **Älä** kytke static exportia.
3. Lisää env-muuttujat Production/Preview-ympäristöihin.
4. Deploy. Markkinointisivut syntyvät buildissa, API-reitit serverless-funktioina.

## Kansiorakenne

```
app/                 # App Router -sivut ja API
components/          # UI, layout, sections
config/              # muokattava sisältö
lib/                 # cms, geo, schema, services
public/              # logot, badge, placeholder-kuvat
lukkan-hintalaskuri/ # WordPress-upote (erillinen)
```

## Suunnittelukieli

Charcoal/navy, lasimainen navigaatio, Inter + IBM Plex Serif, Avainlippu- ja DSS-tunnukset, vihreä CTA (`#9DCF58`). Mobile-first Tailwind (`md` / `lg` / `xl`).

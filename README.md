# Ellen Vinter — demo af fotografportfolio

En klikbar demo af en portfolio for en bryllups- og parfotograf. Idéen kommer fra fotografens eget værksted: løse fotoprint på forsiden og et sort kontaktark, hvor brudeparret slår rød ring om deres favoritter i kundegalleriet. Siden er sat til `noindex`, så den ikke dukker op på Google.

## Indhold

- Forside med fotoprint, der lægges øverst ved et tryk
- Bryllupper: serier, der kan ses som store billeder eller som kontaktark, med "Om dagen" under hver
- Om Ellen, priser med spørgsmål og svar, og en booking-forespørgsel, der tjekker, om datoen er ledig
- Kundegalleri med kode (demo: `SOFIEJONAS`), hvor man slår ring om favoritter og sender valget
- Fuldskærmsvisning med swipe, piletaster og Esc
- Privatlivspolitik (udkast med pladsholdere)

Navne, par, steder og priser er opdigtede. Datotjek og kundegalleri er en demo: intet sendes nogen steder hen.

## Kør lokalt

```bash
npm install
npm run dev
```

## Udgiv gratis på Vercel

Add New → Project → importér dette repo. Vercel genkender Vite selv. Tilføj derefter et underdomæne, fx `fotograf.ditdomæne.dk`, under Settings → Domains.

## Rediger

- Al tekst, billeder, serier, priser og spørgsmål: `src/App.jsx` (øverst i `constructor`)
- Farver, skrift og breakpoints: `src/styles.css`
- Billeder: `public/img/` (fotos fra Unsplash, gratis licens)

Pladsholdere som `[E-mail]`, `[Telefon]`, `[CVR-nummer]` og `[beløb]` skal udfyldes, hvis siden bruges til en rigtig fotograf. Den juridiske tekst er et udkast og ikke juridisk rådgivning.

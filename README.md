# Kelio darbų valdymas

Esamo demonstracinio prototipo paketas „GitHub“ ir „GitHub Pages“. Dizainas, pavyzdiniai duomenys ir sąveikos perkelti iš „Sites“ prototipo. Eksportuota 2026-10-30.

## Greitas įkėlimas į „GitHub Pages“

1. Išskleiskite ZIP kompiuteryje.
2. „GitHub“ sukurkite saugyklą (repository), pvz., `kelio-darbu-valdymas`.
3. Į `main` šaką įkelkite **šio aplanko turinį**, o ne patį aplanką ar ZIP. Būtina įkelti ir paslėptą `.github` aplanką, kuriame yra `workflows/pages.yml`.
4. Saugykloje atverkite **Settings → Pages → Build and deployment → Source → GitHub Actions**.
5. Atverkite **Actions → Publish GitHub Pages → Run workflow**, jei pradinis paleidimas neįvyko automatiškai. Pasirinkite `main` šaką.
6. Kai procesas baigsis sėkmingai, svetainės nuorodą rasite **Settings → Pages** ir proceso `github-pages` aplinkoje.

Kiekvienas vėlesnis įkėlimas į `main` šaką atnaujins svetainę automatiškai. Santykiniai išteklių adresai leidžia paketą naudoti tiek projekto poaplankyje, tiek nuosavame domene.

Jei `.github` aplankas failų pasirinkimo lange nematomas, „Windows“ failų naršyklėje įjunkite paslėptų elementų rodymą arba įkelkite paketą per „GitHub Desktop“.

## Paleidimas kompiuteryje

Reikalingas „Node.js“ 22.13 arba naujesnis.

```bash
npm ci
npm run dev
```

Atverkite terminale parodytą vietinį adresą.

## Paruošimas talpinimui

```bash
npm run build
npm run preview
```

`npm run build` patikrina TypeScript ir sukuria `dist/` aplanką. Jį galima talpinti bet kuriame statinių svetainių serveryje. ZIP pridėtas `docs/` aplankas yra jau sukompiliuota versija: norint publikuoti be „Actions“, galima „Settings → Pages“ pasirinkti **Deploy from a branch → main → /docs**. Redagavus kodą, `docs/` versiją reikia iš naujo atnaujinti iš `dist/`; rekomenduojamas automatinis „Actions“ būdas.

## Paketo turinys

- `src/App.tsx` – esamo prototipo sąsaja ir demonstracinė logika.
- `src/styles.css` – esamo prototipo stiliai.
- `index.html`, `favicon.svg` – pradinis puslapis ir piktograma.
- `package.json`, `package-lock.json` – užfiksuotos priklausomybės.
- `.github/workflows/pages.yml` – automatinis publikavimas.
- `docs/` – paruošta statinė versija.

## Demonstracijos ribos

Tai demonstracinė aplikacija su sintetiniais duomenimis. Išsaugoti esami perjungimai, filtravimas, įrašo peržiūra ir ROI skaičiuoklė. Dalis mygtukų tik parodo demonstracinį pranešimą. Nėra veikiančios apskaitos integracijos, bendros duomenų bazės, realaus dokumentų įkėlimo ar naudotojų autentifikacijos; pakeitimai nėra išsaugomi po puslapio perkrovimo.

„GitHub Pages“ versija neturi „Sites“ darbo srities prieigos kontrolės. Viešai paskelbtą puslapį gali atverti kiekvienas, turintis nuorodą; privati kodo saugykla savaime nereiškia privataus „Pages“ puslapio.

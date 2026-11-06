# Kelio darbų valdymas

Statinė interaktyvi kelių darbų valdymo aplikacija su pavyzdiniais duomenimis.

## Paleidimas

Atidarykite `index.html` naršyklėje arba pateikite abu failus (`index.html`, `app.js`) per statinį serverį. Išorinių bibliotekų ar diegimo nereikia.

## GitHub Pages

1. Išarchyvuokite paketą.
2. Repozitorijos šaknyje pakeiskite esamą `index.html` ir įkelkite `app.js` bei `.nojekyll`.
3. GitHub Pages nustatymuose parinkite publikavimą iš atitinkamos šakos šakninio katalogo.
4. Atnaujinę puslapį prireikus paspauskite Ctrl+F5.

Abu aplikacijos failai turi būti tame pačiame kataloge. Paketui tinka projekto adresas su bet kokiu katalogo pavadinimu. Tiesioginė projekto nuoroda: `#project-control`.

## Veikiantys procesai

- Projektai: registravimas, sutarties duomenys, patvirtinta sąmata ir atsakingi asmenys.
- Projekto valdymas: etapų eiga, sutarties vertė, faktinės pajamos, einamosios sąnaudos ir rezultatas.
- Dienos žurnalas: kiekis, darbuotojų valandos, DU įkainis ir sąnaudos, medžiagos, technika, motovalandos ir pastabos.
- Įrašo eiga: juodraštis → laukia tvirtinimo → patvirtinta arba grąžinta tikslinti.
- Tik patvirtinti įrašai atnaujina kiekius, sąnaudas ir projekto eigą. Pakartotinis tvirtinimas nedubliuoja sąnaudų.
- Pajamų registras: aktas ar kitas pajamų pagrindas; patvirtintos pajamos atskirtos nuo sutarties vertės.
- Įsipareigojimai: užsakytos, dar neįtrauktos į faktą sumos pagal sąnaudų kategoriją. Jos yra likusių darbų įvertinimo dalis. Atskiras redagavimas su priežastimi, mažinimas tvirtinant faktą ir istorijos fiksavimas.
- Rezervas: sąmata minus užbaigimo prognozė. Rodomas atskirai projekto suvestinėje, sąmatoje ir portfelio prognozės struktūroje. Sąmatos viršijimas žymimas atskirai; teigiamas rezervas tokiu atveju lygus nuliui.
- Sąmata ir prognozė: prognozė = patvirtintas faktas + įsipareigota + kitos likusių darbų sąnaudos. Įsipareigojimai papildomai nepadidina bendro likusių darbų įvertinimo. Tvirtinant faktą, likusių darbų įvertinimas atitinkamai mažinamas iki nulio.
- Laikotarpio kontrolė: medžiagų kiekiai ir sumos, DU valandos ir sumos, technikos motovalandos ir sumos, pajamos ir einamasis rezultatas.
- Gantt ir darbų sąrašas: etapų redagavimas ir brigados / technikos rezervacijų konfliktų tikrinimas.
- Dokumentai: registro kortelės, failų įkėlimas iki 2 MB, versijos, tvirtinimas ir atsisiuntimas.
- Sąmatos būsenos užfiksavimas, projekto pakeitimų istorija, CSV eksportai ir ataskaitos spausdinimas.
- Nustatymai: duomenų kopijos atsisiuntimas ir pradinių pavyzdinių duomenų atkūrimas.

## Duomenų režimas

Duomenys saugomi tos pačios naršyklės localStorage. Nėra serverio, bendros duomenų bazės, tikro prisijungimo, integracijų, darbo užmokesčio skaičiavimo ar banko operacijų. Nustatymai aiškiai nurodo šį režimą. Pajamų įrašai skirti projekto operacinei kontrolei; apmokėjimai čia neapskaitomi.

Visi pradiniai objektai ir asmenys yra pavyzdiniai. Pradiniai dokumentai yra aiškiai pažymėtos registro kortelės, ne tariami originalai. Įkėlus tikrą failą, atsisiunčiamas būtent tas failas.

## Tikrinimas ir publikavimas

- `node --check app.js`
- `node tests/project-workflow.cjs`
- `node scripts/build-static.mjs`

Sites publikavimui šaltiniai kopijuojami į `dist/`; projekto tapatybė ir prieigos nustatymai išlaikomi.

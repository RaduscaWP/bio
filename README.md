# TYTO ALBA

Proiect școlar de biologie din Chișinău, Republica Moldova, despre bufnița de hambar (Tyto alba). Site one-page cu model 3D, animat prin scroll.

## Stack

- Vite
- JavaScript modular
- Three.js
- GSAP + ScrollTrigger
- SCSS

## Rulare Locală

```bash
npm install
npm run dev
```

Aplicația pornește implicit la adresa afișată de Vite. În această sesiune a rulat pe:

```text
http://127.0.0.1:5173/
```

Pentru build:

```bash
npm run build
```

Pentru preview build:

```bash
npm run preview
```

## Model 3D

Codul caută modelul la:

```text
public/models/owl.glb
```

Dacă fișierul lipsește, site-ul nu se blochează. Three.js afișează un fallback stilizat și emite un warning clar în consolă.

## Structură

```text
public/
  audio/
  icons/
  models/
  textures/
src/
  js/
    animations/
    data/
    scene/
    ui/
  styles/
index.html
package.json
```

## Conținut

Textele sunt în `src/js/data/content.js` și acoperă:

- taxonomie
- morfologie
- zbor
- auz
- vânătoare
- habitat
- rol ecologic
- adaptări anatomice
- conservare

Datele biologice sunt preluate din surse publice (Cartea Roșie a Republicii Moldova, Cornell All About Birds, Barn Owl Trust).

## Credite

Proiect realizat de Radu-Ștefan Grozav, Chișinău.

Modelul 3D trebuie adăugat manual în `public/models/owl.glb` și atribuit conform licenței modelului folosit.

Sursele biologice externe trebuie completate manual dacă proiectul final cere bibliografie formală.
# bio

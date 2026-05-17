export const siteChrome = {
  label: "Proiect biologie",
  title: "Bufnița de hambar",
  latin: "Tyto alba",
  menuLabel: "Capitole",
  menuTitle: "Cuprins",
  menuText:
    "Capitole despre taxonomie, morfologie, zbor, auz, vânătoare, habitat, rol ecologic și conservare.",
};

export const storyChapters = [
  {
    id: "hero",
    navLabel: "Introducere",
    layout: "hero",
    kicker: "Capitol 01",
    title: "Bufnița de hambar",
    subtitle: "Tyto alba",
    body: "Pasăre răpitoare nocturnă din ordinul Strigiformes, familia Tytonidae. Are o răspândire foarte largă în lume, însă în Republica Moldova este o specie rară, inclusă în Cartea Roșie.",
    microcopy:
      "Se hrănește în principal cu rozătoare mici și cuibărește în clădiri vechi, hambare, poduri și scorburi din zonele rurale ale țării.",
    facts: [
      { label: "Ordin", value: "Strigiformes" },
      { label: "Familie", value: "Tytonidae" },
      { label: "Statut în RM", value: "Specie rară, Cartea Roșie a Republicii Moldova" },
      { label: "Regim alimentar", value: "Carnivor, în special rozătoare" },
    ],
    theme: "aurora",
    sceneState: {
      camera: {
        position: { x: 0.3, y: 0.15, z: 5.2 },
        target: { x: 0.35, y: 0, z: 0 },
      },
      owl: {
        position: { x: 0.55, y: -0.05, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1.02, y: 1.02, z: 1.02 },
      },
      lights: {
        ambient: 0.42,
        key: 1.95,
        rim: 2.25,
        fill: 0.68,
        violet: 0.6,
      },
      particles: {
        opacity: 0.34,
        featherOpacity: 0.16,
      },
      environment: {
        moonOpacity: 0.1,
        hazeOpacity: 0.045,
        leftGlowOpacity: 0.2,
        rightGlowOpacity: 0.16,
      },
    },
  },
  {
    id: "identity",
    navLabel: "Morfologie",
    layout: "copy-right",
    kicker: "Capitol 02",
    title: "Morfologie generală",
    subtitle: "Aspect, dimensiuni și colorit",
    body:
      "Lungimea corpului este de aproximativ 33–39 cm, iar anvergura aripilor de 80–95 cm. Masa corporală variază între 250 și 480 g, femelele fiind în general mai mari decât masculii.",
    microcopy:
      "Partea dorsală este brun-aurie cu pete fine cenușii, iar partea ventrală este albă sau alb-gălbuie. Discul facial alb are forma caracteristică de inimă.",
    facts: [
      { label: "Lungime corp", value: "33–39 cm" },
      { label: "Anvergură", value: "80–95 cm" },
      { label: "Masă", value: "250–480 g" },
      { label: "Dimorfism sexual", value: "Femelele puțin mai mari" },
    ],
    theme: "mist",
    sceneState: {
      camera: {
        position: { x: -0.3, y: 0.12, z: 4.55 },
        target: { x: -0.62, y: 0, z: 0 },
      },
      owl: {
        position: { x: -1, y: -0.08, z: 0 },
        rotation: { x: 0, y: 0.4, z: 0 },
        scale: { x: 1.28, y: 1.28, z: 1.28 },
      },
      lights: {
        ambient: 0.48,
        key: 1.78,
        rim: 2.05,
        fill: 0.74,
        violet: 0.45,
      },
      particles: {
        opacity: 0.28,
        featherOpacity: 0.12,
      },
      environment: {
        moonOpacity: 0.08,
        hazeOpacity: 0.04,
        leftGlowOpacity: 0.16,
        rightGlowOpacity: 0.12,
      },
    },
  },
  {
    id: "flight",
    navLabel: "Zbor",
    layout: "copy-left",
    kicker: "Capitol 03",
    title: "Zborul silențios",
    subtitle: "Structura penelor reduce zgomotul în mișcare",
    body:
      "Marginea anterioară a remigelor primare prezintă franjuri fine care fragmentează curentul de aer. Suprafața penajului este acoperită cu o textură catifelată care absoarbe sunetele de înaltă frecvență.",
    microcopy:
      "Reducerea zgomotului este o adaptare la vânătoarea nocturnă. Prada nu detectează apropierea păsării, iar pasărea își poate folosi propriul auz fără interferențe.",
    facts: [
      { label: "Marginea anterioară", value: "Franjuri pe remigele primare" },
      { label: "Suprafața penajului", value: "Catifelată, absoarbe frecvențele înalte" },
      { label: "Tip de zbor", value: "Planat lent, la mică înălțime" },
    ],
    theme: "silver",
    sceneState: {
      camera: {
        position: { x: 0.4, y: 0.1, z: 4.4 },
        target: { x: 0.45, y: 0, z: 0 },
      },
      owl: {
        position: { x: 0.72, y: -0.05, z: 0 },
        rotation: { x: 0, y: -1, z: 0 },
        scale: { x: 1.12, y: 1.12, z: 1.12 },
      },
      lights: {
        ambient: 0.4,
        key: 1.7,
        rim: 2.45,
        fill: 0.58,
        violet: 0.74,
      },
      particles: {
        opacity: 0.4,
        featherOpacity: 0.18,
      },
      environment: {
        moonOpacity: 0.05,
        hazeOpacity: 0.048,
        leftGlowOpacity: 0.12,
        rightGlowOpacity: 0.18,
      },
    },
  },
  {
    id: "hearing",
    navLabel: "Auz",
    layout: "copy-right",
    kicker: "Capitol 04",
    title: "Auzul",
    subtitle: "Discul facial și asimetria urechilor",
    body:
      "Discul facial în formă de inimă funcționează ca o suprafață colectoare care direcționează undele sonore către orificiile auditive. Acestea sunt poziționate asimetric pe craniu, una mai sus decât cealaltă.",
    microcopy:
      "Diferența de timp și intensitate cu care sunetul ajunge la cele două urechi permite localizarea prăzii pe orizontală și pe verticală, chiar în întuneric complet.",
    facts: [
      { label: "Disc facial", value: "Colectează și concentrează sunetul" },
      { label: "Urechi", value: "Asimetrice, una mai sus decât cealaltă" },
      { label: "Precizie", value: "Localizare a sursei pe orizontală și verticală" },
    ],
    theme: "aurora",
    sceneState: {
      camera: {
        position: { x: -0.3, y: 0.35, z: 3.2 },
        target: { x: -0.3, y: 0.25, z: 0 },
      },
      owl: {
        position: { x: -0.52, y: -0.06, z: 0 },
        rotation: { x: 0, y: 0.15, z: 0 },
        scale: { x: 1.12, y: 1.12, z: 1.12 },
      },
      lights: {
        ambient: 0.36,
        key: 2.1,
        rim: 2.3,
        fill: 0.62,
        violet: 0.52,
      },
      particles: {
        opacity: 0.28,
        featherOpacity: 0.12,
      },
      environment: {
        moonOpacity: 0.06,
        hazeOpacity: 0.038,
        leftGlowOpacity: 0.18,
        rightGlowOpacity: 0.14,
      },
    },
  },
  {
    id: "hunt",
    navLabel: "Vânătoare",
    layout: "copy-left",
    kicker: "Capitol 05",
    title: "Vânătoarea",
    subtitle: "Comportament și metodă de captură",
    body:
      "Vânează cu precădere la amurg și pe timpul nopții. Zboară la mică înălțime deasupra terenurilor deschise și localizează prada în principal după sunetul produs de aceasta.",
    microcopy:
      "Atacă printr-o coborâre rapidă, întinde ghearele în ultima fracțiune de secundă și prinde prada cu ele. O înghite de regulă întreagă.",
    facts: [
      { label: "Activitate", value: "Crepusculară și nocturnă" },
      { label: "Pradă principală", value: "Șoareci, șobolani, chițcani" },
      { label: "Metodă", value: "Localizare auditivă, atac în picaj" },
    ],
    theme: "moon",
    sceneState: {
      camera: {
        position: { x: 0.4, y: 0.2, z: 4.6 },
        target: { x: 0.45, y: -0.05, z: 0 },
      },
      owl: {
        position: { x: 0.7, y: -0.1, z: 0 },
        rotation: { x: 0.12, y: -0.25, z: 0 },
        scale: { x: 1.08, y: 1.08, z: 1.08 },
      },
      lights: {
        ambient: 0.44,
        key: 1.62,
        rim: 2.16,
        fill: 0.72,
        violet: 0.38,
      },
      particles: {
        opacity: 0.34,
        featherOpacity: 0.16,
      },
      environment: {
        moonOpacity: 0.08,
        hazeOpacity: 0.052,
        leftGlowOpacity: 0.13,
        rightGlowOpacity: 0.12,
      },
    },
  },
  {
    id: "habitat",
    navLabel: "Habitat",
    layout: "copy-right",
    kicker: "Capitol 06",
    title: "Habitat și răspândire",
    subtitle: "În Republica Moldova: prezență rară, localizată",
    body:
      "La nivel mondial, specia este răspândită pe toate continentele cu excepția Antarcticii. În Republica Moldova apare punctiform, în zonele agricole și satele cu clădiri vechi, hambare și biserici nefolosite.",
    microcopy:
      "Pentru cuibărit folosește poduri, turnuri, hambare și cavități. În împrejurimile Chișinăului, locurile potrivite pentru cuibărit s-au redus din cauza demolării construcțiilor vechi și a renovărilor.",
    facts: [
      { label: "Răspândire globală", value: "Toate continentele, mai puțin Antarctica" },
      { label: "Prezență în RM", value: "Rară, localizată în zone agricole" },
      { label: "Loc de cuibărit", value: "Poduri, turnuri, hambare, cavități" },
    ],
    theme: "mist",
    sceneState: {
      camera: {
        position: { x: -0.36, y: 0.18, z: 4.25 },
        target: { x: -0.78, y: 0, z: 0 },
      },
      owl: {
        position: { x: -1.12, y: -0.1, z: 0 },
        rotation: { x: 0, y: 0.5, z: 0 },
        scale: { x: 1.5, y: 1.5, z: 1.5 },
      },
      lights: {
        ambient: 0.5,
        key: 1.54,
        rim: 1.86,
        fill: 0.82,
        violet: 0.22,
      },
      particles: {
        opacity: 0.22,
        featherOpacity: 0.1,
      },
      environment: {
        moonOpacity: 0.12,
        hazeOpacity: 0.058,
        leftGlowOpacity: 0.1,
        rightGlowOpacity: 0.08,
      },
    },
  },
  {
    id: "ecology",
    navLabel: "Rol ecologic",
    layout: "copy-left",
    kicker: "Capitol 07",
    title: "Rolul ecologic",
    subtitle: "Prădător al rozătoarelor în ecosistemele agricole",
    body:
      "Consumul ridicat de rozătoare contribuie la controlul natural al populațiilor acestora. O singură pereche poate consuma câteva mii de rozătoare într-un an.",
    microcopy:
      "Prin acest rol, specia limitează pagubele produse de rozătoare culturilor agricole și depozitelor, fiind utilă în agricultură.",
    facts: [
      { label: "Pradă principală", value: "Rozătoare mici" },
      { label: "Estimare anuală", value: "Câteva mii de rozătoare pe pereche" },
      { label: "Importanță", value: "Control biologic în agricultură" },
    ],
    theme: "silver",
    sceneState: {
      camera: {
        position: { x: 0.3, y: 0.15, z: 5.4 },
        target: { x: 0.35, y: 0, z: 0 },
      },
      owl: {
        position: { x: 0.72, y: -0.06, z: 0 },
        rotation: { x: 0, y: -0.45, z: 0 },
        scale: { x: 1.08, y: 1.08, z: 1.08 },
      },
      lights: {
        ambient: 0.46,
        key: 1.72,
        rim: 2.06,
        fill: 0.78,
        violet: 0.26,
      },
      particles: {
        opacity: 0.24,
        featherOpacity: 0.1,
      },
      environment: {
        moonOpacity: 0.09,
        hazeOpacity: 0.045,
        leftGlowOpacity: 0.1,
        rightGlowOpacity: 0.1,
      },
    },
  },
  {
    id: "adaptations",
    navLabel: "Adaptări",
    layout: "copy-right",
    kicker: "Capitol 08",
    title: "Adaptări anatomice",
    subtitle: "Vedere, auz și structură a penajului",
    body:
      "Ochii sunt mari și orientați frontal, ceea ce permite vedere binoculară și aprecierea distanțelor. Gâtul este flexibil și permite rotirea capului cu aproximativ 270°.",
    microcopy:
      "Picioarele sunt relativ lungi, cu gheare puternice și ascuțite, adaptate pentru prinderea prăzii. Penajul moale reduce zgomotul în zbor.",
    facts: [
      { label: "Vedere", value: "Binoculară, adaptată la lumină scăzută" },
      { label: "Rotația capului", value: "Aproximativ 270°" },
      { label: "Picioare", value: "Lungi, cu gheare puternice" },
      { label: "Penaj", value: "Moale, cu margini franjurate" },
    ],
    theme: "aurora",
    sceneState: {
      camera: {
        position: { x: -0.3, y: 0.15, z: 4.6 },
        target: { x: -0.35, y: 0, z: 0 },
      },
      owl: {
        position: { x: -0.98, y: -0.08, z: 0 },
        rotation: { x: 0, y: 1, z: 0 },
        scale: { x: 1.28, y: 1.28, z: 1.28 },
      },
      lights: {
        ambient: 0.34,
        key: 2.08,
        rim: 2.4,
        fill: 0.52,
        violet: 0.62,
      },
      particles: {
        opacity: 0.26,
        featherOpacity: 0.14,
      },
      environment: {
        moonOpacity: 0.06,
        hazeOpacity: 0.036,
        leftGlowOpacity: 0.18,
        rightGlowOpacity: 0.16,
      },
    },
  },
  {
    id: "conservation",
    navLabel: "Conservare",
    layout: "closing",
    kicker: "Capitol 09",
    title: "Amenințări și conservare",
    subtitle: "Statut în Cartea Roșie a Republicii Moldova",
    body:
      "Tyto alba este inclusă în Cartea Roșie a Republicii Moldova ca specie rară. Principalele amenințări sunt pierderea locurilor de cuibărit prin renovarea sau demolarea clădirilor vechi, intensificarea agriculturii, utilizarea rodenticidelor și coliziunile cu autovehiculele.",
    microcopy:
      "Măsurile de conservare includ protejarea construcțiilor vechi unde cuibărește, instalarea de cuiburi artificiale și reducerea folosirii rodenticidelor în terenurile agricole din jurul Chișinăului și din restul țării.",
    facts: [
      { label: "Statut în RM", value: "Specie rară, Cartea Roșie a Republicii Moldova" },
      { label: "Amenințări", value: "Pierderea cuiburilor, rodenticide, trafic rutier" },
      { label: "Măsuri", value: "Cuiburi artificiale, protejarea clădirilor vechi" },
    ],
    theme: "ember",
    sceneState: {
      camera: {
        position: { x: 0, y: 0.15, z: 5.6 },
        target: { x: 0, y: 0, z: 0 },
      },
      owl: {
        position: { x: 0, y: -0.05, z: 0 },
        rotation: { x: 0, y: 0.15, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      lights: {
        ambient: 0.32,
        key: 1.24,
        rim: 1.84,
        fill: 0.34,
        violet: 0.18,
      },
      particles: {
        opacity: 0.18,
        featherOpacity: 0.08,
      },
      environment: {
        moonOpacity: 0.04,
        hazeOpacity: 0.03,
        leftGlowOpacity: 0.06,
        rightGlowOpacity: 0.08,
      },
    },
  },
];

export const footerContent = {
  title: "Surse",
  description:
    "Proiect școlar de biologie despre bufnița de hambar (Tyto alba), realizat în Chișinău, Republica Moldova.",
  references: [
    { label: "Cartea Roșie a Republicii Moldova", href: "https://cartearosie.ipape.md/" },
    { label: "Cornell All About Birds", href: "https://www.allaboutbirds.org/guide/Barn_Owl/id" },
    { label: "Barn Owl Trust", href: "https://www.barnowltrust.org.uk/barn-owl-facts/barn-owl-adaptations/" },
    { label: "Model 3D: Carnegie Museum (CC BY 4.0)", href: "https://sketchfab.com/3d-models/common-barn-owl-19c989a6681145bc999c332699eb852e" },
  ],
  credits: [
    "Proiect realizat de Radu-Ștefan Grozav, Chișinău.",
    "Model 3D: „Common Barn Owl\" — Carnegie Museum of Natural History / Innovation Studio, licență CC BY 4.0.",
  ],
};

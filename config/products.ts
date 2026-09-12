import type { Product } from "./types";

export const products: Product[] = [
  {
    slug: "terassilasit",
    name: "Terassilasit",
    shortName: "Terassilasit",
    category: "Terassilasit",
    featured: true,
    tagline: "Liukuvat lasit, jotka pidentävät kesää",
    excerpt:
      "Puitteelliset ja puitteettomat liukulasit suomalaiselle terassille. CE-merkityt järjestelmät, mittatilaus Lahdesta.",
    description:
      "Lukkan-terassilasit muuttavat avoimen terassin tilaksi, jota voi käyttää keväästä myöhäiseen syksyyn. Pystypuitteellinen Aava ja klassinen GL tiivistävät luukut toisiinsa. Puitteeton Tyyni jättää näkymän auki. Termo tuo kaksinkertaisen eristyslasin puolilämpimään tilaan.",
    heroEyebrow: "Terassilasitukset",
    h1: "Terassilasit suomalaiseen ilmastoon",
    h2: "Mitä eroa on puitteellisella ja puitteettomalla terassilasilla?",
    imageSrc: "/images/product-terassilasit.svg",
    imageAlt: "Puitteellinen liukulasi terassilla, alumiiniprofiilit ja karkaistu turvalasi",
    highlights: [
      "Valmistus Suomessa, suunnittelu mittatilaustyönä",
      "Karkaistu turvalasi 4–10 mm käyttötavan mukaan",
      "Sisä- ja ulkopuolinen lukitus, Abloy-sarjoitus mahdollinen",
      "Toimintavarma kesällä ja talvella",
    ],
    specs: [
      { label: "Lasit", value: "Karkaistu turvalasi 4 / 6 / 8 / 10 mm" },
      { label: "Maksimikorkeus", value: "jopa 2850 mm (mallikohtainen)" },
      { label: "Vakiovärit", value: "RAL 9010, RAL 7024, RAL 9005" },
      { label: "Merkinnät", value: "CE · tuulenpaine EN 12211" },
    ],
    faqs: [
      {
        question: "Mitä eroa on puitteellisella ja puitteettomalla terassilasilla?",
        answer:
          "Puitteellinen liukulasi (Aava, GL) käyttää pystypuitteita, jotka tiivistävät luukut ja parantavat suojaa tuulta, sadetta ja ääntä vastaan. Puitteeton Tyyni minimoi pystylinjoja: lasiluukut ovat leveämpiä ja näkymä avoimempi. Säänsuoja on silti merkittävä, mutta tiiveys ei yllä eristyslasin tasolle.",
      },
      {
        question: "Voiko liukulasit lukita?",
        answer:
          "Kyllä. Saatavilla on sisäpuolinen lukitus, ulkopuolinen Abloy ja yksinkertainen vetonuppi. Abloy voidaan sarjoittaa samaan avaimeen kuin talon ulko-ovi.",
      },
    ],
    relatedSlugs: ["aava", "tyyni", "termo", "gl", "lasiterassit"],
    video: {
      provider: "youtube",
      id: "aqz-KE-bpKQ",
      title: "Lukkan terassilasituksen esittely",
    },
  },
  {
    slug: "lasiterassit",
    name: "Lasiterassit",
    shortName: "Lasiterassit",
    category: "Lasiterassit",
    featured: true,
    tagline: "Valmis huone pihaan – runko, katto ja lasit",
    excerpt:
      "Lasiterassikokonaisuus sisältää alumiinirungon, katon ja liukulasit. Yksi järjestelmä, yksi vastuu.",
    description:
      "Lasiterassi on enemmän kuin seinän lasitus. Lukkan toimittaa rungon, katon ja liukuvat lasiseinät yhteensopivana kokonaisuutena. Perustukset ja asennus hoitaa jälleenmyyjä. Tulos on tila, joka liittyy asuntoon ilman raskasta rakennuslupaprosessia tyypillisessä piha-asennuksessa – varmista aina paikallinen tulkinta.",
    heroEyebrow: "Lasiterassikokonaisuus",
    h1: "Lasiterassi, joka on suunniteltu yhdeksi tilaksi",
    h2: "Miksi lasiterassi kannattaa tilata samasta järjestelmästä?",
    imageSrc: "/images/product-lasiterassi.svg",
    imageAlt: "Lasiterassikokonaisuus pihalla, alumiinirunko, katto ja liukulasit",
    highlights: [
      "Runko, katto ja lasit yhteensopivina",
      "Liukulasit Aava, GL, Tyyni tai Termo",
      "Perustukset jälleenmyyjän kautta",
      "Sopii uudis- ja saneerauskohteisiin",
    ],
    specs: [
      { label: "Rakenne", value: "Alumiinirunko + katto + liukulasit" },
      { label: "Käyttö", value: "Kylmä tai puolilämmin tila" },
      { label: "Suunnittelu", value: "Mittatilaus kohteen mukaan" },
      { label: "Asennus", value: "Valtakunnallinen jälleenmyynti" },
    ],
    faqs: [
      {
        question: "Mitä lasiterassikokonaisuus sisältää?",
        answer:
          "Tyypillisesti alumiinirungon, katon ja valitut liukulasit. Perustukset, sähköt ja irtokalusteet sovitaan jälleenmyyjän kanssa. Termo-lasi tekee tilasta puolilämpimän viherhuoneen.",
      },
    ],
    relatedSlugs: ["terassilasit", "aava", "termo", "kaiteet"],
  },
  {
    slug: "parvekelasitus",
    name: "Parvekelasitus",
    shortName: "Parvekelasitus",
    category: "Parvekelasitus",
    featured: true,
    tagline: "Suojaa tuulelta, sateelta ja lumelta",
    excerpt:
      "Parvekelasitus on turvallinen, kestävä ja tyylikäs. Se pitää parvekkeen puhtaampana ja voi pienentää energiankulutusta.",
    description:
      "Lukkanin parvekelasitukset – mukaan lukien NIKA-yhteensopivat ratkaisut – suojaavat parveketta säältä ilman, että näkymä katoaa. Lasitus muodostaa puskurivyöhykkeen, vähentää melua ja pitää kalusteet kuivina. Taloyhtiöissä lasitus on usein taloyhtiön linjaama, mutta järjestelmä valitaan huoneistokohtaisesti.",
    heroEyebrow: "Parvekelasitukset",
    h1: "Parvekelasitus, joka tekee parvekkeesta käyttötilan",
    h2: "Miten parvekelasitus vaikuttaa energiankulutukseen?",
    imageSrc: "/images/product-parveke.svg",
    imageAlt: "Lasitettu kerrostalon parveke, kääntyvät lasielementit",
    highlights: [
      "Suoja tuulelta, sateelta ja lumelta",
      "Tutkitusti noin 6 % vaikutus energiankulutukseen",
      "Karkaistu turvalasi, testattu VTT:llä",
      "Huollettavat ja vaihdettavat osat",
    ],
    specs: [
      { label: "Kohde", value: "Kerrostalo- ja rivitaloparvekkeet" },
      { label: "Lasi", value: "Karkaistu turvalasi" },
      { label: "Avaus", value: "Kääntyvät / liukuvat elementit" },
      { label: "Turvallisuus", value: "CE · VTT-testaus" },
    ],
    faqs: [
      {
        question: "Miten parvekelasitus vaikuttaa energiankulutukseen?",
        answer:
          "Lasitettu parveke toimii ilmataskuna asunnon ja ulkoilman välissä. Tutkimuksissa parvekelasitus on pienentänyt asunnon energiankulutusta noin kuudella prosentilla. Samalla parveke pysyy kuivempana ja puhtaampana.",
      },
      {
        question: "Tarvitaanko taloyhtiön lupa?",
        answer:
          "Yleensä kyllä. Julkisivuun kiinnitettävä lasitus käsitellään taloyhtiössä. Jälleenmyyjä auttaa mittauksessa, tarjouksessa ja asennuksessa.",
      },
    ],
    relatedSlugs: ["kaiteet", "terassilasit", "nika-parvekelasitus"],
  },
  {
    slug: "kaiteet",
    name: "Kaiteet",
    shortName: "Lasikaiteet",
    category: "Kaiteet",
    featured: true,
    tagline: "Lasikaide terassille, parvekkeelle ja portaisiin",
    excerpt:
      "LP-lasikaide täydentää lasituksen. Turvalasi, alumiiniprofiilit ja avoin näkymä ilman raskasta pinna-aidetta.",
    description:
      "Lasikaide on sekä turvaelementti että arkkitehtoninen linja. Lukkan LP-kaide sopii terassin reunaan, parvekkeelle ja portaisiin. Yhdistettynä liukulasiin kokonaisuus pysyy visuaalisesti kevyenä: lasi jatkuu lattiasta kattoon ilman katkoksia.",
    heroEyebrow: "Lasikaiteet",
    h1: "Lasikaiteet, jotka pitävät näkymän auki",
    h2: "Milloin terassi tarvitsee lasikaiteen eikä vain lasitusta?",
    imageSrc: "/images/product-kaide.svg",
    imageAlt: "Läpinäkyvä lasikaide terassin reunalla",
    highlights: [
      "LP-lasikaide terassille ja parvekkeelle",
      "Yhteensopiva Lukkan-liukulasien kanssa",
      "Turvalasi ja alumiinikiinnitys",
      "Matala visuaalinen profiili",
    ],
    specs: [
      { label: "Malli", value: "LP-lasikaide" },
      { label: "Lasi", value: "Karkaistu / laminoitu turvalasi" },
      { label: "Kiinnitys", value: "Alumiiniprofiili, pintaan tai upotus" },
      { label: "Kohteet", value: "Terassi, parveke, portaat" },
    ],
    faqs: [
      {
        question: "Milloin terassi tarvitsee lasikaiteen eikä vain lasitusta?",
        answer:
          "Kun putoamiskorkeus sitä edellyttää tai kun lasitus ei kata koko reunaa. Kaide täyttää turvamääräykset, liukulasi suojaa säätä vastaan. Usein molemmat asennetaan samaan kohteeseen.",
      },
    ],
    relatedSlugs: ["parvekelasitus", "lasiterassit", "terassilasit"],
  },
  {
    slug: "aava",
    name: "Lukkan Aava",
    shortName: "Aava",
    category: "Terassilasit",
    featured: false,
    parentSlug: "terassilasit",
    tagline: "Moderni pystypuitteellinen liukulasi",
    excerpt:
      "Aaltomaiset, vahvistetut profiilit mahdollistavat suuret luukut ja esteettömämmän näkymän.",
    description:
      "Lukkan Aava on moderni pystypuitteellinen liukulasi. Profiilien muotoilu on aaltomainen ja pyöristetty. Vahvat profiilit sallivat suuret lasiluukut. Kumitiivisteet jäävät alumiinin sisälle, ja struktuurimaalipinta suojaa naarmuuntumiselta. Alakisko on 28 mm, erikoismatala 15 mm saatavilla.",
    heroEyebrow: "Puitteellinen liukulasi",
    h1: "Lukkan Aava – moderni pystypuitteellinen terassilasi",
    h2: "Kenelle Aava sopii paremmin kuin Tyyni?",
    imageSrc: "/images/product-aava.svg",
    imageAlt: "Lukkan Aava liukulasi pyöristetyillä alumiiniprofiileilla",
    highlights: [
      "Aaltomainen, pyöristetty profiili",
      "Suuret luukut, parempi näkymä",
      "Lasi jopa 8 mm, max. korkeus 2850 mm",
      "Sisään piilotetut kumitiivisteet",
    ],
    specs: [
      { label: "Tyyppi", value: "Pystypuitteellinen liukulasi" },
      { label: "Lasi", value: "4 / 6 / 8 mm karkaistu turvalasi" },
      { label: "Alakisko", value: "28 mm, erikoismatala 15 mm" },
      { label: "Maalaus", value: "Struktuuri, RAL-sävyt" },
    ],
    faqs: [
      {
        question: "Kenelle Aava sopii paremmin kuin Tyyni?",
        answer:
          "Kun haluat puitteiden tuoman tiiveyden ja silti modernin, suuren luukun. Aava on oikea valinta, jos terassia käytetään oleskelutilana tuulisella paikalla. Tyyni on oikea, jos maisema on pääasia.",
      },
    ],
    relatedSlugs: ["tyyni", "gl", "termo", "terassilasit"],
  },
  {
    slug: "tyyni",
    name: "Lukkan Tyyni",
    shortName: "Tyyni",
    category: "Terassilasit",
    featured: false,
    parentSlug: "terassilasit",
    tagline: "Pystypuitteeton liukulasi",
    excerpt:
      "Tyylikkään funktionaalinen järjestelmä 6–10 mm turvalasilla ja mahdollisimman avoimella näkymällä.",
    description:
      "Lukkan Tyyni on pystypuitteeton liukulasi. Se on tukeva, turvallinen ja käyttöä kestävä. Lasina 6, 8 tai 10 mm karkaistu turvalasi luukun koon mukaan. Kun pystypuitteet jäävät pois, maisema jää.",
    heroEyebrow: "Puitteeton liukulasi",
    h1: "Lukkan Tyyni – pystypuitteeton terassilasi",
    h2: "Onko puitteeton lasi yhtä tiivis kuin puitteellinen?",
    imageSrc: "/images/product-tyyni.svg",
    imageAlt: "Puitteeton Tyyni-liukulasi avoimella näkymällä",
    highlights: [
      "Ei pystypuitteita näkymässä",
      "6 / 8 / 10 mm karkaistu turvalasi",
      "Tukeva ja käyttöä kestävä",
      "Sopii meri- ja järvimaisemiin",
    ],
    specs: [
      { label: "Tyyppi", value: "Pystypuitteeton liukulasi" },
      { label: "Lasi", value: "6 / 8 / 10 mm karkaistu" },
      { label: "Käyttö", value: "Terassi, näkymäkohteet" },
      { label: "Täydentää", value: "Lasiterassikokonaisuus" },
    ],
    faqs: [
      {
        question: "Onko puitteeton lasi yhtä tiivis kuin puitteellinen?",
        answer:
          "Ei aivan. Pystypuitteet muodostavat tiiviimmän seinän. Tyyni suojaa silti sateelta, tuulelta ja pölyltä, mutta jos tavoite on puolilämmin tila, valitse Termo tai puitteellinen Aava.",
      },
    ],
    relatedSlugs: ["aava", "terassilasit", "lasiterassit"],
  },
  {
    slug: "termo",
    name: "Lukkan Termo",
    shortName: "Termo",
    category: "Terassilasit",
    featured: false,
    parentSlug: "terassilasit",
    tagline: "Eristyslasi puolilämpimiin tiloihin",
    excerpt:
      "Kaksinkertainen eristyslasi viherhuoneisiin ja tiloihin, joissa käyttöaikaa halutaan lisää talvella.",
    description:
      "Lukkan Termo on varustettu kaksinkertaisella eristyslasilla. Tyypillisiä kohteita ovat viherhuoneet ja puolilämpöiset tilat. Kylmäkatkaistut profiilit hillitsevät vedon tunnetta. Termo pidentää terassin vuotuista käyttöaikaa pisimmälle.",
    heroEyebrow: "Eristyslasitus",
    h1: "Lukkan Termo – eristyslasi viherhuoneeseen",
    h2: "Milloin terassi kannattaa lasittaa Termolla eikä Aavalla?",
    imageSrc: "/images/product-termo.svg",
    imageAlt: "Kaksinkertainen Termo-eristyslasi viherhuoneessa",
    highlights: [
      "Kaksinkertainen eristyslasi",
      "Puolilämpimät tilat ja viherhuoneet",
      "Pidempi käyttöaika talvella",
      "Yhteensopiva lasiterassirungon kanssa",
    ],
    specs: [
      { label: "Tyyppi", value: "Pystypuitteellinen eristyslasi" },
      { label: "Lasi", value: "Kaksinkertainen eristyslasi" },
      { label: "Kohde", value: "Viherhuone, puolilämmin tila" },
      { label: "Tavoite", value: "Lämpö ja käyttökuukaudet" },
    ],
    faqs: [
      {
        question: "Milloin terassi kannattaa lasittaa Termolla eikä Aavalla?",
        answer:
          "Kun tilaa käytetään varhain keväällä ja myöhään syksyllä tai kun halutaan viherhuoneen olosuhteet. Aava on kevyempi liukulasi oleskeluun. Termo on valinta, jos lämpötilaero ulkoilmaan on tavoite.",
      },
    ],
    relatedSlugs: ["aava", "lasiterassit", "terassilasit"],
  },
  {
    slug: "gl",
    name: "Lukkan GL",
    shortName: "GL",
    category: "Terassilasit",
    featured: false,
    parentSlug: "terassilasit",
    tagline: "Klassinen pystypuitteellinen liukulasi",
    excerpt:
      "Lukkanin ensimmäinen liukulasituote. Funktionaalinen ja toimintavarma – suosio on kestänyt vuosikymmeniä.",
    description:
      "Lukkan GL on merkin alkuperäinen liukulasijärjestelmä. Se on tyylikkään funktionaalinen ja toimintavarma. GL sopii kohteisiin, joissa haetaan koeteltua puitteellista liukulasiä ilman Aavan pyöristettyä muotokieltä.",
    heroEyebrow: "Klassinen liukulasi",
    h1: "Lukkan GL – koeteltu pystypuitteellinen lasitus",
    h2: "Miksi GL on edelleen valikoimassa Aavan rinnalla?",
    imageSrc: "/images/product-gl.svg",
    imageAlt: "Klassinen GL-liukulasi suorilla profiileilla",
    highlights: [
      "Ensimmäinen Lukkan-liukulasi",
      "Toimintavarma kesällä ja talvella",
      "Pystypuitteiden tiiveys",
      "Varaosat ja huolto vuosiksi",
    ],
    specs: [
      { label: "Tyyppi", value: "Pystypuitteellinen liukulasi" },
      { label: "Lasi", value: "4 / 6 mm karkaistu turvalasi" },
      { label: "Profiili", value: "Klassinen, funktionaalinen" },
      { label: "Soveltuvuus", value: "Terassi ja lasiterassi" },
    ],
    faqs: [
      {
        question: "Miksi GL on edelleen valikoimassa Aavan rinnalla?",
        answer:
          "GL on huollettava, varaosilla tuettu klassikko. Moni olemassa oleva terassi on GL-järjestelmää. Uudiskohteessa Aava on usein visuaalinen valinta, GL kun arvostetaan koeteltua mekaniikkaa.",
      },
    ],
    relatedSlugs: ["aava", "terassilasit"],
  },
  {
    slug: "nika-parvekelasitus",
    name: "NIKA-parvekelasitus",
    shortName: "NIKA",
    category: "Parvekelasitus",
    featured: false,
    parentSlug: "parvekelasitus",
    tagline: "Parvekelasitus kerrostaloon",
    excerpt: "Turvallinen, testattu parvekelasitus, joka täydentää Lukkan-terassivalikoimaa.",
    description:
      "NIKA-parvekelasitus on Aluroll-konsernin ratkaisu kerrostalo- ja rivitaloparvekkeille. Lasitus suojaa säätä vastaan, vähentää melua ja pitää parvekkeen käyttökelpoisena pidempään. Järjestelmä on testattu ja CE-merkitty.",
    heroEyebrow: "Parvekelasitus",
    h1: "NIKA-parvekelasitus kerrostaloon",
    h2: "Sopiiko sama valmistaja sekä terassille että parvekkeelle?",
    imageSrc: "/images/product-parveke.svg",
    imageAlt: "NIKA-parvekelasitus kerrostalon julkisivussa",
    highlights: [
      "Kerrostalo- ja rivitalokohteet",
      "CE-merkitty, VTT-testattu",
      "Yhteensopiva lasikaiteiden kanssa",
      "Valtakunnallinen asennusverkosto",
    ],
    specs: [
      { label: "Tyyppi", value: "Parvekelasitus" },
      { label: "Lasi", value: "Karkaistu turvalasi" },
      { label: "Kohde", value: "Parvekkeet" },
      { label: "Täydentää", value: "LP-kaide" },
    ],
    faqs: [
      {
        question: "Sopiiko sama valmistaja sekä terassille että parvekkeelle?",
        answer:
          "Kyllä. Aluroll valmistaa sekä Lukkan-terassilasit että NIKA-parvekelasitukset. Jälleenmyyjä osaa suositella oikean järjestelmän kohteen mukaan.",
      },
    ],
    relatedSlugs: ["parvekelasitus", "kaiteet"],
  },
];

export const featuredProductSlugs = [
  "terassilasit",
  "lasiterassit",
  "parvekelasitus",
  "kaiteet",
] as const;

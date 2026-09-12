import type { FaqItem, Highlight, InterestOption, NavItem, Step, TrustBadge } from "./types";

export const navItems: NavItem[] = [
  { href: "/", label: "Etusivu" },
  { href: "/tuotteet", label: "Tuotteet" },
  { href: "/jalleenmyyjat", label: "Jälleenmyyjät" },
  { href: "/lukkan-studio", label: "Lukkan Studio" },
  { href: "/blogi", label: "Blogi" },
  { href: "/yhteystiedot", label: "Yhteystiedot" },
];

export const footerColumns = [
  {
    title: "Tuotteet",
    links: [
      { href: "/tuotteet/terassilasit", label: "Terassilasit" },
      { href: "/tuotteet/lasiterassit", label: "Lasiterassit" },
      { href: "/tuotteet/parvekelasitus", label: "Parvekelasitus" },
      { href: "/tuotteet/kaiteet", label: "Kaiteet" },
    ],
  },
  {
    title: "Palvelu",
    links: [
      { href: "/jalleenmyyjat", label: "Jälleenmyyjät" },
      { href: "/lukkan-studio", label: "Lukkan Studio" },
      { href: "/blogi", label: "Blogi" },
      { href: "/yhteystiedot", label: "Tarjouspyyntö" },
    ],
  },
] as const;

export const trustBadges: TrustBadge[] = [
  {
    id: "avainlippu",
    name: "Avainlippu",
    description: "Suomessa suunniteltu ja valmistettu.",
    imageSrc: "/badges/avainlippu.svg",
  },
  {
    id: "dss",
    name: "DSS",
    description: "Testattu kestävyys ja turvallisuus.",
    imageSrc: "/badges/dss.svg",
  },
];

export const homeContent = {
  hero: {
    eyebrow: "Suomalaiset terassilasit · valmistettu Lahdessa",
    h1: "Lisää tilaa elämäsi tärkeimmille asioille",
    lead: "Lukkan-terassilasit valmistetaan Suomessa ja suunnitellaan mittatilaustyönä jokaiseen kohteeseen. Toimiva ja tyylikäs lasitus tuo terassille lisää suojaa ja pidentää sen käyttöaikaa.",
    primaryCta: { href: "/yhteystiedot", label: "Pyydä tarjous" },
    secondaryCta: { href: "/tuotteet", label: "Tutustu tuotteisiin" },
    videoFallbackAlt: "Lasitettu terassi hämärässä, lämmin sisävalo ja skandinaavinen arkkitehtuuri",
  },
  highlightsHeading: "Löydä terassillesi sopiva lasitusratkaisu",
  highlightsLead:
    "Lukkanin terassilasit suunnitellaan erilaisiin terasseihin ja käyttötarpeisiin. Tutustu vaihtoehtoihin ja löydä kohteeseesi sopiva lasitusratkaisu.",
  highlights: [
    {
      title: "Terassilasitukset",
      description:
        "Lukkanin lasitusratkaisut valjastavat terassisi tilaksi, jota voit hyödyntää ympäri vuoden.",
      href: "/tuotteet/terassilasit",
      imageSrc: "/images/product-terassilasit.svg",
    },
    {
      title: "Parvekelasitukset",
      description:
        "Parvekelasitukset suojaavat tuulelta, sateelta ja lumelta. Ne ovat lisäksi turvalliset, kestävät ja tyylikkäät.",
      href: "/tuotteet/parvekelasitus",
      imageSrc: "/images/product-parveke.svg",
    },
    {
      title: "Lasiterassikokonaisuudet",
      description:
        "Runko, katto ja liukulasit samasta suomalaisesta järjestelmästä – valmis tila pihaan.",
      href: "/tuotteet/lasiterassit",
      imageSrc: "/images/product-lasiterassi.svg",
    },
  ] satisfies Highlight[],
  trust: {
    eyebrow: "Kotimainen valmistaja",
    h2: "Miksi valita Lukkan?",
    lead: "Aluroll Oy valmistaa Lukkan-lasituksia Metallikadulla Lahdessa. Jälleenmyyntiketju palvelee Hangosta Nuorgamiin.",
    points: [
      {
        title: "Mittatilaus jokaiseen kohteeseen",
        text: "Profiilit, lasipaksuudet ja lukitukset valitaan terassin mittojen ja käyttötavan mukaan.",
      },
      {
        title: "CE-merkityt lasijärjestelmät",
        text: "Tuulenpaine, iskunkestävyys ja turvalasi on testattu. Karkaistu lasi hajoaa tylppäreunaisiksi siruiksi.",
      },
      {
        title: "Koko Suomen jälleenmyynti",
        text: "Paikallinen asentaja mittaa, tarjoaa ja asentaa. Me valmistamme, jälleenmyyjä palvelee.",
      },
    ],
  },
  dealers: {
    h2: "Jälleenmyyntiketjumme kattaa koko Suomen",
    lead: "Jälleenmyyjämme palvelevat sinua Hangosta Nuorgamiin. Hae postinumerolla lähin lasitusosaaja.",
    cta: { href: "/jalleenmyyjat", label: "Etsi jälleenmyyjä" },
  },
  howToBuy: {
    h2: "Näin ostat terassilasituksen",
    steps: [
      {
        title: "Löydä jälleenmyyjä",
        description: "Hae postinumerolla tai kaupungilla. Paikallinen osaaja mittaa kohteen.",
      },
      {
        title: "Valitse järjestelmä",
        description: "Puitteellinen, puitteeton tai eristyslasi – valinta tehdään käytön mukaan.",
      },
      {
        title: "Pyydä tarjous",
        description: "Jätä tarjouspyyntö. Saat asennetun hinta-arvion ja tarkan tarjouksen.",
      },
    ] satisfies Step[],
  },
  studio: {
    h2: "Näe lasitus omalla terassillasi",
    lead: "Lukkan Studio visualisoi tekoälyllä, miltä liukulasit näyttäisivät nykyisessä pihassasi.",
    cta: { href: "/lukkan-studio", label: "Avaa Lukkan Studio" },
  },
  faqs: [
    {
      question: "Mitä eroa on puitteellisella ja puitteettomalla terassilasilla?",
      answer:
        "Puitteellisessa liukulasissa (Aava, GL) pystypuitteet tiivistävät luukut toisiinsa ja antavat paremman suojan tuulta, sadetta ja ääntä vastaan. Puitteeton Tyyni jättää näkymän avoimeksi: lasiluukut liukuvat ilman pystypuitteita, ja lasipaksuus on 6–10 mm. Valinta riippuu siitä, haluatko maksimaalisen säänsuojan vai mahdollisimman esteettömän maiseman.",
    },
    {
      question: "Sopivatko Lukkan-terassilasit ympärivuotiseen käyttöön?",
      answer:
        "Kyllä. Liukulasitus suojaa lumelta, sateelta, tuulelta ja pölyltä ja pidentää terassin käyttöaikaa. Puolilämpimään viherhuoneeseen suosittelemme Termo-eristyslasia, jossa on kaksinkertainen lasi ja kylmäkatkaistut profiilit.",
    },
    {
      question: "Missä Lukkan-terassilasit valmistetaan?",
      answer:
        "Lukkan on Aluroll Oy:n brändi. Lasitukset valmistetaan Metallikatu 1:ssä Lahdessa. Avainlippu kertoo suomalaisesta työstä; asennuksen tekee paikallinen jälleenmyyjä.",
    },
    {
      question: "Miten parvekelasitus vaikuttaa energiankulutukseen?",
      answer:
        "Parvekelasitus muodostaa puskurivyöhykkeen asunnon ja ulkoilman väliin. Tutkitusti lasitus voi pienentää asunnon energiankulutusta noin kuudella prosentilla, ja samalla parveke pysyy puhtaampana.",
    },
  ] satisfies FaqItem[],
  contact: {
    eyebrow: "Tarjouspyyntö",
    h2: "Ota yhteyttä",
    lead: "Kerro terassista tai parvekkeesta, niin ohjaamme pyynnön oikealle jälleenmyyjälle.",
  },
};

export const productsIndexContent = {
  eyebrow: "Tuotevalikoima",
  h1: "Terassilasit, lasiterassit, parvekelasitus ja kaiteet",
  lead: "Neljä tuoteryhmää, yksi suomalainen valmistaja. Valitse järjestelmä käyttötavan mukaan – lisää tilaa, suojaa ja käyttökuukausia.",
  h2: "Miten valitsen oikean lasituksen?",
  intro:
    "Terassilasi ei ole yksi tuote. Puitteellinen liukulasi tiivistää, puitteeton avaa näkymän, eristyslasi lämmittää ja lasiterassi rakentaa kokonaisen huoneen pihaan.",
};

export const resellersContent = {
  eyebrow: "Jälleenmyyjät",
  h1: "Löydä Lukkan-jälleenmyyjä lähelläsi",
  lead: "Hae suomalaisella postinumerolla tai kaupungin nimellä. Listaus ryhmitellään maakunnittain, ja kartta näyttää suodatetut toimipisteet.",
  searchLabel: "Postinumero tai kaupunki",
  searchPlaceholder: "esim. 15160 tai Lahti",
  searchButton: "Hae lähimmät",
  resetLabel: "Näytä kaikki",
  empty: "Ei jälleenmyyjiä haulla. Kokeile kaupunkia tai viisinumeroista postinumeroa.",
  mapFallback:
    "Kartta tarvitsee Google Maps -avaimen (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY). Alla on sama hakutulos listana.",
  contactCta: "Ota yhteyttä",
  resultsHeading: "Toimipisteet",
};

export const studioContent = {
  eyebrow: "Lukkan Studio",
  h1: "Tekoäly lasittaa terassisi",
  lead: "Lataa kuva nykyisestä terassista. Visualisoija simuloi liukulasit tilaan – ennen ja jälkeen samassa näkymässä.",
  dropTitle: "Vedä terassikuva tähän",
  dropHint: "JPG, PNG tai WebP · enintään 8 Mt",
  browseLabel: "Valitse tiedosto",
  loading: "Tekoäly lasittaa terassiasi...",
  beforeLabel: "Ennen",
  afterLabel: "Jälkeen",
  resetLabel: "Uusi kuva",
  mockNotice:
    "Esikatselu on demotila. Kun REPLICATE_API_TOKEN on asetettu, /api/visualize käyttää Flux/Stable Diffusion -inpaintingia.",
  error: "Kuvan käsittely epäonnistui. Kokeile toista valokuvaa.",
};

export const blogIndexContent = {
  eyebrow: "Blogi",
  h1: "Vinkit terassilasien valintaan",
  lead: "Artikkelit on jäsennelty valmiiksi headless-CMS-adapterille. Uusi juttu = uusi objekti config/blog.ts-tiedostoon.",
};

export const contactPageContent = {
  eyebrow: "Yhteystiedot",
  h1: "Ota yhteyttä / tarjouspyyntö",
  lead: "Aluroll Oy · Metallikatu 1, 15160 Lahti · 0291 230 221",
  factoryHeading: "Tehdas ja myynti",
  factoryBody:
    "Valmistus Lahdessa, asennus paikallisen jälleenmyyjän kautta. Jätä tarjouspyyntö, niin ohjaamme sen oikealle alueelle.",
};

export const formContent = {
  name: { label: "Nimi", placeholder: "Etunimi Sukunimi" },
  phone: { label: "Puhelin", placeholder: "040 123 4567" },
  postalCode: { label: "Postinumero", placeholder: "15160" },
  interest: { label: "Kiinnostuksen kohde" },
  interests: [
    { value: "terrace", label: "Terassi / lasiterassi" },
    { value: "balcony", label: "Parveke" },
  ] satisfies InterestOption[],
  message: {
    label: "Viesti",
    placeholder: "Kerro mitat, käyttötarkoitus ja toivottu aikataulu.",
  },
  submit: "Lähetä tarjouspyyntö",
  sending: "Lähetetään…",
  success: "Kiitos. Tarjouspyyntö on vastaanotettu. Palaamme pian.",
  error: "Lähetys epäonnistui. Soita 0291 230 221 tai yritä uudelleen.",
  required: "Pakollinen kenttä",
  invalidPhone: "Anna kelvollinen suomalainen puhelinnumero",
  invalidPostal: "Anna viisinumeroinen suomalainen postinumero",
};

export const notFoundContent = {
  h1: "Sivua ei löytynyt",
  lead: "Linkki on vanhentunut tai osoite on kirjoitettu väärin.",
  cta: { href: "/", label: "Palaa etusivulle" },
};

export const a11y = {
  skipToContent: "Siirry sisältöön",
  openMenu: "Avaa valikko",
  closeMenu: "Sulje valikko",
  mainNav: "Päävalikko",
};

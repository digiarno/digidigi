# Lukkan hintalaskuri

Lasiterassin ja lasitusten suuntaa-antava hintalaskuri lukkan.fi-sivuston tyyliin. Laskuri auttaa asiakasta hahmottamaan asennetun lasituksen kustannuksen ja ohjaa pyytämään tarkan tarjouksen Lukkanilta.

Hinnat on poimittu kuluttajahintahaitarista (asennettuna, ALV 25,5 %). Laskuri kertoo aina, että kyseessä on **arvio** ja että **asennus sisältyy** hintoihin.

## Mitä laskuri laskee

| Tuote | Haitari | Yksikkö |
| --- | --- | --- |
| Pystypuitteellinen liukulasitus (Aava ja GL) | 400–600 € | jm |
| Pystypuitteellinen eristyslasitus (Termo) | 800–1 000 € | jm |
| Pystypuitteeton liukulasitus (Tyyni) | 500–700 € | jm |
| Parvekelasitus | 400–600 € | jm |
| Korkea lasitus | 500–700 € | jm |
| Lasikaide | 550–750 € | jm |
| Lasiterassikokonaisuus sisältäen liukulasit | 700–1 100 € | m² |
| Perustukset | 200–300 € | m² |

Mallit vastaavat lukkan.fi-tuotevalikoimaa:

- **Aava** – moderni pystypuitteellinen liukulasi
- **GL** – klassinen pystypuitteellinen liukulasi
- **Termo** – eristyslasi puolilämpimiin tiloihin
- **Tyyni** – pystypuitteeton liukulasi
- **Parvekelasitus** – NIKA-parvekelasitus
- **LP-kaide** – lasikaide terassille tai parvekkeelle

## Upotus WordPressiin

### Tapa 1: lisäosa ja lyhytkoodi (suositus)

1. Kopioi kansio `lukkan-hintalaskuri` WordPress-sivuston hakemistoon `wp-content/plugins/`.
2. Aktivoi lisäosa **Lukkan Hintalaskuri** kohdasta *Lisäosat*.
3. Lisää haluamalle sivulle lyhytkoodi:

```
[lukkan_hintalaskuri]
```

Valinnaiset attribuutit:

```
[lukkan_hintalaskuri quote_url="https://lukkan.fi/yhteystiedot/" dealers_url="https://lukkan.fi/jalleenmyyjat/"]
```

### Tapa 2: iframe

Lataa `embed.html` sekä `assets/`-kansio esimerkiksi hakemistoon `wp-content/uploads/lukkan-hintalaskuri/`. Lisää sivulle Mukautettu HTML -lohko:

```html
<iframe
  id="lukkan-hintalaskuri"
  src="https://lukkan.fi/wp-content/uploads/lukkan-hintalaskuri/embed.html"
  title="Lukkan hintalaskuri"
  style="width:100%;border:0;min-height:1100px;"
></iframe>
<script>
  window.addEventListener("message", function (event) {
    if (!event.data || event.data.type !== "lukkan-hintalaskuri-height") return;
    var frame = document.getElementById("lukkan-hintalaskuri");
    if (frame) frame.style.height = event.data.height + "px";
  });
</script>
```

Vaihda `src`-osoite sen mukaan, minne tiedostot on tallennettu.

## Esikatselu

Avaa `index.html` selaimessa. Tiedosto näyttää laskurin Lukkanin sivupohjaa mukailevassa kehyksessä.

## Huomioitavaa

- Laskurin tulos ei ole tarjous. Todellinen hinta riippuu kohteen yksityiskohdista ja tuotevalinnoista.
- CTA-painikkeet vievät Lukkanin tarjouspyyntöön, jälleenmyyjähakuun tai sähköpostiin.
- Tyyli käyttää sivuston värejä (`#003568`, `#4F79AB`, `#9DCF58`) sekä fontteja Inter ja IBM Plex Serif.

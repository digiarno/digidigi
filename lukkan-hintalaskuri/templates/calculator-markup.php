<?php
if (!isset($quote_url)) {
    $quote_url = 'https://lukkan.fi/yhteystiedot/';
}
if (!isset($dealers_url)) {
    $dealers_url = 'https://lukkan.fi/jalleenmyyjat/';
}
if (!isset($logo_url)) {
    $logo_url = 'assets/lukkan-logo.svg';
}
?>
<div class="lhk" data-lhk-root data-quote-url="<?php echo htmlspecialchars($quote_url, ENT_QUOTES, 'UTF-8'); ?>" data-dealers-url="<?php echo htmlspecialchars($dealers_url, ENT_QUOTES, 'UTF-8'); ?>">
  <div class="lhk-shell">
    <header class="lhk-hero">
      <div class="lhk-hero-top">
        <img class="lhk-logo" src="<?php echo htmlspecialchars($logo_url, ENT_QUOTES, 'UTF-8'); ?>" alt="Lukkan" width="128" height="29">
        <span class="lhk-badge">Suuntaa-antava arvio</span>
      </div>
      <h2>Lasiterassin hintalaskuri</h2>
      <p>Hahmota, mitä kotimainen Lukkan-lasitus maksaa asennettuna. Laskuri antaa hinta-arvion kuluttajahinnoista. Lopullinen hinta tarkentuu maksuttomalla suunnittelukäynnillä.</p>
      <div class="lhk-hero-notes">
        <span class="lhk-note">Asennus sisältyy hintoihin</span>
        <span class="lhk-note">ALV 25,5 %</span>
        <span class="lhk-note">Hinta riippuu kohteen yksityiskohdista</span>
      </div>
    </header>

    <div class="lhk-layout">
      <div class="lhk-form">
        <section class="lhk-step">
          <div class="lhk-step-label">
            <span class="lhk-step-num">01</span>
            <h3 class="lhk-step-title">Mitä haluat laskea?</h3>
          </div>
          <div class="lhk-options" role="radiogroup" aria-label="Projektin tyyppi">
            <label class="lhk-option">
              <input type="radio" name="lhk-project" value="lasiterassi" checked>
              <span class="lhk-option-card">
                <span class="lhk-option-name">Lasiterassi</span>
                <span class="lhk-option-desc">Katto, alumiinirunko ja liukulasit valmiina kokonaisuutena.</span>
              </span>
            </label>
            <label class="lhk-option">
              <input type="radio" name="lhk-project" value="terassilasitus">
              <span class="lhk-option-card">
                <span class="lhk-option-name">Terassin lasitus</span>
                <span class="lhk-option-desc">Liukulasit olemassa olevalle terassille, Aava, GL, Termo tai Tyyni.</span>
              </span>
            </label>
            <label class="lhk-option">
              <input type="radio" name="lhk-project" value="parveke">
              <span class="lhk-option-card">
                <span class="lhk-option-name">Parvekelasitus</span>
                <span class="lhk-option-desc">NIKA-parvekelasitus suojaa tuulelta, sateelta ja lumelta.</span>
              </span>
            </label>
            <label class="lhk-option">
              <input type="radio" name="lhk-project" value="kaide">
              <span class="lhk-option-card">
                <span class="lhk-option-name">Lasikaide</span>
                <span class="lhk-option-desc">Lukkan LP-kaide terassille, rappuihin tai parvekelasituksen alle.</span>
              </span>
            </label>
          </div>
        </section>

        <section class="lhk-step" data-panel-model>
          <div class="lhk-step-label">
            <span class="lhk-step-num">02</span>
            <h3 class="lhk-step-title">Valitse lasitusmalli</h3>
          </div>
          <div class="lhk-models" role="radiogroup" aria-label="Lasitusmalli">
            <label class="lhk-option lhk-model">
              <input type="radio" name="lhk-model" value="aava" checked>
              <span class="lhk-option-card">
                <span class="lhk-model-tag">Pystypuitteellinen</span>
                <span class="lhk-option-name">Lukkan Aava</span>
                <span class="lhk-option-desc">Moderni liukulasi aaltomaisilla, pyöristetyillä profiileilla.</span>
              </span>
            </label>
            <label class="lhk-option lhk-model">
              <input type="radio" name="lhk-model" value="gl">
              <span class="lhk-option-card">
                <span class="lhk-model-tag">Pystypuitteellinen</span>
                <span class="lhk-option-name">Lukkan GL</span>
                <span class="lhk-option-desc">Klassinen, toimintavarma liukulasi vuosikymmenten suosiolla.</span>
              </span>
            </label>
            <label class="lhk-option lhk-model">
              <input type="radio" name="lhk-model" value="termo">
              <span class="lhk-option-card">
                <span class="lhk-model-tag">Eristyslasi</span>
                <span class="lhk-option-name">Lukkan Termo</span>
                <span class="lhk-option-desc">Kaksinkertainen eristyslasi viherhuoneeseen ja puolilämpimään tilaan.</span>
              </span>
            </label>
            <label class="lhk-option lhk-model">
              <input type="radio" name="lhk-model" value="tyyni">
              <span class="lhk-option-card">
                <span class="lhk-model-tag">Puitteeton</span>
                <span class="lhk-option-name">Lukkan Tyyni</span>
                <span class="lhk-option-desc">Siro pystypuitteeton liukulasi esteettömään näköalaan.</span>
              </span>
            </label>
          </div>
        </section>

        <section class="lhk-step" data-panel-dims>
          <div class="lhk-step-label">
            <span class="lhk-step-num">03</span>
            <h3 class="lhk-step-title">Terassin mitat</h3>
          </div>
          <div class="lhk-fields">
            <div class="lhk-field">
              <label for="lhk-width">Leveys</label>
              <div class="lhk-input-wrap">
                <input class="lhk-input" id="lhk-width" name="lhk-width" type="number" inputmode="decimal" min="1" max="40" step="0.1" value="4.0">
                <span class="lhk-unit">m</span>
              </div>
            </div>
            <div class="lhk-field">
              <label for="lhk-depth">Syvyys</label>
              <div class="lhk-input-wrap">
                <input class="lhk-input" id="lhk-depth" name="lhk-depth" type="number" inputmode="decimal" min="1" max="20" step="0.1" value="3.0">
                <span class="lhk-unit">m</span>
              </div>
            </div>
            <div class="lhk-field lhk-field-full" data-panel-sides>
              <label for="lhk-sides">Avoimia sivuja lasitettavaksi</label>
              <select class="lhk-select" id="lhk-sides" name="lhk-sides">
                <option value="1">1 sivu (etusivu)</option>
                <option value="2">2 sivua (L-muoto)</option>
                <option value="3" selected>3 sivua (U-muoto)</option>
              </select>
              <p class="lhk-help">Lasitettava juoksumäärä lasketaan leveyden, syvyyden ja avointen sivujen mukaan.</p>
            </div>
          </div>
          <div class="lhk-diagram" data-panel-diagram>
            <svg viewBox="0 0 220 170" data-lhk-diagram aria-hidden="true">
              <rect x="0" y="0" width="220" height="170" fill="#f5f5f2"></rect>
              <text x="110" y="12" text-anchor="middle" fill="#003568" font-size="9" font-family="Inter, sans-serif">Talo</text>
              <rect data-house x="20" y="18" width="180" height="10" fill="#003568"></rect>
              <rect data-glass x="20" y="28" width="160" height="90" fill="#4f79ab" fill-opacity="0.28" stroke="#003568" stroke-width="2"></rect>
              <text data-label-w x="100" y="138" text-anchor="middle" fill="#003568" font-size="11" font-family="Inter, sans-serif">4,0 m</text>
              <text data-label-d x="188" y="78" text-anchor="start" fill="#003568" font-size="11" font-family="Inter, sans-serif">3,0 m</text>
            </svg>
          </div>
        </section>

        <section class="lhk-step lhk-hidden" data-panel-length>
          <div class="lhk-step-label">
            <span class="lhk-step-num">03</span>
            <h3 class="lhk-step-title">Lasituksen pituus</h3>
          </div>
          <div class="lhk-fields">
            <div class="lhk-field">
              <label for="lhk-length">Juoksumetrit</label>
              <div class="lhk-input-wrap">
                <input class="lhk-input" id="lhk-length" name="lhk-length" type="number" inputmode="decimal" min="1" max="80" step="0.1" value="4.0">
                <span class="lhk-unit">m</span>
              </div>
            </div>
            <div class="lhk-field">
              <label for="lhk-height">Korkeus (valinnainen)</label>
              <div class="lhk-input-wrap">
                <input class="lhk-input" id="lhk-height" name="lhk-height" type="number" inputmode="decimal" min="0.5" max="4" step="0.1" value="2.1">
                <span class="lhk-unit">m</span>
              </div>
            </div>
          </div>
          <p class="lhk-help">Yli 2,5 m korkeissa kohteissa käytetään korkean lasituksen hintahaarukkaa.</p>
        </section>

        <section class="lhk-step" data-panel-extras>
          <div class="lhk-step-label">
            <span class="lhk-step-num">04</span>
            <h3 class="lhk-step-title">Lisäosat</h3>
          </div>
          <div class="lhk-toggles">
            <label class="lhk-toggle" data-panel-foundations>
              <input type="checkbox" name="lhk-foundations">
              <span class="lhk-toggle-card">
                <span class="lhk-check" aria-hidden="true"></span>
                <span>
                  <span class="lhk-toggle-title">Perustukset</span>
                  <span class="lhk-toggle-desc">Ruuvipaalut tai betoniperustus uudelle lasiterassille, 200–300 €/m² asennettuna.</span>
                </span>
              </span>
            </label>
            <label class="lhk-toggle" data-panel-high>
              <input type="checkbox" name="lhk-high">
              <span class="lhk-toggle-card">
                <span class="lhk-check" aria-hidden="true"></span>
                <span>
                  <span class="lhk-toggle-title">Korkea lasitus</span>
                  <span class="lhk-toggle-desc">Lattianrajasta kattoon ulottuva lasitus, tyypillisesti noin 2,5 m tai korkeampi.</span>
                </span>
              </span>
            </label>
            <label class="lhk-toggle" data-panel-kaide>
              <input type="checkbox" name="lhk-kaide">
              <span class="lhk-toggle-card">
                <span class="lhk-check" aria-hidden="true"></span>
                <span>
                  <span class="lhk-toggle-title">Lasikaide</span>
                  <span class="lhk-toggle-desc">Tarvitaan, jos putoamiskorkeus ylittää 50 cm. Lukkan LP-kaide 550–750 €/jm.</span>
                </span>
              </span>
            </label>
          </div>
          <div class="lhk-extra-field" data-kaide-extras>
            <div class="lhk-field">
              <label for="lhk-kaide-length">Kaiteen pituus</label>
              <div class="lhk-input-wrap">
                <input class="lhk-input" id="lhk-kaide-length" name="lhk-kaide-length" type="number" inputmode="decimal" min="0" max="80" step="0.1" placeholder="esim. 4.0">
                <span class="lhk-unit">m</span>
              </div>
              <p class="lhk-help">Jos jätät tyhjäksi, laskuri käyttää terassin leveyttä tai lasituksen juoksumetrejä.</p>
            </div>
          </div>
        </section>
      </div>

      <aside class="lhk-summary">
        <p class="lhk-summary-kicker">Hinta-arvio</p>
        <h3>Arvioitu kustannus</h3>
        <div class="lhk-price">
          <p class="lhk-price-label">Suuntaa-antava hinta asennettuna</p>
          <p class="lhk-price-range" data-lhk-price>–</p>
          <p class="lhk-price-meta" data-lhk-price-meta>Täytä mitat, niin näet suuntaa-antavan hinta-arvion.</p>
        </div>
        <p class="lhk-empty" data-lhk-empty>Anna terassin mitat vasemmalta, niin laskuri muodostaa hinta-arvion.</p>
        <ul class="lhk-breakdown" data-lhk-breakdown></ul>
        <p class="lhk-disclaimer">Hinnat ovat suuntaa-antavia kuluttajahintoja asennettuna, ALV 25,5 %. Todellinen hinta riippuu kohteen yksityiskohdista, tuotevalinnoista, lasin paksuudesta, väristä, lukituksesta ja asennusolosuhteista. Laskuri ei ole tarjous.</p>
        <div class="lhk-cta">
          <a class="lhk-btn lhk-btn-primary" data-lhk-quote href="<?php echo htmlspecialchars($quote_url, ENT_QUOTES, 'UTF-8'); ?>">Pyydä tarkka tarjous</a>
          <a class="lhk-btn lhk-btn-secondary" href="<?php echo htmlspecialchars($dealers_url, ENT_QUOTES, 'UTF-8'); ?>">Etsi jälleenmyyjä</a>
          <a class="lhk-btn lhk-btn-secondary" data-lhk-mail href="mailto:asiakaspalvelu@lukkan.fi">Lähetä arvio sähköpostitse</a>
        </div>
        <p class="lhk-phone">Tai soita <a href="tel:+358291230221">029 123 0221</a></p>
      </aside>
    </div>
  </div>
</div>

/**
 * APLICACIÓN PRINCIPAL - WEBAPP BAÑOS DE LA ENCINA
 * =================================================
 */

// Estado global de la aplicación
const AppState = {
  lang: localStorage.getItem('encina_lang') || 'es',
  fontSize: localStorage.getItem('encina_font_size') || 'normal',
  currentAudio: null,
  isPlaying: false,
  mapInstance: null,
  activeDetailHito: null
};

// Textos de interfaz bilingües
const UI_TEXTS = {
  es: {
    appTitle: "",
    welcomeBadge: "Historias Contadas",
    homeTitle: "Descubre Baños de la Encina",
    homeSubtitle: "Un viaje a través de la historia milenaria de uno de los pueblos más bonitos de España.",
    btnStart: "Ver lista de hitos",
    btnMap: "Ver mapa interactivo",
    fontSizeLabel: "",
    subvencionesLabel: "Proyecto subvencionado por:",
    listTitle: "Ruta de los Hitos",
    listSubtitle: "monumentos y puntos de interés",
    landmarkBadge: "Hito",
    audioGuide: "Audioguía",
    listenAudio: "Escuchar audioguía",
    prevBtn: "← Anterior",
    nextBtn: "Siguiente →",
    locateMe: "Mi ubicación",
    viewDetail: "Ver hito",
    tapToZoom: "Toca para ampliar",
    back: "Volver",
    credits: "Créditos",
    notFoundTitle: "Hito no disponible",
    notFoundText: "Este punto de interés está en preparación para futuras ampliaciones.",
    backToList: "Volver al listado",
    allRoutes: "Todas las rutas",
    viewAllPoints: "Ver todos los puntos de interés",
    filterByRoute: "Filtrar por ruta:"
  },
  en: {
    appTitle: "",
    welcomeBadge: "Told Stories",
    homeTitle: "Discover Baños de la Encina",
    homeSubtitle: "A journey through the millenary history of one of the prettiest villages in Spain.",
    btnStart: "Explore Landmarks",
    btnMap: "Interactive Map",
    fontSizeLabel: "",
    subvencionesLabel: "Project sponsored by:",
    listTitle: "Landmarks Route",
    listSubtitle: "monuments & points of interest",
    landmarkBadge: "Point",
    audioGuide: "Audio Guide",
    listenAudio: "Listen to audio guide",
    prevBtn: "← Previous",
    nextBtn: "Next →",
    locateMe: "My Location",
    viewDetail: "View Landmark",
    tapToZoom: "Tap to expand",
    back: "Back",
    credits: "Credits",
    notFoundTitle: "Landmark Not Available",
    notFoundText: "This point of interest is being prepared for upcoming extensions.",
    backToList: "Back to list",
    allRoutes: "All routes",
    viewAllPoints: "View all points of interest",
    filterByRoute: "Filter by route:"
  }
};

// ========================================================
// INICIALIZACIÓN
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
  // Sincronizar datos: combinar la base oficial de hitos.js con las personalizaciones locales (coordenadas, logos, fotos)
  try {
    const saved = localStorage.getItem('encina_hitos_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach(savedHito => {
          const target = HITOS.find(h => h.id === savedHito.id);
          if (target) {
            // Preservar coordenadas personalizadas del mapa
            if (savedHito.lat && (savedHito.lat !== 38.1711 || savedHito.lng !== -3.7742)) {
              target.lat = savedHito.lat;
              target.lng = savedHito.lng;
            }
            // Preservar logotipos asignados
            if (Array.isArray(savedHito.logos) && savedHito.logos.length > 0) {
              target.logos = savedHito.logos.map(l => l === 'logos_4.png' ? 'logos_04.png' : l);
            }
            // Preservar imágenes asignadas (como segunda imagen)
            if (Array.isArray(savedHito.imagenes) && savedHito.imagenes.length > 0) {
              target.imagenes = savedHito.imagenes.map(img => img.replace(/^img_(\d+)_0?(\d+)\.(jpg|jpeg|png)$/i, 'panel-$1_$2.$3'));
            }
            // Preservar enlaces externos o documentos PDF
            if (savedHito.enlace_url) target.enlace_url = savedHito.enlace_url;
            if (savedHito.enlace_texto_es) target.enlace_texto_es = savedHito.enlace_texto_es;
            if (savedHito.enlace_texto_en) target.enlace_texto_en = savedHito.enlace_texto_en;
            if (savedHito.ajuste_imagen) target.ajuste_imagen = savedHito.ajuste_imagen;
            if (savedHito.texto_subvencion_es) target.texto_subvencion_es = savedHito.texto_subvencion_es;
            if (savedHito.texto_subvencion_en) target.texto_subvencion_en = savedHito.texto_subvencion_en;
            if (savedHito.ruta) target.ruta = savedHito.ruta;
          }
        });
      }
    }
  } catch (e) {}

  // Recuperar versión y créditos personalizados si fueron editados en el panel admin
  try {
    const savedConfig = localStorage.getItem('encina_app_config');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      if (parsedConfig && parsedConfig.version && typeof APP_CONFIG !== 'undefined') {
        Object.assign(APP_CONFIG, parsedConfig);
      }
    }
  } catch (e) {}

  setupHeaderEvents();
  setupRouting();
  setupLightbox();
});

// ========================================================
// ENRUTADOR (ROUTER)
// ========================================================
function setupRouting() {
  window.addEventListener("hashchange", handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash || "#/";
  stopCurrentAudio();

  // Scroll to top
  window.scrollTo(0, 0);

  // Soporte compatibilidad QR antiguo con #/detail/0 -> redirigir a #/detail/1
  if (hash === "#/detail/0") {
    window.location.hash = "#/detail/1";
    return;
  }

  const [path, queryString] = hash.split("?");
  const params = new URLSearchParams(queryString || "");
  const rutaParam = params.get("ruta");

  if (path === "#/" || path === "") {
    renderHome();
  } else if (path === "#/list") {
    renderList(rutaParam);
  } else if (path.startsWith("#/detail/")) {
    const id = parseInt(path.replace("#/detail/", ""), 10);
    renderDetail(id);
  } else if (path === "#/map") {
    renderMap(rutaParam);
  } else if (path === "#/credits") {
    renderCredits();
  } else {
    renderHome();
  }
}

// ========================================================
// CABECERA Y EVENTOS GENERALES
// ========================================================
function setupHeaderEvents() {
  const btnEs = document.getElementById("btn-es");
  const btnEn = document.getElementById("btn-en");

  if (btnEs && btnEn) {
    btnEs.addEventListener("click", () => setLanguage("es"));
    btnEn.addEventListener("click", () => setLanguage("en"));
    updateLanguageButtons();
  }
}

function setLanguage(lang) {
  if (AppState.lang === lang) return;
  AppState.lang = lang;
  localStorage.setItem('encina_lang', lang);
  updateLanguageButtons();

  // Re-renderizar la vista actual con el nuevo idioma
  const hash = window.location.hash || "#/";
  const [path, queryString] = hash.split("?");
  const params = new URLSearchParams(queryString || "");
  const rutaParam = params.get("ruta");

  if (path.startsWith("#/detail/")) {
    const id = parseInt(path.replace("#/detail/", ""), 10);
    renderDetail(id);
  } else if (path === "#/list") {
    renderList(rutaParam);
  } else if (path === "#/map") {
    renderMap(rutaParam);
  } else if (path === "#/credits") {
    renderCredits();
  } else {
    renderHome();
  }
}

function updateLanguageButtons() {
  const btnEs = document.getElementById("btn-es");
  const btnEn = document.getElementById("btn-en");
  if (btnEs && btnEn) {
    btnEs.classList.toggle("active", AppState.lang === 'es');
    btnEn.classList.toggle("active", AppState.lang === 'en');
  }
}

function t(key) {
  return (UI_TEXTS[AppState.lang] && UI_TEXTS[AppState.lang][key]) || UI_TEXTS.es[key] || "";
}

// ========================================================
// VISTA: PORTADA (HOME)
// ========================================================
function renderHome() {
  AppState.activeDetailHito = null;
  const container = document.getElementById("app-content");
  updateHeaderBar({ showBack: false, showMap: true, title: "" });

  const rutasKeys = typeof RUTAS !== 'undefined' ? Object.keys(RUTAS) : [];
  const routeButtonsHtml = rutasKeys.map(key => {
    const r = RUTAS[key];
    const name = AppState.lang === 'en' ? r.nombre_en : r.nombre_es;
    return `
      <a href="#/list?ruta=${r.id}" class="route-btn route-bg-${r.id}" style="background-color: ${r.color || '#c2883d'} !important; color: #ffffff !important;">
        ${name}
      </a>
    `;
  }).join("");

  const appVersion = (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.version) ? APP_CONFIG.version : "1.0.0";

  container.innerHTML = `
    <div class="home-hero">
      <img src="assets/images/cabecera.png" alt="Baños de la Encina" onerror="this.src='assets/images/cabecera_2.png'">
    </div>
    <div class="home-content">
      <span class="home-badge">${t("welcomeBadge")}</span>

      <div class="routes-menu">
        ${routeButtonsHtml}
      </div>

      <div class="home-logos">
        <img src="assets/images/logo_ayto_banos.png" alt="Ayuntamiento de Baños de la Encina">
      </div>

      <div class="home-footer-version" style="text-align: center; margin-top: 14px; padding-bottom: 22px;">
        <a href="#/credits" class="version-badge-link" title="${t('credits')}" style="display: inline-block; font-size: 0.74rem; color: var(--color-text-muted); opacity: 0.65; text-decoration: none; font-weight: 700; padding: 4px 12px; border-radius: 12px; transition: all 0.2s;">
          v${appVersion}
        </a>
      </div>
    </div>
  `;
}

// ========================================================
// VISTA: LISTA DE HITOS
// ========================================================
function renderList(rutaFilter = null) {
  AppState.activeDetailHito = null;
  const container = document.getElementById("app-content");
  
  const activeRuta = (rutaFilter && typeof RUTAS !== 'undefined' && RUTAS[rutaFilter]) ? RUTAS[rutaFilter] : null;
  const pageTitle = activeRuta ? (AppState.lang === 'en' ? activeRuta.nombre_en : activeRuta.nombre_es) : t("listTitle");

  updateHeaderBar({ showBack: true, backHash: "#/", showMap: true, title: pageTitle });

  const hitosToShow = activeRuta 
    ? HITOS.filter(h => (h.ruta || 'paseando') === activeRuta.id)
    : HITOS;

  // Barra de pestañas de filtro de ruta
  const rutasKeys = typeof RUTAS !== 'undefined' ? Object.keys(RUTAS) : [];
  const tabsHtml = `
    <div class="route-tabs-container">
      <div class="route-tabs">
        <a href="#/list" class="route-tab ${!activeRuta ? 'active' : ''}" style="${!activeRuta ? 'background-color: #4a3429; color: white;' : ''}">
          ${t("allRoutes")} (${HITOS.length})
        </a>
        ${rutasKeys.map(key => {
          const r = RUTAS[key];
          const count = HITOS.filter(h => (h.ruta || 'paseando') === r.id).length;
          const name = AppState.lang === 'en' ? r.nombre_en : r.nombre_es;
          const isCurrent = activeRuta && activeRuta.id === r.id;
          const style = isCurrent ? `background-color: ${r.color}; color: white; border-color: ${r.color};` : '';
          return `
            <a href="#/list?ruta=${r.id}" class="route-tab ${isCurrent ? 'active' : ''}" style="${style}">
              <span>${name}</span>
              <span style="opacity: 0.8; font-size: 0.72rem;">(${count})</span>
            </a>
          `;
        }).join("")}
      </div>
    </div>
  `;

  let cardsHtml = "";
  hitosToShow.forEach(h => {
    const title = AppState.lang === 'en' ? (h.titulo_en || h.titulo_es) : h.titulo_es;
    const thumb = h.imagenes && h.imagenes.length > 0 ? getAppImgSrc(h.imagenes[0]) : "assets/images/placeholder.png";
    const ruta = (typeof RUTAS !== 'undefined' && RUTAS[h.ruta]) ? RUTAS[h.ruta] : RUTAS['paseando'];
    const rutaName = AppState.lang === 'en' ? ruta.nombre_en : ruta.nombre_es;

    const hasAudio = AppState.lang === 'en'
      ? Boolean((h.audio_en && h.audio_en.trim()) || (h.audio_es && h.audio_es.trim()))
      : Boolean(h.audio_es && h.audio_es.trim());

    cardsHtml += `
      <a href="#/detail/${h.id}" class="landmark-card">
        <div class="landmark-card-thumb">
          <img src="${thumb}" alt="${title}" loading="lazy" onerror="this.src='assets/images/fondo.png'">
          <div class="landmark-card-badge" style="background-color: ${ruta.color};">${h.id}</div>
        </div>
        <div class="landmark-card-info">
          <span class="landmark-route-tag" style="background-color: ${ruta.color}15; color: ${ruta.color}; border: 1px solid ${ruta.color}35;">
            ${rutaName}
          </span>
          <h3 class="landmark-card-title">${title}</h3>
          ${hasAudio ? `
          <span class="landmark-card-audio-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            ${t("audioGuide")}
          </span>
          ` : ''}
        </div>
      </a>
    `;
  });

  container.innerHTML = `
    <div class="list-header" style="${activeRuta ? `border-left: 4px solid ${activeRuta.color}; padding-left: 12px;` : ''}">
      <h2>${pageTitle}</h2>
      <span class="list-count">${hitosToShow.length} ${t("listSubtitle")}</span>
    </div>
    ${tabsHtml}
    <div class="landmarks-grid">
      ${cardsHtml}
    </div>
  `;
}

// ========================================================
// VISTA: DETALLE DE HITO
// ========================================================
function renderDetail(id) {
  const hito = HITOS.find(h => h.id === id);
  const container = document.getElementById("app-content");

  if (!hito) {
    updateHeaderBar({ showBack: true, backHash: "#/list", showMap: true, title: t("appTitle") });
    container.innerHTML = `
      <div style="padding: 40px 20px; text-align: center;">
        <img src="assets/images/en_construccion.png" style="max-width: 140px; margin-bottom: 20px;">
        <h2 style="color: var(--color-primary-dark); margin-bottom: 10px;">${t("notFoundTitle")}</h2>
        <p style="color: var(--color-text-muted); margin-bottom: 24px;">${t("notFoundText")}</p>
        <a href="#/list" class="btn-primary" style="display:inline-flex;">${t("backToList")}</a>
      </div>
    `;
    return;
  }

  AppState.activeDetailHito = hito;
  const title = AppState.lang === 'en' ? (hito.titulo_en || hito.titulo_es) : hito.titulo_es;
  const text = AppState.lang === 'en' ? (hito.texto_en || hito.texto_es) : hito.texto_es;
  const rawAudio = AppState.lang === 'en' ? (hito.audio_en || hito.audio_es) : hito.audio_es;
  const audioFile = (rawAudio && typeof rawAudio === 'string' && rawAudio.trim().length > 0) ? rawAudio.trim() : null;
  const ruta = (typeof RUTAS !== 'undefined' && RUTAS[hito.ruta]) ? RUTAS[hito.ruta] : RUTAS['paseando'];
  const rutaName = AppState.lang === 'en' ? ruta.nombre_en : ruta.nombre_es;

  updateHeaderBar({ showBack: true, backHash: `#/list?ruta=${ruta.id}`, showMap: true, title: `${t("landmarkBadge")} ${hito.id}` });

  // Galería de fotos
  let carouselHtml = "";
  if (hito.imagenes && hito.imagenes.length > 0) {
    const dots = hito.imagenes.map((_, i) => `<span class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></span>`).join("");
    
    // Encuadre personalizado de la imagen (arriba, centro, abajo o foto completa)
    const ajuste = hito.ajuste_imagen || (hito.id >= 20 && hito.id <= 37 ? "top" : "center");
    let imgStyle = "object-fit: cover; object-position: center center;";
    if (ajuste === "top") {
      imgStyle = "object-fit: cover; object-position: top center;";
    } else if (ajuste === "bottom") {
      imgStyle = "object-fit: cover; object-position: bottom center;";
    } else if (ajuste === "contain") {
      imgStyle = "object-fit: contain; object-position: center center; background: #1a1615;";
    }

    carouselHtml = `
      <div class="detail-carousel" id="detail-carousel">
        <img id="carousel-img" src="${getAppImgSrc(hito.imagenes[0])}" alt="${title}" style="${imgStyle}" onclick="openLightbox(this.src)">
        <div class="carousel-zoom-hint" onclick="openLightbox(document.getElementById('carousel-img').src)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          <span>${t("tapToZoom")}</span>
        </div>
        ${hito.imagenes.length > 1 ? `<div class="carousel-indicators">${dots}</div>` : ""}
      </div>
    `;
  }

  // Reproductor de audio (solo si tiene archivo asignado)
  let audioPlayerHtml = "";
  if (audioFile) {
    audioPlayerHtml = `
        <!-- REPRODUCTOR DE AUDIO -->
        <div class="audio-player-card">
          <div class="audio-player-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            ${t("audioGuide")} · ${AppState.lang.toUpperCase()}
          </div>
          <div class="audio-controls">
            <button class="btn-play" id="btn-play" onclick="togglePlayPause()">
              <svg id="play-icon" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <svg id="pause-icon" style="display:none;" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            </button>
            <div class="audio-progress-container">
              <div class="audio-progress-bar" id="audio-progress-bar" onclick="seekAudio(event)">
                <div class="audio-progress-fill" id="audio-progress-fill"></div>
              </div>
              <div class="audio-time-row">
                <span id="audio-curr-time">0:00</span>
                <span id="audio-total-time">--:--</span>
              </div>
            </div>
          </div>
        </div>
    `;
  }

  // Navegación anterior / siguiente
  const prevHito = HITOS.find(h => h.id === id - 1);
  const nextHito = HITOS.find(h => h.id === id + 1);

  container.innerHTML = `
    <div class="detail-view">
      ${carouselHtml}
      <div class="detail-body">
        <a href="#/list?ruta=${ruta.id}" class="detail-route-badge" style="background-color: ${ruta.color}15; color: ${ruta.color}; border: 1.5px solid ${ruta.color}45; text-decoration: none;">
          <span>${rutaName}</span>
        </a>
        <div class="detail-number" style="color: ${ruta.color};">${t("landmarkBadge")} ${hito.id} / ${HITOS.length}</div>
        <h1 class="detail-title">${title}</h1>

        ${audioPlayerHtml}

        <!-- BARRA DE ACCESIBILIDAD (TAMAÑO DE FUENTE) -->
        <div class="detail-toolbar">
          <div class="font-size-control">
            <button class="font-size-btn ${AppState.fontSize === 'normal' ? 'active' : ''}" data-size="normal" onclick="setFontSize('normal')">A</button>
            <button class="font-size-btn ${AppState.fontSize === 'large' ? 'active' : ''}" data-size="large" onclick="setFontSize('large')">A+</button>
            <button class="font-size-btn ${AppState.fontSize === 'xlarge' ? 'active' : ''}" data-size="xlarge" onclick="setFontSize('xlarge')">A++</button>
          </div>
        </div>

        <!-- TEXTO HISTÓRICO -->
        <div class="detail-text font-${AppState.fontSize}" id="detail-narrative-text">${text}</div>

        <!-- ENLACE EXTERNO O DOCUMENTO PDF (OPCIONAL) -->
        ${renderDetailExternalLink(hito)}

        <!-- LOGOTIPOS DE SUBVENCIONES ESPECÍFICOS DE ESTE HITO -->
        ${renderDetailLogos(hito)}
      </div>
    </div>

    <!-- NAVEGACIÓN INFERIOR FIJA -->
    <div class="detail-nav-bottom">
      <a href="${prevHito ? `#/detail/${prevHito.id}` : 'javascript:void(0)'}" class="nav-bottom-btn ${!prevHito ? 'disabled' : ''}">
        ${t("prevBtn")}
      </a>
      <span class="nav-bottom-indicator">${hito.id} / ${HITOS.length}</span>
      <a href="${nextHito ? `#/detail/${nextHito.id}` : 'javascript:void(0)'}" class="nav-bottom-btn ${!nextHito ? 'disabled' : ''}">
        ${t("nextBtn")}
      </a>
    </div>
  `;

  // Iniciar audio si existe
  if (audioFile) {
    setupAudioElement(`assets/audio/${audioFile}`);
  } else {
    stopCurrentAudio();
  }
}

function setFontSize(size) {
  AppState.fontSize = size;
  localStorage.setItem('encina_font_size', size);
  const textEl = document.getElementById("detail-narrative-text");
  if (textEl) {
    textEl.className = `detail-text font-${size}`;
  }
  document.querySelectorAll(".font-size-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.size === size);
  });
}

function getLogoSrc(name) {
  try {
    const cached = localStorage.getItem('encina_logo_cache');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed[name]) return parsed[name];
    }
  } catch (e) {}
  return `assets/images/${name}`;
}

function renderDetailExternalLink(hito) {
  const url = (hito.enlace_url || hito.enlace_externo || "").trim();
  if (!url) return "";

  const isPdf = url.toLowerCase().endsWith(".pdf") || url.toLowerCase().includes(".pdf?");
  const defaultLabel = isPdf 
    ? (AppState.lang === 'en' ? "View PDF document" : "Ver documento PDF")
    : (AppState.lang === 'en' ? "Visit website" : "Visitar enlace web");
    
  const customLabel = AppState.lang === 'en'
    ? (hito.enlace_texto_en || hito.enlace_texto_es || defaultLabel)
    : (hito.enlace_texto_es || defaultLabel);

  const iconSvg = isPdf
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;

  return `
    <div class="detail-external-container">
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="detail-external-btn">
        <span class="external-btn-icon">${iconSvg}</span>
        <span class="external-btn-text">${customLabel}</span>
        <span class="external-btn-arrow">↗</span>
      </a>
    </div>
  `;
}

function renderDetailLogos(hito) {
  const logos = (hito.logos || []).filter(Boolean);
  const textoSubvencion = AppState.lang === 'en'
    ? (hito.texto_subvencion_en || hito.texto_subvencion_es || "")
    : (hito.texto_subvencion_es || "");

  // Si no hay texto de subvención NI logotipos, no mostrar absolutamente nada (opcional)
  if (logos.length === 0 && !textoSubvencion) {
    return "";
  }

  const logosHtml = logos.map(l => {
    const src = getLogoSrc(l);
    return `<img src="${src}" alt="Logo subvención" onerror="this.onerror=null; this.src='assets/images/${l}';">`;
  }).join("");

  return `
    <div class="detail-logos">
      ${textoSubvencion ? `<p class="detail-subvencion-text">${textoSubvencion}</p>` : `<span class="detail-logos-label">${t("subvencionesLabel")}</span>`}
      ${logos.length > 0 ? `<div class="detail-logos-grid">${logosHtml}</div>` : ""}
    </div>
  `;
}

// ========================================================
// REPRODUCTOR DE AUDIO
// ========================================================
function setupAudioElement(src) {
  stopCurrentAudio();

  const audio = new Audio();
  AppState.currentAudio = audio;
  AppState.isPlaying = false;
  updatePlayButtonUI();

  // Reset visual del temporizador
  const currEl = document.getElementById("audio-curr-time");
  const fillEl = document.getElementById("audio-progress-fill");
  const totalEl = document.getElementById("audio-total-time");
  if (currEl) currEl.textContent = "0:00";
  if (fillEl) fillEl.style.width = "0%";
  if (totalEl) totalEl.textContent = "--:--";

  audio.addEventListener("error", () => {
    // Si ya no es el audio activo o se está limpiando/navegando a otro hito, ignorar
    if (AppState.currentAudio !== audio) return;
    if (!audio.getAttribute('src') && !audio.src) return;

    console.warn("No se pudo cargar el archivo de audio:", src);
    const playerCard = document.querySelector(".audio-player-card");
    if (playerCard) playerCard.style.display = "none";
  });

  audio.addEventListener("loadedmetadata", () => {
    if (AppState.currentAudio !== audio) return;
    const total = document.getElementById("audio-total-time");
    if (total) total.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    if (AppState.currentAudio !== audio) return;
    const curr = document.getElementById("audio-curr-time");
    const fill = document.getElementById("audio-progress-fill");
    if (curr) curr.textContent = formatTime(audio.currentTime);
    if (fill && audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      fill.style.width = pct + "%";
    }
  });

  audio.addEventListener("ended", () => {
    if (AppState.currentAudio !== audio) return;
    AppState.isPlaying = false;
    updatePlayButtonUI();
    const fill = document.getElementById("audio-progress-fill");
    if (fill) fill.style.width = "0%";
  });

  audio.src = src;
  audio.load();
}

function togglePlayPause() {
  if (!AppState.currentAudio) return;
  if (AppState.isPlaying) {
    AppState.currentAudio.pause();
    AppState.isPlaying = false;
  } else {
    AppState.currentAudio.play();
    AppState.isPlaying = true;
  }
  updatePlayButtonUI();
}

function updatePlayButtonUI() {
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");
  if (!playIcon || !pauseIcon) return;

  if (AppState.isPlaying) {
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  } else {
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  }
}

function seekAudio(e) {
  if (!AppState.currentAudio || !AppState.currentAudio.duration) return;
  const bar = document.getElementById("audio-progress-bar");
  const rect = bar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const pct = Math.max(0, Math.min(1, clickX / width));
  AppState.currentAudio.currentTime = pct * AppState.currentAudio.duration;
}

function stopCurrentAudio() {
  if (AppState.currentAudio) {
    const audio = AppState.currentAudio;
    // Anular referencia activa primero para aislar de callbacks asíncronos
    AppState.currentAudio = null;
    AppState.isPlaying = false;

    audio.onerror = null;
    audio.onended = null;
    audio.ontimeupdate = null;
    audio.onloadedmetadata = null;

    try {
      audio.pause();
      // En móviles Safari/Chrome, cambiar src a "" emite un error async MEDIA_ELEMENT_ERROR.
      // Al vaciar mediante removeAttribute evitamos disparar el handler sobre la nueva tarjeta de hito.
      audio.removeAttribute("src");
      audio.load();
    } catch (e) {}

    updatePlayButtonUI();
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// ========================================================
// SLIDER DE FOTOS
// ========================================================
let currentSlide = 0;
function goToSlide(index) {
  if (!AppState.activeDetailHito || !AppState.activeDetailHito.imagenes) return;
  currentSlide = index;
  const imgEl = document.getElementById("carousel-img");
  if (imgEl) {
    imgEl.src = getAppImgSrc(AppState.activeDetailHito.imagenes[index]);
  }
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === index);
  });
}

function getAppImgSrc(name) {
  if (!name) return "assets/images/placeholder.png";
  try {
    const cached = localStorage.getItem('encina_img_cache');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed[name]) return parsed[name];
    }
  } catch (e) {}
  return `assets/images/${name}`;
}

// ========================================================
// VISTA: MAPA INTERACTIVO (LEAFLET)
// ========================================================
function renderMap(rutaFilter = null) {
  AppState.activeDetailHito = null;
  const container = document.getElementById("app-content");
  
  const activeRuta = (rutaFilter && typeof RUTAS !== 'undefined' && RUTAS[rutaFilter]) ? RUTAS[rutaFilter] : null;
  const pageTitle = activeRuta ? (AppState.lang === 'en' ? activeRuta.nombre_en : activeRuta.nombre_es) : t("btnMap");

  updateHeaderBar({ showBack: true, backHash: "#/", showMap: false, title: pageTitle });

  const rutasKeys = typeof RUTAS !== 'undefined' ? Object.keys(RUTAS) : [];
  const routesTabsHtml = `
    <div class="route-tabs-container" style="background: white; border-bottom: 1px solid var(--color-border); padding: 8px 12px; margin-bottom: 0;">
      <div class="route-tabs">
        <a href="#/map" class="route-tab ${!activeRuta ? 'active' : ''}" style="${!activeRuta ? 'background-color: #4a3429; color: white;' : ''}">
          ${t("allRoutes")} (${HITOS.length})
        </a>
        ${rutasKeys.map(key => {
          const r = RUTAS[key];
          const count = HITOS.filter(h => (h.ruta || 'paseando') === r.id).length;
          const name = AppState.lang === 'en' ? r.nombre_en : r.nombre_es;
          const isCurrent = activeRuta && activeRuta.id === r.id;
          const style = isCurrent ? `background-color: ${r.color}; color: white; border-color: ${r.color};` : '';
          return `
            <a href="#/map?ruta=${r.id}" class="route-tab ${isCurrent ? 'active' : ''}" style="${style}">
              <span>${name}</span>
              <span style="opacity: 0.8; font-size: 0.72rem;">(${count})</span>
            </a>
          `;
        }).join("")}
      </div>
    </div>
  `;

  container.innerHTML = `
    <div class="map-container" style="display: flex; flex-direction: column;">
      ${routesTabsHtml}
      <div id="leaflet-map" style="flex: 1; min-height: calc(100vh - 120px);"></div>
      <button class="btn-locate" onclick="locateUser()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2"></polygon></svg>
        ${t("locateMe")}
      </button>
    </div>
  `;

  // Cargar mapa
  setTimeout(() => initLeafletMap(rutaFilter), 50);
}

function initLeafletMap(rutaFilter = null) {
  if (typeof L === 'undefined') {
    console.error("Leaflet not loaded");
    return;
  }

  // Centro de Baños de la Encina
  const center = [38.1711, -3.7742];
  const map = L.map('leaflet-map', { zoomControl: false }).setView(center, 16);
  AppState.mapInstance = map;

  L.control.zoom({ position: 'topright' }).addTo(map);

  // Capa 1: Callejero OpenStreetMap (100% libre, oficial y gratuito sin costes)
  const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
  });

  // Capa 2: Satélite (Imágenes aéreas de alta resolución de acceso libre)
  const satLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Acceso libre'
  });

  // Activar callejero por defecto
  osmLayer.addTo(map);

  // Selector de capas para alternar Callejero y Satélite
  const baseLayers = {
    "🗺️ Callejero": osmLayer,
    "🛰️ Satélite": satLayer
  };
  L.control.layers(baseLayers, null, { position: 'topleft' }).addTo(map);

  const hitosToShow = (rutaFilter && typeof RUTAS !== 'undefined' && RUTAS[rutaFilter])
    ? HITOS.filter(h => (h.ruta || 'paseando') === rutaFilter)
    : HITOS;

  const markerBounds = [];

  // Añadir marcadores con los colores específicos de sus rutas
  hitosToShow.forEach(h => {
    if (!h.lat || !h.lng) return;

    const ruta = (typeof RUTAS !== 'undefined' && RUTAS[h.ruta]) ? RUTAS[h.ruta] : RUTAS['paseando'];
    const title = AppState.lang === 'en' ? (h.titulo_en || h.titulo_es) : h.titulo_es;
    const thumb = h.imagenes && h.imagenes.length > 0 ? `assets/images/${h.imagenes[0]}` : "";
    const rutaName = AppState.lang === 'en' ? ruta.nombre_en : ruta.nombre_es;

    const customIcon = L.divIcon({
      className: 'custom-pin-wrapper',
      html: `<div class="custom-map-pin" style="background-color: ${ruta.color}; border: 2px solid white; box-shadow: 0 3px 6px rgba(0,0,0,0.35); color: white;">${h.id}</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const marker = L.marker([h.lat, h.lng], { icon: customIcon }).addTo(map);
    markerBounds.push([h.lat, h.lng]);

    const popupContent = `
      <div style="font-family: 'Nunito', sans-serif; text-align: center; max-width: 190px;">
        ${thumb ? `<img src="${thumb}" style="width: 100%; height: 85px; object-fit: cover; object-position: top center; border-radius: 6px; margin-bottom: 6px;">` : ""}
        <span style="display: block; font-size: 0.72rem; font-weight: 800; color: ${ruta.color}; margin-bottom: 3px;">${rutaName}</span>
        <b style="font-size: 0.9rem; color: #222; display: block; margin-bottom: 8px;">${h.id}. ${title}</b>
        <a href="#/detail/${h.id}" style="display: inline-block; background: ${ruta.color}; color: white; text-decoration: none; padding: 6px 14px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">
          ${t("viewDetail")}
        </a>
      </div>
    `;

    marker.bindPopup(popupContent);
  });

  if (rutaFilter && markerBounds.length > 0) {
    try {
      map.fitBounds(markerBounds, { padding: [40, 40] });
    } catch (e) {}
  }
}

function locateUser() {
  if (!navigator.geolocation || !AppState.mapInstance) return;
  navigator.geolocation.getCurrentPosition(
    pos => {
      const userCoord = [pos.coords.latitude, pos.coords.longitude];
      AppState.mapInstance.setView(userCoord, 17);
      L.circleMarker(userCoord, { radius: 8, color: '#3b82f6', fillColor: '#60a5fa', fillOpacity: 0.8 }).addTo(AppState.mapInstance);
    },
    err => {
      alert("No se pudo obtener tu ubicación GPS.");
    },
    { enableHighAccuracy: true }
  );
}

// ========================================================
// LIGHTBOX (AMPLIAR FOTO)
// ========================================================
function setupLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (modal) {
    modal.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }
}

function openLightbox(src) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  if (modal && img) {
    img.src = src;
    modal.classList.add("active");
  }
}

// ========================================================
// AYUDANTE DE CABECERA
// ========================================================
function updateHeaderBar({ showBack, backHash, showMap, title }) {
  const btnBack = document.getElementById("header-btn-back");
  const btnMap = document.getElementById("header-btn-map");
  const titleEl = document.getElementById("header-title-text");

  if (btnBack) {
    btnBack.style.display = showBack ? "flex" : "none";
    if (backHash) btnBack.href = backHash;
  }
  if (btnMap) {
    btnMap.style.display = showMap ? "flex" : "none";
  }
  if (titleEl) {
    titleEl.textContent = title !== undefined && title !== null ? title : "";
  }
}

// ========================================================
// VISTA: CRÉDITOS Y DESARROLLO
// ========================================================
function renderCredits() {
  AppState.activeDetailHito = null;
  const container = document.getElementById("app-content");
  updateHeaderBar({ showBack: true, backHash: "#/", showMap: false, title: t("credits") });

  const config = (typeof APP_CONFIG !== 'undefined' && APP_CONFIG) ? APP_CONFIG : {
    version: "1.0.0",
    creditos: {
      desarrollo_es: "Webapp desarrollada por MUSARAÑA Gestión Integral de Museos S.L., para el Ayuntamiento de Baños de la Encina",
      desarrollo_en: "Webapp developed by MUSARAÑA Gestión Integral de Museos S.L., for the City Council of Baños de la Encina",
      textos_voces: "José María Cantarero\nVictoria Gutiérrez Calderón",
      locuciones_en: "Sonoarte.net",
      traducciones: "Cristina Aranda Lobato",
      copyright_es: "Todos los contenidos publicados en esta audioguía y su copyright son propiedad de sus autores y del Ayuntamiento de Baños de la Encina.",
      copyright_en: "All contents published in this audio guide and their copyright are the property of their authors and the City Council of Baños de la Encina."
    }
  };

  const cred = config.creditos || {};
  const isEn = AppState.lang === 'en';

  const desarrollo = isEn ? (cred.desarrollo_en || cred.desarrollo_es) : cred.desarrollo_es;
  const copyright = isEn ? (cred.copyright_en || cred.copyright_es) : cred.copyright_es;

  container.innerHTML = `
    <div class="credits-view" style="min-height: calc(100vh - 65px); background: url('assets/images/fondo.png') center/cover no-repeat fixed; padding: 24px 16px 44px; display: flex; justify-content: center; align-items: flex-start;">
      <div class="credits-card" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-radius: 20px; padding: 32px 22px; max-width: 520px; width: 100%; box-shadow: 0 10px 30px rgba(44, 37, 35, 0.16); border: 1px solid rgba(255, 255, 255, 0.85);">
        
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="assets/images/logo_ayto_banos.png" alt="Ayuntamiento de Baños de la Encina" style="max-height: 60px; max-width: 180px; object-fit: contain; margin-bottom: 12px;">
          <h1 style="font-size: 1.55rem; font-weight: 800; color: var(--color-primary-dark); margin: 0;">${t("credits")}</h1>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px; text-align: center;">
          
          <div>
            <h2 style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-primary); margin: 0 0 6px 0;">${isEn ? 'Development' : 'Desarrollo'}</h2>
            <p style="font-size: 0.92rem; line-height: 1.5; color: var(--color-text); margin: 0;">${desarrollo || ''}</p>
          </div>

          <div>
            <h2 style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-primary); margin: 0 0 6px 0;">${isEn ? 'Texts and voices' : 'Textos y voces'}</h2>
            <p style="font-size: 0.92rem; line-height: 1.55; color: var(--color-text); margin: 0; white-space: pre-line;">${cred.textos_voces || ''}</p>
          </div>

          <div>
            <h2 style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-primary); margin: 0 0 6px 0;">${isEn ? 'English Voice-Over' : 'Locuciones en Inglés'}</h2>
            <p style="font-size: 0.92rem; line-height: 1.5; color: var(--color-text); margin: 0;">${cred.locuciones_en || ''}</p>
          </div>

          <div>
            <h2 style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-primary); margin: 0 0 6px 0;">${isEn ? 'Translations' : 'Traducciones'}</h2>
            <p style="font-size: 0.92rem; line-height: 1.5; color: var(--color-text); margin: 0;">${cred.traducciones || ''}</p>
          </div>

          <div style="padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.06);">
            <h2 style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-primary); margin: 0 0 6px 0;">Copyright</h2>
            <p style="font-size: 0.85rem; line-height: 1.5; color: var(--color-text-muted); margin: 0;">${copyright || ''}</p>
          </div>

          <div style="margin-top: 10px; padding-top: 14px; border-top: 1px dashed var(--color-border); font-size: 0.78rem; color: var(--color-text-muted);">
            <span>Baños de la Encina · Versión ${config.version || '1.0.0'}</span>
          </div>

        </div>

      </div>
    </div>
  `;
}

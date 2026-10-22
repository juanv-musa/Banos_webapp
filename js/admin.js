/**
 * LÓGICA DEL PANEL GESTOR - BAÑOS DE LA ENCINA
 * ============================================
 */

let hitosData = [];
let editingHitoId = null;
let currentQrId = null;
let currentRutaFilter = "";
let modalMap = null;
let modalMarker = null;

// Caché de logotipos locales (Data URLs para previsualización inmediata sin fallos)
let logoCache = {};
try {
  const cachedLogos = localStorage.getItem('encina_logo_cache');
  if (cachedLogos) logoCache = JSON.parse(cachedLogos);
} catch (e) {}

function saveLogoCache(name, dataUrl) {
  try {
    logoCache[name] = dataUrl;
    localStorage.setItem('encina_logo_cache', JSON.stringify(logoCache));
  } catch (e) {
    // Si la imagen es muy grande para localStorage, mantenerla solo en memoria durante la sesión
    logoCache[name] = dataUrl;
  }
}

function getLogoSrc(name) {
  if (logoCache[name]) return logoCache[name];
  return `assets/images/${name}`;
}

// Caché de imágenes de hitos (Data URLs para previsualización inmediata de JPG y PNG)
let imgCache = {};
try {
  const cachedImgs = localStorage.getItem('encina_img_cache');
  if (cachedImgs) imgCache = JSON.parse(cachedImgs);
} catch (e) {}

function saveImgCache(name, dataUrl) {
  try {
    imgCache[name] = dataUrl;
    localStorage.setItem('encina_img_cache', JSON.stringify(imgCache));
  } catch (e) {
    imgCache[name] = dataUrl;
  }
}

function getImgSrc(name) {
  if (imgCache[name]) return imgCache[name];
  return `assets/images/${name}`;
}

// ========================================================
// INTEGRACIÓN GITHUB API (PARA GITHUB PAGES)
// ========================================================
const GH_CONFIG = {
  owner: "juanv-musa",
  repo: "Banos_webapp",
  branch: "main"
};

function isGitHubPages() {
  return window.location.hostname.includes("github.io");
}

function getGitHubToken() {
  return localStorage.getItem("encina_github_token") || "";
}

function configureGitHubToken() {
  const current = getGitHubToken();
  const token = prompt("Introduce tu Personal Access Token (PAT) de GitHub para guardar automáticamente desde GitHub Pages:", current);
  if (token !== null) {
    if (token.trim()) {
      localStorage.setItem("encina_github_token", token.trim());
      showToast("🔑 Token de GitHub guardado en este navegador.");
    } else {
      localStorage.removeItem("encina_github_token");
      showToast("Token de GitHub eliminado.");
    }
  }
}

async function ensureGitHubToken() {
  let token = getGitHubToken();
  if (!token) {
    token = prompt("Para publicar fotos y cambios directamente en GitHub Pages, introduce tu Token de GitHub (se guardará solo en tu navegador):");
    if (token && token.trim()) {
      token = token.trim();
      localStorage.setItem("encina_github_token", token);
    }
  }
  return token || "";
}

function utf8ToBase64(str) {
  if (typeof TextEncoder !== 'undefined') {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  return window.btoa(unescape(encodeURIComponent(str)));
}

async function githubGetFileSha(path) {
  const token = await ensureGitHubToken();
  if (!token) throw new Error("Se requiere token de GitHub para guardar en GitHub Pages.");

  try {
    const timestamp = Date.now();
    const res = await fetch(`https://api.github.com/repos/${GH_CONFIG.owner}/${GH_CONFIG.repo}/contents/${path}?ref=${GH_CONFIG.branch}&_t=${timestamp}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      return data.sha || null;
    }
    if (res.status === 404) return null;
  } catch (e) {
    console.warn("Error obteniendo sha:", e);
  }
  return null;
}

async function githubPutFile(path, base64Content, commitMessage, retryCount = 0) {
  const token = await ensureGitHubToken();
  if (!token) throw new Error("Se requiere token de GitHub para guardar en GitHub Pages.");

  const sha = await githubGetFileSha(path);
  const payload = {
    message: commitMessage,
    content: base64Content,
    branch: GH_CONFIG.branch
  };
  if (sha) payload.sha = sha;

  const res = await fetch(`https://api.github.com/repos/${GH_CONFIG.owner}/${GH_CONFIG.repo}/contents/${path}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    // Si hay conflicto de versión/sha (409) o error de sha no provisto (422), reintentar obteniendo el sha fresco
    if ((res.status === 409 || (res.status === 422 && err.message && err.message.includes('sha'))) && retryCount < 2) {
      await new Promise(r => setTimeout(r, 1000));
      return await githubPutFile(path, base64Content, commitMessage, retryCount + 1);
    }
    throw new Error(err.message || `Error ${res.status} al guardar en GitHub`);
  }
  return await res.json();
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Cargar base oficial desde HITOS de hitos.js
  if (typeof HITOS !== 'undefined' && Array.isArray(HITOS) && HITOS.length > 0) {
    hitosData = JSON.parse(JSON.stringify(HITOS));
  } else {
    hitosData = [];
  }

  // 2. RECUPERAR Y FUSIONAR CAMBIOS GUARDADOS POR EL USUARIO (localStorage)
  // De este modo, si el usuario movió coordenadas en el mapa, asignó logotipos o fotos,
  // NUNCA se pierden sus cambios al recargar la página.
  try {
    const savedData = localStorage.getItem('encina_hitos_data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach(savedHito => {
          const target = hitosData.find(h => h.id === savedHito.id);
          if (target) {
            // Preservar coordenadas si el usuario las movió (distintas del default 38.1711, -3.7742)
            if (savedHito.lat && (savedHito.lat !== 38.1711 || savedHito.lng !== -3.7742)) {
              target.lat = savedHito.lat;
              target.lng = savedHito.lng;
            }
            // Preservar logotipos asignados por el usuario
            if (Array.isArray(savedHito.logos) && savedHito.logos.length > 0) {
              target.logos = savedHito.logos.map(l => l === 'logos_4.png' ? 'logos_04.png' : l);
            }
            // Preservar fotos añadidas por el usuario (segunda imagen, nombres propios, etc.)
            if (Array.isArray(savedHito.imagenes) && savedHito.imagenes.length > 0) {
              target.imagenes = savedHito.imagenes.map(img => img.replace(/^img_(\d+)_0?(\d+)\.(jpg|jpeg|png)$/i, 'panel-$1_$2.$3'));
            }
            // Preservar enlace externo / PDF
            if (savedHito.enlace_url) target.enlace_url = savedHito.enlace_url;
            if (savedHito.enlace_texto_es) target.enlace_texto_es = savedHito.enlace_texto_es;
            if (savedHito.enlace_texto_en) target.enlace_texto_en = savedHito.enlace_texto_en;
            if (savedHito.ajuste_imagen) target.ajuste_imagen = savedHito.ajuste_imagen;
            if (savedHito.texto_subvencion_es) target.texto_subvencion_es = savedHito.texto_subvencion_es;
            if (savedHito.texto_subvencion_en) target.texto_subvencion_en = savedHito.texto_subvencion_en;
            if (savedHito.ruta) target.ruta = savedHito.ruta;
          } else {
            hitosData.push(savedHito);
          }
        });
      }
    }
  } catch (e) {}

  // 3. Asegurar que todos los hitos tienen el campo ruta y no tienen audios ficticios
  if (hitosData.length > 0 && typeof HITOS !== 'undefined' && Array.isArray(HITOS)) {
    hitosData.forEach(h => {
      if (!h.ruta) {
        const match = HITOS.find(orig => orig.id === h.id);
        h.ruta = (match && match.ruta) ? match.ruta : 'paseando';
      }
      if (h.id >= 23) {
        if (h.audio_es && h.audio_es.startsWith('webapp_BE_')) h.audio_es = "";
        if (h.audio_en && h.audio_en.startsWith('webapp_BE_')) h.audio_en = "";
      }
    });
  }
  
  renderCards();
  setupSearch();
  checkAuthRequirement();
});

// ========================================================
// GESTIÓN DE ACCESO Y AUTENTICACIÓN
// ========================================================
function isRunningOnServer() {
  return window.location.protocol.startsWith('http') && 
         !window.location.hostname.includes('localhost') && 
         !window.location.hostname.includes('127.0.0.1');
}

function checkAuthRequirement() {
  if (isRunningOnServer()) {
    fetch('api.php?action=save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsContent: '' })
    }).then(res => {
      if (res.status === 401) {
        showLoginModal();
      }
    }).catch(() => {});
  }
}

function showLoginModal() {
  const modal = document.getElementById("login-modal");
  if (modal) modal.classList.add("active");
}

function hideLoginModal() {
  const modal = document.getElementById("login-modal");
  if (modal) modal.classList.remove("active");
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  const password = document.getElementById("login-password").value;
  const errorEl = document.getElementById("login-error");

  try {
    const res = await fetch('api.php?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (res.ok) {
      hideLoginModal();
      showToast("🔓 Sesión iniciada correctamente.");
    } else {
      if (errorEl) errorEl.style.display = "block";
    }
  } catch (err) {
    alert("Error de conexión con api.php: " + err.message);
  }
}

// ========================================================
function handleRutaFilterChange() {
  const sel = document.getElementById("filter-ruta");
  currentRutaFilter = sel ? sel.value : "";
  const searchInput = document.getElementById("search-input");
  renderCards(searchInput ? searchInput.value.trim() : "");
}

// ========================================================
// RENDERIZADO DE TARJETAS
// ========================================================
function renderCards(filterText = "") {
  const container = document.getElementById("hitos-grid-container");
  const countEl = document.getElementById("total-count-badge");
  if (!container) return;

  const filtered = hitosData.filter(h => {
    if (currentRutaFilter && (h.ruta || 'paseando') !== currentRutaFilter) {
      return false;
    }
    if (!filterText) return true;
    const q = filterText.toLowerCase();
    return (
      String(h.id).includes(q) ||
      (h.titulo_es && h.titulo_es.toLowerCase().includes(q)) ||
      (h.titulo_en && h.titulo_en.toLowerCase().includes(q)) ||
      (h.texto_es && h.texto_es.toLowerCase().includes(q))
    );
  });

  if (countEl) countEl.textContent = `${hitosData.length} hitos registrados`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: white; border-radius: 12px; border: 1px solid var(--admin-border);">
        <p style="color: var(--admin-text-muted); font-size: 1.1rem;">No se encontraron hitos con ese criterio de búsqueda.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(h => {
    const thumb = h.imagenes && h.imagenes.length > 0 ? getImgSrc(h.imagenes[0]) : "assets/images/placeholder.png";
    const previewText = h.texto_es ? (h.texto_es.substring(0, 100) + "...") : "Sin texto descriptivo.";
    const rutaKey = h.ruta || 'paseando';
    const rutaObj = (typeof RUTAS !== 'undefined' && RUTAS[rutaKey]) ? RUTAS[rutaKey] : { nombre_es: "Paseando por Baños", color: "#8b3a1b" };

    return `
      <div class="hito-card">
        <div class="hito-card-top">
          <img src="${thumb}" class="hito-card-img" alt="${h.titulo_es}" onerror="this.src='assets/images/placeholder.png'">
          <div class="hito-card-details">
            <span class="hito-card-badge" style="background-color: ${rutaObj.color}; color: #ffffff !important;">Hito ${h.id}</span>
            <div style="margin-top: 4px;">
              <span style="display: inline-block; font-size: 0.72rem; font-weight: 800; color: ${rutaObj.color}; background: ${rutaObj.color}15; padding: 2px 8px; border-radius: 6px; border: 1px solid ${rutaObj.color}35;">
                ${rutaObj.nombre_es}
              </span>
            </div>
            <h3 class="hito-card-title">${h.titulo_es}</h3>
            <p class="hito-card-title-en">${h.titulo_en || ""}</p>
          </div>
        </div>

        <div class="hito-card-body">
          <p style="color: var(--admin-text-muted); line-height: 1.4; margin-bottom: 6px;">${previewText}</p>
          <div class="hito-card-info-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Fotos: <b>${h.imagenes ? h.imagenes.length : 0}</b> (${(h.imagenes || []).join(", ") || 'Ninguna'})</span>
          </div>
          <div class="hito-card-info-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            <span>ES: ${h.audio_es || "No asignado"} | EN: ${h.audio_en || "No asignado"}</span>
          </div>
          <div class="hito-card-info-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2"></polygon></svg>
            <span>GPS: ${h.lat ? h.lat.toFixed(5) : "--"}, ${h.lng ? h.lng.toFixed(5) : "--"}</span>
          </div>
          <div class="hito-card-info-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            <span>Ruta: <b>#/detail/${h.id}</b></span>
          </div>
          <div class="hito-card-info-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Logos: ${h.logos && h.logos.length > 0 ? `${h.logos.length} asignado(s)` : 'Ninguno (opcional)'} ${h.texto_subvencion_es ? '· Con texto' : ''}</span>
          </div>
        </div>

        <div class="hito-card-actions">
          <div style="display: flex; gap: 6px;">
            <a href="index.html#/detail/${h.id}" target="_blank" class="btn btn-outline btn-sm" title="Probar cómo se ve">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Probar
            </a>
            <button class="btn btn-outline btn-sm" onclick="openQrModal(${h.id})" title="Ver y descargar código QR">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              QR
            </button>
          </div>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-primary btn-sm" onclick="openEditModal(${h.id})">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              Editar
            </button>
            <button class="btn btn-outline btn-sm" style="color: var(--admin-danger); border-color: #fee2e2;" onclick="deleteHito(${h.id})">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function setupSearch() {
  const input = document.getElementById("search-input");
  if (input) {
    input.addEventListener("input", (e) => {
      renderCards(e.target.value.trim());
    });
  }
}

// ========================================================
let modalLogos = [];
let modalImagenes = [];

function renderImagesChips() {
  const container = document.getElementById("imagenes-chips-container");
  if (!container) return;

  if (modalImagenes.length === 0) {
    container.innerHTML = `<span style="font-size: 0.8rem; color: var(--admin-text-muted); font-style: italic;">Sin imágenes asignadas</span>`;
    syncImagesInputFromChips();
    return;
  }

  container.innerHTML = modalImagenes.map((img, idx) => {
    const src = getImgSrc(img);
    return `
      <div style="display: inline-flex; align-items: center; gap: 8px; background: white; border: 1px solid var(--admin-border); padding: 5px 12px; border-radius: 8px; font-size: 0.82rem; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">
        <img src="${src}" style="height: 32px; width: 32px; object-fit: cover; border-radius: 4px; border: 1px solid #ddd;" onerror="this.src='assets/images/placeholder.png';">
        <span style="font-weight: 700; color: var(--admin-primary-dark);">${idx === 0 ? '📷 1ª' : `📷 ${idx + 1}ª`}:</span>
        <span style="font-weight: 600;">${img}</span>
        <button type="button" onclick="removeImageChip(${idx})" title="Quitar imagen" style="background: none; border: none; cursor: pointer; color: var(--admin-danger); font-size: 1.1rem; line-height: 1; padding: 0 4px; font-weight: bold;">&times;</button>
      </div>
    `;
  }).join("");

  syncImagesInputFromChips();
}

function removeImageChip(idx) {
  modalImagenes.splice(idx, 1);
  renderImagesChips();
}

function syncImagesInputFromChips() {
  const input = document.getElementById("form-imagenes");
  if (input) input.value = modalImagenes.join(", ");
}

function syncImagesFromInput() {
  const input = document.getElementById("form-imagenes");
  if (!input) return;
  modalImagenes = input.value.split(",").map(s => s.trim()).filter(Boolean);
  renderImagesChips();
}

async function handleImageAddUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const idInput = document.getElementById("form-id");
  const id = idInput ? idInput.value : 1;
  const statusEl = document.getElementById("upload-status-image");
  if (statusEl) statusEl.textContent = "Cargando imagen...";

  // Detectar extensión exacta (.png, .jpg, .webp, etc.)
  const rawExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase() || '.jpg';
  const cleanExt = (rawExt === '.jpeg') ? '.jpg' : rawExt;

  // Determinar nombre objetivo: si ya tiene panel-X_1, asignar panel-X_2, etc.
  let targetName = "";
  if (modalImagenes.length === 0) {
    targetName = `panel-${id}_1${cleanExt}`;
  } else if (modalImagenes.length === 1 && modalImagenes[0].startsWith(`panel-${id}_`)) {
    targetName = `panel-${id}_2${cleanExt}`;
  } else {
    targetName = `panel-${id}_${modalImagenes.length + 1}${cleanExt}`;
  }

  // Si el archivo subido ya tiene formato panel-X_X o img_X_0X, normalizar a panel-
  if (file.name.startsWith("panel-")) {
    targetName = file.name;
  } else if (/^img_(\d+)_0?(\d+)(\.[a-zA-Z0-9]+)$/i.test(file.name)) {
    targetName = file.name.replace(/^img_(\d+)_0?(\d+)(\.[a-zA-Z0-9]+)$/i, 'panel-$1_$2$3').toLowerCase();
  }

  // 1. Previsualización inmediata mediante Data URL
  const reader = new FileReader();
  reader.onload = async function(e) {
    const dataUrl = e.target.result;
    saveImgCache(targetName, dataUrl);

    if (!modalImagenes.includes(targetName)) {
      modalImagenes.push(targetName);
    }
    renderImagesChips();

    // Si estamos en GitHub Pages, subir directo a GitHub
    if (isGitHubPages()) {
      if (statusEl) statusEl.textContent = "Subiendo a GitHub...";
      const base64Pure = dataUrl.split(',')[1];
      try {
        await githubPutFile(`assets/images/${targetName}`, base64Pure, `Subir foto ${targetName} desde admin`);
        if (statusEl) statusEl.textContent = `✅ Subida a GitHub: ${targetName}`;
        showToast(`☁️ Imagen ${targetName} subida a GitHub`);
      } catch (ghErr) {
        if (statusEl) statusEl.textContent = `❌ Error: ${ghErr.message}`;
        alert("Error al subir imagen a GitHub: " + ghErr.message);
      }
      return;
    }

    if (statusEl) statusEl.textContent = `✅ Foto añadida: ${targetName}`;
    showToast(`📸 Foto añadida: ${targetName}`);
  };
  reader.readAsDataURL(file);

  // 2. Subir al servidor si no es GitHub Pages
  if (!isGitHubPages()) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'image');
    formData.append('filename', targetName);

    try {
      const res = await fetch('api.php?action=upload', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        const finalServerName = data.filename || targetName;
        if (finalServerName !== targetName) {
          const idx = modalImagenes.indexOf(targetName);
          if (idx !== -1) modalImagenes[idx] = finalServerName;
          renderImagesChips();
        }
      }
    } catch (e) {}
  }

  event.target.value = "";
}

// ========================================================
// MODAL EDITOR (CREAR / EDITAR)
// ========================================================
function openCreateModal() {
  editingHitoId = null;
  document.getElementById("modal-title").textContent = "Crear Nuevo Hito";

  const nextId = hitosData.length > 0 ? Math.max(...hitosData.map(h => h.id)) + 1 : 1;
  const numPad = String(nextId).padStart(2, "0");

  document.getElementById("form-id").value = nextId;
  const rutaSelect = document.getElementById("form-ruta");
  if (rutaSelect) rutaSelect.value = currentRutaFilter || "paseando";

  document.getElementById("form-titulo-es").value = "";
  document.getElementById("form-titulo-en").value = "";
  document.getElementById("form-texto-es").value = "";
  document.getElementById("form-texto-en").value = "";
  document.getElementById("form-subvencion-es").value = "";
  document.getElementById("form-subvencion-en").value = "";
  document.getElementById("form-imagenes").value = `panel-${nextId}_1.jpg`;
  modalImagenes = [`panel-${nextId}_1.jpg`];
  renderImagesChips();
  const ajusteCreateSelect = document.getElementById("form-ajuste-imagen");
  if (ajusteCreateSelect) ajusteCreateSelect.value = "center";

  document.getElementById("form-audio-es").value = "";
  document.getElementById("form-audio-en").value = "";
  document.getElementById("form-enlace-url").value = "";
  document.getElementById("form-enlace-texto-es").value = "";
  document.getElementById("form-enlace-texto-en").value = "";
  document.getElementById("form-lat").value = 38.1711;
  document.getElementById("form-lng").value = -3.7742;

  modalLogos = [];
  renderLogosChips();

  clearUploadStatuses();
  openModal();
  initModalMap(38.1711, -3.7742);
}

function openEditModal(id) {
  const hito = hitosData.find(h => h.id === id);
  if (!hito) return;

  editingHitoId = id;
  document.getElementById("modal-title").textContent = `Editar Hito ${hito.id}: ${hito.titulo_es}`;

  document.getElementById("form-id").value = hito.id;
  const rutaSelect = document.getElementById("form-ruta");
  if (rutaSelect) rutaSelect.value = hito.ruta || "paseando";

  document.getElementById("form-titulo-es").value = hito.titulo_es || "";
  document.getElementById("form-titulo-en").value = hito.titulo_en || "";
  document.getElementById("form-texto-es").value = hito.texto_es || "";
  document.getElementById("form-texto-en").value = hito.texto_en || "";
  document.getElementById("form-subvencion-es").value = hito.texto_subvencion_es || "";
  document.getElementById("form-subvencion-en").value = hito.texto_subvencion_en || "";
  const rawImgs = (hito.imagenes && Array.isArray(hito.imagenes)) ? [...hito.imagenes] : (hito.imagenes ? [hito.imagenes] : []);
  modalImagenes = rawImgs;
  renderImagesChips();
  document.getElementById("form-imagenes").value = rawImgs.join(", ");
  const ajusteEditSelect = document.getElementById("form-ajuste-imagen");
  if (ajusteEditSelect) {
    ajusteEditSelect.value = hito.ajuste_imagen || (hito.id >= 20 && hito.id <= 37 ? "top" : "center");
  }
  document.getElementById("form-audio-es").value = hito.audio_es || "";
  document.getElementById("form-audio-en").value = hito.audio_en || "";
  document.getElementById("form-enlace-url").value = hito.enlace_url || hito.enlace_externo || "";
  document.getElementById("form-enlace-texto-es").value = hito.enlace_texto_es || "";
  document.getElementById("form-enlace-texto-en").value = hito.enlace_texto_en || "";
  document.getElementById("form-lat").value = hito.lat || 38.1711;
  document.getElementById("form-lng").value = hito.lng || -3.7742;

  modalLogos = (hito.logos ? [...hito.logos] : []).filter(Boolean);
  renderLogosChips();

  clearUploadStatuses();
  openModal();
  initModalMap(hito.lat || 38.1711, hito.lng || -3.7742);
}

function renderLogosChips() {
  const container = document.getElementById("logos-chips-container");
  if (!container) return;

  if (modalLogos.length === 0) {
    container.innerHTML = `<span style="font-size: 0.8rem; color: var(--admin-text-muted); font-style: italic;">Sin logotipos (opcional)</span>`;
    return;
  }

  container.innerHTML = modalLogos.map((logo, idx) => {
    const src = getLogoSrc(logo);
    return `
      <div style="display: inline-flex; align-items: center; gap: 8px; background: white; border: 1px solid var(--admin-border); padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
        <img src="${src}" style="max-height: 22px; max-width: 45px; object-fit: contain;" onerror="this.style.display='none'">
        <span style="font-weight: 600;">${logo}</span>
        <button type="button" onclick="removeLogoChip(${idx})" title="Quitar logotipo" style="background: none; border: none; cursor: pointer; color: var(--admin-danger); font-size: 1rem; line-height: 1; padding: 0 2px;">&times;</button>
      </div>
    `;
  }).join("");
}

function removeLogoChip(idx) {
  modalLogos.splice(idx, 1);
  renderLogosChips();
}

async function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const statusEl = document.getElementById("upload-status-logo");
  if (statusEl) statusEl.textContent = "Cargando...";

  const finalName = file.name;

  // 1. Guardar Data URL para previsualización instantánea garantizada
  const reader = new FileReader();
  reader.onload = async function(e) {
    const dataUrl = e.target.result;
    saveLogoCache(finalName, dataUrl);

    if (!modalLogos.includes(finalName)) {
      modalLogos.push(finalName);
      renderLogosChips();
    }

    if (isGitHubPages()) {
      const base64Pure = dataUrl.split(',')[1];
      try {
        await githubPutFile(`assets/images/${finalName}`, base64Pure, `Subir logo ${finalName} desde admin`);
        if (statusEl) statusEl.textContent = `✅ Subido a GitHub: ${finalName}`;
        showToast(`☁️ Logotipo ${finalName} subido a GitHub`);
      } catch (err) {
        if (statusEl) statusEl.textContent = `❌ Error: ${err.message}`;
        alert("Error al subir logotipo a GitHub: " + err.message);
      }
      return;
    }

    if (statusEl) statusEl.textContent = `✅ Añadido: ${finalName}`;
    showToast(`📁 Logotipo cargado: ${finalName}`);
  };
  reader.readAsDataURL(file);

  // 2. Subir archivo físicamente al servidor / gestor (Servidor PHP final)
  if (!isGitHubPages()) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'image');
    formData.append('filename', finalName);

    try {
      const res = await fetch('api.php?action=upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        const savedName = data.filename || finalName;
        if (savedName !== finalName && !modalLogos.includes(savedName)) {
          modalLogos.push(savedName);
          renderLogosChips();
        }
      } else if (res.status === 401) {
        showLoginModal();
      }
    } catch (err) {}
  }

  // Limpiar input para permitir seleccionar el mismo archivo si se desea
  event.target.value = "";
}

function clearUploadStatuses() {
  ['image', 'logo', 'audio-es', 'audio-en', 'pdf'].forEach(k => {
    const el = document.getElementById(`upload-status-${k}`);
    if (el) el.textContent = "";
  });
}

function openModal() {
  const modal = document.getElementById("editor-modal");
  if (modal) modal.classList.add("active");
}

function closeModal() {
  const modal = document.getElementById("editor-modal");
  if (modal) modal.classList.remove("active");
  editingHitoId = null;
}

// MAPA DEL MODAL PARA SELECCIONAR COORDENADAS
function initModalMap(lat, lng) {
  setTimeout(() => {
    if (typeof L === 'undefined') return;

    if (!modalMap) {
      modalMap = L.map('modal-map-picker').setView([lat, lng], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(modalMap);

      modalMarker = L.marker([lat, lng], { draggable: true }).addTo(modalMap);

      modalMarker.on('dragend', function (e) {
        const pos = modalMarker.getLatLng();
        document.getElementById("form-lat").value = pos.lat.toFixed(6);
        document.getElementById("form-lng").value = pos.lng.toFixed(6);
      });

      modalMap.on('click', function (e) {
        modalMarker.setLatLng(e.latlng);
        document.getElementById("form-lat").value = e.latlng.lat.toFixed(6);
        document.getElementById("form-lng").value = e.latlng.lng.toFixed(6);
      });
    } else {
      modalMap.invalidateSize();
      modalMap.setView([lat, lng], 16);
      modalMarker.setLatLng([lat, lng]);
    }
  }, 200);
}

// SUBIDA DIRECTA DE ARCHIVOS (FOTO O MP3) DESDE EL MODAL
async function handleDirectUpload(event, typeKey) {
  const file = event.target.files[0];
  if (!file) return;

  const id = document.getElementById("form-id").value;
  const numPad = String(id).padStart(2, "0");
  
  let targetType = 'image';
  let inputTargetId = 'form-imagenes';
  let statusTargetId = 'upload-status-image';
  let defaultName = file.name;

  if (typeKey === 'image') {
    defaultName = `panel-${id}_1.jpg`;
  } else if (typeKey === 'logo') {
    targetType = 'image';
    statusTargetId = 'upload-status-logo';
    defaultName = file.name;
  } else if (typeKey === 'audio_es') {
    targetType = 'audio';
    inputTargetId = 'form-audio-es';
    statusTargetId = 'upload-status-audio-es';
    defaultName = `webapp_BE_${numPad}_ES.mp3`;
  } else if (typeKey === 'audio_en') {
    targetType = 'audio';
    inputTargetId = 'form-audio-en';
    statusTargetId = 'upload-status-audio-en';
    defaultName = `webapp_BE_${numPad}_EN.mp3`;
  } else if (typeKey === 'pdf') {
    targetType = 'doc';
    inputTargetId = 'form-enlace-url';
    statusTargetId = 'upload-status-pdf';
    defaultName = file.name;
  }

  const statusEl = document.getElementById(statusTargetId);
  if (statusEl) statusEl.textContent = "Subiendo...";

  // Si estamos en GitHub Pages, subir directamente a GitHub mediante su API
  if (isGitHubPages()) {
    if (statusEl) statusEl.textContent = "Subiendo a GitHub...";
    const reader = new FileReader();
    reader.onload = async function(e) {
      const dataUrl = e.target.result;
      const base64Pure = dataUrl.split(',')[1];
      const folder = (targetType === 'image') ? 'assets/images' : ((targetType === 'doc') ? 'assets/docs' : 'assets/audio');
      const remotePath = `${folder}/${defaultName}`;

      try {
        await githubPutFile(remotePath, base64Pure, `Subir ${defaultName} desde panel admin`);
        if (typeKey === 'logo') {
          saveLogoCache(defaultName, dataUrl);
          if (!modalLogos.includes(defaultName)) {
            modalLogos.push(defaultName);
            renderLogosChips();
          }
        } else if (inputTargetId && document.getElementById(inputTargetId)) {
          document.getElementById(inputTargetId).value = (targetType === 'doc') ? `assets/docs/${defaultName}` : defaultName;
        }
        if (statusEl) statusEl.textContent = `✅ Subido a GitHub (${defaultName})`;
        showToast(`☁️ Archivo ${defaultName} subido directamente a GitHub`);
      } catch (ghErr) {
        if (statusEl) statusEl.textContent = `❌ Error: ${ghErr.message}`;
        alert("Error al subir archivo a GitHub: " + ghErr.message);
      }
    };
    reader.readAsDataURL(file);
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', targetType);
  formData.append('filename', defaultName);

  try {
    const res = await fetch('api.php?action=upload', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const data = await res.json();
      const uploadedName = data.filename || defaultName;
      if (typeKey === 'logo') {
        if (!modalLogos.includes(uploadedName)) {
          modalLogos.push(uploadedName);
          renderLogosChips();
        }
      } else if (inputTargetId && document.getElementById(inputTargetId)) {
        document.getElementById(inputTargetId).value = (targetType === 'doc' && !uploadedName.startsWith('assets/')) ? `assets/docs/${uploadedName}` : uploadedName;
      }
      if (statusEl) statusEl.textContent = "✅ Subido con éxito";
      showToast(`📁 Archivo subido: ${uploadedName}`);
    } else if (res.status === 401) {
      showLoginModal();
    } else {
      const data = await res.json().catch(() => ({}));
      alert("Error al subir archivo: " + (data.message || "Error en el servidor"));
      if (statusEl) statusEl.textContent = "❌ Error";
    }
  } catch (err) {
    if (typeKey === 'logo') {
      if (!modalLogos.includes(defaultName)) {
        modalLogos.push(defaultName);
        renderLogosChips();
      }
    } else if (inputTargetId && document.getElementById(inputTargetId)) {
      document.getElementById(inputTargetId).value = defaultName;
    }
    if (statusEl) statusEl.textContent = `Asignado como ${defaultName}`;
  }
}

// GUARDAR HITO DESDE EL FORMULARIO
function saveHitoForm(event) {
  event.preventDefault();

  const idInput = document.getElementById("form-id");
  const id = idInput ? parseInt(idInput.value, 10) : 1;
  const rutaSelect = document.getElementById("form-ruta");
  const ruta = (rutaSelect ? rutaSelect.value : "paseando") || "paseando";
  const titulo_es = (document.getElementById("form-titulo-es")?.value || "").trim();
  const titulo_en = (document.getElementById("form-titulo-en")?.value || "").trim();
  const texto_es = (document.getElementById("form-texto-es")?.value || "").trim();
  const texto_en = (document.getElementById("form-texto-en")?.value || "").trim();
  const imagenesStr = (document.getElementById("form-imagenes")?.value || "").trim();
  const audio_es = (document.getElementById("form-audio-es")?.value || "").trim();
  const audio_en = (document.getElementById("form-audio-en")?.value || "").trim();
  const enlace_url = (document.getElementById("form-enlace-url")?.value || "").trim();
  const enlace_texto_es = (document.getElementById("form-enlace-texto-es")?.value || "").trim();
  const enlace_texto_en = (document.getElementById("form-enlace-texto-en")?.value || "").trim();

  if (!titulo_es) {
    alert("Por favor, introduce el título en español.");
    return;
  }

  const imagenes = (modalImagenes && modalImagenes.length > 0)
    ? [...modalImagenes]
    : (imagenesStr ? imagenesStr.split(",").map(s => s.trim()).filter(s => s.length > 0) : []);
  const subEspEl = document.getElementById("form-subvencion-es");
  const subEnEl = document.getElementById("form-subvencion-en");
  const texto_subvencion_es = subEspEl ? subEspEl.value.trim() : "";
  const texto_subvencion_en = subEnEl ? subEnEl.value.trim() : "";
  const logos = [...modalLogos];
  const ajuste_imagen = (document.getElementById("form-ajuste-imagen")?.value || "center").trim();

  const latRaw = (document.getElementById("form-lat")?.value || "").toString().replace(',', '.');
  const lngRaw = (document.getElementById("form-lng")?.value || "").toString().replace(',', '.');
  const lat = parseFloat(latRaw);
  const lng = parseFloat(lngRaw);

  const hitoObj = {
    id,
    ruta,
    titulo_es,
    titulo_en,
    texto_es,
    texto_en,
    imagenes,
    ajuste_imagen,
    texto_subvencion_es,
    texto_subvencion_en,
    logos,
    audio_es,
    audio_en,
    enlace_url,
    enlace_texto_es,
    enlace_texto_en,
    lat: isNaN(lat) ? 38.1711 : lat,
    lng: isNaN(lng) ? -3.7742 : lng
  };

  if (editingHitoId !== null) {
    const idx = hitosData.findIndex(h => h.id === editingHitoId);
    if (idx !== -1) hitosData[idx] = hitoObj;
  } else {
    hitosData.push(hitoObj);
    hitosData.sort((a, b) => a.id - b.id);
  }

  // Guardar en localStorage de inmediato para que los cambios se mantengan al recargar
  try {
    localStorage.setItem('encina_hitos_data', JSON.stringify(hitosData));
    if (typeof HITOS_VERSION !== 'undefined') {
      localStorage.setItem('encina_hitos_version', HITOS_VERSION);
    }
  } catch (e) {}

  closeModal();
  renderCards();

  // Guardar automáticamente en el servidor / gestor en segundo plano
  autoSaveToServer();
  showToast(`✅ Hito ${id} guardado correctamente.`);
}

async function autoSaveToServer() {
  const content = generateHitosJsContent();

  if (isGitHubPages()) {
    try {
      const b64 = utf8ToBase64(content);
      await githubPutFile('js/hitos.js', b64, 'Actualización automática de hitos');
      showToast('☁️ Guardado automáticamente en GitHub');
    } catch (err) {
      console.warn('GitHub auto-save:', err.message);
      showToast('💾 Guardado en este navegador. Recuerda pulsar "Guardar Cambios" arriba para publicar en GitHub.');
    }
    return;
  }

  try {
    const res = await fetch('api.php?action=save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsContent: content })
    });
    if (res.ok) {
      showToast('💾 Guardado en el archivo js/hitos.js');
    }
  } catch (err) {}
}

function deleteHito(id) {
  if (confirm(`¿Estás seguro de que quieres eliminar el Hito ${id}?`)) {
    hitosData = hitosData.filter(h => h.id !== id);
    renderCards();
    showToast(`🗑️ Hito ${id} eliminado.`);
  }
}

// ========================================================
// CÓDIGOS QR (GENERACIÓN Y DESCARGA EN ALTA RESOLUCIÓN)
// ========================================================
function getQrBaseUrl() {
  const saved = localStorage.getItem('encina_qr_base_url');
  if (saved) return saved;
  try {
    const loc = window.location;
    let path = loc.pathname;
    if (path.endsWith('admin.html')) {
      path = path.substring(0, path.lastIndexOf('/') + 1);
    } else if (!path.endsWith('/')) {
      path = path + '/';
    }
    return `${loc.origin}${path}`;
  } catch (e) {
    return 'https://www.banosdelaencina.es/app/';
  }
}

function openQrModal(id) {
  currentQrId = id;
  const hito = hitosData.find(h => h.id === id);
  if (!hito) return;

  document.getElementById("qr-modal-title").textContent = `Código QR · Hito ${hito.id}: ${hito.titulo_es}`;
  
  const baseInput = document.getElementById("qr-base-url-input");
  if (baseInput) {
    baseInput.value = getQrBaseUrl();
  }

  updateQrCodeLive();
  document.getElementById("qr-modal").classList.add("active");
}

function updateQrCodeLive() {
  if (!currentQrId) return;
  const hito = hitosData.find(h => h.id === currentQrId);
  if (!hito) return;

  const baseInput = document.getElementById("qr-base-url-input");
  let baseUrl = baseInput ? baseInput.value.trim() : getQrBaseUrl();
  if (baseUrl) {
    localStorage.setItem('encina_qr_base_url', baseUrl);
  }
  if (baseUrl && !baseUrl.endsWith('/')) {
    baseUrl += '/';
  }

  const targetUrl = `${baseUrl}#/detail/${hito.id}`;
  const urlText = document.getElementById("qr-url-text");
  if (urlText) urlText.textContent = targetUrl;

  const container = document.getElementById("qrcode-container");
  if (!container) return;
  container.innerHTML = "";

  if (typeof QRCode !== 'undefined') {
    new QRCode(container, {
      text: targetUrl,
      width: 256,
      height: 256,
      colorDark: "#8b3a1b",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    container.innerHTML = `<p style="color:var(--admin-text-muted);">Cargando generador QR...</p>`;
  }
}

function closeQrModal() {
  const modal = document.getElementById("qr-modal");
  if (modal) modal.classList.remove("active");
  currentQrId = null;
}

function downloadQrCodePng() {
  const container = document.getElementById("qrcode-container");
  const img = container.querySelector("img");
  const canvas = container.querySelector("canvas");

  let dataUrl = "";
  if (img && img.src && img.src.startsWith("data:")) {
    dataUrl = img.src;
  } else if (canvas) {
    dataUrl = canvas.toDataURL("image/png");
  }

  if (dataUrl) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `QR_Hito_${currentQrId}_Banos_de_la_Encina.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`📥 Descargado QR del Hito ${currentQrId}`);
  } else {
    alert("No se pudo generar la imagen para descargar.");
  }
}

// ========================================================
// GUARDADO Y PUBLICACIÓN DIRECTA
// ========================================================
async function saveAllChanges() {
  const content = generateHitosJsContent();

  if (isGitHubPages()) {
    showToast('⏳ Publicando en GitHub...');
    try {
      const b64 = utf8ToBase64(content);
      await githubPutFile('js/hitos.js', b64, 'Publicación manual de hitos desde panel de administración');
      showToast('🎉 ¡Publicado en GitHub con éxito! En ~1 min se verá en GitHub Pages.');
      return;
    } catch (err) {
      alert('Error al publicar en GitHub: ' + err.message);
      return;
    }
  }

  try {
    const res = await fetch('api.php?action=save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsContent: content })
    });
    
    if (res.ok) {
      showToast("🎉 ¡Publicado en el servidor con éxito! Los cambios ya son visibles.");
      return;
    } else if (res.status === 401) {
      showLoginModal();
      return;
    }
  } catch (err) {
    // Si falla, probar con File System API o descarga
  }

  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'hitos.js',
        types: [{
          description: 'JavaScript File',
          accept: { 'application/javascript': ['.js'] }
        }]
      });
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
      showToast("🎉 ¡Archivo hitos.js guardado exitosamente!");
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }

  downloadFile('hitos.js', content, 'application/javascript');
  showToast("📥 Se ha descargado el nuevo 'hitos.js'. Reemplázalo en tu carpeta js/");
}

function generateHitosJsContent() {
  const rutasObj = (typeof RUTAS !== 'undefined') ? RUTAS : {
    paseando: { id: "paseando", nombre_es: "Paseando por Baños", nombre_en: "Strolling through Baños", color: "#8b3a1b", colorBg: "#fbf5f2", colorBorder: "#d4a896" },
    castillo: { id: "castillo", nombre_es: "Castillo de Baños", nombre_en: "Baños Castle", color: "#1565c0", colorBg: "#f0f7ff", colorBorder: "#90caf9" },
    penalosa: { id: "penalosa", nombre_es: "Peñalosa", nombre_en: "Peñalosa", color: "#7b1fa2", colorBg: "#faf4fc", colorBorder: "#ce93d8" },
    pr289: { id: "pr289", nombre_es: "Sendero PR289", nombre_en: "PR289 Trail", color: "#c2883d", colorBg: "#fdf8f0", colorBorder: "#eed5ab" },
    piedra_viva: { id: "piedra_viva", nombre_es: "Baños en Piedra Viva", nombre_en: "Baños in Living Stone", color: "#2e7d32", colorBg: "#f1f8f2", colorBorder: "#a5d6a7" }
  };

  return `/**
 * GUÍA Y BASE DE DATOS DE HITOS TURÍSTICOS - BAÑOS DE LA ENCINA
 * ==============================================================
 * Archivo generado automáticamente por el Gestor Visual.
 * Fecha de actualización: ${new Date().toLocaleString()}
 */

const HITOS_VERSION = "${new Date().toISOString()}";

const RUTAS = ${JSON.stringify(rutasObj, null, 2)};

let HITOS = ${JSON.stringify(hitosData, null, 2)};
`;
}

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportBackup() {
  const jsonStr = JSON.stringify(hitosData, null, 2);
  downloadFile(`copia_seguridad_hitos_${new Date().toISOString().slice(0,10)}.json`, jsonStr, 'application/json');
}

function showToast(msg) {
  let toast = document.getElementById("admin-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "admin-toast";
    toast.className = "toast-msg";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

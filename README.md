# GUÍA DE GESTIÓN Y AMPLIACIÓN - WEBAPP BAÑOS DE LA ENCINA

Esta es la nueva versión limpia, ligera y 100% editable de la webapp de Baños de la Encina. Incluye un **Panel Gestor Visual** para que nunca más tengas que tocar una sola línea de código.

---

## 🖥️ CÓMO USAR EL GESTOR VISUAL (SIN TOCAR CÓDIGO)

Tienes dos formas súper sencillas de usar el gestor:

### Método A: En tu Mac (Doble clic - Recomendado)
1. Haz doble clic en el archivo:
   👉 **`iniciar_gestor.command`**
2. Se abrirá automáticamente una ventana de tu navegador en `http://localhost:8080/admin.html`.
3. Podrás:
   * **Ver todos los hitos:** Con sus fotos, títulos, audios y coordenadas.
   * **Añadir el Hito 23 (o siguientes):** Pulsando el botón verde *"➕ Añadir Nuevo Hito"*.
   * **Elegir coordenadas en el mapa:** Solo haz clic en el mapa de Baños de la Encina o arrastra el marcador al punto exacto donde esté el cartel o monumento.
   * **Guardar cambios:** Pulsa el botón verde *"Guardar Cambios"* y se guardará automáticamente en tu disco duro.

### Método B: Directo en cualquier navegador
1. Haz doble clic directamente sobre el archivo **`admin.html`**.
2. Haz tus cambios y pulsa *"Guardar Cambios"*. El navegador te permitirá guardarlo o descargará el archivo `hitos.js` actualizado para que lo pongas en la carpeta `js/`.

---

## 📁 CÓMO AÑADIR LAS FOTOS Y AUDIOS DEL NUEVO HITO

Cuando vayas a crear el Hito 23 (o siguientes):
1. **Foto o Panel:** Guarda el archivo de imagen en la carpeta `assets/images/` (ejemplo: `panel-23_1.jpg`).
2. **Audios locutados:** Guarda los archivos MP3 en la carpeta `assets/audio/`:
   * En español: `webapp_BE_23_ES.mp3`
   * En inglés: `webapp_BE_23_EN.mp3`
3. En el Gestor Visual (`admin.html`), al pulsar *"Añadir Nuevo Hito"*, el formulario ya te sugiere automáticamente esos nombres para que no tengas ni que escribirlos.

---

## 📲 CÓMO VINCULARLO CON TUS CÓDIGOS QR DINÁMICOS

Como te quedan 16 códigos QR dinámicos libres por usar:
1. Accede al panel de control de la empresa que te gestiona los QR dinámicos.
2. Selecciona el siguiente código QR disponible.
3. En la casilla de **URL de destino**, introduce la ruta del nuevo hito:
   `https://www.banosdelaencina.es/app/#/detail/23`
4. ¡Listo! Cuando el turista escanee la placa física del hito 23, se abrirá directamente la pantalla de ese monumento con su foto, audio y texto.

---

## 🌐 CÓMO SUBIR LA WEB A TU HOSTING / SERVIDOR

Cuando hayas hecho tus cambios y quieras publicarlos en internet:
1. Conéctate a tu hosting por FTP (FileZilla, cPanel, etc.).
2. Abre la carpeta web pública donde está la app (habitualmente `/public_html/app/`).
3. Sube los archivos de la carpeta `webapp_nueva`:
   * `index.html`
   * Carpeta `css/`
   * Carpeta `js/`
   * Carpeta `assets/`

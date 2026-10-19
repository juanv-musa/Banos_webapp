#!/usr/bin/env python3
"""
SERVIDOR LOCAL DEL GESTOR - BAÑOS DE LA ENCINA
=============================================
Este script inicia un servidor web local y abre el panel de control
en tu navegador para que puedas editar, añadir hitos y subir archivos
directamente sin necesidad de programas FTP.
"""

import http.server
import socketserver
import os
import json
import webbrowser
import sys
import cgi

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class GestorHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        # 1. Endpoint para iniciar sesión (siempre ok en local)
        if self.path.startswith('/api.php?action=login') or self.path == '/api/login':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'ok'}).encode('utf-8'))
            return

        # 2. Endpoint para guardar hitos.js
        if self.path.startswith('/api.php?action=save') or self.path == '/api/save':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                js_content = data.get('jsContent', '')
                if not js_content:
                    self.send_error(400, "Contenido vacío")
                    return

                target_file = os.path.join(DIRECTORY, 'js', 'hitos.js')
                with open(target_file, 'w', encoding='utf-8') as f:
                    f.write(js_content)

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'ok', 'message': 'Guardado correctamente en js/hitos.js'}).encode('utf-8'))
                print(">> [GESTOR] ¡Archivo js/hitos.js guardado exitosamente!")
            except Exception as e:
                print(f">> [GESTOR] Error al guardar: {e}")
                self.send_error(500, str(e))
            return

        # 3. Endpoint para subir fotos y audios
        if self.path.startswith('/api.php?action=upload') or self.path == '/api/upload':
            try:
                ctype, pdict = cgi.parse_header(self.headers.get('content-type', ''))
                if ctype == 'multipart/form-data':
                    pdict['boundary'] = bytes(pdict['boundary'], "utf-8")
                    content_len = self.headers.get('content-length')
                    if content_len:
                        pdict['CONTENT-LENGTH'] = str(content_len)
                    fields = cgi.parse_multipart(self.rfile, pdict)
                    file_items = fields.get('file')
                    
                    type_raw = fields.get('type', ['image'])[0]
                    type_val = type_raw.decode('utf-8') if isinstance(type_raw, bytes) else str(type_raw)
                    
                    name_raw = fields.get('filename', [''])[0]
                    custom_name = (name_raw.decode('utf-8') if isinstance(name_raw, bytes) else str(name_raw)).strip()

                    if file_items:
                        file_data = file_items[0]
                        if isinstance(file_data, str):
                            file_data = file_data.encode('utf-8')
                        dest_dir = os.path.join(DIRECTORY, 'assets', 'images' if type_val == 'image' else 'audio')
                        os.makedirs(dest_dir, exist_ok=True)
                        target_path = os.path.join(dest_dir, custom_name)
                        with open(target_path, 'wb') as f:
                            f.write(file_data)
                        
                        self.send_response(200)
                        self.send_header('Content-Type', 'application/json')
                        self.end_headers()
                        self.wfile.write(json.dumps({'status': 'ok', 'filename': custom_name}).encode('utf-8'))
                        print(f">> [GESTOR] Archivo subido: {custom_name}")
                        return
                self.send_error(400, "Error en formulario")
            except Exception as e:
                print(f">> [GESTOR] Error en subida: {e}")
                self.send_error(500, str(e))
            return

        self.send_error(404, "Ruta no encontrada")

def main():
    os.chdir(DIRECTORY)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), GestorHandler) as httpd:
        url = f"http://localhost:{PORT}/admin.html"
        print("=" * 60)
        print("  GESTOR DE HITOS - BAÑOS DE LA ENCINA")
        print("=" * 60)
        print(f" Servidor iniciado en: {url}")
        print(" Presiona Ctrl+C en esta ventana para cerrar el gestor.")
        print("=" * 60)
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido. ¡Hasta pronto!")
            sys.exit(0)

if __name__ == '__main__':
    main()

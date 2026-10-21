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

        # 3. Endpoint para subir fotos, audios y documentos
        if self.path.startswith('/api.php?action=upload') or self.path == '/api/upload':
            try:
                import email.parser, re
                ctype = self.headers.get('content-type', '')
                content_len = int(self.headers.get('content-length', 0))
                body = self.rfile.read(content_len)

                msg_bytes = f"Content-Type: {ctype}\r\nMIME-Version: 1.0\r\n\r\n".encode('latin1') + body
                msg = email.parser.BytesParser().parsebytes(msg_bytes)

                file_data = None
                file_name_from_upload = ""
                type_val = "image"
                custom_name = ""

                for part in msg.walk():
                    if part.is_multipart():
                        continue
                    cdisp = part.get('Content-Disposition', '')
                    if not cdisp:
                        continue
                    name_m = re.search(r'name="([^"]+)"', cdisp)
                    if not name_m:
                        continue
                    field_name = name_m.group(1)
                    payload = part.get_payload(decode=True)

                    if field_name == 'file':
                        fn_m = re.search(r'filename="([^"]+)"', cdisp)
                        if fn_m:
                            file_name_from_upload = fn_m.group(1)
                        file_data = payload
                    elif field_name == 'type' and payload:
                        type_val = payload.decode('utf-8', errors='ignore').strip()
                    elif field_name == 'filename' and payload:
                        custom_name = payload.decode('utf-8', errors='ignore').strip()

                final_name = custom_name if custom_name else file_name_from_upload

                if file_data and final_name:
                    if type_val == 'image':
                        dest_folder = 'images'
                    elif type_val == 'doc':
                        dest_folder = 'docs'
                    else:
                        dest_folder = 'audio'

                    dest_dir = os.path.join(DIRECTORY, 'assets', dest_folder)
                    os.makedirs(dest_dir, exist_ok=True)
                    target_path = os.path.join(dest_dir, final_name)

                    with open(target_path, 'wb') as f:
                        f.write(file_data)

                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'status': 'ok', 'filename': final_name}).encode('utf-8'))
                    print(f">> [GESTOR] Archivo guardado con éxito en assets/{dest_folder}/{final_name}")
                    return

                self.send_error(400, "Archivo o nombre ausente")
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

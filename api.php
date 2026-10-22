<?php
/**
 * API DEL GESTOR - BAÑOS DE LA ENCINA
 * ===================================
 * Permite guardar hitos.js y subir imágenes/audios directamente
 * al servidor sin necesidad de usar programas FTP.
 */

// Iniciar sesión
session_start();

// ========================================================
// CONFIGURACIÓN DE SEGURIDAD
// ========================================================
// Puedes cambiar esta contraseña por la que tú prefieras:
define('ADMIN_PASSWORD', '23214Banos2026!');

header('Content-Type: application/json; charset=utf-8');

$action = $_GET['action'] ?? $_POST['action'] ?? '';

// 1. INICIAR SESIÓN / COMPROBAR CONTRASEÑA
if ($action === 'login') {
    $input = json_decode(file_get_contents('php://input'), true);
    $pass = $input['password'] ?? '';

    if ($pass === ADMIN_PASSWORD) {
        $_SESSION['encina_admin_logged'] = true;
        echo json_encode(['status' => 'ok', 'message' => 'Acceso concedido']);
    } else {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Contraseña incorrecta']);
    }
    exit;
}

// 2. VERIFICAR AUTENTICACIÓN PARA TODAS LAS DEMÁS ACCIONES
if (empty($_SESSION['encina_admin_logged'])) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'No autorizado. Inicia sesión primero.']);
    exit;
}

// 3. GUARDAR hitos.js
if ($action === 'save') {
    $input = json_decode(file_get_contents('php://input'), true);
    $jsContent = $input['jsContent'] ?? '';

    if (empty($jsContent)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'El contenido está vacío']);
        exit;
    }

    $targetFile = __DIR__ . '/js/hitos.js';

    if (file_put_contents($targetFile, $jsContent) !== false) {
        echo json_encode(['status' => 'ok', 'message' => 'Archivo js/hitos.js guardado exitosamente en el servidor']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'No se pudo escribir en js/hitos.js. Comprueba los permisos de escritura en el servidor.']);
    }
    exit;
}

// 4. SUBIDA DE ARCHIVOS (IMÁGENES O AUDIOS) DIRECTA DESDE EL NAVEGADOR
if ($action === 'upload') {
    if (empty($_FILES['file'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'No se ha enviado ningún archivo']);
        exit;
    }

    $file = $_FILES['file'];
    $type = $_POST['type'] ?? 'image'; // 'image', 'audio' o 'doc'
    $customName = trim($_POST['filename'] ?? '');

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    // Validar tipo de archivo
    $allowedImg = ['jpg', 'jpeg', 'png', 'webp'];
    $allowedAudio = ['mp3', 'm4a', 'wav'];
    $allowedDoc = ['pdf'];

    if ($type === 'image' && !in_array($ext, $allowedImg)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Formato de imagen no permitido']);
        exit;
    }

    if ($type === 'audio' && !in_array($ext, $allowedAudio)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Formato de audio no permitido (solo MP3, M4A o WAV)']);
        exit;
    }

    if ($type === 'doc' && !in_array($ext, $allowedDoc)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Formato de documento no permitido (solo archivos PDF)']);
        exit;
    }

    $destDir = ($type === 'image') ? __DIR__ . '/assets/images/' : (($type === 'doc') ? __DIR__ . '/assets/docs/' : __DIR__ . '/assets/audio/');
    if (!is_dir($destDir)) {
        mkdir($destDir, 0755, true);
    }

    // Nombre final del archivo
    $finalName = !empty($customName) ? $customName : $file['name'];
    // Asegurar extensión
    if (strtolower(pathinfo($finalName, PATHINFO_EXTENSION)) !== $ext) {
        $finalName .= '.' . $ext;
    }

    $targetPath = $destDir . $finalName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        echo json_encode([
            'status' => 'ok',
            'filename' => $finalName,
            'message' => "Archivo $finalName subido con éxito al servidor"
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Error al mover el archivo subido en el servidor']);
    }
    exit;
}

// 5. CERRAR SESIÓN
if ($action === 'logout') {
    $_SESSION['encina_admin_logged'] = false;
    session_destroy();
    echo json_encode(['status' => 'ok']);
    exit;
}

http_response_code(404);
echo json_encode(['status' => 'error', 'message' => 'Acción desconocida']);

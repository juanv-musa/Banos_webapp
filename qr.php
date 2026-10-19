<?php
/**
 * REDIRECCIONADOR DE CÓDIGOS QR DINÁMICOS PROPIOS
 * ==============================================
 * Baños de la Encina - Sin depender de empresas externas.
 * 
 * Uso:
 * Imprimes el QR con la URL: https://www.banosdelaencina.es/app/qr.php?id=42
 * Este script redirige automáticamente al visitante a: https://www.banosdelaencina.es/app/#/detail/42
 * 
 * Si en el futuro quieres cambiar el destino de cualquier código, 
 * solo tienes que editar la lista de excepciones abajo.
 */

$id = isset($_GET['id']) ? intval($_GET['id']) : 1;

// Excepciones o destinos personalizados si en el futuro quieres cambiar alguno:
$destinosPersonalizados = [
    // Ejemplo: '42' => 'https://www.banosdelaencina.es/app/#/detail/42',
];

if (isset($destinosPersonalizados[$id])) {
    $urlDestino = $destinosPersonalizados[$id];
} else {
    // Redirección estándar al hito correspondiente
    $urlDestino = "./#/detail/" . $id;
}

// Redirigir al visitante
header("Location: " . $urlDestino, true, 302);
exit;

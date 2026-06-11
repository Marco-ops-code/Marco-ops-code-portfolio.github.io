<?php
declare(strict_types=1);

/**
 * Le formulaire de contact a ete retire du site.
 * Les visiteurs utilisent les liens mailto / tel sur la page Contact.
 */
header('Content-Type: application/json; charset=utf-8');
http_response_code(410);
echo json_encode([
    'success' => false,
    'message' => 'Le formulaire n\'est plus disponible. Utilise l\'email ou le numero sur la page Contact.',
]);

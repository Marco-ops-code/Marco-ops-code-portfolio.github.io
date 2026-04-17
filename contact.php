<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Methode non autorisee.'
    ]);
    exit;
}

$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Merci de remplir tous les champs.'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Adresse email invalide.'
    ]);
    exit;
}

// Personnalise cette adresse avec ton email de reception.
$to = 'contact@ton-domaine.com';
$subject = 'Nouveau message portfolio';
$body = "Nom: {$name}\nEmail: {$email}\n\nMessage:\n{$message}\n";
$headers = "From: noreply@ton-domaine.com\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$mailSent = @mail($to, $subject, $body, $headers);

if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Message envoye avec succes. Merci !'
    ]);
    exit;
}

http_response_code(500);
echo json_encode([
    'success' => false,
    'message' => "Le serveur n'a pas pu envoyer le message."
]);

<?php
include 'config.php';

$sql = "SELECT * FROM lista_tarefas";
$stmt = $pdo->query($sql);

$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($tasks);
?>
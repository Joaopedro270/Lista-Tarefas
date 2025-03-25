<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['tarefa'])) {
    $tarefa = $_POST['tarefa'];

    
    if (!empty($tarefa)) {
        $sql = "INSERT INTO lista_tarefas (tarefa) VALUES (:tarefa)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':tarefa', $tarefa);
        $stmt->execute();

        echo json_encode(['id' => $pdo->lastInsertId(), 'tarefa' => $tarefa]);
    } else {
        echo json_encode(['error' => 'Tarefa não pode ser vazia!']);
    }
} else {
    echo json_encode(['error' => 'Requisição inválida']);
}
?>
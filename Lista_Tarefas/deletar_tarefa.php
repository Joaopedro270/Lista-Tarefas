<?php
include 'config.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "DELETE FROM lista_tarefas WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    echo json_encode(['message' => 'Tarefa excluída com sucesso']);
} else {
    echo json_encode(['error' => 'ID da tarefa não informado']);
}
?>
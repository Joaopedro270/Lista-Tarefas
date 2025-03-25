document.getElementById('addTarefa').addEventListener('click', function() {
    const tarefaInput = document.getElementById('tarefaInput');
    const tarefaTexto = tarefaInput.value.trim();

    if (tarefaTexto !== "") {
        fetch('add_task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'tarefa=' + encodeURIComponent(tarefaTexto)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                
                const listaTarefas = document.getElementById('listaTarefas');
                const li = document.createElement('li');
                li.textContent = data.tarefa;

                
                const btnExcluir = document.createElement('button');
                btnExcluir.textContent = 'Excluir';
                btnExcluir.addEventListener('click', function() {
                    excluirTarefa(data.id, li);
                });

                li.appendChild(btnExcluir);
                listaTarefas.appendChild(li);
            }
        })
        .catch(err => console.error('Erro ao adicionar tarefa:', err));

        tarefaInput.value = "";
    } else {
        alert('Por favor, digite uma tarefa!');
    }
});

document.getElementById('tarefaInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('addTarefa').click();
    }
});


function excluirTarefa(id, li) {
    fetch(`delete_task.php?id=${id}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            li.remove();
        } else {
            alert('Erro ao excluir tarefa');
        }
    })
    .catch(err => console.error('Erro ao excluir tarefa:', err));
}


function carregarTarefas() {
    fetch('get_tasks.php')
        .then(response => response.json())
        .then(tarefas => {
            const listaTarefas = document.getElementById('listaTarefas');
            tarefas.forEach(tarefa => {
                const li = document.createElement('li');
                li.textContent = tarefa.tarefa;

                const btnExcluir = document.createElement('button');
                btnExcluir.textContent = 'Excluir';
                btnExcluir.addEventListener('click', function() {
                    excluirTarefa(tarefa.id, li);
                });

                li.appendChild(btnExcluir);
                listaTarefas.appendChild(li);
            });
        })
        .catch(err => console.error('Erro ao carregar tarefas:', err));
}


window.onload = carregarTarefas;

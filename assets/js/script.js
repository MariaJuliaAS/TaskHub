let sectionTarefa = document.querySelector('#task');
let listElement = document.querySelector('#contentTask ul');
let listaTarefas = JSON.parse(localStorage.getItem('@taskHub')) || [];

function addTask() {
    let inputTask = document.querySelector('#inputTask').value;

    if (inputTask === '') {
        alert('Digite uma tarefa!');
    } else {
        listaTarefas.push(inputTask);
        salvarDados();
        document.querySelector('#inputTask').value = '';
    }
    renderTask();
}

function renderTask() {
    listElement.innerHTML = '';

    if (listaTarefas.length > 0) {
        listaTarefas.map((task) => {
            let posicao = listaTarefas.indexOf(task);
            let liElement = document.createElement('li');
            
            let checkElement = document.createElement('input');
            checkElement.type = 'checkbox';
            checkElement.id = `checkbox-${posicao}`;
            checkElement.setAttribute('onchange', `concluded(${posicao})`);
            liElement.appendChild(checkElement);

            liText = document.createTextNode(task)
            liElement.appendChild(liText);

            let editElement = document.createElement('button');
            let editText = document.createTextNode('Editar');
            editElement.appendChild(editText);
            editElement.setAttribute('onclick', `editTask(${posicao})`);
            liElement.appendChild(editElement);

            let deleteElement = document.createElement('button');
            let deleteText = document.createTextNode('Excluir');
            deleteElement.appendChild(deleteText);
            deleteElement.setAttribute('onclick', `deleteTask(${posicao})`);
            liElement.appendChild(deleteElement);

            listElement.appendChild(liElement);
        });
    } else {
        listElement.innerHTML = 'Sem tarefas cadastradas!'
    }
}
renderTask();

function concluded(posicao){
    const checkbox = document.getElementById(`checkbox-${posicao}`);
    const textTask = checkbox.parentNode;

    if(checkbox.checked){
        textTask.style.textDecoration = 'line-through';
    }else{
        textTask.style.textDecoration = 'none';
    }
}

function editTask(posicao) {
    const posicaoTarefa = listaTarefas[posicao];

    const novaTarefa = prompt('Nova tarefa: ', posicaoTarefa)
    listaTarefas[posicao] = novaTarefa  || posicaoTarefa
        salvarDados();
        renderTask();
}

function deleteTask(posicao) {
    listaTarefas.splice(posicao, 1);
    salvarDados();
    renderTask();
}

document.addEventListener('keyup', function() {
    let searchElement = document.querySelector('#inputSearch').value.toLowerCase();
    let taskList = document.querySelector('#contentTask ul'); 

    let tasks = taskList.getElementsByTagName('li');
    
    for (let i = 0; i < tasks.length; i++) {
        let taskSearch = tasks[i].textContent.toLowerCase();

        if (taskSearch.includes(searchElement)) {
            tasks[i].style.display = '';  
        } else {
            tasks[i].style.display = 'none';  
        }
    }
});


function salvarDados() {
    localStorage.setItem('@taskHub', JSON.stringify(listaTarefas));
}
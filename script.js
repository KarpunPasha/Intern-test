const addBtn = document.getElementById('addBtn');
const taskLabel = document.getElementById('task');
const todoList = document.querySelector('.todo-list');

let task;
!localStorage.task ? task=[] : task = JSON.parse(localStorage.getItem('task'));

let elements = [];


function Tasks(name) {
    this.name = name;
    this.complete = false;
}

const createTemplate = (tasks, index) => {
    return ` <div class="todo-item ">
    <div class="item-description">
    <span class="noDone ${tasks.complete ? 'done' : ''}"><i>&#10003;</i></span>
    <a class="name ${tasks.complete ? 'check' : ''}" onClick="doneTask(${index})">${tasks.name}</a>
    </div>
    <span>
    <button class="btn-del" onClick="delTask(${index})">X</button>
    </span>
    </div>
    `
}

const ListTask = () => {
    todoList.innerHTML = "";
    if (task.length > 0) {
        task.forEach((item, index) => {
            todoList.innerHTML += createTemplate(item, index) 
        });

        elements = document.querySelectorAll('.todo-item');
}
}

ListTask();

const updLocal = () => {
    localStorage.setItem('task',JSON.stringify(task));
}

const doneTask = index => {
    task[index].complete = !task[index].complete;
    if (task[index].complete) {
        elements[index].classList.add('check');
    } else {
        elements[index].classList.remove('check');
    }
    updLocal();
    ListTask();
}

addBtn.addEventListener('click', () => {
    task.push(new Tasks(taskLabel.value));
    updLocal();
    ListTask();
    taskLabel.value = "";
})

const delTask = index => {
    task.splice(index, 1);
    updLocal();
    ListTask();
}
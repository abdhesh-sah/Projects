const addbtn = document.getElementById('addBtn');
const inputtask = document.getElementById('taskInput');
const tasklist = document.getElementById('taskList');
let tasks = [];

function save() {

    let textList = JSON.stringify(tasks);
    localStorage.setItem('mytask', textList);
}

function read() {
    let savedText = localStorage.getItem('mytask');
    if (savedText) {
        tasks = JSON.parse(savedText);
        tasks.forEach(function (taskText) {
            createTaskElement(taskText);
        });
    }
}

function createTaskElement(text) {
    let newtask = document.createElement('li');
    newtask.textContent = taskObj.text;
    if (taskObj.completed){
        newtask.classList.add('completed');
    }
    newtask.style.display = 'flex';
    newtask.style.justifyContent = 'space-between';
    newtask.style.alignItems = 'center';
    newtask.style.padding = '8px';
    newtask.style.marginBottom = '8px';

    newtask.addEventListener('click', function () {
        newtask.classList.toggle('completed');
        taskObj.completed =!taskObj.completed;
        save();
    });

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.className = 'delete-btn';
    deleteBtn.style.cursor = 'pointer';

    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        newtask.remove();

        tasks = tasks.filter(function(item) {
            return item !== text;
        });
        save();


    });

    newtask.appendChild(deleteBtn);
    tasklist.appendChild(newtask);

}

function addtask() {

    let text = inputtask.value;

    if (text.trim() === "") {
        alert("Please enter a task");
        return;
    }

    let taskObj= {text: text, completed:false}
    tasks.push(taskObj);
    createTaskElement(taxtObj);
    inputtask.value = "";
    save();
};

addbtn.addEventListener("click", addtask);
inputtask.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addtask();

    }
});

read();

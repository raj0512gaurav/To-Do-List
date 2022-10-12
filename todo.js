//Selectors
const dateElement = document.getElementById("date");
const newTask = document.querySelector('#new_task');
const addButton = document.querySelector('#add_btn');
const taskList = document.querySelector('#task_list');
const removeAllButton = document.querySelector('#remove_all');
const filterOptions = document.querySelector('#filter');

//Event listeners
addButton.addEventListener('click', addTask);
taskList.addEventListener('click', editDoneDelete);
removeAllButton.addEventListener('click', removeAll);
filterOptions.addEventListener('click', todoFilter);

//Date
const date = new Date();
function formatDate(date){
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}
dateElement.innerText = formatDate(date);

//Functions
function addTask(event){
    event.preventDefault(); //prevent the form from submittting
    
    const input = newTask.value;
    if(!input){
        alert("Enter a task");
    }
    else{

    //Task Div
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    //Content Div
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    //Create todo task
    const newTodo = document.createElement('input');
    newTodo.value = newTask.value;
    newTodo.type = "text";
    newTodo.setAttribute("readonly", "readonly")
    newTodo.classList.add('text');
    contentDiv.appendChild(newTodo);

    //Append Content Div to Task Div
    taskDiv.appendChild(contentDiv);

    // Actions Div
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    //Edit button
    const editButton = document.createElement('button');
    editButton.innerText = "Edit";
    editButton.classList.add('edit');
    actionsDiv.appendChild(editButton);

    //Done button
    const doneButton = document.createElement('button');
    doneButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    doneButton.classList.add('done');
    actionsDiv.appendChild(doneButton);

    //Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add('delete');
    actionsDiv.appendChild(deleteButton);

    //Append Actions Div to Task Div
    taskDiv.appendChild(actionsDiv);

    //Append whole Task Div to  Task list Div
    taskList.appendChild(taskDiv);

    //Clear Input Value
    newTask.value = "";
    }
}

function editDoneDelete(event){
    const item = event.target;

    //Delete
    if(item.classList[0]==='delete'){
        const todoactions = item.parentElement; //to div.actions
        const todo = todoactions.parentElement; //to div.task
        todo.remove();
    }

    //Done
    if(item.classList[0]==='done'){
        const todoactions = item.parentElement;
        const todo = todoactions.parentElement;
        todo.classList.toggle('completed');
    }

    if(item.classList[0]==='edit'){
        const todoactions = item.parentElement;
        const todo = todoactions.parentElement;
        const todocontent = todo.firstChild;
        const todotext = todocontent.firstChild;
        if(item.innerText == "Edit"){
            todotext.removeAttribute("readonly");
            todotext.focus();
            item.innerText = "Save";
        } else {
            const textvalue = todotext.value;
            if(!textvalue){
                alert("Task can't be empty");
            } else {
                item.innerText = "Edit";
                todotext.setAttribute("readonly", "readonly");
            }
        }
    }
}

function todoFilter(event){
    const todos = document.querySelectorAll(".task");
    todos.forEach(function(task) {
        switch (event.target.value) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                if(task.classList.contains('completed')){
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
                break;
            case "not_completed":
                if(task.classList.contains('completed')){
                    task.style.display = "none";
                } else {
                    task.style.display = "flex";
                }
        }
    });
}

function removeAll(){
    const item = document.querySelectorAll(".task");
    item.forEach(task => {
        task.remove();
    })
}
const listCountElement = document.querySelector("[data-list-count]");
const tasksContainer = document.querySelector("[data-tasks]");
const taskTemplate = document.getElementById('task-template')
const newTaskInput = document.querySelector('[data-new-task-input]')
const newTaskButton = document.getElementById("btn-task")
const clearCompletedButton = document.getElementById("btn-delete")


window.addEventListener("load", getAndRenderTasks);
newTaskButton.addEventListener("click", createTask);
clearCompletedButton.addEventListener("click", deleteCompletedTasks)


function getAndRenderTasks() {
    axios.get("http://localhost:8000/api/record")
        .then(response => {
            renderTasks(response.data);
            countUnfinishedTasks();

        })
}

function renderTasks(tasks) {
    tasks.forEach(task => {
        addNewTask(task)
    })
}

function addNewTask(task) {

    const taskElement = document.importNode(taskTemplate.content, true)
    const item = taskElement.querySelector(".collection-item")
    item.id = task.record_id
    item.completed = task.completed
    item.querySelector("span").innerText = task.name
    taskElement.querySelector("#finish").addEventListener("click", finishTask)
    taskElement.querySelector("#delete").addEventListener("click", deleteTask)
    tasksContainer.appendChild(taskElement)
    if (task.completed) {
        item.querySelector("span").style.textDecoration = "line-through"
    }
    countUnfinishedTasks()
}


function createTask(event) {
    const taskName = newTaskInput.value
    if (!taskName || taskName.trim() === '') return
    event.preventDefault();
    const task = {name: newTaskInput.value, completed: false};
    axios.post('http://localhost:8000/api/record', task)
        .then(response => {
            addNewTask(response.data)
            newTaskInput.value = null
        })
}

function sendFinishTaskRequest(event) {
    event.preventDefault();
    let id = event.currentTarget.parentElement.parentElement.id
    let name = event.currentTarget.parentElement.parentElement.querySelector("span").innerText
    const task = {name: name, completed: true};

    axios.put(`http://localhost:8000/api/record/${id}`, task)
        .then(response => console.log(response.data));

}

function sendDeleteTaskRequest(id) {
    axios.delete(`http://localhost:8000/api/record/${id}`)
        .then(response => console.log(response.data));
}

function finishTask(event) {
    event.preventDefault();
    sendFinishTaskRequest(event)
    event.currentTarget.parentElement.parentElement.querySelector("span").style.textDecoration = "line-through"
    countUnfinishedTasks()

}

function deleteTask(event) {
    event.preventDefault();
    let id = event.currentTarget.parentElement.parentElement.id
    sendDeleteTaskRequest(id)
    let elementToDelete = event.currentTarget.parentElement.parentElement
    elementToDelete.parentNode.removeChild(elementToDelete)
    countUnfinishedTasks()
}

function countUnfinishedTasks() {
    let allTasks = document.querySelectorAll("span")
    let unfinishedTasksLen = [...allTasks].filter(task => task.style.textDecorationLine !== "line-through").length
    listCountElement.innerText = `You have ${unfinishedTasksLen} uncompleted ${(unfinishedTasksLen === 1) ? 'task' : 'tasks'}`
}

function deleteCompletedTasks() {
    let allTasks = document.querySelectorAll("span")
    let finishedTasks = [...allTasks].filter(task => task.style.textDecorationLine === "line-through")
    finishedTasks.forEach((task) => {
        let id = task.parentElement.getAttribute("id")
        sendDeleteTaskRequest(id)
    })
    setTimeout(() => location.reload(), 500);
}





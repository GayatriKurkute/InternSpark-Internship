// 1. Reference HTML elements using the DOM
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
// 2. Function to add a new task
function addTask() {
    const taskValue = taskInput.value.trim();
    if (taskValue === "") {
        alert("Please type a task first!");
        return;
    }

    const li = document.createElement('li');

    // We added a checkbox span that acts as the toggle container
    li.innerHTML = `
        <div class="task-content">
            <span class="custom-checkbox"></span>
            <span class="task-text">${taskValue}</span>
        </div>
        <button class="delete-btn">Delete</button>
    `;

    // Now clicking the entire text or checkbox area will toggle completion
    const taskContent = li.querySelector('.task-content');
    taskContent.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });

    taskList.appendChild(li);
    taskInput.value = "";
}
// 3. Set up listeners to trigger the addTask function
addBtn.addEventListener('click', addTask);

// Also let the user press the 'Enter' key to add a task instead of just clicking
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
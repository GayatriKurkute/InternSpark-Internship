// 1. Reference HTML elements using the DOM
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
// 2. Function to add a new task
function addTask() {
    const taskValue = taskInput.value.trim(); // Get the text and strip empty spacing

    // If the input is empty, don't do anything
    if (taskValue === "") {
        alert("Please type a task first!");
        return;
    }

    // Create a new list item (<li>) element dynamically
    const li = document.createElement('li');

    // Add HTML content inside our new <li> element
    li.innerHTML = `
        <span class="task-text">${taskValue}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Add interactivity to the individual task text (Toggle Completed Status)
    const taskText = li.querySelector('.task-text');
    taskText.addEventListener('click', function() {
        li.classList.toggle('completed'); // Dynamically toggles the CSS style we wrote earlier
    });

    // Add interactivity to the individual delete button
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        li.remove(); // Completely deletes the <li> element from the DOM tree
    });

    // Append our brand new task element to our main list container (<ul>)
    taskList.appendChild(li);

    // Clear out the input box so the user can type a fresh task
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
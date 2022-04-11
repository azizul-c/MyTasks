// Task Class: Represents a Task
class Task {
    constructor(name, priority, deadline) {
        this.name = name;
        this.priority = priority;
        this.deadline = deadline;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayTasks () {
        
        const StoredTasks = [
            {
                name: 'Do laundry',
                priority: 1,
                deadline: '2022-04-12'
            },
            {
                name: 'Run errands',
                priority: 1,
                deadline: '2022-04-13'
            }
        ];

        // Get existing tasks from Local Storage
        //const tasks = Store.getTasks();
        const tasks = StoredTasks;

        // Add all the tasks to the UI
        tasks.forEach((task) => UI.addTasksToList(task));
    }

    static addTasksToList (task) {
        const list = document.querySelector('#task-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td><a href="#" class="btn btn-success btn-sm done">✓</a></td>
        <td>${task.name}</td>
        <td>${task.priority}</td>
        <td>${task.deadline}</td>`;

        list.appendChild(row);
    }

    static completeTask (el) {
        if (el.classList.contains('done')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert (message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#task-form');
        container.insertBefore (div, form);

        // Vanish after 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields () {
        document.querySelector('#task').value = '';
        document.querySelector('#priority').value = 1;
        document.querySelector('#deadline').value = '';
    }
}

// Store Class: Handles Local Storage
class Store {
    static getTasks () {

        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        return tasks;
    }

    static addTasks (task) {
        const tasks = Store.getTasks();
        tasks.push (task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static removeTask (task) {

    }
}

// Event: Display Tasks
document.addEventListener('DOMContentLoaded', UI.displayTasks); // fires off as soon as app loads

// Event: Add a Task
document.querySelector('#task-form').addEventListener('submit', (e) => {

    // Prevent actual submit
    e.preventDefault();

    // Get input values
    const name = document.querySelector('#task').value;
    const priority = document.querySelector('#priority').value;
    const deadline = document.querySelector('#deadline').value;

    // Validate
    if (name === '') {
        UI.showAlert('Please describe the task.', 'danger');
    }
    else {
        // Instantiate Task
        const task = new Task (name, priority, deadline);

        // Add task to UI
        UI.addTasksToList(task);

        // Add task to Local Storage
        Store.addTasks(task);

        // Show success message
        UI.showAlert('Task added.', 'success');

        // Clear fields
        UI.clearFields();
    }
})


// Event: Complete a Task
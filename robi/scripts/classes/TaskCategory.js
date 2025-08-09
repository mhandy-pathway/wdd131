import Task from './Task.js';
export default class TaskCategory {
    constructor(name = '', tasks = []) {
        this.name = name;
        this.tasks = tasks;
    }

    populateFromObj(obj) {
        this.name = obj.name;
        this.tasks = [];
        obj.tasks.forEach(task_obj => {
            let task = new Task();
            task.populateFromObj(task_obj);
            this.tasks.push(task);
        });
    }
    buildElement(parentElement, showControls = false, moveUpCallback = () => {}, moveDownCallback = () => {}, deleteCallback = () => {}, addCallback = () => {}, markTaskCompletedCallback = () => {}, moveTaskUpCallback = () => {}, moveTaskDownCallback = () => {}, deleteTaskCallback = () => {}) {
        const section = document.createElement('section');
        section.classList.add('category');
        section.classList.add('task');
        parentElement.appendChild(section);
        
        const h2 = document.createElement('h2');
        h2.innerHTML = `<span class="headline">${this.name}</span><span class="${showControls ? "up" : ""}"></span><span class="${showControls ? "down" : ""}"></span><span class="${showControls ? "delete" : ""}"></span>`;
        if(showControls) {
            h2.querySelector('span.up').addEventListener('click', () => moveUpCallback(this));
            h2.querySelector('span.down').addEventListener('click', () => moveDownCallback(this));
            h2.querySelector('span.delete').addEventListener('click', () => deleteCallback(this));
        }
        section.appendChild(h2);
    
        const div = document.createElement('div');
        if(showControls) {
            div.innerHTML = `
                <form class="grid">
                    <label>New Task: <input type="text"></label>
                    <input type="button" value="➕">
                </form>
            `;
            div.querySelector('input[type="button"]').addEventListener('click', () => {
                addCallback(this, new Task(div.querySelector('input[type="text"]').value));
            });
        }
        section.appendChild(div);
    
        const task_div = document.createElement('div');
        div.appendChild(task_div);
    
        this.tasks.forEach(task => {
            const span = document.createElement('span');
            span.classList.add('category');
            span.classList.add('task');
            span.innerHTML = `${showControls ? `<input type="checkbox" ${task.completed ? 'checked' : ""}>` : `<img src="images/checkbox${task.completed ? "_checked" : ""}.svg" class="checkmark${task.completed ? " checked" : ""}" alt="Checkbox">`}<span>${task.text}</span><span class="${showControls ? "up" : ""}"></span><span class="${showControls ? "down" : ""}"></span><span class="${showControls ? "delete" : ""}"></span>`;
            if(showControls) {
                const checkbox = span.querySelector('input[type="checkbox"]');
                checkbox.addEventListener('change', () => markTaskCompletedCallback(task, checkbox.checked));
                span.querySelector('span.up').addEventListener('click', () => moveTaskUpCallback(this, task));
                span.querySelector('span.down').addEventListener('click', () => moveTaskDownCallback(this, task));
                span.querySelector('span.delete').addEventListener('click', () => deleteTaskCallback(this, task));
            }
            task_div.appendChild(span);
        })
    }
}
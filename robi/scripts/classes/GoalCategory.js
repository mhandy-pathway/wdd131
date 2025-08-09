import Goal from './Goal.js';
export default class GoalCategory {
    constructor(name = '', goals = []) {
        this.name = name;
        this.goals = goals;
    }
    populateFromObj(obj) {
        this.name = obj.name;
        this.goals = [];
        obj.goals.forEach(goal_obj => {
            let goal = new Goal();
            goal.populateFromObj(goal_obj);
            this.goals.push(goal);
        });
    }
    buildElement(parentElement, showControls = false, moveUpCallback = () => {}, moveDownCallback = () => {}, deleteCallback = () => {}, addCallback = () => {}, moveGoalUpCallback = () => {}, moveGoalDownCallback = () => {}, deleteGoalCallback = () => {}) {
        const section = document.createElement('section');
        section.classList.add('category');
        section.classList.add('goal');
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
                    <label>New Goal: <input type="text"></label>
                    <input type="button" value="➕">
                </form>
            `;
            div.querySelector('input[type="button"]').addEventListener('click', () => {
                addCallback(this, new Goal(div.querySelector('input[type="text"]').value));
            });
        }
        section.appendChild(div);
    
        const goal_div = document.createElement('div');
        div.appendChild(goal_div);
    
        this.goals.forEach(goal => {
            const span = document.createElement('span');
            span.classList.add('category')
            span.classList.add('goal')
            span.innerHTML = `<span>${goal.text}</span><span class="${showControls ? "up" : ""}"></span><span class="${showControls ? "down" : ""}"></span><span class="${showControls ? "delete" : ""}"></span>`;
            if(showControls) {
                span.querySelector('span.up').addEventListener('click', () => moveGoalUpCallback(this, goal));
                span.querySelector('span.down').addEventListener('click', () => moveGoalDownCallback(this, goal));
                span.querySelector('span.delete').addEventListener('click', () => deleteGoalCallback(this, goal));
            }
            goal_div.appendChild(span);
        })
    }
}
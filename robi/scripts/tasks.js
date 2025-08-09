import Robi from './Robi.js';
import TaskCategory from './classes/TaskCategory.js';
import Task from './classes/Task.js';

// Get and Display Categories
const task_categories = Robi.getTaskCategories();
const tc_div = document.getElementById('task_categories');
refreshCategoryList();

// Setup New Category Submit Event
document.getElementById('new_category_submit').addEventListener('click', () => {
    task_categories.push(new TaskCategory(document.getElementById('new_category_name').value));
    document.getElementById('new_category_name').value = '';
    Robi.save();
    refreshCategoryList();
});

// Function Declarations
function refreshCategoryList() {
    // Remove all category sections
    tc_div.innerHTML = '';

    task_categories.forEach(task_category => task_category.buildElement(tc_div, true, moveTaskCategoryUp, moveTaskCategoryDown, deleteTaskCategory, addTask, markTaskCompletion, moveTaskUp, moveTaskDown, deleteTask));
}
function moveTaskCategoryUp(category) {
    const category_index = task_categories.indexOf(category);
    if(category_index < 1) {
        // Top Element... Do not proceed
        return;
    }
    const previous_category = task_categories[category_index - 1];
    task_categories.splice(category_index - 1, 2, category, previous_category);
    Robi.save();
    refreshCategoryList();
}
function moveTaskCategoryDown(category) {
    const category_index = task_categories.indexOf(category);
    if(category_index >= task_categories.length - 1) {
        // Bottom Element... Do not proceed
        return;
    }
    const next_category = task_categories[category_index + 1];
    task_categories.splice(category_index, 2, next_category, category);
    Robi.save();
    refreshCategoryList();
}
function deleteTaskCategory(category) {
    const category_index = task_categories.indexOf(category);
    task_categories.splice(category_index, 1);
    Robi.save();
    refreshCategoryList();
}
function addTask(category, task) {
    category.tasks.push(task);
    Robi.save();
    refreshCategoryList();
}
function markTaskCompletion(task, completed) {
    task.completed = completed;
    Robi.save();
    refreshCategoryList();
}
function moveTaskUp(category, task) {
    const task_index = category.tasks.indexOf(task);
    if(task_index < 1) {
        // Top Element... Do not proceed
        return;
    }
    const previous_task = category.tasks[task_index - 1];
    category.tasks.splice(task_index - 1, 2, task, previous_task);
    Robi.save();
    refreshCategoryList();
}
function moveTaskDown(category, task) {
    const task_index = category.tasks.indexOf(task);
    if(task_index >= category.tasks.length - 1) {
        // Bottom Element... Do not proceed
        return;
    }
    const next_task = category.tasks[task_index + 1];
    category.tasks.splice(task_index, 2, next_task, task);
    Robi.save();
    refreshCategoryList();
}
function deleteTask(category, task) {
    const task_index = category.tasks.indexOf(task);
    category.tasks.splice(task_index, 1);
    Robi.save();
    refreshCategoryList();
}
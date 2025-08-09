import Robi from './Robi.js';
import GoalCategory from './classes/GoalCategory.js';

// Get and Display Categories
const goal_categories = Robi.getGoalCategories();
const gc_div = document.getElementById('goal_categories');
refreshCategoryList();

// Setup New Category Submit Event
document.getElementById('new_category_submit').addEventListener('click', () => {
    goal_categories.push(new GoalCategory(document.getElementById('new_category_name').value));
    document.getElementById('new_category_name').value = '';
    Robi.save();
    refreshCategoryList();
});

// Function Declarations
function refreshCategoryList() {
    // Remove all category sections
    gc_div.innerHTML = '';

    goal_categories.forEach(goal_category => goal_category.buildElement(gc_div, true, moveGoalCategoryUp, moveGoalCategoryDown, deleteGoalCategory, addGoal, moveGoalUp, moveGoalDown, deleteGoal));
}
function moveGoalCategoryUp(category) {
    const category_index = goal_categories.indexOf(category);
    if(category_index < 1) {
        // Top Element... Do not proceed
        return;
    }
    const previous_category = goal_categories[category_index - 1];
    goal_categories.splice(category_index - 1, 2, category, previous_category);
    Robi.save();
    refreshCategoryList();
}
function moveGoalCategoryDown(category) {
    const category_index = goal_categories.indexOf(category);
    if(category_index >= goal_categories.length - 1) {
        // Bottom Element... Do not proceed
        return;
    }
    const next_category = goal_categories[category_index + 1];
    goal_categories.splice(category_index, 2, next_category, category);
    Robi.save();
    refreshCategoryList();
}
function deleteGoalCategory(category) {
    const category_index = goal_categories.indexOf(category);
    goal_categories.splice(category_index, 1);
    Robi.save();
    refreshCategoryList();
}
function addGoal(category, goal) {
    category.goals.push(goal);
    Robi.save();
    refreshCategoryList();
}
function moveGoalUp(category, goal) {
    const goal_index = category.goals.indexOf(goal);
    if(goal_index < 1) {
        // Top Element... Do not proceed
        return;
    }
    const previous_goal = category.goals[goal_index - 1];
    category.goals.splice(goal_index - 1, 2, goal, previous_goal);
    Robi.save();
    refreshCategoryList();
}
function moveGoalDown(category, goal) {
    const goal_index = category.goals.indexOf(goal);
    if(goal_index >= category.goals.length - 1) {
        // Bottom Element... Do not proceed
        return;
    }
    const next_goal = category.goals[goal_index + 1];
    category.goals.splice(goal_index, 2, next_goal, goal);
    Robi.save();
    refreshCategoryList();
}
function deleteGoal(category, goal) {
    const goal_index = category.goals.indexOf(goal);
    category.goals.splice(goal_index, 1);
    Robi.save();
    refreshCategoryList();
}
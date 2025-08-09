import Robi from './Robi.js';
const goal_categories = Robi.getGoalCategories();
const task_categories = Robi.getTaskCategories();
const journal_entries = Robi.getJournalEntries();

const goal_div = document.getElementById('goal_div');
const task_div = document.getElementById('task_div');
const entry_div = document.getElementById('entry_div');

goal_categories.forEach(goal_category => goal_category.buildElement(goal_div));
task_categories.forEach(task_category => task_category.buildElement(task_div));
journal_entries.forEach(journal_entry => journal_entry.buildElement(entry_div));
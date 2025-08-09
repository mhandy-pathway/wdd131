export default class Task {
    constructor(text = '', completed = false) {
        this.text = text;
        this.completed = completed;
    }
    populateFromObj(obj) {
        this.text = obj.text;
        this.completed = obj.completed;
    }
}
export default class Goal {
    constructor(text = '') {
        this.text = text;
    }
    populateFromObj(obj) {
        this.text = obj.text;
    }
}
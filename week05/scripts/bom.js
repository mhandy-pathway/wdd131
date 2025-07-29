const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

let chaptersArray = getChapterList() || [];
chaptersArray.forEach(chapter => {
    displayList(chapter);
})


if(button) {
    button.addEventListener('click', () => {
        if(input.value.trim() !== "") {
            displayList(input.value);
            chaptersArray.push(input.value);
            setChapterList();
            input.value = "";
        } else {
            alert('Please specify a Book and Chapter.');
        }
        input.focus();
    });
}

// Functions
function getChapterList() {
    return JSON.parse(localStorage.getItem('ls-test'));
}
function setChapterList() {
    localStorage.setItem('ls-test', JSON.stringify(chaptersArray));
}
function deleteChapter(chapter) {
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}
function displayList(item) {
    const new_li = document.createElement("li");
    const new_button = document.createElement("button");
    new_button.addEventListener('click', () => {
        list.removeChild(new_li);
        deleteChapter(item);
        input.focus();
    })
    new_li.textContent = item;
    new_button.textContent = "❌";
    new_li.append(new_button);
    list.append(new_li);
}
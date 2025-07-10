const button = document.querySelector("button");
if(button) {
    button.addEventListener('click', () => {
        const input = document.querySelector("#favchap");
        if(input.value.trim() !== "") {
            const list = document.querySelector("#list");
            const new_li = document.createElement("li");
            const new_button = document.createElement("button");
            new_button.addEventListener('click', () => {
                list.removeChild(new_li);
                input.focus();
            })
            console.log(input);
            new_li.textContent = input.value;
            input.value = "";
            new_button.textContent = "❌";
            new_li.append(new_button);
            list.append(new_li);
        } else {
            alert('Please specify a Book and Chapter.');
        }
        input.focus();
    });
}
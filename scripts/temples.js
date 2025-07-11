const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
menu.addEventListener('click', () => {
    menu.classList.toggle('open');
    nav.classList.toggle('open');
})
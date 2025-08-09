const menu = document.getElementById('menu');
const nav = document.getElementById('nav');
menu.addEventListener('click', () => {
    menu.classList.toggle('open');
    nav.classList.toggle('open');
})
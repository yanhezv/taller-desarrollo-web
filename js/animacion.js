var searcher = document.querySelector('.buscador label');
var menu     = document.querySelector('header.menu');
var menuIcon = document.querySelector('header.menu .icono_menu .icono');

function scrolling() {
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        menu.classList.add('normal');
    }
    else {
        menu.classList.remove('normal');
    }
}
function toggleSearcher() {
    var input = this.parentNode.querySelector('.input');

    input.classList.toggle('open');
}
function toggleMenu() {
    this.parentNode.classList.toggle('close');
    var navigationMenu = this.closest('header.menu').querySelector('.navegacion');

    var isVisible = navigationMenu.classList.toggle('open');

    if(isVisible) {
        menu.classList.add('mobile');
    }
    else {
        menu.classList.remove('mobile');
    }
}
window.addEventListener("scroll", scrolling,false);
searcher.addEventListener('click',toggleSearcher,false);
menuIcon.addEventListener('click',toggleMenu,false);

const transitionBox = document.querySelector('.transition-box');
const contentWrap = document.querySelector('.content-wrap');
const navbar = document.querySelector('.navbar');

function pageTransition() {
    transitionBox.classList.toggle('active');
    contentWrap.classList.toggle('active');
    navbar.classList.toggle('active');
}

function goToAddPage() {
    window.location.href = '/projects/add';
}

function pageTransitionEnter() {
    setTimeout(pageTransition, 450)
}

pageTransitionEnter()
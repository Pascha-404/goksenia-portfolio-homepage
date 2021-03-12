const btns = document.querySelectorAll('.btn');
const existingProjects = document.querySelectorAll('.existing-project');
const addProjectBtn = document.querySelector('#addProject-btn')
const newProject = document.querySelector('.new');
const transitionBox = document.querySelector('.transition-box');
const contentWrap = document.querySelector('.content-wrap')
const navbar = document.querySelector('.navbar')

function pageTransition() {
    transitionBox.classList.toggle('active');
    contentWrap.classList.toggle('active');
    navbar.classList.toggle('active');
}

function goToAddPage() {
    window.location.href = '/projects/add';
}
btns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.classList.add('mouseIn')
    })
})

btns.forEach(btn => {
    btn.addEventListener('mouseleave', () => {
        btn.classList.remove('mouseIn')
    })
})

addProjectBtn.addEventListener('click', () => {
    pageTransition();
    setTimeout(goToAddPage, 450);

})
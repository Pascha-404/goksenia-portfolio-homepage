const btns = document.querySelectorAll('.btn');
const addProjectBtn = document.querySelector('#addProject-btn')

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
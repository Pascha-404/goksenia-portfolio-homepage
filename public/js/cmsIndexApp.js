const btns = document.querySelectorAll('.btn');
const addProjectBtn = document.querySelector('#addProject-btn')
const newProject = document.querySelector('.new')

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

btns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.classList.add('mouseIn')
    })
});

btns.forEach(btn => {
    btn.addEventListener('mouseleave', () => {
        btn.classList.remove('mouseIn')
    })
});

function goToAddPage() {
    window.location.href = '/cms/add';
}

addProjectBtn.addEventListener('click', () => {
    newProject.classList.toggle('active')
    setTimeout(goToAddPage, 450);

});

// checks if flash-message and creates clickEvent for removing it
if (document.querySelector('.flash-message')) {
    const flashElement = document.querySelector('.flash-message');
    const closeFlash = document.querySelector('.close-flash');

    closeFlash.addEventListener('click', () => {
        flashElement.remove()
    })
};

// fades in the projects //
const projects = document.querySelectorAll('.project')
let fade = 0;

// fadeTime in ms (interval each X ms)
const fadeTime = 15;

function fadeProjectsIn() {
    fade += 1;
    if (fade > 99) {
        clearInterval(interval)
    }
    projects.forEach(project => {
        project.style.opacity = scale(fade, 0, 100, 0, 1);
    })

}

let interval = setInterval(fadeProjectsIn, fadeTime)
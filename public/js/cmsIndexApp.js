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


// animation for project cards on click at editBtn//
const editAnchor = document.querySelectorAll('.edit-anchor');
const editBtn = document.querySelectorAll('.edit-btn')
//delay till changing to page
const delay = 200;

//prevents default behaviour for anchor links
editAnchor.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault()
    })
})

//adds active class to project(starts animation)
function addActive(project) {
    project.classList.add('active');
}

//changes browser location
function locationChange(href) {
    location.href = `${href}`
}

// combines upper functions and adds delay for page-change
//adds clickEvent to element
function clickEventAndGo(clickElement, href, project) {

    clickElement.addEventListener('click', () => {
        addActive(project);
        setTimeout(() => {
            locationChange(href)
        }, delay)
    })
}

//adds clickEvent to the editBtn for each project
// connects the buttons to the right project by i
//takes href from anchor element to go to the right project
function addClickEvent(btnArray) {
    let i = 0;
    for (btn of btnArray) {
        i++;
        const project = document.querySelector(`.project-${i}`);
        const href = document.querySelector(`.a-project-${i}`);
        clickEventAndGo(btn, href, project)
    }
}

addClickEvent(editBtn);
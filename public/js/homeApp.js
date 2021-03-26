const heroBtn = document.querySelector('#heroBtn');
const figRow = document.querySelectorAll('.figure-row');
const figColumn = document.querySelectorAll('.figure-column');

const bodyHeight = document.body.offsetHeight;
const windowHeight = window.innerHeight;

// Toggles hiding for figures at small screens (<970px width) //
function smallViewHome() {
    figRow.forEach(figRow => {
        figRow.classList.add('display-none');
    })
    figColumn.forEach(figColumn => {
        figColumn.classList.remove('display-none');
    })
}

// Sets everything back for big screen view (>970px width) //
function bigViewHome() {
    figRow.forEach(figRow => {
        figRow.classList.remove('display-none')
    })
    figColumn.forEach(figColumn => {
        figColumn.classList.add('display-none')
    })
}

function adjustViewHome() {
    if (window.innerWidth < 970) {
        smallViewHome()
    } else if (window.innerWidth > 970) {
        bigViewHome()
    }
}

adjustViewHome()

window.addEventListener('resize', adjustViewHome)


const scroll = document.querySelector('#scroll');
const navbar = document.querySelector('.navbar');

// hides the scroll-box if scrolled or heroBtn not in window//
function scrollHide() {
    let scrollpos = window.scrollY;
    let heroBtnTop = heroBtn.getBoundingClientRect().top;
    if (scrollpos > 0 || heroBtnTop < 400) {
        scroll.classList.add('active');
    } else {
        scroll.classList.remove('active');
    }
}

// makes sure that scroll-div fades away when navbar-links for same page are clicked
navbar.addEventListener('click', () => {
    setTimeout(() => {
        scrollHide()
    }, 50)
});


window.addEventListener('wheel', (event) => {
    scrollHide()
});

scrollHide()

// transforms figures in and out depending on location at page //

const projectFigures = document.querySelectorAll('.fig-projects');

function checkFigures() {
    const triggerHeight = windowHeight * 0.9;

    projectFigures.forEach(figure => {
        const figureTop = figure.getBoundingClientRect().top;

        if (triggerHeight > figureTop) {
            figure.classList.add('active');
        } else {
            figure.classList.remove('active')
        }
    })
}

window.addEventListener('scroll', () => {
    checkFigures()
})

checkFigures()

const projectBtn = document.querySelectorAll('.projectBtn');
const goToProjectDiv = document.querySelectorAll('.goTo-Project')

//delay till changing to page
const delay = 200;

//prevents default behaviour for anchor links
projectBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
    })
})

//loops through each figure and removes active-class(animation starts)
function removeActive(elements) {
    elements.forEach(element => {
        element.classList.remove('active');
    })
}

//changes browser location
function locationChange(href) {
    location.href = `${href}`
}

// combines upper functions and adds delay for page-change
//adds clickEvent to element
function clickEventAndGo(clickElement, href, figures) {

    clickElement.addEventListener('click', () => {
        removeActive(figures);
        setTimeout(() => {
            locationChange(href)
        }, delay)
    })
}

//adds clickEvent to the btnDiv off "see this project" for each project
// connects the buttons to the right figures by i
//takes href from anchor element to go to the right project
function addClickEvent(btnArray) {
    let i = 0;
    for (btn of btnArray) {
        i++;
        const projFigure = document.querySelectorAll(`.fig-pro${i}`);
        const href = btn.firstElementChild.href;
        clickEventAndGo(btn, href, projFigure)
    }
}

addClickEvent(goToProjectDiv);
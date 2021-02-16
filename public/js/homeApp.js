const heroBtn = document.querySelector('#heroBtn');
const figRow = document.querySelectorAll('.figure-row');
const figColumn = document.querySelectorAll('.figure-column');

const scroll = document.querySelector('#scroll');
const bodyHeight = document.body.offsetHeight;
const windowHeight = window.innerHeight;

// Toggles hiding for figures at small screens (<970px width)
function smallViewHome() {
    figRow.forEach(figRow => {
        figRow.classList.add('display-none');
    })
    figColumn.forEach(figColumn => {
        figColumn.classList.remove('display-none');
    })
}

// Sets everything back for big screen view (>970px width)
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


// hides the scroll-box at reaching bottom of page
function scrollHide() {
    let scrollpos = window.scrollY;
    if (bodyHeight <= (scrollpos + windowHeight)) {
        scroll.classList.add('active');
    }
}

window.addEventListener('wheel', (event) => {
    scrollHide()
});


// click on figure to project-page + removing active class

const figGroupChat = document.querySelectorAll('.fig-groupChat');
const figTeamWeb = document.querySelectorAll('.fig-teamWeb');
const figWineryWeb = document.querySelectorAll('.fig-wineryWeb');
const figMoodBooster = document.querySelectorAll('.fig-moodBooster');

const delay = 200;

function locationChange(link) {
    location.href = `${link}`
}

function goToProject(link) {
    setTimeout(() => {
        locationChange(link)
    }, delay)
}

figGroupChat.forEach(figure => {
    figure.addEventListener('click', () => {
        figure.classList.remove('active');
        goToProject('/project/chatApp');
    })
})
figTeamWeb.forEach(figure => {
    figure.addEventListener('click', () => {
        figure.classList.remove('active');
        goToProject('/project/teamWeb');
    })
})
figWineryWeb.forEach(figure => {
    figure.addEventListener('click', () => {
        figure.classList.remove('active');
        goToProject('/project/wineryWeb');
    })
})
figMoodBooster.forEach(figure => {
    figure.addEventListener('click', () => {
        figure.classList.remove('active');
        goToProject('/project/moodBoosterApp');
    })
})

// transforms figures in and out depending on location at page

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
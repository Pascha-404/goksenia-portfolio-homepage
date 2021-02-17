const heroBtn = document.querySelector('#heroBtn');
const figRow = document.querySelectorAll('.figure-row');
const figColumn = document.querySelectorAll('.figure-column');

const scroll = document.querySelector('#scroll');
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


// hides the scroll-box at reaching bottom of page //
function scrollHide() {
    let scrollpos = window.scrollY;
    if (bodyHeight <= (scrollpos + windowHeight)) {
        scroll.classList.add('active');
    }
}

window.addEventListener('wheel', (event) => {
    scrollHide()
});


// clickEvent on figure/button to project-page + removing active class //

const goToGroupChat = document.querySelectorAll('.goTo-groupChat');
const goToTeamWeb = document.querySelectorAll('.goTo-teamWeb');
const goToWineryWeb = document.querySelectorAll('.goTo-wineryWeb');
const goToMoodBooster = document.querySelectorAll('.goTo-moodBooster');

//delay till changing to page
const delay = 200;

//checks if button or not / removes active class for animation
function removeActive(project, arrayElement) {
    if (arrayElement.classList.contains('btn-wrap') === true) {
        project[2].classList.remove('active')
        project[0].classList.remove('active')
    } else {
        arrayElement.classList.remove('active');
    }
}

//changes browser location
function locationChange(link) {
    location.href = `${link}`
}

//combines first and second function and adds delay for animation before change
function goToProject(link, project, arrayElement) {
    removeActive(project, arrayElement)
    setTimeout(() => {
        locationChange(link)
    }, delay)
}

goToGroupChat.forEach(element => {
    element.addEventListener('click', () => {
        goToProject('/project/chatApp', goToGroupChat, element);
    })
})

goToTeamWeb.forEach(element => {
    element.addEventListener('click', () => {
        goToProject('/project/teamWeb', goToTeamWeb, element);
    })
})
goToWineryWeb.forEach(element => {
    element.addEventListener('click', () => {
        goToProject('/project/wineryWeb', goToWineryWeb, element);
    })
})
goToMoodBooster.forEach(element => {
    element.addEventListener('click', () => {
        goToProject('/project/moodBoosterApp', goToMoodBooster, element);
    })
})

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
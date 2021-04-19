// moves in the figure-element

const projectFig = document.querySelector('#project-figure');
const timeDelay = 300;

function moveInFig() {
    setTimeout(() => {
        projectFig.classList.add('active')
    }, timeDelay)

}

moveInFig()
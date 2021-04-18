// moves in the figure-element

const projectFig = document.querySelector('#project-figure');
const timeDelay = 250;

function moveInFig() {
    setTimeout(() => {
        projectFig.classList.add('active')
    }, timeDelay)

}

moveInFig()
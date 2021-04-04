const title = document.querySelector('#new-project-title');
const titleInput = document.querySelector('#title');
const urlInput = document.querySelector('#urlName');
const urlPreview = document.querySelector('#urlPreview');
const projectsForm = document.querySelector('.project-form')

// moves content in page
const timeDelay = 100;

function moveInForm() {
    setTimeout(() => {
        projectsForm.classList.add('active')
    }, timeDelay)
}

moveInForm()

// changes the title to the new project title
titleInput.addEventListener('input', () => {
    if (titleInput.value) {
        title.textContent = titleInput.value;
    } else {
        title.textContent = 'New Project'
    }
})

// changes the urlName Preview on input
urlInput.addEventListener('input', () => {
    if (urlInput.value) {
        urlPreview.textContent = `goksenia.com/project/${urlInput.value}`
    } else {
        urlPreview.textContent = 'goksenia.com/project/yourProject'
    }
})

const checkboxes = document.querySelectorAll('.checkbox');


// checks if Checkboxes are checked and disables hidden input with value=false if checked
function checkAndDisable() {
    if (document.getElementById('firstProject').checked === true) {
        document.getElementById('firstProjectHidden').disabled = true;
    }
    if (document.getElementById('secondProject').checked === true) {
        document.getElementById('secondProjectHidden').disabled = true;
    }
    if (document.getElementById('latestWork').checked === true) {
        document.getElementById('latestWorkHidden').disabled = true;
    }
    if (document.getElementById('webDesign').checked === true) {
        document.getElementById('webDesignHidden').disabled = true;
    }
    if (document.getElementById('webflow').checked === true) {
        document.getElementById('webflowHidden').disabled = true;
    }
    if (document.getElementById('concept').checked === true) {
        document.getElementById('conceptHidden').disabled = true;
    }
    if (document.getElementById('appDesign').checked === true) {
        document.getElementById('appDesignHidden').disabled = true;
    }
    if (document.getElementById('hackathon').checked === true) {
        document.getElementById('hackathonHidden').disabled = true;
    }
    if (document.getElementById('hideProject').checked === true) {
        document.getElementById('hideProjectHidden').disabled = true;
    };
}


checkboxes.forEach(box => {
    box.addEventListener('click', checkAndDisable)
})

checkAndDisable();
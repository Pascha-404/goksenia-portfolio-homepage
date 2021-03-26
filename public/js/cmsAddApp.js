const title = document.querySelector('#new-project-title');
const titleInput = document.querySelector('#title');
const urlInput = document.querySelector('#urlName');
const urlPreview = document.querySelector('#urlPreview');

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
        console.log('Check 1')
    }
    if (document.getElementById('latestWork').checked === true) {
        document.getElementById('latestWorkHidden').disabled = true;
        console.log('Check 2')
    }
    if (document.getElementById('webDesign').checked === true) {
        document.getElementById('webDesignHidden').disabled = true;
        console.log('Check 3')
    }
    if (document.getElementById('webflow').checked === true) {
        document.getElementById('webflowHidden').disabled = true;
        console.log('Check 4')
    }
    if (document.getElementById('concept').checked === true) {
        document.getElementById('conceptHidden').disabled = true;
        console.log('Check 5')
    }
    if (document.getElementById('appDesign').checked === true) {
        document.getElementById('appDesignHidden').disabled = true;
        console.log('Check 6')
    }
    if (document.getElementById('hackathon').checked === true) {
        document.getElementById('hackathonHidden').disabled = true;
        console.log('Check 7')
    }
    if (document.getElementById('hideProject').checked === true) {
        document.getElementById('hideProjectHidden').disabled = true;
        console.log('Check 8')
    };
    console.log('End of func!')
}


checkboxes.forEach(box => {
    box.addEventListener('click', checkAndDisable)
})

checkAndDisable();
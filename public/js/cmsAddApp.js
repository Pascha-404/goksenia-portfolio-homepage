const title = document.querySelector('#new-project-title');
const titleInput = document.querySelector('#title');
const urlInput = document.querySelector('#urlName');
const urlPreview = document.querySelector('#urlPreview');

titleInput.addEventListener('input', () => {
    if (titleInput.value) {
        title.textContent = titleInput.value;
    } else {
        title.textContent = 'New Project'
    }
})

urlInput.addEventListener('input', () => {
    if (urlInput.value) {
        urlPreview.textContent = `goksenia.com/project/${urlInput.value}`
    } else {
        urlPreview.textContent = 'goksenia.com/project/yourProject'
    }
})
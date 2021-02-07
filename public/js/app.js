const heroBtn = document.querySelector('#heroBtn');
const figRow = document.querySelectorAll('.figure-row');
const figColumn = document.querySelectorAll('.figure-column');
const scrollBtn = document.querySelector('#scroll')
const scrollTxt = document.querySelector('#scroll-txt')
const contactColumn = document.querySelector('.contact-column')
const contactRow = document.querySelector('.contact-row')

// Toggles hiding for figures at small screens (<970px width)
function smallscreenView() {
    figRow.forEach(figRow => {
        figRow.classList.add('display-none');
    })
    figColumn.forEach(figColumn => {
        figColumn.classList.remove('display-none');
    })
    contactColumn.classList.remove('display-none');
    contactRow.classList.add('display-none');
}

// Sets everything back for big screen view (>970px width)
function bigscreenView() {
    figRow.forEach(figRow => {
        figRow.classList.remove('display-none')
    })
    figColumn.forEach(figColumn => {
        figColumn.classList.add('display-none')
    })
    contactColumn.classList.add('display-none');
    contactRow.classList.remove('display-none');
}

// send user to portfolio section
heroBtn.addEventListener('click', () => {
    window.location.href = '#portfolio';
})

// activates the right classes for small and big screens
window.addEventListener('resize', () => {
    if (window.innerWidth < 970) {
        smallscreenView()
    } else if (window.innerWidth > 970) {
        bigscreenView()
    }
})
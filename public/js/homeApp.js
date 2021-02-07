const heroBtn = document.querySelector('#heroBtn');
const figRow = document.querySelectorAll('.figure-row');
const figColumn = document.querySelectorAll('.figure-column');
const scrollBtn = document.querySelector('#scroll');
const scrollTxt = document.querySelector('#scroll-txt');

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

// let scrollPos = 0;
// window.addEventListener('scroll', () => {
//     if ((document.body.getBoundingClientRect()).top > scrollPos) {
//         scrollBtn.classList.add('active')
//     } else {
//         scrollBtn.classList.remove('active')
//     }
//     scrollPos = (document.body.getBoundingClientRect()).top;
// })

// send user to portfolio section
// heroBtn.addEventListener('click', () => {
//     window.location.href = '#portfolio';
// })
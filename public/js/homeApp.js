const heroBtn = document.querySelector('#heroBtn');
const figRow = document.querySelectorAll('.figure-row');
const figColumn = document.querySelectorAll('.figure-column');
const scrollBtn = document.querySelector('#scroll');
const scrollTxt = document.querySelector('#scroll-txt');

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
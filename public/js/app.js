const contactColumn = document.querySelector('.contact-column')
const contactRow = document.querySelector('.contact-row')



// activates the right classes for small and big screens
function smallViewFooter() {
    contactColumn.classList.remove('display-none');
    contactRow.classList.add('display-none');
}

function bigViewFooter() {
    contactColumn.classList.add('display-none');
    contactRow.classList.remove('display-none');
}

function adjustViewFooter() {
    if (window.innerWidth < 970) {
        smallViewFooter()
    } else if (window.innerWidth > 970) {
        bigViewFooter()
    }
}

adjustViewFooter()

window.addEventListener('resize', adjustViewFooter())

// window.addEventListener('resize', () => {
//     if (window.innerWidth < 970) {
//         smallscreenView()
//     } else if (window.innerWidth > 970) {
//         bigscreenView()
//     }
// })
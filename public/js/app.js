const contactColumn = document.querySelector('.contact-column');
const contactRow = document.querySelector('.contact-row');
const menuBtn = document.querySelector('#menu-btn');
const menuSmall = document.querySelector('#menu-small');
const contactBtn = document.querySelectorAll('.contact-btn')



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

// adjusts all classes correct, ones
adjustViewFooter()

//  eventListener for correct classes on resizing
window.addEventListener('resize', adjustViewFooter())

// adds in smallMenu and animation
menuBtn.addEventListener('click', () => {
    menuSmall.classList.toggle('active');
    menuBtn.classList.toggle('active');
})

// ClickEvent for each contactBtn -> to footer
contactBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = "#contact"
    })
})
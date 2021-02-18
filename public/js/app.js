const contactColumn = document.querySelector('.contact-column');
const contactRow = document.querySelector('.contact-row');
const menuBtn = document.querySelector('#menu-btn');
const menuSmall = document.querySelector('#menu-small');
const contactBtn = document.querySelectorAll('.contact-btn');
const dataColumn = document.querySelector('.data-column');
const dataRow = document.querySelector('.data-row');



const logo = document.querySelector('#logo')

// activates the right classes for small and big screens
function smallViewFooter() {
    contactColumn.classList.remove('display-none');
    contactRow.classList.add('display-none');
    dataRow.classList.add('display-none');
    dataColumn.classList.remove('display-none');
}

function bigViewFooter() {
    contactColumn.classList.add('display-none');
    contactRow.classList.remove('display-none');
    dataRow.classList.remove('display-none');
    dataColumn.classList.add('display-none');
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

// clickEvent for returning to home

logo.addEventListener('click', () => {
    location.href = "/";
})


const aboutWebBtn = document.querySelectorAll('.about-this-website');
const privacyPolBtn = document.querySelectorAll('.privacy-policy');
const privacyPolBox = document.querySelector('#privacy-policy-box');
const aboutWebBox = document.querySelector('#about-website');
const closeBox = document.querySelectorAll('.closeBox');
const shadowBgBox = document.querySelector('#shadow-bg-box');

aboutWebBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        aboutWebBox.classList.toggle('active');
        shadowBgBox.classList.toggle('active');
    })
})

privacyPolBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        privacyPolBox.classList.toggle('active');
        shadowBgBox.classList.toggle('active');
    })
})

function hideAllBoxes() {
    privacyPolBox.classList.remove('active');
    aboutWebBox.classList.remove('active');
    shadowBgBox.classList.remove('active');
}

shadowBgBox.addEventListener('click', () => {
    hideAllBoxes()
})

closeBox.forEach(btn => {
    btn.addEventListener('click', () => {
        hideAllBoxes()
        console.log('worked')
    })
})
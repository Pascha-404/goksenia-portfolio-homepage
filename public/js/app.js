const contactColumn = document.querySelector('.contact-column')
const contactRow = document.querySelector('.contact-row')



// activates the right classes for small and big screens
window.addEventListener('resize', () => {
    if (window.innerWidth < 970) {
        smallscreenView()
    } else if (window.innerWidth > 970) {
        bigscreenView()
    }
})
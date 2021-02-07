window.onload = () => {

    const contactColumn = document.getElementById('footer-txt-column');
    const contactRow = document.getElementById('footer-txt-row');

    function smallscreenView() {
        contactColumn.classList.remove('display-none');
        contactRow.classList.add('display-none');
    }

    function bigscreenView() {
        contactColumn.classList.add('display-none');
        contactRow.classList.remove('display-none');
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth < 970) {
            smallscreenView()
        } else if (window.innerWidth > 970) {
            bigscreenView()
        }
    })
}
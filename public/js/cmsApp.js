const accSettingsBtn = document.querySelector('#acc-settings-btn');
const accSettingsMenu = document.querySelector('.acc-settings-menu');

accSettingsBtn.addEventListener('click', () => {
    accSettingsMenu.classList.toggle('active');
    accSettingsBtn.classList.toggle('active');
})
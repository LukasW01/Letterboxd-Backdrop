const currentYear = new Date().getFullYear();

const titleElem = document.getElementById('title');
const infoElem = document.getElementById('info');
const nameElem = document.getElementById('name');
const licenseElem = document.getElementById('license');
const yearElem = document.getElementById('year');

if (yearElem && nameElem && licenseElem && titleElem && infoElem) {
    yearElem.innerHTML = currentYear;
    titleElem.innerHTML = '<a href="https://github.com/LukasW01/Letterboxd-Backdrop" target="_blank">Letterboxd Backdrop</a>';
    infoElem.innerHTML = 'Browser extension that adds a custom backdrop image to your Letterboxd profile without paying for Patron.';
    nameElem.innerHTML = 'Lukas Wigger';
    licenseElem.innerHTML = '<a href="https://en.wikipedia.org/wiki/MIT_License" target="_blank">MIT</a>';
    } else {
    console.error("Could not find year element.");
}
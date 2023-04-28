const currentYear: number = new Date().getFullYear();

const titleElem: HTMLElement | null = document.getElementById('title');
const infoElem: HTMLElement | null = document.getElementById('info');
const nameElem: HTMLElement | null = document.getElementById('name');
const licenseElem: HTMLElement | null = document.getElementById('license');
const yearElem: HTMLElement | null = document.getElementById('year');

try {
    yearElem.innerHTML = String(currentYear);
    titleElem.innerHTML = '<a href="https://github.com/LukasW01/Letterboxd-Backdrop" target="_blank">Letterboxd Backdrop</a>';
    infoElem.innerHTML = 'Browser extension that adds a custom backdrop image to your Letterboxd profile without paying for Patron.';
    nameElem.innerHTML = 'Lukas Wigger';
    licenseElem.innerHTML = '<a href="https://en.wikipedia.org/wiki/MIT_License" target="_blank">MIT</a>';
} catch (e) {
    console.error("Could not find year element.");
}

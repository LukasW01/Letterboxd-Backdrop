/*
import polyfill from 'webextension-polyfill';

async function main(): Promise<void> {
    try {
        const { url } = await polyfill.storage.local.get('url');
        const { checkbox } = await polyfill.storage.local.get('checkbox');
        if (url && checkbox) {
            console.log(`URL: ${url}`);
            console.log(`Checkbox: ${checkbox}`);
            backdrop(url);
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

function backdrop(url: string): void {
    const bodyElement = document.querySelector('body').classList.contains('my-own-page');

    const activeNavItem = document.querySelector('.navitem.-active');
    const activeNavLinkText = activeNavItem?.querySelector('.navlink')?.textContent;

    if (activeNavLinkText === 'Profile' && bodyElement === true) {
        document.body.classList.add('backdropped', 'backdrop-loaded');

        const contentDiv = document.getElementById('content');
        contentDiv.classList.add('-backdrop');

        const backdropDiv = document.createElement('div');
        backdropDiv.innerHTML = `
          <div id="backdrop" class="backdrop-wrapper -loaded" data-backdrop="${url}" data-backdropmobile="${url}" data-offset="0">
            <div class="backdropplaceholder js-backdrop-placeholder" style="background-image: url(${url}); background-position: center -0px;"></div>
            <div class="backdropimage js-backdrop-image" style="background-position: center 0px; background-image: url(${url});"></div>
            <div class="backdropmask js-backdrop-fade"></div>
          </div>
        `;
        const body = document.getElementsByTagName('body')[0];
        body.insertAdjacentElement('afterbegin', backdropDiv);
    } else {
        console.log('Not on own user page or not logged in.');
    }
}
*/

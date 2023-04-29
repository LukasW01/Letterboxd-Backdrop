import polyfill from 'webextension-polyfill';

(async () : Promise<void> => {
    try {
        const { image } = await polyfill.storage.local.get('image');
        if (image) {
            console.log(`Image: ${image}`);
            backdrop(image);
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
})();


const backdrop = (url : string): void => {
    const bodyElement : boolean = document.querySelector('body').classList.contains('my-own-page');

    const activeNavItem : Element = document.querySelector('.navitem.-active');
    const activeNavLinkText : string = activeNavItem?.querySelector('.navlink')?.textContent;

    if (activeNavLinkText === 'Profile' && bodyElement === true) {
        document.body.classList.add('backdropped', 'backdrop-loaded');

        const contentDiv : HTMLElement = document.getElementById('content');
        contentDiv.classList.add('-backdrop');

        const backdropDiv : HTMLElement = document.createElement('div');
        backdropDiv.innerHTML = `
          <div id="backdrop" class="backdrop-wrapper -loaded" data-backdrop="${url}" data-backdropmobile="${url}" data-offset="0">
            <div class="backdropplaceholder js-backdrop-placeholder" style="background-image: url(${url}); background-position: center -0px;"></div>
            <div class="backdropimage js-backdrop-image" style="background-position: center 0px; background-image: url(${url});"></div>
            <div class="backdropmask js-backdrop-fade"></div>
          </div>
        `;
        const body : HTMLBodyElement = document.getElementsByTagName('body')[0];
        body.insertAdjacentElement('afterbegin', backdropDiv);
    } else {
        console.log('Not on own user page or not logged in.');
    }
};


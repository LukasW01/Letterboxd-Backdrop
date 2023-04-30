import polyfill from "webextension-polyfill";

const backdrop = (url:string):void => {
    const bodyElement:boolean = document.querySelector('body')?.classList.contains('my-own-page') ?? false;

    const activeNavItem:Element | null = document.querySelector('.navitem.-active');
    const activeNavLinkText:string | null | undefined = activeNavItem?.querySelector('.navlink')?.textContent;

    if (activeNavLinkText === 'Profile' && bodyElement) {
        document.body.classList.add('backdropped', 'backdrop-loaded');

        const contentDiv:HTMLElement | null = document.getElementById('content');
        contentDiv?.classList.add('-backdrop');

        const backdropDiv:HTMLElement = document.createElement('div');
        backdropDiv.innerHTML = `
          <div id="backdrop" class="backdrop-wrapper -loaded" data-backdrop="${url}" data-backdropmobile="${url}" data-offset="0">
            <div class="backdropplaceholder js-backdrop-placeholder" style="background-image: url(${url}); background-position: center -0px;"></div>
            <div class="backdropimage js-backdrop-image" style="background-position: center 0px; background-image: url(${url});"></div>
            <div class="backdropmask js-backdrop-fade"></div>
          </div>
        `;
        const body:HTMLBodyElement | null = document.getElementsByTagName('body')[0];
        body?.insertAdjacentElement('afterbegin', backdropDiv);
    } else {
        console.log('Not on own user page or not logged in.');
    }
};

(async (): Promise<void> => {
    try {
        const { image } = await polyfill.storage.local.get('image');
        if (image) {
            console.log(`Image: ${image}`);
            try {
                const response:Response = await fetch(image);
                if (response.status === 200) {
                    backdrop(image);
                }
            } catch (error) {
                console.log(`Error: Image URL returned a non-200 HTTP error`);
            }
        } else {
            console.log('No image is set');
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();

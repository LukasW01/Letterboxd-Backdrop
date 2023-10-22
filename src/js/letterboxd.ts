import polyfill from "webextension-polyfill";

const backdrop = (url: string): void => {
    const bodyElement: boolean = document.querySelector('body')?.classList.contains('my-own-page') ?? false;
    const activeNavItem: string | null | undefined = document.querySelector('.navitem.-active')?.querySelector('.navlink')?.textContent;

    if (activeNavItem === 'Profile' && bodyElement) {
        document.body.classList.add('backdropped', 'backdrop-loaded');
        document.getElementById('content')?.classList.add('-backdrop');

        const backdropContainer: HTMLElement | null = document.querySelector('.backdrop-container') || (() => {
            return document.body.appendChild(Object.assign(document.createElement('div'), { classList: ['backdrop-container'] }));
        })();

        backdropContainer.innerHTML = `
          <div id="backdrop" class="backdrop-wrapper -loaded" data-backdrop="${url}" data-backdropmobile="${url}" data-offset="0">
            <div class="backdropplaceholder js-backdrop-placeholder" style="background-image: url(${url}); background-position: center -0px;"></div> <div class="backdropimage js-backdrop-image" style="background-position: center 0px; background-image: url(${url});"></div> <div class="backdropmask js-backdrop-fade"></div>
          </div>
        `;
    }
};

(async (): Promise<void> => {
    try {
        const {image} = await polyfill.storage.local.get('image');
        if (image) {
            try {
                (await fetch(image)).status === 200 && backdrop(image);
            } catch (err) {
                console.error(err);
            }
        }
    } catch (err) {
        console.error(err)
    }
})();

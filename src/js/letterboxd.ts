import polyfill from "webextension-polyfill";
import axios, {AxiosResponse} from "axios";
import { tryCatch } from "../util/throw";

const backdrop = (url: string): void => {
    const bodyElement: boolean = document.querySelector('body')?.classList.contains('my-own-page') ?? false;
    const activeNavItem: string | null | undefined = document.querySelector('.navitem.-active')?.querySelector('.navlink')?.textContent;

    if (activeNavItem === 'Profile' && bodyElement) {
        document.body.classList.add('backdropped', 'backdrop-loaded');
        document.getElementById('content')?.classList.add('-backdrop');

        const backdropContainer: HTMLElement = 
            document.querySelector('.backdrop-container') || (() => { return document.body.appendChild(Object.assign(document.createElement('div'), { classList: ['backdrop-container'] }))})();

        backdropContainer.innerHTML = `
          <div id="backdrop" class="backdrop-wrapper -loaded" data-backdrop="${url}" data-backdropmobile="${url}" data-backdrop2x="${url}" data-offset="0">
            <div class="backdropimage js-backdrop-image" style="background-image: url(${url}); background-position: center -70px;"></div> <div class="backdropimage js-backdrop-image" style="background-position: center 0px; background-image: url(${url});"></div> 
            <div class="backdropmask js-backdrop-fade"></div>
          </div>
        `;
    }
};


(async (): Promise<void> => {
    const [error, result] = await tryCatch(polyfill.storage.local.get('image')) as [Error, Record<string, string>];
    if (error) {
        console.error(error);
        return;
    }

    if (result) {
        const [error, response] = await tryCatch(axios.get(result.image)) as [Error, AxiosResponse<Response>];
        if (error) {
            console.error(error);
            return;
        }

        if (response.status === 200) {
            backdrop(result.image);
        }
    }
})();

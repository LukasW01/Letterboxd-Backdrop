import polyfill from 'webextension-polyfill';

const input = document.getElementById("image") as HTMLInputElement;
const error = document.getElementById("error") as HTMLInputElement;
const button = document.getElementById("button") as HTMLInputElement;

document.addEventListener('DOMContentLoaded', () => {
// none
});

input.addEventListener("blur", async () => {
    const urlRegex = /^(http|https):\/\/[^\s/$.?#].'\S'*$/i;
    const imgRegex = /.(jpeg|jpg|gif|png|webp)$/;

    if (input.value === "") {
        error.innerHTML = 'Input is empty';
    } else if (!urlRegex.test(input.value)) {
        error.innerHTML = 'Input is not a valid URL';
    } else if (!imgRegex.test(input.value)) {
        error.innerHTML = 'Input does not contain an image';
    } else {
        console.log("Input is valid and contains an image");
        error.innerHTML = '';

        try {
            await polyfill.storage.local.set({ 'image': input.value });
            console.log('Variable saved');

            error.innerHTML = 'Image saved. Reload your Letterboxd-profile to apply the changes.';
        } catch (error) {
            console.error(`Error: ${error}`);
        }

        input.value = '';
    }
});

button.addEventListener("click", async () => {
    try {
        await polyfill.storage.local.remove('image');
        console.log('Variable deleted');

        error.innerHTML = 'Image deleted. Reload your Letterboxd-profile to apply the changes.';
    } catch (error) {
        console.error(`Error: ${error}`);
    }
});
import polyfill from 'webextension-polyfill';

const input = document.getElementById("image");
const error = document.getElementById("error");

input.addEventListener("blur", () => {
    const urlRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i;
    const imgRegex = /\.(jpeg|jpg|gif|png|webp)$/;

    if (input.value === "") {
        error.innerHTML = 'Input is empty';
    } else if (!urlRegex.test(input.value)) {
        error.innerHTML = 'Input is not a valid URL';
    } else if (!imgRegex.test(input.value)) {
        error.innerHTML = 'Input does not contain an image';
    } else {
        console.log("Input is valid and contains an image");
        error.innerHTML = '';
        saveData({url: input.value}).then(r => {})
        input.value = '';
    }
});


async function saveData({url}) {
    try {
        await polyfill.storage.local.set({ url });
        console.log("Variable saved");
        error.innerHTML = 'Image saved. Reload your Letterboxd-profile to apply the changes.';
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

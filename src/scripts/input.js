const input = document.getElementById("image");
const error = document.getElementById("error");

input.addEventListener("blur", () => {
    const urlRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i;
    const imgRegex = /\.(jpeg|jpg|gif|png|webp)$/;

    if (input.value === "") {
        console.error("Input is empty");
    } else if (!urlRegex.test(input.value)) {
        error.innerHTML = 'Input is not a valid URL';
    } else if (!imgRegex.test(input.value)) {
        error.innerHTML = 'Input does not contain an image';
    } else {
        console.log("Input is valid and contains an image");
        error.innerHTML = '';
        saveData(input.value);
        input.value = '';

    }
});


function saveData(url) {
    if (navigator.userAgent.indexOf("Firefox") !== -1) {
        browser.storage.local.set({url: url}).then(() => {
            console.log("Variable saved");
            browser.tabs.reload();
        }).catch((error) => {
            console.error(`Error: ${error}`)
        });
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
        chrome.storage.local.set({url: url}, () => {
            console.log("Variable saved");
            chrome.tabs.reload();
        });
    }
}

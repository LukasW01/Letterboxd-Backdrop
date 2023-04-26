const input = document.getElementById("image");

input.addEventListener("blur", () => {
    const urlRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i;
    const imgRegex = /\.(jpeg|jpg|gif|png|webp)$/;

    if (input.value === "") {
        console.error("Input is empty");
    } else if (!urlRegex.test(input.value)) {
        console.error("Input is not a valid URL");
    } else if (!imgRegex.test(input.value)) {
        console.error("Input does not contain an image");
    } else {
        console.log("Input is valid and contains an image");

        checkIfSaved(input.value);
    }
});

function checkIfSaved(url) {
    if (navigator.userAgent.indexOf("Firefox") !== -1) {
        browser.storage.local.get("url").then((result) => {
            if (result.url === url) {
                console.log("URL already saved");
                input.value = url;
            } else {
                console.log("URL not saved");
                saveData(url);
            }
        }).catch((error) => {
            console.error(`Error: ${error}`)
        });
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
        chrome.storage.local.get("url", (result) => {
            if (result.url === url) {
                console.log("URL already saved");
                input.value = url;
            } else {
                console.log("URL not saved");
                saveData(url);
            }
        });
    }
}

function saveData(url) {
    if (navigator.userAgent.indexOf("Firefox") !== -1) {
        browser.storage.local.set({url: url}).then(() => {
            console.log("Variable saved");
            input.value = url;
        }).catch((error) => {
            console.error(`Error: ${error}`)
        });
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
        chrome.storage.local.set({url: url}, () => {
            console.log("Variable saved");
            input.value = url;
        });
    }
}

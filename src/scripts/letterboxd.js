if (navigator.userAgent.indexOf("Firefox") !== -1) {
    browser.storage.local.get("url").then((result) => {
        if (result.url) {
            backdrop(result.url);
        }
    }).catch((error) => {
        console.error(`Error: ${error}`)
    });
} else if (navigator.userAgent.indexOf("Chrome") !== -1) {
    chrome.storage.local.get("url", function(result) {
        if (result.url) {
            backdrop(result.url);
        }
    });
}

function backdrop(url) {
    const cookieData = document.cookie.match(/letterboxd\.signed\.in\.as=([^;]+)/);

    if (cookieData && window.location.href === `https://letterboxd.com/${cookieData[1]}/`) {
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

        const contentDiv = document.getElementById('content');
        contentDiv.classList.add('-backdrop');
    } else {
        console.error(`Not on own user page or not logged in.`);
    }
}

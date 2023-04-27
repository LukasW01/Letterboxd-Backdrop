if (navigator.userAgent.indexOf("Firefox") !== -1) {
    browser.storage.local.get("url").then((result) => {
        if (result.url) {
            console.log(`URL: ${result.url}`)
            backdrop(result.url);
        }
    }).catch((error) => {
        console.error(`Error: ${error}`)
    });
} else if (navigator.userAgent.indexOf("Chrome") !== -1) {
    chrome.storage.local.get("url", function(result) {
        if (result.url) {
            console.log(`URL: ${result.url}`)
            backdrop(result.url);
        }
    });
}

function backdrop(url) {
    const activeNavItem = document.querySelector('.navitem.-active');
    const activeNavLink = activeNavItem.querySelector('.navlink');
    const activeNavLinkText = activeNavLink.textContent;

    const ulElement = document.querySelector('.subnav');
    const firstLink = ulElement.querySelector('a').text;
    const currentLink = window.location.href;

    if (activeNavLinkText === 'Profile' && currentLink === `https://letterboxd.com/${firstLink}/`) {
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
        console.log(`Not on own user page or not logged in.`);
    }
}

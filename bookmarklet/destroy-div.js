// https://shiffman.net/a2z/chrome-ext/

(function() {
    console.log('Distruggi tutto!');

    let divs = document.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i++) {
        divs[i].parentNode.removeChild(divs[i]);
    }
    let body = document.getElementsByTagName('body');
    for (let i = 0; i < body.length; i++) {
        body[i].parentNode.removeChild(body[i]);
    }
    let htmlTag = document.getElementsByTagName('html');
    for (let i = 0; i < htmlTag.length; i++) {
        htmlTag[i].parentNode.removeChild(htmlTag[i]);
    }

})();

// (function () {
//     let url = 'http://shiffman.net/a2z/js/bookmarklet.js?';
//     var script = document.createElement('script');
//     script.src = url + new Date().getTime();
//     document.body.appendChild(script);
// })();
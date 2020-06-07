// https://shiffman.net/a2z/chrome-ext/

(function() {
    console.log('Prova');

    let p = document.getElementsByTagName('p');
    for (let i = 0; i < p.length; i++) {
        p[i].innerHTML = '';
    }

    alert('First bookmarklet!');

})();

// (function () {
//     let url = 'http://shiffman.net/a2z/js/bookmarklet.js';
//     var script = document.createElement('script');
//     script.src = url + "?" + new Date().getTime();
//     document.body.appendChild(script);
// })();
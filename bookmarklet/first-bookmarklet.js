// https://shiffman.net/a2z/chrome-ext/

(function() {
    console.log('Distruggi tutto!');

    let div = document.getElementsByTagName('div');
    for (let i = 0; i < div.length; i++) {
        div[i].innerHTML = '';
    }
    //alert('First bookmarklet!');

})();

// (function () {
//     let url = 'http://shiffman.net/a2z/js/bookmarklet.js?';
//     var script = document.createElement('script');
//     script.src = url + new Date().getTime();
//     document.body.appendChild(script);
// })();
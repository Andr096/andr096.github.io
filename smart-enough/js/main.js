//JAVASCRIPT

//scroll shrink menu
$(document).on("scroll", function(){
    let menu = document.getElementById("menu")
    let logo = document.getElementById("logo")
    let bottoneMenu = document.getElementById("bottone-menu")
        
    if ($(document).scrollTop() > 120){
        menu.classList.add("py-1")
        menu.classList.remove("py-2")
        menu.classList.add("shadow-custom")
        menu.classList.add("bg-white")
        menu.classList.add("nav-scrolled")
        logo.classList.add("shrink-logo")
        bottoneMenu.classList.remove("text-white")
        bottoneMenu.classList.add("text-dark")
    } else {
        menu.classList.remove("py-1")
        menu.classList.add("py-2")
        menu.classList.remove("shadow-custom")
        menu.classList.remove("bg-white")
        menu.classList.remove("nav-scrolled")
        logo.classList.remove("shrink-logo")
        bottoneMenu.classList.add("text-white")
        bottoneMenu.classList.remove("text-dark")
    }
});


//SMOOTH SCROLL
$(document).ready(function() {
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});








//ANIMAZIONE LABEL CONTACT FORM ------------------------------------------------------------------------------

function setFocused() {
    
    //console.log(this)
    let labels = document.querySelectorAll('label[for="' + this.id + '"]');
    for (item of labels) {
        item.classList.add('filled');
    }
}
  
function unsetFocused() {

    //console.log(this.value)
    if(this.value.length == 0 || this.value == " "){
        //console.log("il campo è vuoto")

        let labels = document.querySelectorAll('label[for="' + this.id + '"]');
        for (item of labels) {
            item.classList.remove('filled');
        }

    } else {
        //console.log("il campo è pieno")
    }
}

let inputs = document.querySelectorAll('.form-control');
for (item of inputs) {
    item.addEventListener("focus", setFocused);
    item.addEventListener("blur", unsetFocused);
}











//GESTIONE FORM CONTATTACI ------------------------------------------------------------------------------

function controlloInput() {

    let inputs = document.querySelectorAll('.form-control');
    let arrayInputs = Array.from(inputs);

    //controllo se tutti i campi sono pieni
    let listaInputStatus = arrayInputs.map(function(item){
        if(item.value.length == 0 || this.value == " "){
            return false //vuoto
        } else {
            return true //pieno
        }
    })

    let campiRiempiti = listaInputStatus.every(function(item) {
    return item == true;
    })

    let nomeUtente;
      

    //feedback visivo: campi con errore
    for (item of inputs) {
        
        //console.log(item.value)

        //se il campo è VUOTO
        if(item.value.length == 0 || this.value == " "){
            //console.log("il campo è vuoto")
    
            //rimuovere d-none da span.errore per farlo apparire, però solo a quello relativo al campo vuoto
            let spanErrore = document.querySelectorAll('.errore[for="' + item.id + '"]');
            for (span of spanErrore) {
                span.classList.remove('d-none');
            }

            //aggiungere .border-danger al .form-control
            item.classList.add('border-danger');

            //inserie false nella lista (vuoto)
            
    
        //se il campo è PIENO
        } else {
            //console.log("il campo è pieno")

            let spanErrore = document.querySelectorAll('.errore[for="' + item.id + '"]');
            for (span of spanErrore) {
                span.classList.add('d-none');

            }

            item.classList.remove('border-danger');

            //inserire true nella lista (pieno)
        }
    }

     //cosa accade SE TUTTI I CAMPI SONO PIENI
     if (campiRiempiti == true) {

        for(item of inputs) {

            let spanErrore = document.querySelectorAll('.errore[for="' + item.id + '"]');
            for (span of spanErrore) {
                span.classList.add('d-none');

            }

            item.classList.remove('border-danger');

            if (item.id == "name") {
                console.log(item)
                nomeUtente = item.value
            }

            item.value = ""

            let labels = document.querySelectorAll('label[for="' + item.id + '"]');
            for (label of labels) {
                label.classList.remove('filled');
            }
        }

        //faccio apparire il messaggio di ringraziamento e pulisco tutti gli input
        document.getElementById('nomeUtente').innerText = nomeUtente

        let grazie = document.getElementById('ringraziamentoForm')
        grazie.classList.remove('d-none')

    }
}

//bottone invia
bottoneInvia = document.getElementById('sendMessageButton')
bottoneInvia.addEventListener("click", controlloInput)














// MODALITA' RIPARA ------------------------------------------------------------------------------

let bottoneRipara = document.getElementById("bottoneRipara")
let bottoneContatore = document.getElementById("bottoneContatore") 
let audioChiaveInglese = new Audio('sound/ratchet-sound-effect.mp3');
let listaElementSbagliati = document.querySelectorAll('.correggimi');
let stoRiparando = false;
let riparazioneFinita = false;


function riparaSubito() {

    let elementiConErrore = document.querySelectorAll('.correggimi');
    for (item of elementiConErrore) {
        item.classList.remove("correggimi")
        audioChiaveInglese.play();

        if (item.classList.contains("logo-transition-correggimi")) {
            item.classList.remove("logo-transition-correggimi")
        }
    }

    document.getElementById('cursoreAlternativo').classList.add('d-none')
    document.body.classList.remove('togli-cursore')

    bottoneRipara.style.right = "-" + 75 + "px"
    bottoneRipara.style.transition = "all 1.0s cubic-bezier(1, -0.01, 0.57, 1)" 

    bottoneContatore.style.right = "-" + 75 + "px"

    riparazioneFinita = true


    for (item of listaElementSbagliati) {
        item.removeEventListener("click", riparaErrore);
        item.removeEventListener("mouseover", coloreNuovo);
        item.removeEventListener("mouseout", coloreOriginale);

        if (item.classList.contains("logo-transition-correggimi")) {
            item.classList.remove("logo-transition-correggimi")
        }

        //eliminiamo e storiamo gli href
        let dataHrefValue = item.getAttribute("data-href")
        if (dataHrefValue != null) {
            console.log(dataHrefValue)

            //store href
            item.setAttribute('href', dataHrefValue);
            //Remove href
            //item.href = '';
            item.removeAttribute("data-href")
        }

        //eliminiamo e storiamo i data-target (seconda barriera sicurezza)
        let dataTargetStoreValue = item.getAttribute("data-target-store")
        if (dataTargetStoreValue != null) {
            console.log(dataTargetStoreValue)

            //store data-target
            item.setAttribute('data-target', dataTargetStoreValue);
            //Remove data-target
            //item.href = '';
            item.removeAttribute("data-target-store")
        }

        //eliminiamo e storiamo i data-dismiss (seconda barriera sicurezza)
        let dataDismissStoreValue = item.getAttribute("data-dismiss-store")
        if (dataDismissStoreValue != null) {
            console.log(dataDismissStoreValue)

            //store data-dismiss
            item.setAttribute('data-dismiss', dataDismissStoreValue);
            //Remove data-dismiss
            //item.href = '';
            item.removeAttribute("data-dismiss-store")
        }
    }
}

function riparaErrore() {

    if (this.classList.contains("correggimi")) {
        this.classList.remove("correggimi")

        //parte suono
        audioChiaveInglese.play()
        //cambia colore
        coloreOriginale()

        if (this.classList.contains("navbar-brand")) {
            this.classList.add("logo-transition-correggimi")
        }

        //il click sull'ultimo elemento con class .correggimi 
        let elementiConErrore = document.querySelectorAll('.correggimi');
        //console.log(elementiConErrore)

        bottoneContatore.innerText = elementiConErrore.length

        if (elementiConErrore.length == 0) {

            bottoneContatore.style.right = "-" + 75 + "px"

            console.log("Hai corretto tutti gli errori!")
            setTimeout(function(){ alert("Complimenti, hai corretto tutti gli errori presenti nel sito :D. " + 
            "Ora è decisamente più fruibile. Grazie ancora di tutto, ti auguro una buona navigazione!"); }, 2000);
        }
        
    //SECONDO CLICK su portofolio-box
    } else if (this.classList.contains("portfolio-box")){

        //eliminiamo e storiamo i data-target eventuali
        let dataTargetStoreValue = this.getAttribute("data-target-store")
        if (dataTargetStoreValue != null) {
            console.log(dataTargetStoreValue)

            //store data-target
            this.setAttribute('data-target', dataTargetStoreValue);
            //Remove data-target
            this.removeAttribute("data-target-store")
        }

    } else if (this.classList.contains("btn")){

        //eliminiamo e storiamo i data-dismiss eventuali
        let dataDismissStoreValue = item.getAttribute("data-dismiss-store")
        if (dataDismissStoreValue != null) {
            //console.log(dataDismissStoreValue)

            //store data-dismiss
            item.setAttribute('data-dismiss', dataDismissStoreValue);
            //Remove data-dismiss
            item.removeAttribute("data-dismiss-store")
        }
    }

}

function coloreNuovo() {
    if (this.classList.contains("correggimi")) {
        let cursoreAlternativo = document.getElementById('cursoreAlternativo')
        cursoreAlternativo.classList.add("cursor-over")
    }
}

function coloreOriginale() {
    let cursoreAlternativo = document.getElementById('cursoreAlternativo')
    cursoreAlternativo.classList.remove("cursor-over")
}

function nuovoCursore(event) {

    let cursoreAlternativo = document.getElementById('cursoreAlternativo')
    let correzioneLeft = 12
    let correzioneTop = 10

    cursoreAlternativo.style.left = event.pageX - correzioneLeft + 'px' 
    cursoreAlternativo.style.top = event.pageY - correzioneTop + 'px'
}

function modalitaRipara() {
    //console.log(this)

    let chiudiIcona = document.getElementById('chiudiIcona')
    let apriIcona = document.getElementById('apriIcona')
    let cursoreAlternativo = document.getElementById('cursoreAlternativo')
    let body = document.body

    let elementiConErrore = document.querySelectorAll('.correggimi');
    
    //TERMINA MODALITA' RIPARA
    if (this.classList.contains('modalita-ripara')) {
        this.classList.remove('modalita-ripara')

        stoRiparando = false

        chiudiIcona.classList.add('d-none')
        apriIcona.classList.remove('d-none')

        cursoreAlternativo.classList.add('d-none')

        body.classList.remove('togli-cursore')

        bottoneContatore.style.right = "-" + 75 + "px"

        //FINE MODALITA' RIPARAZIONE. nascondiamo il bottone "ripara" se non ci sono più errori da sistemare. ---------
        if (elementiConErrore.length == 0) {
            
            bottoneRipara.style.right = "-" + 75 + "px"
            bottoneRipara.style.transition = "all 1.5s cubic-bezier(1, -0.01, 0.57, 1)" 

            riparazioneFinita = true
            
        }

        for (item of listaElementSbagliati) {
            item.removeEventListener("click", riparaErrore);
            item.removeEventListener("mouseover", coloreNuovo);
            item.removeEventListener("mouseout", coloreOriginale);

            if (item.classList.contains("logo-transition-correggimi")) {
                item.classList.remove("logo-transition-correggimi")
            }

            //eliminiamo e storiamo gli href
            let dataHrefValue = item.getAttribute("data-href")
            if (dataHrefValue != null) {
                console.log(dataHrefValue)

                //store href
                item.setAttribute('href', dataHrefValue);
                //Remove href
                //item.href = '';
                item.removeAttribute("data-href")
            }

            //eliminiamo e storiamo i data-target (seconda barriera sicurezza)
            let dataTargetStoreValue = item.getAttribute("data-target-store")
            if (dataTargetStoreValue != null) {
                console.log(dataTargetStoreValue)

                //store data-target
                item.setAttribute('data-target', dataTargetStoreValue);
                //Remove data-target
                //item.href = '';
                item.removeAttribute("data-target-store")
            }

            //eliminiamo e storiamo i data-dismiss (seconda barriera sicurezza)
            let dataDismissStoreValue = item.getAttribute("data-dismiss-store")
            if (dataDismissStoreValue != null) {
                console.log(dataDismissStoreValue)

                //store data-dismiss
                item.setAttribute('data-dismiss', dataDismissStoreValue);
                //Remove data-dismiss
                //item.href = '';
                item.removeAttribute("data-dismiss-store")
            }
        }

    
    //INIZIA MODALITA' RIPARA
    } else {
        this.classList.add('modalita-ripara')

        stoRiparando = true

        chiudiIcona.classList.remove('d-none')
        apriIcona.classList.add('d-none')

        cursoreAlternativo.classList.remove('d-none')

        body.classList.add('togli-cursore')

        document.onmousemove = nuovoCursore

        //appare bottone contatore
        bottoneContatore.style.right = 15 + "px"

        //settare numero errori mancanti 
        bottoneContatore.innerText = elementiConErrore.length

        for (item of elementiConErrore) {
            item.addEventListener("click", riparaErrore);
            item.addEventListener("mouseover", coloreNuovo);
            item.addEventListener("mouseout", coloreOriginale);

            let hrefValue = item.getAttribute("href")
            if (hrefValue != null) {
                //store href
                item.setAttribute('data-href', hrefValue);
                //Remove href
                //item.href = '';
                item.removeAttribute("href")
            }

            let dataTargetValue = item.getAttribute("data-target")
            if (dataTargetValue != null) {
                console.log(dataTargetValue)

                //store data-target
                item.setAttribute('data-target-store', dataTargetValue);
                //Remove data-target
                //item.href = '';
                item.removeAttribute("data-target")
            }

            let dataDismissValue = item.getAttribute("data-dismiss")
            if (dataDismissValue != null) {
                console.log(dataDismissValue)

                //store data-dismiss
                item.setAttribute('data-dismiss-store', dataDismissValue);
                //Remove data-dismiss
                //item.href = '';
                item.removeAttribute("data-dismiss")
            }
        }
    }
}

//bottone in basso a destra
bottoneRipara.addEventListener("click", modalitaRipara);

//evento keydown per shortcut
document.addEventListener ("keydown", function (event) {

    let keyCode = event.keyCode
    //console.log(event.key + " - " + keyCode)

    //shift + "+" = asterisco* 221
    if (keyCode === 221) {  // case sensitive
        console.log("hai premuto shift + più")
        riparaSubito()
    }
} );







//correzione px bottone ripara / per ora la levo

function correzioneBottone() {

    if(riparazioneFinita == false) {

        if (this.classList.contains("portfolio-box") ) {
            bottoneRipara.style.right = 30 + "px"
        } else if (this.classList.contains("close-modal")){    //   || this.getAttribute('data-dismiss') != "modal"
            bottoneRipara.style.right = 15 + "px"
        }
    }
}
/*
let tuttiPortofolioBoxes = document.querySelectorAll('.portfolio-box');
for (item of tuttiPortofolioBoxes) {
    item.addEventListener("click", correzioneBottone);
}

let tuttiChiudiModale = document.querySelectorAll('[data-dismiss="modal"]');
for (item of tuttiChiudiModale) {
    item.addEventListener("click", correzioneBottone);
}
*/







//CTRL + K + C per commentare    CTRL + K + U per uncommentare

//var btn = document.createElement("BUTTON");
//btn.innerHTML = "CLICK ME";                 
//document.body.appendChild(btn)

//funzione creaportoflio. Dentro con un ciclo per ogni progetto creo il box portofolio e la finestra modale


//JSON GET DATA ------------------------------------------------------------------------------------------


//variabili
let url = "json/SmartEnoughData.json"
let datiJson = [] //dove impacchetterò i dati del json

const nomiMesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]



function creaBoxPortofolio(progetto, indice) {

    let numeroProgetto = indice + 1

    //contenitore principale
    let contenitorePortofolioBox = document.getElementById('contenitorePortofolioBox')

    //creo gli elementi che compongono il box
    let colonna = document.createElement('div')
    colonna.className = 'col-lg-4 col-sm-6'

    let portofolioBox = document.createElement('a')
    portofolioBox.className = 'portfolio-box'
    portofolioBox.setAttribute("data-toggle", "modal")
    portofolioBox.setAttribute("data-target", "#portfolioModal" + numeroProgetto)
 
    let immagine = document.createElement('img')
    immagine.className = "img-fluid"
    immagine.src = progetto.image

    let portfolioBoxCaption = document.createElement('div')
    portfolioBoxCaption.className = 'portfolio-box-caption'

    let categoria = document.createElement('div')
    categoria.className = 'project-category font-italic'
    categoria.innerHTML = progetto.category

    let nomeProgetto = document.createElement('div')
    nomeProgetto.className = 'project-name'
    nomeProgetto.innerHTML = progetto.name

    //appendo tutto 
    contenitorePortofolioBox.append(colonna)
    colonna.append(portofolioBox)
    portofolioBox.append(immagine)
    portofolioBox.append(portfolioBoxCaption)
    portfolioBoxCaption.append(categoria)
    portfolioBoxCaption.append(nomeProgetto)

    //aggiungo la classe .corregimi ad un solo box
    if (numeroProgetto == 5) {
        portofolioBox.classList.add('correggimi')
    }
}

function creaFinestraModale(progetto, indice) {

    //console.log(progetto)

    let numeroProgetto = indice + 1

    //creo gli elementi che compongono il modale
    let portofolioModal = document.createElement('div')
    portofolioModal.className = 'portfolio-modal modal fade'
    portofolioModal.id = "portfolioModal" + numeroProgetto
    portofolioModal.style = "display: none;"
    portofolioModal.setAttribute("tabindex", -1)
    portofolioModal.setAttribute("data-target", "#portfolioModal" + numeroProgetto)
    portofolioModal.setAttribute("role", "dialog")
    portofolioModal.setAttribute("aria-hidden", true)

    let modalDialog = document.createElement('div')
    modalDialog.className = 'modal-dialog modal-xl'

    let modalContent = document.createElement('div')
    modalContent.className = 'modal-content'

    let closeModal = document.createElement('div')
    closeModal.className = 'close-modal'
    closeModal.setAttribute("data-dismiss", "modal")

    let iconaChiudi = document.createElement('i')
    iconaChiudi.className = 'fas fa-times fa-3x text-primary'

    //svg
    //let svg = document.createElement('svg')
    // svg.setAttribute("role", "img")
    // svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    // svg.setAttribute("viewBox", "0 0 320 512")


    /*
    let path = document.createElement('path')
    path.setAttribute("fill", "currentColor")
    path.setAttribute("d", "M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z")
    0*/

    //svg.append(path)

    let container = document.createElement('div')
    container.className = 'container'

    let row = document.createElement('div')
    row.className = 'row'
    
    let colonna = document.createElement('div')
    colonna.className = 'col-lg-8 mx-auto'

    let modalBody = document.createElement('div')
    modalBody.className = 'modal-body'

    let titolo = document.createElement('h2')
    titolo.className = 'mb-4 font-weight-semibold'
    titolo.innerHTML = progetto.name

    let immagine = document.createElement('img')
    immagine.className = 'mb-4 img-fluid d-block mx-auto'
    immagine.src = progetto.image

    let descrizione = document.createElement('p')
    descrizione.className = 'mb-4'
    descrizione.innerHTML = progetto.description

    let listaDettagli = document.createElement('ul')
    listaDettagli.className = 'mb-4 list-inline'

    //data
    let data = document.createElement('li')
    let mese = nomiMesi[progetto.date.month - 1]

    let spanData = document.createElement('span')
    spanData.className = 'font-weight-bold'
    spanData.innerHTML = "Periodo: "
    data.append(spanData)
    data.append(mese + " " + progetto.date.year)

    //cliente
    let cliente = document.createElement('li')

    let spanCliente = document.createElement('span')
    spanCliente.className = 'font-weight-bold'
    spanCliente.innerHTML = "Cliente: "
    cliente.append(spanCliente)
    cliente.append(progetto.client)

    //categoria
    let categoria = document.createElement('li')

    let spanCategoria = document.createElement('span')
    spanCategoria.className = 'font-weight-bold'
    spanCategoria.innerHTML = "Categoria: "
    categoria.append(spanCategoria)
    categoria.append(progetto.category)

    //bottone
    let bottoneChiudi = document.createElement('button')
    bottoneChiudi.className = 'btn btn-primary'
    bottoneChiudi.type = "button"
    bottoneChiudi.setAttribute("data-dismiss", "modal")

    let iconaBottone = document.createElement('i')
    iconaBottone.className = 'fas fa-times'

    bottoneChiudi.append(iconaBottone)
    bottoneChiudi.append(" Chiudi Progetto")

    //appendo tutto 
    document.body.append(portofolioModal)
    portofolioModal.append(modalDialog)
    modalDialog.append(modalContent)

    modalContent.append(closeModal)
    closeModal.append(iconaChiudi)

    modalContent.append(container)
    container.append(row)
    row.append(colonna)
    colonna.append(modalBody)

    modalBody.append(titolo)
    modalBody.append(immagine)
    modalBody.append(descrizione)

    modalBody.append(listaDettagli)
    listaDettagli.append(data)
    listaDettagli.append(cliente)
    listaDettagli.append(categoria)

    modalBody.append(bottoneChiudi)

    //aggiungo la classe .corregimi ad alcuni elementi
    if (numeroProgetto == 1 || numeroProgetto == 6) {
        immagine.classList.add('correggimi')
    }

    if (numeroProgetto == 3) {
        bottoneChiudi.classList.add('correggimi')
    }
}



function chiamataPortofolioJson(data) {
    datiJson = data

    let tuttiProgetti = data.projects
    //console.log(tuttiProgetti)

    for (item of tuttiProgetti) {
        //console.log(item)
        creaBoxPortofolio(item, tuttiProgetti.indexOf(item))
        creaFinestraModale(item, tuttiProgetti.indexOf(item))
    }
}

$.get(url, chiamataPortofolioJson)
        











//LOADING SCREEN

let preLoad = document.getElementById('preloading')

//console.log("prova: ", sessionStorage.getItem('pagina'))

function removeLoader() {

    //console.log(sessionStorage.getItem('pagina'))
    preLoad.classList.add('finito')
    document.body.classList.remove('overflow-hidden')
}


if (sessionStorage.getItem('pagina') == 'caricata') {
    //creoLoader()
    preLoad.classList.add('d-none')
    preLoad.classList.remove('d-flex')
}

$(window).on('load', function(){

    if (sessionStorage.getItem('pagina') != 'caricata') {
        document.body.classList.add('overflow-hidden')
        
        sessionStorage.setItem('pagina', 'caricata');

        setTimeout(removeLoader, 2000); 
    }
});


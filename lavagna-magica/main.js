/*
    passando il mouse sulla pagina,
    lascio una traccia di forme (quadrati e cerchi)
    di diverso colore e dimensione

    forma, colore e dimensione devono essere SEMPRE DIVERSE.

    il cerchio è un div con border radious grande

    -
    siccome nell'evento sappiam ole coordinate 
    per decidere la dimesione

    -
    oppure più mi sposto verso destra diventano più colorate
    più vado verso l'alto divnetano pericolo.


    -
    creare quadrato e cerchi

    legare la creazione degl elementi al passaggio del mouse

    -

    fare in modo che sono notificato quando il mouse si muove in giro per la pagina


    far apparire lettere

    vario l'opacità

    tutte le caratterisitche visive dei quadratini

    LA VARAIAZIONE DIPENDE DA X O Y 

    pageW = document.body.clientWidth IN REALTA document.documentElement.clientHeight!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    pageH = document.body.clientHeight

    forma.style.opacity = event.clientX / pageW

    forma.style.width = (event.clientY / pageW) * 50 + 'px'

    forma.style.fontSize = (event.clientX * event.clientY) / pageW + 'px'

    forma.innerText = 'tutto quello che scrivo'

    misurare quanto distante dal centro

    più vai verso fuori il colore sfuma

    -
    seno e coseno 
    mano mano che ti sposti appare una caratteristica che è ondulatoria

    -
    devo potere cancellare con il passaggio del mouse

    -
    OPACITA

    if (toggleOpacita) {
            //coordinate centro
            let xCentro = document.documentElement.clientWidth / 2
            let yCentro = document.documentElement.clientHeight / 2
            //coordinate cursore
            let xCursore = event.clientX
            let yCursore = event.clientY

            let distanzaCentro = Math.sqrt( Math.pow(xCursore - xCentro, 2) + Math.pow(yCursore - yCentro, 2) )
            let distanzaMassima = Math.sqrt( Math.pow(0 - xCentro, 2) + Math.pow(0 - yCentro, 2) )

            let opacitaDalCentro = (1 - distanzaCentro / distanzaMassima)
            forma.style.opacity = opacitaDalCentro
        }

    //EFFETTO DEFORMAZIONE 
function deformaX(xCursore, yCursore) {
    if (toggleDeformazione) {
        let distanzaCursoreCentroY = Math.sqrt( Math.pow(event.clientY - document.documentElement.clientHeight / 2, 2))
        let distanzaMassimaY =  document.documentElement.clientHeight / 2

        let altezzaRidimensionata = (1 - distanzaCursoreCentroY / distanzaMassimaY) * dimensione  

        forma.style.height = altezzaRidimensionata + 'px'

        //larghezza deformata
        let distanzaCursoreCentroX = Math.sqrt( Math.pow(event.clientX - document.documentElement.clientWidth / 2, 2))
        let distanzaMassimaX =  document.documentElement.clientWidth / 2

        let larghezzaRidimensionata = (1 - distanzaCursoreCentroX / distanzaMassimaX) * dimensione  

        forma.style.width = larghezzaRidimensionata + 'px'    
        } 
}


SIMBOLI BELLI ------------------------------
▀	&uhblk;		
▄	&lhblk;		
█	&block;		
░	&blk14;		
▒	&blk12;		
▓	&blk34;		
□	&squ; &square; &Square;		
▪	&squf; &squarf; &blacksquare; &FilledVerySmallSquare;		
▫	&EmptyVerySmallSquare;		
▭	&rect;		
▮	&marker;		
▱	&fltns;		
△	&xutri; &bigtriangleup;		
▴	&utrif; &blacktriangle;		
▵	&utri; &triangle;		
▸	&rtrif; &blacktriangleright;		
▹	&rtri; &triangleright;		
▽	&xdtri; &bigtriangledown;		
▾	&dtrif; &blacktriangledown;		
▿	&dtri; &triangledown;		
◂	&ltrif; &blacktriangleleft;		
◃	&ltri; &triangleleft;		
◊	&loz; &lozenge;		
○	&cir;		
◬	&tridot;		
◯	&xcirc; &bigcirc;		
◸	&ultri;		
◹	&urtri;		
◺	&lltri;		
◻	&EmptySmallSquare;		
◼	&FilledSmallSquare;		
★	&starf; &bigstar;		
☆	&star;		
☎	&phone;		
♀	&female;		
♂	&male;		
♠	&spades; &spadesuit;		
♣	&clubs; &clubsuit;		
♥	&hearts; &heartsuit;		
♦	&diams; &diamondsuit;		
♪	&sung;		
♭	&flat;		
♮	&natur; &natural;		
♯	&sharp;		
✓	&check; &checkmark;		
✗	&cross;		
✠	&malt; &maltese;		
✶	&sext;


*/

//LETTERA RANDOM
let letteraCasuale = function () {
    let emptyString = "";
    let alphabet = "abcdefghijklmnopqrstuvwxyz";

    let numcaratteri = 1

    while (emptyString.length < numcaratteri) {
    emptyString += alphabet[Math.floor(Math.random() * alphabet.length)];
    } 
    return emptyString
}

//ELIMINA TUTTO
let pulisciLavagna = function() {
    let elementi = document.getElementsByTagName('div');
    for (let i = 0; i < elementi.length * 100000; i++) {
        elementi[0].remove()
    }
}

//BORDER RANDOM
let randomBorder = function (dim) {
    let random = Math.floor(Math.random() * 101)
    let border = 0
    if (random > 50){
        border = (dim * 2) 
    } 
    return border
}

//DIMENSIONE RANDOM
let funzDimensione = function () {
    let dim = 0
    let misura = document.getElementById('misura').value
    if (misura != '') {
        dim = Math.floor(Math.random() * misura)
    } else {
        dim = Math.floor(Math.random() * 100)
    }
    return dim
}

//COLORE RANDOM
let colore = function() {
    let coloreFinale
    if (coloreIndex == 0) {
        let r = Math.floor(Math.random() * 256) //massimo 255
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        coloreFinale = 'rgb(' + r + ', ' + g + ', ' + b + ')'   
    } else if (coloreIndex == 1) {
        coloreFinale = 'red'
    } else if (coloreIndex == 2) {
        coloreFinale = 'green'
    } else if (coloreIndex == 3) {
        coloreFinale = 'blue'
    }
    return coloreFinale 
}

//INNESTO COLORI
let rosso = function() {
    isColoreCasuale = true
    coloreIndex = 1
}
let verde = function() {
    isColoreCasuale = true
    coloreIndex = 2
}
let blu = function() {
    isColoreCasuale = true
    coloreIndex = 3
}
let pennelloDefault = function() {
    isColoreCasuale = true
    coloreIndex = 0
}
let pennelloCasuale = function() {
    isColoreCasuale = false
    coloreIndex = 0
    coloreFissato = colore()
}

//CALLBACK PRINCIPALE 
let callbackMovimento = function(event) {
    //console.log(event)
    if (toggleSnake) {
        let elementi = document.getElementsByTagName('div');

        let lunghezzaSnake = 0
    
        let lunghezza = document.getElementById('snake').value
        if (lunghezza != '') {
            lunghezzaSnake = lunghezza
        }
    
        if (elementi.length > lunghezzaSnake) {
            elementi[0].remove()
        }    
    }


    if (mousePremuto) {
        let forma = document.createElement('div')

        if (isColoreCasuale){
            forma.style.backgroundColor = colore()
        } else {
            forma.style.backgroundColor = coloreFissato
        }

        let dimensione = funzDimensione()

        forma.style.height = dimensione + 'px'
        forma.style.width = dimensione  + 'px'
    
        forma.style.position = 'absolute'
        forma.style.left = event.pageX + 'px' 
        forma.style.top = event.pageY + 'px'
    
        forma.style.borderRadius = randomBorder(dimensione) + 'px'

        //effetto opacità
        if (toggleOpacita) {
            forma.style.opacity = opacita(event.clientX, event.clientY) //TOGGLE BUTTON OPACITA'
        }
    
        //EFFETTO DEFORMAZIONE
        if (toggleDeformazione) {
            newDim = deforma(event.clientX, event.clientY, dimensione)
            //altezza deformata
            forma.style.height = newDim.altezzaRidimensionata + 'px'
            //larghezza deformata
            forma.style.width = newDim.larghezzaRidimensionata + 'px'
        }
        

        //effetto deforma la grandezza
        if (toggleDim) {
            forma.style.height = dimensione * opacita(event.clientX, event.clientY) + 'px'
            forma.style.width = dimensione * opacita(event.clientX, event.clientY)  + 'px'
        }

        document.body.append(forma)
    } 
}

//DIPINGI
let modalitaPittore = function(event) {
    //console.log(event)
    if (toggleSnake) {
        let elementi = document.getElementsByTagName('div');

        let lunghezzaSnake = 0
    
        let lunghezza = document.getElementById('snake').value
        if (lunghezza != '') {
            lunghezzaSnake = lunghezza
        }
    
        if (elementi.length > lunghezzaSnake) {
            elementi[0].remove()
        }    
    }

    if (mousePremuto) {
        let forma = document.createElement('div')

        if (isColoreCasuale){
            forma.style.backgroundColor = colore()
        } else {
            forma.style.backgroundColor = coloreFissato
        }

        let dimens = 80
        let misura = document.getElementById('misura').value
        if (misura != '') {
            dimens = misura
        }
    
        forma.style.height = dimens + 'px'
        forma.style.width = dimens + 'px'
    
        forma.style.position = 'absolute'
        forma.style.left = event.pageX + 'px' 
        forma.style.top = event.pageY + 'px'
    
        forma.style.borderRadius = dimens * 2 + 'px'
        if (toggleMatematico) { //modalità matematico
            forma.style.borderRadius = 0
        }

        //effetto opacità
        if (toggleOpacita) {
            forma.style.opacity = opacita(event.clientX, event.clientY) //TOGGLE BUTTON OPACITA'
        }
    
        //EFFETTO DEFORMAZIONE
        if (toggleDeformazione) {
            newDim = deforma(event.clientX, event.clientY, dimens)
            //altezza deformata
            forma.style.height = newDim.altezzaRidimensionata + 'px'
            //larghezza deformata
            forma.style.width = newDim.larghezzaRidimensionata + 'px'
        }
        

        //effetto deforma la grandezza
        if (toggleDim) {
            forma.style.height = dimens * opacita(event.clientX, event.clientY) + 'px'
            forma.style.width = dimens * opacita(event.clientX, event.clientY)  + 'px'
        }

        document.body.append(forma)
    } 
}

//GENERATORE LETTERE
let modalitaLettere = function(event) {
    //console.log(event)
    if (toggleSnake) {
        let elementi = document.getElementsByTagName('div');

        let lunghezzaSnake = 0
    
        let lunghezza = document.getElementById('snake').value
        if (lunghezza != '') {
            lunghezzaSnake = lunghezza
        }
    
        if (elementi.length > lunghezzaSnake) {
            elementi[0].remove()
        }    
    }
    
    if (mousePremuto) {
        let forma = document.createElement('div')

        if (isColoreCasuale){
            forma.style.color = colore()
        } else {
            forma.style.color = coloreFissato
        }
        forma.style.position = 'absolute'
        forma.style.left = event.pageX + 'px' 
        forma.style.top = event.pageY + 'px'

        forma.innerText = letteraCasuale()
        let dimens = funzDimensione()*1.5 
        forma.style.fontSize = dimens + 'px'

        let misura = document.getElementById('misura').value
        if (misura != '') {
            dimens = misura
            forma.style.fontSize = dimens + 'px'
        }

        let parola = document.getElementById('parola').value
        if (parola != '') {
            forma.innerText = parola
        }

        //effetto opacità
        if (toggleOpacita) {
            forma.style.opacity = opacita(event.clientX, event.clientY) //TOGGLE BUTTON OPACITA'
        }
    
        //EFFETTO DEFORMAZIONE
        if (toggleDeformazione) {
            newDim = deforma(event.clientX, event.clientY, dimens)
            //altezza deformata
            forma.style.height = newDim.altezzaRidimensionata + 'px'
            //larghezza deformata
            forma.style.width = newDim.larghezzaRidimensionata + 'px'
        }
        
        //effetto deforma la grandezza
        if (toggleDim) {
            forma.style.fontSize = dimens * opacita(event.clientX, event.clientY) + 'px'
        }

        //MODALIA' COMETA
        if (toggleCometa) {
            forma.innerText = '★'
        }

        document.body.append(forma)
    } 
}

//CANCELLINO 
let modalitaCancellino = function() {

    let bottone = document.getElementById("cancellino")

    if (bottone.innerText == 'Cancellino: ON' ){
        if (mousePremuto) {
            let forma = document.createElement('div')
    
            forma.style.backgroundColor = '#fff'
            
            forma.style.height = '100px'
            forma.style.width = '100px'
        
            forma.style.position = 'absolute'
            forma.style.left = event.pageX + 'px' 
            forma.style.top = event.pageY + 'px'
        
            forma.style.borderRadius = '100px'
    
            document.body.append(forma)
        }
    }
}

// CANCELLAZIONE DEFINITIVA
let modalitaSparisci = function(event) {
    let bottone = document.getElementById("sparisci")

    if (bottone.innerText == 'Cancellino Super: ON' ) {
        if (mousePremuto) {
            event.target.remove()
        }
    }
}

//SUPER CANCELLINO
function sparisci() {

    let bottone = document.getElementById("sparisci")
    let bottone2 = document.getElementById("cancellino")

    if (bottone.innerText == 'Cancellino Super: OFF' ) {
        bottone.innerText = 'Cancellino Super: ON'
        document.onmousemove = vuoto

        let elementi = document.getElementsByTagName('div')
        for (let i = 0; i < elementi.length; i++) {
            elementi[i].onmouseover = modalitaSparisci
        }
        bottone2.innerText = 'Cancellino: OFF'
    } else {
        bottone.innerText = 'Cancellino Super: OFF'
        standard()
        let elementi = document.getElementsByTagName('div')
        for (let i = 0; i < elementi.length; i++) {
            elementi[i].onmouseover = vuoto
        }
    }
}

//OPACITA DAL CENTRO: PIU VA VERSO L'ESTERNO PIU DIVENTA OPACO
function opacita(xCursore, yCursore) {
    if (toggleOpacita || toggleDim) {
        //coordinate centro
        let xCentro = document.documentElement.clientWidth / 2
        let yCentro = document.documentElement.clientHeight / 2

        let distanzaCentro = Math.sqrt( Math.pow(xCursore - xCentro, 2) + Math.pow(yCursore - yCentro, 2) )
        let distanzaMassima = Math.sqrt( Math.pow(0 - xCentro, 2) + Math.pow(0 - yCentro, 2) )

        return opacitaDalCentro = (1 - distanzaCentro / distanzaMassima)       
        } 
}

//EFFETTO DEFORMAZIONE tutto
function deforma(xCursore, yCursore, dim) {
    if (toggleDeformazione) {

        //altezza deformata
        let distanzaCursoreCentroY = Math.sqrt( Math.pow(yCursore - document.documentElement.clientHeight / 2, 2))
        let distanzaMassimaY =  document.documentElement.clientHeight / 2

        let altezzaRidimensionata = (1 - distanzaCursoreCentroY / distanzaMassimaY) * dim  

        //larghezza deformata
        let distanzaCursoreCentroX = Math.sqrt( Math.pow(xCursore - document.documentElement.clientWidth / 2, 2))
        let distanzaMassimaX =  document.documentElement.clientWidth / 2

        let larghezzaRidimensionata = (1 - distanzaCursoreCentroX / distanzaMassimaX) * dim  

        return {
            altezzaRidimensionata: altezzaRidimensionata,
            larghezzaRidimensionata: larghezzaRidimensionata }    
    }    
}

//INNESTO MODALITA' ED EFFETTI
function cancellino() {
    let bottone = document.getElementById("cancellino")
    let bottone2 = document.getElementById("sparisci")

    if (bottone.innerText == 'Cancellino: OFF' ) {
        bottone.innerText = 'Cancellino: ON'
        document.onmousemove = modalitaCancellino
        bottone2.innerText = 'Cancellino Super: OFF'
    } else {
        bottone.innerText = 'Cancellino: OFF'
        standard()
    }
}
let lettere = function() {
    document.onmousemove = modalitaLettere
    toggleCometa = false
}
let cometa = function() {
    document.onmousemove = modalitaLettere
    toggleCometa = true
}
let pittore = function() {
    document.onmousemove = modalitaPittore
    toggleMatematico = false
}
let standard = function() {
    document.onmousemove = callbackMovimento
}
function matematico() {
    document.onmousemove = modalitaPittore
    toggleMatematico = true
}
function bottoneOpacita() {
    let bottone = document.getElementById('opacita')

    if (toggleOpacita) {
        bottone.innerText = 'Opacità: OFF'
        toggleOpacita = false
    } else {
        bottone.innerText = 'Opacità: ON'
        toggleOpacita = true
    }
}
function bottoneDeforma() {
    let bottone = document.getElementById('deforma')

    if (toggleDeformazione) {
        bottone.innerText = 'Deforma: OFF'
        toggleDeformazione = false
    } else {
        bottone.innerText = 'Deforma: ON'
        toggleDeformazione = true
    }
}
function bottoneDim() {
    let bottone = document.getElementById('dim')

    if (toggleDim) {
        bottone.innerText = 'Effetto dimensione: OFF'
        toggleDim = false
    } else {
        bottone.innerText = 'Effetto dimensione: ON'
        toggleDim = true
    }
}
function bottoneSnake() {
    let bottone = document.getElementById('bottSnake')

    if (toggleSnake) {
        bottone.innerText = 'Snake: OFF'
        toggleSnake = false
    } else {
        bottone.innerText = 'Snake: ON'
        toggleSnake = true
    }
}

//TOGGLE MOUSE PREMUTO
let funzMousePremuto = function() {
    if (mousePremuto) {
        mousePremuto = false
    } else {
        mousePremuto = true
    }
}

function vuoto() {}


//VARIABILI TOGGLE
let coloreIndex = 0

let toggleOpacita = false
let toggleDeformazione = false
let toggleDim = false
let toggleSnake = false
let toggleCometa = false

let isColoreCasuale = true
let coloreFissato

let mousePremuto = false 

//simulo mouse premuto
document.onmousedown = funzMousePremuto
document.onmouseup = funzMousePremuto

//inizio
standard()

//menu dropdown
function apriMenu() {
    document.getElementById("menu").classList.toggle("show");

    if (document.getElementById('apri').innerText == 'Chiudi Menu' ) {
        document.getElementById('apri').innerText = 'Apri Menu'
    } else {
        document.getElementById('apri').innerText = 'Chiudi Menu'
    } 
}







/* VECCHIO CODICE*/


/*
let callbackColore = function(event) {
    console.log(event)
    let r = Math.floor(Math.random() * 256) //massimo 255
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    let rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')'
    event.target.style.backgroundColor = rgb
}

let callbackColoreIniziale = function(event) {
    event.target.style.backgroundColor = '' 
}

let invertiColori = function() {
    let casella = document.getElementsByClassName('tassello')
    for (let i = 0; i < casella.length; i++) {
        casella[i].style = ''
        if (casella[i].className == 'tassello nero') {
            casella[i].className = 'tassello bianco'
        } else if (casella[i].className == 'tassello bianco') {
            casella[i].className = 'tassello nero'
        }
    }
}

let resetSacchiera = function() {
    let casella = document.getElementsByClassName('tassello') 
    for (let i = 0; i < casella.length; i++) {
        casella[i].style = ''
    }
}

let disegna = function() {
    let casella = document.getElementsByClassName('tassello') //7 9 11 13 14 16 18 20 21 22 23 25 27 28 30 32 35 37 39 41
    for (let i = 0; i < casella.length; i++) {
        if (i == 7 || i == 9 || i == 11 || i == 13 || i == 14 || i == 16 || 
            i == 18 || i == 20 || i == 21 || i == 22 || i == 23 || i == 25 || 
            i == 27 || i == 28 || i == 30 || i == 32 || i == 35 || i == 37 || i == 39 || i == 41) {
            casella[i].style.backgroundColor = '#3247fb'
        } else {
            casella[i].style.backgroundColor = ''
        }
    }
}

let colore
//colori
let rosso = function(event) {
    event.target.style.backgroundColor = 'red'
}
let verde = function(event) {
    event.target.style.backgroundColor = 'green'
}
let blu = function(event) {
    event.target.style.backgroundColor = 'blue'
}
let coloreACaso = function(event) {
    event.target.style.backgroundColor = colore
}


//pennelli
let pennelloRosso = function() {
    let casella = document.getElementsByClassName('tassello')
    for(let i=0; i<49; i++){
        casella[i].onmouseover = rosso
    }
}
let pennelloVerde = function() {
    let casella = document.getElementsByClassName('tassello')
    for(let i=0; i<49; i++){
        casella[i].onmouseover = verde
    }
}
let pennelloBlu = function() {
    let casella = document.getElementsByClassName('tassello')
    for(let i=0; i<49; i++){
        casella[i].onmouseover = blu
    }
}
let pennelloCasuale = function() {
    let r = Math.floor(Math.random() * 256) //massimo 255
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    let rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')'
    colore = rgb
    let casella = document.getElementsByClassName('tassello')
    for(let i=0; i<49; i++){
        casella[i].onmouseover = coloreACaso
    }
}

let pennelloReset = function() {
    let casella = document.getElementsByClassName('tassello')
    for(let i=0; i<49; i++){
        casella[i].onmouseover = callbackColore
    }
}


//Creazione scacchiera

let divPrincipale = document.createElement('div')
divPrincipale.id = 'scacchiera'
document.body.append(divPrincipale)

for (let i = 0; i < 49; i++) {
    let contenitore = document.getElementById("scacchiera")
    let scatola = document.createElement("div")
    contenitore.append(scatola)

    if (i % 2 == 0) {
        scatola.className = 'tassello nero'
    } else {
        scatola.className = 'tassello bianco'
    }

    scatola.onmouseover = callbackColore
    scatola.onclick = callbackColoreIniziale
}

*/
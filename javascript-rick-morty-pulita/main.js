//Ciclo tutti i profili 
function ciclaProfili(data){
    console.log(data)
    let contenitore = document.getElementById('contenitore')

    for (let i = 0; i < data.results.length; i++) {
        //creo div principale
        let scheda = document.createElement('div')

        //aggiundo la classe alla scheda
        scheda.classList.add("scheda-personaggio");

        //titolo nome e id
        let divTitolo = document.createElement('div')
        divTitolo.classList.add("titolo-personaggio")
        scheda.append(divTitolo)

        let nome = document.createElement('h2')
        nome.textContent = data.results[i].name 
        divTitolo.append(nome)

        let divID = document.createElement('div')
        divID.innerText = "id: " + data.results[i].id
        divID.classList.add("id-personaggio")
        divTitolo.append(divID)

        //immagine
        let immagine = document.createElement('img')
        immagine.src = data.results[i].image
        scheda.append(immagine)

        //genere
        let sesso = document.createElement('p')
        sesso.textContent = 'Sesso?   ' + data.results[i].gender
        scheda.append(sesso) 

        //luogo
        let luogo = document.createElement('p')
        luogo.textContent = 'Dove vivi?   ' + data.results[i].location.name
        scheda.append(luogo)

        //razza
        let razza = document.createElement('p')
        razza.textContent = 'Razza?   ' + data.results[i].species
        scheda.append(razza)

        //vivo o morto?
        if (data.results[i].status == 'Alive') {
            stringaVivo = 'Ovvio che sì!'
        } else if (data.results[i].status == 'Dead') {
            stringaVivo = 'Non più ormai...'
        } else if (data.results[i].status == 'unknown') {
            stringaVivo = 'Ah boh, chi lo sa?'
        }
        let vivoMorto = document.createElement('p')
        vivoMorto.textContent = 'Sei vivo?   ' + stringaVivo
        scheda.append(vivoMorto)

        //CAMBIA SFONDO IN BASE AL SESSO
        if (data.results[i].gender == 'Female') {
            scheda.classList.add("femmina");
        } else if (data.results[i].gender == 'Male') {
            scheda.classList.add("maschio");
        } else if (data.results[i].gender == 'Genderless') {
            scheda.classList.add("senza-genere");
        } else if (data.results[i].gender == 'unknown') {
            scheda.classList.add("genere-sconosciuto");
        }

        //appendi la scheda completa al div principale
        contenitore.append(scheda)
    }
}

let url = 'https://rickandmortyapi.com/api/character/'

//faccio un cilo in cui cambio ogni volta la pagina
let tuttiIPersonaggi = function(data) {
    numPagine = data.info.pages

    for(i = 1; i <= numPagine; i++){ //25 pagine nel caso di tutti i personaggi
        let nuovoUrl = url + "?page=" + i
        console.log(nuovoUrl)
        $.get(nuovoUrl, ciclaProfili)
    }
}

let urlEsterno = 'https://rickandmortyapi.com/api/character/?'
//Filtro
let avanzatoBuildAdressAndCallAPI = function(event) {
    //console.log(event.target)

    contenitore.innerHTML = '' 

    //bottoni status vivo-morto
    if (event.target.className == 'status-button'){
        query.primo.searchValue = event.target.name
        query.primo.searchKey = "status"

        //radio buttons
        let elements = document.getElementsByClassName('status-button')
        for (i = 0; i < elements.length; i++) {
            elements[i].classList.remove('selezionato')
        }
        event.target.classList.add('selezionato')
    }

    //bottoni genere
    if (event.target.className == 'gender-button'){
        query.secondo.searchValue = event.target.name
        query.secondo.searchKey = "gender"

        //radio buttons
        let elements = document.getElementsByClassName('gender-button')
        for (i = 0; i < elements.length; i++) {
            elements[i].classList.remove('selezionato')
        }
        event.target.classList.add('selezionato')
    }

    let urlCombinato = urlEsterno + query.primo.searchKey + '=' + query.primo.searchValue + '&' + query.secondo.searchKey + '=' + query.secondo.searchValue 
    
    //resetto tutto
    if (event.target.className == 'reset-button'){
        $.get(urlEsterno, tuttiIPersonaggi)

        query.primo.searchKey = undefined
        query.primo.searchValue = undefined
        query.secondo.searchKey = undefined
        query.secondo.searchValue = undefined

        let elements = document.getElementsByTagName('button')
        for (i = 0; i < elements.length; i++) {
            elements[i].classList.remove('selezionato')
        }
    } else { //ciclo tutte le pagine
        $.get(urlCombinato, function(data) {
            for(i = 1; i <= data.info.pages; i++){ 
                let nuovoUrl = urlCombinato + "&page=" + i 
                console.log('calling URL', nuovoUrl)
                $.get(nuovoUrl, ciclaProfili)
            }
        })
    }
}

//Far apparire tutti i personaggi CICLANDO LE PAGINE
$.get(url, tuttiIPersonaggi)

let buttons = document.getElementsByTagName('button')
//ASSEGNO A TUTTI I BOTTONI LA FUNZIONE DA USARE    
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = avanzatoBuildAdressAndCallAPI
}

//variabili globali
let query = {
    primo : {
        searchKey : undefined,
        searchValue : undefined
    },
    secondo : {
        searchKey : undefined,
        searchValue : undefined
    }
}

//Scroll to top
$(document).ready(function(){ 

    $(window).scroll(function(){
        if ($(this).scrollTop() > 270) {
            $('.scrolltotop').fadeIn();
        } 
        else {
            $('.scrolltotop').fadeOut();
        }
    }); 
    $('.scrolltotop').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 800);
        return false;
    });
 });

 //Titolo fixed
$(document).ready(function(){ 

    $(window).scroll(function(){
        if ($(this).scrollTop() > 270) {
            let titolo = document.getElementById('fixed-prova')
            $("#fixed-prova").fadeIn(600);
            titolo.style.display = "flex"
        } 
        else {
            let titolo = document.getElementById('fixed-prova')
            $("#fixed-prova").fadeOut(200);
        }
    }); 
 });
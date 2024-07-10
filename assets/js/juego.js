/**
 * 2C = two of clubs
 * 2D = two of diamonds
 * 2H = two of hearts
 * 2S = two of spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales =  ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosConputadora = 0;

//referencias del html
const btnPedir = document.querySelector( '#btnPedir' );
const btnDetener = document.querySelector( '#btnDetener' );
const btnNuevo = document.querySelector( '#btnNuevo' )
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas')
const puntosHTML = document.querySelectorAll('small');

//función para crear la baraja
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push( i + tipo);   
        }
    }

    for (let tipo of tipos){
        for (let esp of especiales){
            deck.push(esp + tipo)
        }
    }
    deck = _.shuffle( deck )
    return deck
}

//Esta función me permite tomar una carta
const pedirCarta = () => {

    if (deck.length === 0){
        throw new Error('No hay mas cartas en el deck')
    }

    let carta = deck.pop()
    
    return carta
}


//para saber el valor de la carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor *1
}

// const valorCarta = ( carta ) => {
    
//     const valor = carta.substring(0, carta.length -1) //-1 para borrar la letra
//     return (isNaN( valor )) ? (valor === 'A') ? 11 : 10 : valor * 1
//     // let puntos = 0;
    
//     // //isNaN analiza si lo que hay dentro de los parentesis es un número
//     // if ( isNaN(valor) ){
//     //     console.log('No es un numero');
//     //     puntos = ( valor === 'A' ) ? 11 : 10;
//     // }else {
//     //     puntos = valor * 1; //para conrtirlo en numero
//     // }
//     // console.log(puntos);
// }

//turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {
    do {
    const carta = pedirCarta()
    puntosConputadora = puntosConputadora + valorCarta(carta)
    puntosHTML[1].innerText = puntosConputadora

    // <!-- <img class="carta" src="/assets/cartas/grey_back.png"> -->
    const imgCarta = document.createElement('img');
    imgCarta.src = `/assets/cartas/${ carta }.png`
    imgCarta.classList.add('carta')
    divCartasComputadora.append(imgCarta)

    if ( puntosMinimos > 21 ){
        break;
     }
    } 
    while( (puntosConputadora < puntosMinimos) && (puntosMinimos <= 21)){

    }

    setTimeout(() => {
        if (puntosConputadora === puntosJugador){
            swal({
                title: 'Empate',
                text: 'Nadie gana',
                icon: 'error',
                button: 'Intentar de nuevo',
              });
        }else if (puntosMinimos > 21){
            swal({
                title: 'Perdiste!!',
                text: 'Paila parce',
                icon: 'error',
                button: 'odio mi vida',
              });
        }else if (puntosJugador === puntosMinimos){
            swal({
                title: 'Ganaste papu!!',
                text: 'La computadora no es nada',
                icon: "success",
                button: 'Esoo hpta',
              });
        }else {
            swal({
                title: 'Gana la computadora!!',
                text: 'Severo malo',
                icon: "error",
                button: 'Intentar de nuevo',
              });
        }
    }, 10)
}

//eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta()
    puntosJugador = puntosJugador + valorCarta(carta)
    puntosHTML[0].innerText = puntosJugador

    // <!-- <img class="carta" src="/assets/cartas/grey_back.png"> -->
    const imgCarta = document.createElement('img');
    imgCarta.src = `/assets/cartas/${ carta }.png`
    divCartasJugador.append(imgCarta)
    imgCarta.classList.add('carta')
    
    //para controlar los puntos
    if ( puntosJugador > 21 ){
        swal({
            title: 'perdiste!!',
            text: 'Paila parce',
            icon: 'error',
            button: 'odio mi vida',
          });
        //console.warn('perdiste');
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora(puntosJugador);
    }else if (puntosJugador === 21){
        swal({
            title: 'Ganaste!!',
            text: 'Felicitaciones, ahora eres el GOAT',
            icon: "success",
            button: 'Siuuuuu',
          });
        //console.warn('ganaste');
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(puntosJugador);
});


btnNuevo.addEventListener('click', () => {
    
    console.clear()
    deck = []
    deck = crearDeck();

    puntosJugador = 0;
    puntosConputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false

});


crearDeck()
pedirCarta()
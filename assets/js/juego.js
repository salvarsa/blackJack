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
const divCartasJugador = document.querySelector('#jugador-cartas')
const puntosHTML = document.querySelectorAll('small');

console.log({divCartasJugador});

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

crearDeck()

//Esta función me permite tomar una carta
const pedirCarta = () => {

    if (deck.length === 0){
        throw new Error('No hay mas cartas en el deck')
    }

    let carta = deck.pop()
    
    return carta
}


pedirCarta()

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
        console.warn('perdiste');
        btnPedir.disabled = true
    }else if (puntosJugador === 21){
        console.warn('ganaste');
        btnPedir.disabled = true
    }
});



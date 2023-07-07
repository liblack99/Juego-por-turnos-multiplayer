const seccionAtaque = document.getElementById("seleccionar-ataque")
const botonMascotaJugador = document.getElementById("boton-mascota")
const seccionReiniciar = document.getElementById("reiniciar")
const botonReiniciar = document.getElementById("boton-reiniciar")

const seccionMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemiga = document.getElementById("mascota-enemiga")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigas = document.getElementById("vidas-enemigas")

const seccionMensaje = document.getElementById("resultado")
const ataqueDelJugador= document.getElementById("ataque-jugador")
const ataqueDelEnemigo= document.getElementById("ataque-enemigo")
const tarjetasPokimones = document.getElementById("opciones-pokimones")
const contenedorAtaque = document.getElementById("contenedor-ataques")

const verMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
const teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
};

let jugadorId = null
let enemigoId = null
let pokimones = []
let pokimonesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo =[]
let opcionDePokimones 
let inputFiremon 
let inputAquamon 
let inputPlantmon 
let mascotaJugador
let miPokimon
let ataquesPokimon 
let ataquesPokimonEnemigo
let botonFuego 
let botonAgua 
let botonPlanta 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo 
let victoriasJugador = 0
let victoriasEnemigas = 0
let vidasJugador = 3
let vidasEnemigas = 3
let intervalo
let lienzo = mapa.getContext("2d")
let fondoMapa=new Image()
fondoMapa.src='./assets/pokimap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 500 / 700

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos



class Pokimon {
    constructor(nombre, foto, vida, mapafoto, id = null, x = 10,  y = 10){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques =[]
        this.x = x
        this.y = y
        this.ancho = 60
        this.alto = 60
        this.mapafoto = new Image()
        this.mapafoto.src = mapafoto
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarPokimon(){
        lienzo.drawImage(
            this.mapafoto,
            this.x, this.y, this.ancho, this.alto
        )

    }
}
let firemon = new Pokimon("Firemon", "./assets/charizard.png", 5, "./assets/charizard.png")
let aquamon = new Pokimon("Aquamon", "./assets/blastoise.png", 5, "./assets/blastoise.png")
let plantmon = new Pokimon("Plantmon", "./assets/venasaur.png", 5, "./assets/venasaur.png")



const firemon_ataques =[
    {nombre: '🔥', id: "boton-fuego"},
    {nombre: '🔥', id: "boton-fuego"},
    {nombre: '🔥', id: "boton-fuego"},
    {nombre: '💧', id: "boton-agua"},
    {nombre: '🌱', id: "boton-planta"},]

firemon.ataques.push(...firemon_ataques)

const aquamon_ataques= [
    {nombre: '💧', id: "boton-agua"},
    {nombre: '💧', id: "boton-agua"},
    {nombre: '💧', id: "boton-agua"},
    {nombre: '🌱', id:"boton-planta"},
    {nombre: '🔥', id: "boton-fuego"}
]

aquamon.ataques.push(...aquamon_ataques)

const plantmon_ataques=[
    {nombre: '🌱', id:"boton-planta"},
    {nombre: '🌱', id:"boton-planta"},
    {nombre: '🌱', id:"boton-planta"},
    {nombre: '🔥', id: "boton-fuego"},
    {nombre: '💧', id: "boton-agua"},
    
]

plantmon.ataques.push(...plantmon_ataques)

pokimones.push(firemon, aquamon, plantmon)

function iniciarEljuego(){
    verMapa.style.display = "none"
    seccionAtaque.style.display =  "none"

    pokimones.forEach((pokimon) =>{
        opcionDePokimones = `
        <input  type="radio" name ="mascotas" id =${pokimon.nombre} />
                <label class="tarjetas-mascotas" for=${pokimon.nombre}>
                    <p class = "nombre-pokimon">${pokimon.nombre }</p>
                    <img src=${pokimon.foto} alt=${pokimon.nombre} >
                </label>
        `
                tarjetasPokimones.innerHTML += opcionDePokimones
                 inputFiremon = document.getElementById("Firemon")
                 inputAquamon = document.getElementById("Aquamon")
                 inputPlantmon = document.getElementById("Plantmon")

    } )

    botonMascotaJugador.addEventListener("click", selecionarMascotaJugador)
    seccionReiniciar.style.display = "none"
    
    botonReiniciar.addEventListener("click", reiniciarJuego)
    uniseAljuego()
}
function uniseAljuego(){
    fetch("http://192.168.0.103:8080/unirse")
    .then(function (res) {
                if (res.ok){
            res.text()
            .then(function (respuesta){
                console.log(respuesta)
                jugadorId = respuesta

            })
        }
    })


}

function selecionarMascotaJugador(){
    seccionMascota.style.display =  "none"
    verMapa.style.display = "flex"
    
    if (inputFiremon.checked){
        spanMascotaJugador.innerHTML = inputFiremon.id
        mascotaJugador = inputFiremon.id
    }else if(inputAquamon.checked){
        spanMascotaJugador.innerHTML = inputAquamon.id
        mascotaJugador = inputAquamon.id
    }else if(inputPlantmon.checked){
        spanMascotaJugador.innerHTML = inputPlantmon.id
        mascotaJugador = inputPlantmon.id
    }else {
        alert("Seleciona una MASCOTA")
        return
        
    }
    seleccionarPokimon(mascotaJugador)
    extraerAtaque(mascotaJugador)
    iniciarMapa()
    
    
}

function seleccionarPokimon (mascotaJugador) {
    fetch(`http://192.168.0.103:8080/pokimon/${jugadorId}`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        pokimon: mascotaJugador
    })
    })
    
}

function extraerAtaque(mascotaJugador){
    let ataques 
    for (let i = 0; i < pokimones.length; i++) {
        if (mascotaJugador === pokimones[i].nombre){
            ataques= pokimones[i].ataques
            
        }
    }
    
    mostrarAtaque(ataques)

}
function mostrarAtaque(ataques){
    ataques.forEach((ataque) => {
        ataquesPokimon = `<button id=${ataque.id} class="boton-ataque BAtaques">${ataque.nombre}</button>
        `
        contenedorAtaque.innerHTML += ataquesPokimon
    } )
    
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonPlanta = document.getElementById("boton-planta")
    botones = document.querySelectorAll(".BAtaques")
    
}
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#1E90FF'
                boton.disabled = true   
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#1E90FF'
                boton.disabled = true
            } else {
                ataqueJugador.push('PLANTA')
                console.log(ataqueJugador)
                boton.style.background = '#1E90FF'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaque()
            }
            
        })
    })
    
}

function enviarAtaque() {
    fetch(`http://192.168.0.103:8080/pokimon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
        intervalo = setInterval(obtenerAtaques, 50 )
}

function obtenerAtaques(){
    fetch(`http://192.168.0.103:8080/pokimon/${enemigoId}/ataques`)
    .then(function (res) {
        if(res.ok){
            res.json()
            .then(function ({ataques}){ 
                if(ataques.length === 5){
                    ataqueEnemigo = ataques
                    combate()
                }
            })
        
            
        }
    })
}
  
function selecionarMascotaEnemigo(enemigo){
    let mascotaAleatoria = aleatorio(0, pokimones.length -1)
    
    spanMascotaEnemiga.innerHTML = enemigo.nombre
    ataquesPokimonEnemigo = enemigo.ataques
    secuenciaAtaque()
       
}    

function indexAmbosJugadores(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosJugadores(index, index)
            crearMensajes("EMPATE")
        }
        else if (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "PLANTA"){
            indexAmbosJugadores(index, index)
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
            crearMensajes("GANASTE")
        }else if (ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO"){
            indexAmbosJugadores(index, index)
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
            crearMensajes("GANASTE")
        }else if (ataqueJugador[index] === "PLANTA" && ataqueEnemigo[index] === "AGUA") {
            indexAmbosJugadores(index, index)
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
            crearMensajes("GANASTE")
        }else {
            indexAmbosJugadores(index, index)
            victoriasEnemigas++
            spanVidasEnemigas.innerHTML = victoriasEnemigas
            crearMensajes("PERDISTE")
        }
        
    }
        vidas()
    
}
function vidas() {
    if(victoriasJugador === victoriasEnemigas){
       crearMensajesfinal("EMPATASTE EL COMBATE")
    }
    else if(victoriasJugador > victoriasEnemigas){
        crearMensajesfinal("GANASTE EL COMBATE")
    }else {
        crearMensajesfinal("PERDISTE EL COMBATE")
    }
}

function crearMensajes(resultadoCombate){
    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemigo = document.createElement("p")

    seccionMensaje.innerHTML = resultadoCombate
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajesfinal(final){
    
    seccionMensaje.innerHTML = final
    seccionReiniciar.style.display = "block"
}

function reiniciarJuego(){
    location.reload()

}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1  ) + min  )

}
function dibujarPersonaje() {
    miPokimon.x = miPokimon.x + miPokimon.velocidadX
    miPokimon.y = miPokimon.y + miPokimon.velocidadY
    mapa.width = 700
    mapa.height = 500
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(fondoMapa, 0, 0,mapa.width,mapa.height)
    
     
    miPokimon.pintarPokimon()
    enviarPosicion(miPokimon.x, miPokimon.y)

    pokimonesEnemigos.forEach(function(pokimon){
        pokimon.pintarPokimon()
        colision(pokimon)
        
        
    })

}



function enviarPosicion(x, y){
fetch(`http://192.168.0.103:8080/pokimon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({
        x,
        y
    })
})
    .then(function(res){
        if(res.ok){
            res.json()
            .then(function({enemigos}){
                console.log(enemigos)
                 pokimonesEnemigos = enemigos.map(function (enemigo){
                    let pokimonEnemigo = null
                    const pokimonNombre = enemigo.pokimon.nombre || ""
                    if(pokimonNombre === "Firemon"){
                        pokimonEnemigo = new Pokimon("Firemon","./assets/charizard.png", 5, "./assets/charizard.png", enemigo.id, 80, 120)
                    }else if(pokimonNombre === "Aquamon"){
                        pokimonEnemigo = new Pokimon("Aquamon","./assets/blastoise.png", 5, "./assets/blastoise.png", enemigo.id, 150, 90)
                    }else if(pokimonNombre === "Plantmon"){
                        pokimonEnemigo =  new Pokimon("Plantmon","./assets/venasaur.png", 5, "./assets/venasaur.png", enemigo.id, 200, 190)
                    }

                    pokimonEnemigo.x = enemigo.x
                    pokimonEnemigo.y = enemigo.y

                    return pokimonEnemigo
 

                })
            })
        }
    })
}
function moverDerecha() {
    miPokimon.velocidadX = 5
}

function moverIzquierda() {
    miPokimon.velocidadX = -5
}

function moverAbajo() {
    miPokimon.velocidadY = 5
}

function moverArriba() {
    miPokimon.velocidadY = -5
}

function detenerMovimiento() {
    miPokimon.velocidadX = 0
    miPokimon.velocidadY = 0
}

function teclado(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}
function iniciarMapa() {

    miPokimon = obetenerMascota(mascotaJugador)
    console.log(miPokimon, mascotaJugador);
    intervalo = setInterval(dibujarPersonaje, 50)
    
    window.addEventListener('keydown', teclado)

    window.addEventListener('keyup', detenerMovimiento)
}

function obetenerMascota(){
    for (let i = 0; i < pokimones.length; i++) {
        if (mascotaJugador === pokimones[i].nombre){
            return pokimones[i]  
        }
    }
  }

function colision (enemigo){
let arribaEnemigo = enemigo.y
let abajoEnemigo = enemigo.y + enemigo.alto
let derechaEnemigo = enemigo.x + enemigo.ancho
let izquierdaEnemigo = enemigo.x

let arribaMascota= miPokimon.y
let abajoMascota = miPokimon.y + miPokimon.alto
let derechaMascota= miPokimon.x + miPokimon.ancho
let izquierdaMascota= miPokimon.x
if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
){
    return
}
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detecto colision")
    enemigoId = enemigo.id
    verMapa.style.display = "none"
    seccionAtaque.style.display =  "flex"
    selecionarMascotaEnemigo(enemigo) 
    
     
}  
window.addEventListener("load", iniciarEljuego)


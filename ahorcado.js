//Selectores//
let pantalla = document.querySelector("canvas");
let botonNuevoJuego = document.getElementById("btn-nuevo-juego").style.display ="none";
let btnSalirDesaparecer = document.getElementById("btn-salir").style.display = "none";
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = "none";
let btnNuevoJuego = document.getElementById("btn-nuevo-juego");
let btnSalir = document.getElementById("btn-salir");
let btnCancelar = document.getElementById("btn-cancelar");



var palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT", "HTML", "CSS", "LOGICA", "PROGRAMA"];
var tablero = document.getElementById("forca").getContext("2d");
var palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8;
let letraElegida = [];


document.getElementById("iniciar-juego").onclick = () =>{
    iniciarJuego();
}

document.getElementById("btn-guardar").onclick = () =>{
    guardarPalabra();
}

btnNuevoJuego.addEventListener("click", function(){
    location.reload();
});

btnSalir.addEventListener("click", function(){
    location.reload();
})

btnCancelar.addEventListener("click", function(){
    location.reload();
})

//PalabraSecreta

function escojerPalabraSecreta(){
    let palabra = palabras[Math.floor(Math.random() * palabras.length)]
    palabraSecreta = palabra;
    return palabra;

}

//Verifica cual es la letra en que el usuario hizo clic
function verificarLetraClicada(key) {
    if (letras.length < 1 || letras.indexOf(key) < 0){
        letras.push(key)
        return false
    }else{
        letras.push(key)
        return true
    };
};

function adicionarLetraCorrecta(i){
    palabraCorrecta += palabraSecreta[i].toUpperCase()
};

function adicionarLetraIncorrecta(letter){
    if (palabraSecreta.indexOf(letter) <= 0){
        errores -= 1
    }
}

function verificarFinJuego(letra){
    if(letraElegida.length < palabraSecreta.length){
        letrasIncorrectas.push(letra);
        
        if(letrasIncorrectas.length > numeroDeErrores){
            perdiste();
        }
        else if(letraElegida.length < palabraSecreta.length){
            adicionarLetraIncorrecta(letra);
            escribirLetraIncorrecta(letra, errores);
        }
    }
}

//Verifica si el usuario a ganado

function verificarVencedor(letra){
    letraElegida.push(letra.toUpperCase());
    if (letraElegida.length == palabraSecreta.length){
        ganaste();
    }
}


//Impide que letras como shift y otras, sean consideradas errores y sean escritas

function verificarLetra(keyCode){
    if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90){
        return true;
    } else {
        return false;
    }
}

//los botones de la pantalla de home desaparezcan y los de agregar palabra aparezcan
function ensenarPantallaDeAgregarPalabra(){
    document.getElementById("div-desaparece").style.display = "none";
    document.getElementById("agregar-palabra").style.display = "block";
}

//guarda la palabra que el usuario quiere agregar
function guardarPalabra() {
    //captura lo que el usuario ha digitado
    let nuevaPalabra = document.getElementById("input-nueva-palavra").value; 

    //incluye la palabra que el usuario digito en el array de las palabras a ser sorteadas
    if (nuevaPalabra !== ""){
        palabras.push(nuevaPalabra.toUpperCase());
        alert("La palabra fue guardada")

    // hace que los componentes de la pantalla de agregar palabra desaparezcan
    document.getElementById("agregar-palabra").style.display = "none";
    iniciarJuego();
    }
    else{
        alert("Ninguna palabra a sido digitada")
    }
}





//iniciar juego//

function iniciarJuego(){

    document.getElementById("div-desaparece").style.display = "none";

    escojerPalabraSecreta();
    dibujarCanvas();
    dibujarLinea();

    //hace que los botones de nuevo juego y salir aparezcan

    document.getElementById("btn-nuevo-juego").style.display = "block";
    document.getElementById("btn-salir").style.display = "block";

    //captura la letra que el usuario escribio

    document.onkeydown = (e) => {
        let letra = e.key.toUpperCase();

        if(letrasIncorrectas.length <= numeroDeErrores){
            if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)){
                if(palabraSecreta.includes(letra)){     
                    adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
                    for(let i = 0; i < palabraSecreta.length; i++){
                        if(palabraSecreta[i] === letra){
                            escribirLetraCorrecta(i);
                            verificarVencedor(letra);
                        }
                    }

                }   else {
                    if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
                       dibujarAhorcado(errores)
                       verificarFinJuego(letra)
                }  
            }
     
       
    }
    else{
        alert('has atingido el límite de letras incorrectas')
    }
};
};
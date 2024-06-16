const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('../assets/sons/luna-rise-part-one.mp3') 
const startPauseBt = document.querySelector('#start-pause')
const playMusic = new Audio('../assets/sons/play.wav')
const pauseMusic = new Audio('../assets/sons/pause.mp3')
const terminouMusic = new Audio('../assets/sons/beep.mp3')

let tempoDecorridoEmSegundos = 5
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto (contexto) {
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `../assets/img/${contexto}.png` )
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!
            `
            break
        case "descanso-longo":
            case "descanso-curto":
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        terminouMusic.play()
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador:' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if(intervaloId){
        pauseMusic.play();
        zerar()
        return
    }
    playMusic.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}

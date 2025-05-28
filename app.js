const html = document.querySelector('html');
const img = document.querySelector('.app__image')
const focobt = document.querySelector('.app__card-button--foco');
const curtobt = document.querySelector('.app__card-button--curto');
const longobt = document.querySelector('.app__card-button--longo');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica');
const comecar_pausarBt = document.querySelector('#start-pause span')
const comecar_pausarBticone = document.querySelector('.app__card-primary-butto-icon')
const temporizadorTela = document.querySelector('#timer')

const musica = new Audio('sons/luna-rise-part-one.mp3');
const musicaFim = new Audio('sons/beep.mp3');
const musicaComecar = new Audio('sons/play.wav');
const musicaPausar = new Audio('sons/pause.mp3');
musica.loop = true;

let tempoemsegundos = 1500;
let intevaloID = null;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focobt.addEventListener('click', () => {
    tempoemsegundos = 1500    
    alterarContexto('foco')
    focobt.classList.add('active')
})

curtobt.addEventListener('click', () => {
    tempoemsegundos = 300
    alterarContexto('descanso-curto')
    curtobt.classList.add('active')
})

longobt.addEventListener('click', () => {
    tempoemsegundos = 900
    alterarContexto('descanso-longo')
    longobt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    img.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoemsegundos <= 0) {
        musicaFim.play()
        alert('tempo finalizado!') 
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento =  new CustomEvent('focoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoemsegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intevaloID) {
        zerar()
        musicaPausar.play()
        return
    }
    musicaComecar.play()
    intevaloID = setInterval(contagemRegressiva, 1000)
    comecar_pausarBt.textContent = "pausar"
    comecar_pausarBticone.setAttribute('src', `imagens/pause.png`)
    
}

function zerar() {
    clearInterval(intevaloID)
    comecar_pausarBt.textContent = "Começar"
    comecar_pausarBticone.setAttribute('src', `imagens/play_arrow.png`)
    intevaloID = null
}

function mostrarTempo() {
    const tempo = new Date(tempoemsegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit' , second: '2-digit'})
    temporizadorTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()

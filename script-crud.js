const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTArefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const UlTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaSelecionada = null;
let LitarefaSelecionada = null;

function AtualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function cancel() {
    textarea.value = "";
    formAdicionarTArefa.classList.add('hidden');
}

btnCancelar.addEventListener('click', cancel)

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        const novaDescricao = prompt("qual o novo nome da tarefa?")
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            AtualizarTarefas();
        }
    }

    const ImagemBotao = document.createElement('img')
    ImagemBotao.setAttribute('src', './imagens/edit.png')
    botao.append(ImagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled', true);
    } else {
        li.onclick = () => {

            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                })

            if (tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = "";
                tarefaSelecionada = null;
                LitarefaSelecionada = null;
                return
            }

            tarefaSelecionada = tarefa;
            LitarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao

            li.classList.add('app__section-task-list-item-active')
        }
    }

    return li;
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTArefa.classList.toggle('hidden')
})

formAdicionarTArefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa)
    const ElementoTarefa = criarElementoTarefa(tarefa)
    UlTarefas.append(ElementoTarefa)
    AtualizarTarefas()
    textarea.value = '';
    formAdicionarTArefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const ElementoTarefa = criarElementoTarefa(tarefa)
    UlTarefas.append(ElementoTarefa)
});

document.addEventListener('focoFinalizado', () => {
    if (tarefaSelecionada && LitarefaSelecionada) {
        LitarefaSelecionada.classList.remove('app__section-task-list-item-active');
        LitarefaSelecionada.classList.add('app__section-task-list-item-complete');
        LitarefaSelecionada.querySelector('button').setAttribute('disabled', true);
        tarefaSelecionada.completa = true
        AtualizarTarefas();
    }
})
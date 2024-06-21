const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
const btnCancelar = document.querySelector('.app__form-footer__button--cancel')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')


function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        // debugger || console.log
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        if (novaDescricao) {            
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
            alert("Tarefa atualizada com sucesso!")
        } else {
            alert("Atualização cancelada ou valor inválido!")
        }
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '../assets/img/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    li.onclick = () => {
        paragrafoDescricaoTarefa.textContent = tarefa.descricao
        document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active')
            })
        li.classList.add('app__section-task-list-item-active')
    }

    return li

    
}   

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})

formAdicionarTarefa.addEventListener('submit', (evento) =>{
    evento.preventDefault()
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas
    textArea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa  => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});

const limparFormulario = () => {
    textArea.value = '';  // Limpe o conteúdo do textarea
    formAdicionarTarefa.classList.add('hidden');  // Adicione a classe 'hidden' ao formulário para escondê-lo
}
btnCancelar.addEventListener('click', limparFormulario);
let username = prompt('Qual é o seu lindo nome?');

function verificaNome(){
while(username === "" || username === undefined || username === null || typeof username === 'number'){
    username = prompt('Nome inválido, por favor insira seu nome correto?');
};
    const envioNome = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/participants",
        {
            name: username
        }
        );

envioNome.then(quandoSucessoEnvioNome);
envioNome.catch(quandoErroEnvioNome);
};

verificaNome();

function quandoSucessoEnvioNome(resposta){
    
};

function quandoErroEnvioNome(erro){
    const status = erro.response.status;
    if(status === 400){
        username = prompt('Já existe alguém com esse nome na sala, favor insira outro nome:');
        verificaNome();
    }
    envioNome.then(quandoSucessoEnvioNome);

};

function manterConcexao(){
    const manter = axios.post('https://mock-api.driven.com.br/api/v6/uol/status');

    manter.then(quandoSucessoManterConcexao);
    manter.catch(quandoErroManterConexao);
    pergarDados();
};

function quandoSucessoManterConcexao(resposta){
    console.log(resposta.data);
};

function quandoErroManterConexao(erroConexao){
    console.log(erroConexao.response);
}

setInterval(manterConcexao, 5000);


let mensagens = [];

function pergarDados(resposta) { // função que irá enviar a cartinha pedindo as receitas
    console.log(resposta)
    // etapa 2: pegar as receitas no servidor (enviar a cartinha)
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promessa.then(dadosChegaram) // agenda a execução de uma função para quando a resposta chegar

}
pergarDados()

// etapa 3: receber a resposta (cartinha) do servidor    
function dadosChegaram(resposta) { // função que será executada quando os dados chegarem do servidor

    // resposta completa
    //console.log("Resposta completa do get", resposta)

    // pegar apenas a lista com as minhas receitas
    //console.log("resposta.data do get", resposta.data)

    // etapa 4: processar a resposta e mostrar na tela (renderizar)
    mensagens = resposta.data;
    
    renderizarMensagens();
}

renderizarMensagens();

function renderizarMensagens(){   

    const ul = document.querySelector('.mensagens');
    
    ul.innerHTML = "";

    for( let i=0; i < mensagens.length; i++){

        const from = mensagens[i].from;
        const to = mensagens[i].to;        
        const text = mensagens[i].text;
        const type = mensagens[i].type;        
        const time = mensagens[i].time;

        if( type === 'status'){
            ul.innerHTML += `
            <li class="status">
            <span>${time}</span>
            <p>
                <strong>${from}</strong>
                ${text}
            </p>
        </li>
            ` 
        } else if( type === 'message'){
            ul.innerHTML += `
            <li>
            <span>${time}</span>
            <p>
                <strong>${from}</strong>
                 para ${to}:
                  ${text}
            </p>
        </li>
            `
        } else if( type === 'private_message'){
            ul.innerHTML += `
            <li class="reservado">
            <span>${time}</span>
            <p>
                <strong>${from}</strong>
                 reservadamente para ${to}:
                  ${text}
            </p>
        </li>
            `
        }
        const conteudo = document.querySelector('.conteudo');
        conteudo.scrollIntoView(false);
    }
};


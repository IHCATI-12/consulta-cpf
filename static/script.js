function irparacadastrar() {
    document.getElementById('container-consulta').classList.add('oculta')
    document.getElementById('container-cadastro').classList.remove('oculta')
}
function voltar() {
    document.getElementById('container-consulta').classList.remove('oculta')
    document.getElementById('container-cadastro').classList.add('oculta')
}

function deletar() {
    const cpf = document.getElementById('cpf').value.trim();

    fetch(`/deletar?cpf=${cpf}`, {
        method: 'GET',
    })
    .then(response => {
        if (response.ok) {
            alert('CPF deletado com sucesso!');
            document.getElementById('retorno').innerText = 'CPF deletado com sucesso!';
        } else {
            alert('CPF não encontrado.');
            document.getElementById('retorno').innerText = 'CPF não encontrado.';
        }
    })
    .catch(error => {
        console.error('Erro ao deletar CPF:', error);
        alert('Erro ao tentar deletar o CPF.');
    });
}


function consultar() {
    console.log('consulta ok')
    const cpf = document.querySelector('.form-control').value;

    fetch(`/consulta?cpf=${cpf}`)
        .then(response => response.json())
        .then(data => {
            exibirRespostaCustomizada(data);
        })
        .catch(error => {
            document.getElementById('retorno').innerText = 'Erro ao consultar CPF.';
            console.error(error);
        });
}

function exibirRespostaCustomizada(data) {
    const retornoDiv = document.getElementById('retorno');

    if (data && data.nome && data.dtn && data.email) {
        const partesData = data.dtn.split('-');
        let dataFormatada = data.dtn;
        if (partesData.length === 3) {
            dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
        }
        retornoDiv.innerHTML = `
        <p class='resp'>Nome: ${data.nome}</p>
        <p class='resp'>Data de Nascimento: ${dataFormatada}</p>
        <p class='resp'>Email: ${data.email}</p>
        `;
    } else {
        retornoDiv.innerHTML = '<p>Dados não encontrados ou inválidos.</p>';
    }
}

function cadastrar(event) { 
    event.preventDefault();

    console.log('cadastrar ok 1')

    const cpf = document.getElementById('cpf').value.trim();
    const nome = document.getElementById('nome').value.trim();
    const dtn = document.getElementById('dtn').value.trim();
    const email = document.getElementById('email').value.trim();


    const formData = new URLSearchParams(); // Cria dados no formato x-www-form-urlencoded
    formData.append("cpf", cpf);
    formData.append("nome", nome);
    formData.append("dtn", dtn);
    formData.append("email", email);

    fetch("/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    })

    .then(response => {
        if (response.ok) {
            alert('CPF deletado com sucesso!');
            document.getElementById('retorno-cadastro').innerText = 'CPF cadastrado com sucesso!';
        } else {
            alert('CPF não encontrado.');
            document.getElementById('retorno-cadastro').innerText = 'CPF não encontrado.';
        }
    })
}

function exibir() {
    const exibir = document.getElementById('mensagem');
    exibir.innerHTML = "CPF cadastrado!";
}


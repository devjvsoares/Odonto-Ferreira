function ValTelf() {
    var tel = event.target.value;
    tel = tel.replace(/\D/g, "")
    tel = tel.replace(/^(\d)/, "($1")
    tel = tel.replace(/(.{3})(\d)/, "$1)$2")
    if (tel.length == 9) {
        tel = tel.replace(/(.{1})$/, "-$1")
    } else if (tel.length == 10) {
        tel = tel.replace(/(.{2})$/, "-$1")
    } else if (tel.length == 11) {
        tel = tel.replace(/(.{3})$/, "-$1")
    } else if (tel.length == 12) {
        tel = tel.replace(/(.{4})$/, "-$1")
    } else if (tel.length > 12) {
        tel = tel.replace(/(.{4})$/, "-$1")
    }
    event.target.value = tel;
}

function mCpf() {
    var cpf = event.target.value;
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    event.target.value = cpf;
}

function validarCPF(input) {
    var cpf = event.target.value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        input.classList.add('error');
    }

    // Verifica se todos os dígitos são iguais (caso contrário, não é um CPF válido)
    if (/^(\d)\1{10}$/.test(cpf)) {
        input.classList.add('error');
        return false;
    }

    // Calcula o primeiro dígito verificador
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = soma % 11;
    var digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

    // Verifica se o primeiro dígito verificador está correto
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
        input.classList.add('error');
        return false;
    }

    // Calcula o segundo dígito verificador
    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    var digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

    // Verifica se o segundo dígito verificador está correto
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
        input.classList.add('error');
        return false;
    }

    input.classList.remove('error');

}


function ValNome(input) {
    var nom = event.target.value;
    nomeSobrenome = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
    if (!(nomeSobrenome.test(nom))) {
        input.classList.add('error');
    }
    else
        input.classList.remove('error');
}

function validarData(input) {
    var valor = event.target.value;

    function validarData(data) {
        // Verifica se a data está no formato 'DD/MM/AAAA'
        var regexData = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regexData.test(data)) {
            return false; // Formato inválido
        }

        // Extrai os componentes da data
        var partesData = data.split('/');
        var dia = parseInt(partesData[0], 10);
        var mes = parseInt(partesData[1], 10) - 1; // Os meses em JavaScript são indexados de 0 a 11
        var ano = parseInt(partesData[2], 10);

        // Cria um objeto Date e verifica se é uma data válida
        var dataObj = new Date(ano, mes, dia);
        if (isNaN(dataObj.getTime())) {
            return false; // Data inválida
        }

        // Verifica se os componentes da data correspondem aos valores fornecidos
        return dataObj.getDate() === dia && dataObj.getMonth() === mes && dataObj.getFullYear() === ano;
    }

    if (!validarData(valor)) {
        input.classList.add('error');
    }
    else {
        input.classList.remove('error');
    }
}


function mdataNascimento() {
    var valor = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    var dataFormatada = '';

    if (valor.length > 0) {
        dataFormatada += valor.substring(0, 2); // Adiciona os dois primeiros dígitos (dia)
    }
    if (valor.length > 2) {
        dataFormatada += '/' + valor.substring(2, 4); // Adiciona os dois dígitos seguintes (mês)
    }
    if (valor.length > 4) {
        dataFormatada += '/' + valor.substring(4, 8); // Adiciona os quatro últimos dígitos (ano)
    }

    event.target.value = dataFormatada;
}

function ValEmail(input) {
    var email = event.target.value;
    var emailValido = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    if (!emailValido.test(email)) {
        input.classList.add('error');
    }
    else {
        input.classList.remove('error');
    }

}

function mascara(m, t, e) {
    var cursor = t.selectionStart;
    var texto = t.value;
    texto = texto.replace(/\D/g, '');
    var l = texto.length;
    var lm = m.length;
    if (window.event) {
        id = e.keyCode;
    } else if (e.which) {
        id = e.which;
    }
    cursorfixo = false;
    if (cursor < l) cursorfixo = true;
    var livre = false;
    if (id == 16 || id == 19 || (id >= 33 && id <= 40)) livre = true;
    ii = 0;
    mm = 0;
    if (!livre) {
        if (id != 8) {
            t.value = "";
            j = 0;
            for (i = 0; i < lm; i++) {
                if (m.substr(i, 1) == "#") {
                    t.value += texto.substr(j, 1);
                    j++;
                } else if (m.substr(i, 1) != "#") {
                    t.value += m.substr(i, 1);
                }
                if (id != 8 && !cursorfixo) cursor++;
                if ((j) == l + 1) break;

            }
        }
    }
    if (cursorfixo && !livre) cursor--;
    t.setSelectionRange(cursor, cursor);
}


function formatarCEP() {
    const input = event.target;
    // Remove todos os caracteres que não são dígitos
    let cep = input.value.replace(/\D/g, '');

    // Adiciona a máscara ao CEP
    cep = cep.replace(/^(\d{5})(\d{2})/, '$1-$2');

    // Atualiza o valor do campo de entrada
    input.value = cep;
}


//TABELA DINÂMICA//
var dados = []

function adicionarItem() {
    event.preventDefault()
    let inputNome = document.getElementById("nomecompleto").value;
    let inputData = document.getElementById("dataform").value;
    let inputHorario = document.getElementById("horarios").value;
    if (inputNome.value != "") {
        let novoItem = {
            id: new Date().getTime(),
            nome: inputNome,
            data: inputData,
            horario: inputHorario
        }
        dados.push(novoItem);
        // recarregar a tabela
        montarTabela();
        inputNome.value="";
        inputNome.focus();
    }
}

function montarTabela() {
    // montar a tabela a partir do array "dados"
    let tbody = document.getElementById("tb-body");
    let html = '';
    for (let item of dados) {
        html += `<tr>
                    <td><center><input type='checkbox' data-id="${item.id}"></center></td>
                    <td width='200px'>${item.nome}</td>
                    <td width='200px'>${item.data}</td>
                    <td width='200px'>${item.horario}</td>
                    <td>
                        <center>
                        <a onclick="excluirItem(${item.id})"><img src="lixeira.png" height='10px'></a>
                        </center>
                    </td>
                </tr>`;
    }
    tbody.innerHTML = html;
}

function excluirItem(idExcluir) {
    // apagar do array dados
    let dadosTemp = [];
    for (let i=0; i<dados.length; i++) {
        if (dados[i].id != idExcluir) {
            dadosTemp.push(dados[i])
        }
    }
    dados = dadosTemp;
    montarTabela();
}

function excluirSelecionados() {
    // pegar todos os checkbox de itens
    let listaCheckbox = document.querySelectorAll('[data-id]');
    if (listaCheckbox.length > 0) {
        for (let cbItem of listaCheckbox) {
            if (cbItem.checked == true) {
                excluirItem(cbItem.dataset.id);
            }
        }
    }
}

function clicarTodos() {
    // pegar todos os checkbox de itens
    let listaCheckbox = document.querySelectorAll('[data-id]');
    let cbTopo = document.getElementById('ckTodos');
    for (let cbItem of listaCheckbox) {
        cbItem.checked = cbTopo.checked;
    }
}

function verificarCampos() {
    // Verificar se todos os campos obrigatórios estão preenchidos
    if (document.getElementById("nomecompleto").value !== ""  && 
        document.getElementById("nascimento").value !== "" && 
        document.getElementById("appointment_CPF").value !== "" && 
        document.getElementById("appointment_endereco").value !== "" && 
        document.getElementById("appointment_CEP").value !== ""  && 
        document.getElementById("bairro").value !== "" && 
        document.getElementById("cidade").value !== "" ) {
        adicionarItem();
    } else {

        alert("Por favor, preencha todos os campos obrigatórios.");
    }
}

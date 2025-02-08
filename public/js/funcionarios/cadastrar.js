document.addEventListener("DOMContentLoaded", function () {

    let btnConfirmar = document.querySelectorAll(".btnConfirmar");

    for (let i = 0; i < btnConfirmar.length; i++) {
        if (btnConfirmar[i].dataset.alteracao == "true")
            btnConfirmar[i].addEventListener("click", atualizar);
        else
            btnConfirmar[i].addEventListener("click", cadastrar);
    }

    function limparValidacao() {
        document.getElementById("msgErro").innerHTML = "";
        document.getElementById("InputNome").style["border-color"] = "#ced4da";
        document.getElementById("InputData_adm").style["border-color"] = "#ced4da";
        document.getElementById("InputEmail").style["border-color"] = "#ced4da";
        document.getElementById("InputNascimento").style["border-color"] = "#ced4da";
        document.getElementById("InputEndereco").style["border-color"] = "#ced4da";
        document.getElementById("InputBairro").style["border-color"] = "#ced4da";
        document.getElementById("InputCep").style["border-color"] = "#ced4da";
        document.getElementById("InputCpf").style["border-color"] = "#ced4da";
        document.getElementById("InputCargo").style["border-color"] = "#ced4da";

    }

    function validarCampos() {
        limparValidacao();
        let listaCampos = [];

        const campos = {
            inputId: document.getElementById("inputId"),
            inputnome: document.getElementById("InputNome"),
            inputdata_adm: document.getElementById("InputData_adm"),
            inputemail: document.getElementById("InputEmail"),
            inputnascimento: document.getElementById("InputNascimento"),
            inputendereco: document.getElementById("InputEndereco"),
            inputbairro: document.getElementById("InputBairro"),
            inputcep: document.getElementById("InputCep"),
            inputcpf: document.getElementById("InputCpf"),
            inputcargo: document.getElementById("InputCargo")
        };

        for (let campo in campos) {
            const input = campos[campo];
            if (campo === "inputNomeCompleto" && (input.value === "" || input.value.length < 10)) {
                listaCampos.push(input);
            } else if (campo === "inputSexo" && input.value === "") {
                listaCampos.push(input);
            } else if (campo === "inputEmail" && input.value === "") {
                listaCampos.push(input);
            } else if (campo === "inputNascimento" && (input.value === "" || new Date(input.value) >= new Date())) {
                listaCampos.push(input);
            } else if (campo === "inputCpf" && (input.value === "" )) {
                listaCampos.push(input);
            } else if (campo === "inputCep" && (input.value === "")) {
                listaCampos.push(input);
            } else if (campo === "inputSenha" && (input.value === "" || input.value.length < 6)) {
                listaCampos.push(input);
            } else if (campo === "inputConfirmaSenha" && input.value !== campos.senha.value) {
                listaCampos.push(input);
                alert("Confirmação da senha incorreta!");
            }
        }

        if (listaCampos.length > 0) {
            listaCampos.forEach(input => input.style["border-color"] = "red");
            document.getElementById("msgErro").innerHTML = "<b>O formulário não foi preenchido corretamente, por favor, veja os campos destacados!</b>";
            alert("O formulário não foi preenchido corretamente, por favor, veja os campos destacados!");
            return false;
        }

        return true;
    }

    function validarCEP(cep) {
        return cep.length === 10;
    }

    function buscarCidadePorCEP(cep) {
        let cepFormatado = cep.replace(/\D/g, "");
        if (cepFormatado.length === 8) {
            fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (data.localidade) {
                        document.getElementById("inputCidade").value = data.localidade;
                        document.getElementById("inputEstado").value = data.uf;
                    } else {
                        alert("CEP não encontrado!");
                    }
                })
                .catch(error => alert("Erro ao buscar o CEP: " + error));
        } else {
            alert("CEP inválido.");
        }
    }   

    function atualizar() {
        let inputId = document.getElementById("inputId");
        let inputnome = document.getElementById("InputNome");
        let inputdata_adm = document.getElementById("InputData_adm");
        let inputemail = document.getElementById("InputEmail");
        let inputnascimento = document.getElementById("InputNascimento");
        let inputendereco = document.getElementById("InputEndereco");
        let inputbairro = document.getElementById("InputBairro");
        let inputcep = document.getElementById("InputCep");
        let inputcpf = document.getElementById("InputCpf");
        let inputcargo= document.getElementById("InputCargo");

        if (validarCampos()) {
            let obj = {
                id: inputId.value,
                nome: inputnome.value,
                data_adm: inputdata_adm.value,
                email: inputemail.value,
                nascimento: inputnascimento.value,
                endereco: inputendereco.value,
                bairro: inputbairro.value,
                cep: inputcep.value,
                cpf: inputcpf.value,
                cargo: inputcargo.value
            }

            let stringObj = JSON.stringify(obj);

            fetch(`/funcionario/atualizar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: stringObj
            })
                .then(function (resposta) {
                    return resposta.json();
                })
                .then(function (resposta) {
                    if (resposta.ok) {
                        alert(resposta.msg);
                        window.location.href = '/gerenciar/funcionarios';
                    }
                    else {
                        alert(resposta.msg);
                    }
                })
                .catch(function (e) {
                    console.error("Ocorreu um erro no fetch!: " + e);
                })
        }
    }

    function cadastrar() {
        let inputnome = document.getElementById("InputNome");
        let inputdata_adm = document.getElementById("InputData_adm");
        let inputemail = document.getElementById("InputEmail");
        let inputnascimento = document.getElementById("InputNascimento");
        let inputendereco = document.getElementById("InputEndereco");
        let inputbairro = document.getElementById("InputBairro");
        let inputcep = document.getElementById("InputCep");
        let inputcpf = document.getElementById("InputCpf");
        let inputcargo= document.getElementById("InputCargo");        

        if (validarCampos()) {
            let obj = {
                nome: inputnome.value,
                data_adm: inputdata_adm.value,
                email: inputemail.value,
                nascimento: inputnascimento.value,
                endereco: inputendereco.value,
                bairro: inputbairro.value,
                cep: inputcep.value,
                cpf: inputcpf.value,
                cargo: inputcargo.value,
            }

            let stringObj = JSON.stringify(obj);

            fetch("/cadastrar/funcionarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: stringObj
            })
                .then(function (resposta) {
                    return resposta.json();

                })
                .then(function (resposta) {
                    if (resposta.ok) {
                        alert(resposta.msg);
                        window.location.href = "/gerenciar/funcionarios";
                    }
                    else {
                        alert(resposta.msg);
                    }
                })
                .catch(function (e) {
                    console.error("Ocorreu um erro no fetch!: " + e);
                })
        }
    }
})
document.addEventListener("DOMContentLoaded", function() {

    let btnConfirmar = document.querySelectorAll(".btnConfirma");

    
    for(let i = 0; i< btnConfirmar.length; i++) {
        if(btnConfirmar[i].dataset.alteracao == "true")
            btnConfirmar[i].addEventListener("click", atualizar);
        else
            btnConfirmar[i].addEventListener("click", cadastrar);
    }

    function limparValidacao() {
        document.getElementById("msgErro").innerHTML = "";
        document.getElementById("inputNomeCompleto").style["border-color"] = "#ced4da";
        document.getElementById("inputSexo").style["border-color"] = "#ced4da";
        document.getElementById("inputEmail").style["border-color"] = "#ced4da";
        document.getElementById("inputNascimento").style["border-color"] = "#ced4da";
        document.getElementById("inputCPF").style["border-color"] = "#ced4da";
        document.getElementById("inputEndereco").style["border-color"] = "#ced4da";
        document.getElementById("inputNumeroEnd").style["border-color"] = "#ced4da";
        document.getElementById("inputBairro").style["border-color"] = "#ced4da";
        document.getElementById("inputCEP").style["border-color"] = "#ced4da";
        document.getElementById("inputEstado").style["border-color"] = "#ced4da";
        document.getElementById("inputCidade").style["border-color"] = "#ced4da";
        document.getElementById("inputSenha").style["border-color"] = "#ced4da";
        document.getElementById("inputConfirmaSenha").style["border-color"] = "#ced4da";
    }

    function validarCampos() {
        limparValidacao();
        let listaCampos = [];
        let inputNomeCompleto = document.getElementById("inputNomeCompleto");
        let inputSexo = document.getElementById("inputSexo");
        let inputEmail = document.getElementById("inputEmail");
        let inputNascimento = document.getElementById("inputNascimento");
        let inputCPF = document.getElementById("inputCPF");
        let inputEndereco = document.getElementById("inputEndereco");
        let inputNumEnd = document.getElementById("inputNumeroEnd");
        let inputBairro = document.getElementById("inputBairro");
        let inputCEP = document.getElementById("inputCEP");
        let inputEstado = document.getElementById("inputEstado");
        let inputCidade = document.getElementById("inputCidade");
        let inputSenha = document.getElementById("inputSenha");
        let inputConfirmeSenha = document.getElementById("inputConfirmaSenha");

        if(inputNomeCompleto.value == "" || inputNomeCompleto.value.length < 10)
            listaCampos.push(inputNomeCompleto);
        if(inputSexo.value == "")
            listaCampos.push(inputSexo);
        if(inputEmail.value == "")
            listaCampos.push(inputEmail);
        if(inputNascimento.value == "")
            listaCampos.push(inputNascimento);
        if(inputCPF.value == 0)
            listaCampos.push(inputCPF);
        if(inputEndereco.value == "")
            listaCampos.push(inputEndereco);
        if(inputNumEnd.value == "")
            listaCampos.push(inputNumEnd);
        if(inputBairro.value == "")
            listaCampos.push(inputBairro);
        if(inputCEP.value == 0)
            listaCampos.push(inputCEP);
        if(inputEstado.value == "")
            listaCampos.push(inputEstado);
        if(inputCidade.value == "")
            listaCampos.push(inputCidade);
        if(inputSenha.value == "")
            listaCampos.push(inputSenha);
        if(inputConfirmeSenha.value !== inputSenha.value){
            listaCampos.push(inputConfirmeSenha);
            alert("Confirmação da senha incorreta!");
        }
            
        if(listaCampos.length == 0) {
            return true;
        }
        else {
            for(let i=0; i<listaCampos.length; i++) {
                listaCampos[i].style["border-color"] = "red";
            }

            alert("O formulário não foi preenchido corretamente, por favor, veja os campos destacados!");
            document.getElementById("msgErro").innerHTML = "<b>O formulário não foi preenchido corretamente, por favor, veja os campos destacados!</b>"

            return false;
        }
    }

    function atualizar() {
        let inputId = document.getElementById("inputId");
        let inputNomeCompleto = document.getElementById("inputNomeCompleto");
        let inputSexo = document.getElementById("inputSexo");
        let inputEmail = document.getElementById("inputEmail");
        let inputNascimento = document.getElementById("inputNascimento");
        let inputCPF = document.getElementById("inputCPF");
        let inputEndereco = document.getElementById("inputEndereco");
        let inputNumEnd = document.getElementById("inputNumeroEnd");
        let inputBairro = document.getElementById("inputBairro");
        let inputCEP = document.getElementById("inputCEP");
        let inputEstado = document.getElementById("inputEstado");
        let inputCidade = document.getElementById("inputCidade");
        let inputSenha = document.getElementById("inputSenha");
        let inputConfirmeSenha = document.getElementById("inputConfirmaSenha");
        

        if(validarCampos()) {
            let obj = {
                id: inputId.value,
                nome: inputNomeCompleto.value,
                sexo: inputSexo.value,
                email: inputEmail.value,
                nascimento: inputNascimento.value,
                cpf: inputCPF.value,
                endereco: inputEndereco.value,
                num_end: inputNumEnd.value,
                bairro: inputBairro.value,
                cep: inputCEP.value,
                estado: inputEstado.value,
                cidade: inputCidade.value,
                senha: inputSenha.value,
                confirmaSenha: inputConfirmeSenha.value
               
            }
    
            let stringObj = JSON.stringify(obj);
    
            fetch("/usuario/atualizar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: stringObj
            })
            .then(function(resposta){
                return resposta.json();
            })
            .then(function(resposta) {
                if(resposta.ok) {
                    alert(resposta.msg);
                    window.location.href = '/gerenciar/pacientes';
                }
                else{
                    alert(resposta.msg);
                }
            })
            .catch(function(e) {
                console.error("Ocorreu um erro no fetch!: " + e);
            })
        }
    }

    function cadastrar() {
        let inputNomeCompleto = document.getElementById("inputNomeCompleto");
        let inputSexo = document.getElementById("inputSexo");
        let inputEmail = document.getElementById("inputEmail");
        let inputNascimento = document.getElementById("inputNascimento");
        let inputCPF = document.getElementById("inputCPF");
        let inputEndereco = document.getElementById("inputEndereco");
        let inputNumEnd = document.getElementById("inputNumeroEnd");
        let inputBairro = document.getElementById("inputBairro");
        let inputCEP = document.getElementById("inputCEP");
        let inputEstado = document.getElementById("inputEstado");
        let inputCidade = document.getElementById("inputCidade");
        let inputSenha = document.getElementById("inputSenha");

        if(validarCampos()) {
            let obj = {
                nome: inputNomeCompleto.value,
                sexo: inputSexo.value,
                email: inputEmail.value,
                nascimento: inputNascimento.value,
                cpf: inputCPF.value,
                endereco: inputEndereco.value,
                num_end: inputNumEnd.value,
                bairro: inputBairro.value,
                cep: inputCEP.value,
                estado: inputEstado.value,
                cidade: inputCidade.value,
                senha: inputSenha.value
            }
    
            let stringObj = JSON.stringify(obj);
    
            fetch("/cadastrar/paciente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: stringObj
            })
            .then(function(resposta){
                return resposta.json();
                
            })
            .then(function(resposta) {
                if(resposta.ok) {
                    alert(resposta.msg);
                    window.location.href = '/gerenciar/pacientes';
                }
                else{
                    alert(resposta.msg);
                }
            })
            .catch(function(e) {
                console.error("Ocorreu um erro no fetch!: " + e);
            })
        }
    }
})
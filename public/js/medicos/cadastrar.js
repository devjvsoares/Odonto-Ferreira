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
        document.getElementById("Inputcro").style["border-color"] = "#ced4da";
        document.getElementById("Inputnome").style["border-color"] = "#ced4da";
        document.getElementById("Inputsexo").style["border-color"] = "#ced4da";
        document.getElementById("Inputemail").style["border-color"] = "#ced4da";
        document.getElementById("Inputespecialidade").style["border-color"] = "#ced4da";
        document.getElementById("Inputnascimento").style["border-color"] = "#ced4da";
        document.getElementById("Inputcpf").style["border-color"] = "#ced4da";
        document.getElementById("Inputendereco").style["border-color"] = "#ced4da";
        document.getElementById("Inputcep").style["border-color"] = "#ced4da";
        document.getElementById("Inputsenha").style["border-color"] = "#ced4da";
        document.getElementById("InputConfirmaSenha").style["border-color"] = "#ced4da";
        

    }

    function validarCampos() {
        limparValidacao();
        let listaCampos = [];
        let inputCro = document.getElementById("Inputcro");
        let inputNome = document.getElementById("Inputnome");
        let inputSexo = document.getElementById("Inputsexo");
        let inputEmail = document.getElementById("Inputemail");
        let inputespecialidade = document.getElementById("Inputespecialidade");
        let inputnascimento = document.getElementById("Inputnascimento");
        let inputcpf = document.getElementById("Inputcpf");
        let inputcep = document.getElementById("Inputcep");
        let inputendereco = document.getElementById("Inputendereco");
        let inputnumero = document.getElementById("Inputnumero");
        let inputbairro = document.getElementById("Inputbairro");
        let inputestado = document.getElementById("Inputestado");
        let inputcidade = document.getElementById("Inputcidade");
        let inputativo = document.getElementById("Inputativo");
        let inputsenha = document.getElementById("Inputsenha");
        let inputconfirmasenha = document.getElementById("InputConfirmaSenha")


        if(inputCro.value == "")
            listaCampos.push(inputCro);
        if(inputNome.value == "" || inputNome.value.length < 10)
            listaCampos.push(inputNome);
        if(inputSexo.value == "")
            listaCampos.push(inputSexo);
        if(inputEmail.value == "")
            listaCampos.push(inputEmail);
        if(inputespecialidade.value == "")
            listaCampos.push(inputespecialidade);
        if(inputnascimento.value == "")
            listaCampos.push(inputnascimento);
        if(inputcpf.value == 0)
            listaCampos.push(inputcpf);
        if(inputcep.value == 0)
            listaCampos.push(inputcep);
        if(inputendereco.value == "")
            listaCampos.push(inputendereco);
        if(inputnumero.value == "")
            listaCampos.push(inputnumero);
        if(inputbairro.value == "")
            listaCampos.push(inputbairro);
        if(inputestado.value == "")
            listaCampos.push(inputestado);
        if(inputcidade.value == "")
            listaCampos.push(inputcidade);
        if(inputsenha.value == "")
            listaCampos.push(inputsenha);
        if(inputconfirmasenha.value !== inputsenha.value){
            listaCampos.push(inputconfirmasenha);
            alert("Confirmação da senha incorreta!");
        }
            
        if(listaCampos.length == 0) {
            return true;
        }

        if (listaCampos.length > 0) {
            listaCampos.forEach(input => input.style["border-color"] = "red");
            document.getElementById("msgErro").innerHTML = "<b>O formulário não foi preenchido corretamente, por favor, veja os campos destacados!</b>";
            alert("O formulário não foi preenchido corretamente, por favor, veja os campos destacados!");
            return false;
        }
        else {
            return true;
        }
    }

    function atualizar() {
        let inputCro = document.getElementById("Inputcro");
        let inputNome = document.getElementById("Inputnome");
        let inputSexo = document.getElementById("Inputsexo");
        let inputEmail = document.getElementById("Inputemail");
        let inputespecialidade = document.getElementById("Inputespecialidade");
        let inputnascimento = document.getElementById("Inputnascimento");
        let inputcpf = document.getElementById("Inputcpf");
        let inputcep = document.getElementById("Inputcep");
        let inputendereco = document.getElementById("Inputendereco");
        let inputnumero = document.getElementById("Inputnumero");
        let inputbairro = document.getElementById("Inputbairro");
        let inputestado = document.getElementById("Inputestado");
        let inputcidade = document.getElementById("Inputcidade");
        let inputativo = document.getElementById("Inputativo");
        let inputsenha = document.getElementById("Inputsenha");

        if (validarCampos()) {
            let obj = {
                cro: inputCro.value,
                nome: inputNome.value,
                sexo: inputSexo.value,
                email: inputEmail.value,
                especialidade: inputespecialidade.value,
                nascimento: inputnascimento.value,
                cpf: inputcpf.value,
                cep: inputcep.value,
                endereco: inputendereco.value,
                numero: inputnumero.value,
                bairro: inputbairro.value,
                estado: inputestado.value,
                cidade: inputcidade.value,
                ativo: inputativo.value,
                senha: inputsenha.value
            }

            let stringObj = JSON.stringify(obj);

            fetch("/medico/atualizar", {
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
                        window.location.href = '/gerenciar/medicos';
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
        let inputcro = document.getElementById("Inputcro");
        let inputnome = document.getElementById("Inputnome");
        let inputsexo = document.getElementById("Inputsexo");
        let inputemail = document.getElementById("Inputemail");
        let inputespecialidade = document.getElementById("Inputespecialidade");
        let inputnascimento = document.getElementById("Inputnascimento");
        let inputcpf = document.getElementById("Inputcpf");
        let inputcep = document.getElementById("Inputcep");
        let inputendereco = document.getElementById("Inputendereco");
        let inputnumero = document.getElementById("Inputnumero");
        let inputbairro = document.getElementById("Inputbairro");
        let inputestado = document.getElementById("Inputestado");
        let inputcidade = document.getElementById("Inputcidade");
        let inputativo = document.getElementById("Inputativo");
        let inputsenha = document.getElementById("Inputsenha");

        if (validarCampos()) {
            let obj = {
                cro: inputcro.value,
                nome:inputnome.value,
                sexo:inputsexo.value,
                email:inputemail.value,
                especialidade: inputespecialidade.value,
                nascimento: inputnascimento.value,
                cpf: inputcpf.value,
                cep: inputcep.value,
                endereco: inputendereco.value,
                numero: inputnumero.value,
                bairro: inputbairro.value,
                estado: inputestado.value,
                cidade: inputcidade.value,
                ativo: inputativo.value,
                senha: inputsenha.value
            }

            let stringObj = JSON.stringify(obj);

            fetch("/cadastrar/medico", {
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
                        window.location.href="/gerenciar/medicos";
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
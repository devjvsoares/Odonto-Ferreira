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
        document.getElementById("InputDataFalta").style["border-color"] = "#ced4da";
        document.getElementById("InputJustificativa").style["border-color"] = "#ced4da";
    }

    function validarCampos() {
        limparValidacao();
        let listaCampos = [];
        let inputnome = document.getElementById("InputNome");
        let inputdatafalta = document.getElementById("InputDataFalta");
        let inputjustificativa = document.getElementById("InputJustificativa");
    
        if (inputnome.value == "")
            listaCampos.push(inputnome);
        if (inputdatafalta.value == "")
            listaCampos.push(inputdatafalta);
        if (inputjustificativa.value == "")
            listaCampos.push(inputjustificativa);
        if (listaCampos.length == 0) {
            return true;
        }
        else {
            for (let i = 0; i < listaCampos.length; i++) {
                listaCampos[i].style["border-color"] = "red";
            }

            alert("O formulário não foi preenchido corretamente, por favor, veja os campos destacados!");
            document.getElementById("msgErro").innerHTML = "<b>O formulário não foi preenchido corretamente, por favor, veja os campos destacados!</b>"

            return false;
        }
    }


    function cadastrar() {
        let inputnome = document.getElementById("InputNome");
        let inputdatafalta = document.getElementById("InputDataFalta");
        let inputjustificativa = document.getElementById("InputJustificativa");

        if (validarCampos()) {
            let obj = {
                nome: inputnome.value,
                dataFalta: inputdatafalta.value,
                Justificativa: inputjustificativa.value
            }
        
            let stringObj = JSON.stringify(obj);

            fetch("/registro/faltas", {
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
                    window.location.href = '/registro';
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


    function atualizar() {
        let inputid = document.getElementById("InputId");
        let inputnome = document.getElementById("InputNome");
        let inputdatafalta = document.getElementById("InputDataFalta");
        let inputjustificativa = document.getElementById("InputJustificativa");

        if (validarCampos()) {
            let obj = {
                id: inputid.value,
                nome: inputnome.value,
                dataFalta: inputdatafalta.value,
                Justificativa: inputjustificativa.value
            }
        
            let stringObj = JSON.stringify(obj);

            fetch("/registro/faltas/atualizar", {
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
                    window.location.href = '/registro';
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
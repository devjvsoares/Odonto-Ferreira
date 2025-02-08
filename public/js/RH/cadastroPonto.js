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
        document.getElementById("InputData").style["border-color"] = "#ced4da";
        document.getElementById("InputHoraEntrada").style["border-color"] = "#ced4da";
        document.getElementById("InputHoraSaidaAlmoco").style["border-color"] = "#ced4da";
        document.getElementById("InputHoraRetornoAlmoco").style["border-color"] = "#ced4da";
        document.getElementById("InputHoraSaida").style["border-color"] = "#ced4da";
    }

    function validarCampos() {
        limparValidacao();
        let listaCampos = [];
        let inputnome = document.getElementById("InputNome");
        let inputdata = document.getElementById("InputData");
        let inputhoraentrada = document.getElementById("InputHoraEntrada");
        let inputhorasaidaalmoco = document.getElementById("InputHoraSaidaAlmoco");
        let inputhoraretornoalmoco = document.getElementById("InputHoraRetornoAlmoco")
        let inputhorasaida = document.getElementById("InputHoraSaida");
    
        if (inputnome.value == "")
            listaCampos.push(inputnome);
        if (inputdata.value == "")
            listaCampos.push(inputdata);
        if (inputhoraentrada.value == "")
            listaCampos.push(inputhoraentrada);
        if (inputhorasaidaalmoco.value == "")
            listaCampos.push(inputhorasaidaalmoco);
        if (inputhoraretornoalmoco.value == "")
            listaCampos.push(inputhoraretornoalmoco);
        if (inputhorasaida.value == "")
            listaCampos.push(inputhorasaida);

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
        let inputdata = document.getElementById("InputData");
        let inputhoraentrada = document.getElementById("InputHoraEntrada");
        let inputhorasaidaalmoco = document.getElementById("InputHoraSaidaAlmoco");
        let inputhoraretornoalmoco = document.getElementById("InputHoraRetornoAlmoco")
        let inputhorasaida = document.getElementById("InputHoraSaida");

        if (validarCampos()) {
            let obj = {
                nome: inputnome.value,
                data:inputdata.value,
                horaEntrada:inputhoraentrada.value,
                horaSaidaAlmoco: inputhorasaidaalmoco.value,
                horaRetornoAlmoco: inputhoraretornoalmoco.value,
                horaSaida:inputhorasaida.value
            }
        
            let stringObj = JSON.stringify(obj);

            fetch("/registro/ponto", {
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
        let inputid = document.getElementById("inputId");
        let inputnome = document.getElementById("InputNome");
        let inputdata = document.getElementById("InputData");
        let inputhoraentrada = document.getElementById("InputHoraEntrada");
        let inputhorasaidaalmoco = document.getElementById("InputHoraSaidaAlmoco");
        let inputhoraretornoalmoco = document.getElementById("InputHoraRetornoAlmoco")
        let inputhorasaida = document.getElementById("InputHoraSaida");

        if (validarCampos()) {
            let obj = {
                id: inputid.value,
                nome: inputnome.value,
                data:inputdata.value,
                horaEntrada:inputhoraentrada.value,
                horaSaidaAlmoco: inputhorasaidaalmoco.value,
                horaRetornoAlmoco: inputhoraretornoalmoco.value,
                horaSaida:inputhorasaida.value
            }
        
            let stringObj = JSON.stringify(obj);

            fetch("/registro/ponto/atualizar", {
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
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
        document.getElementById("InputNomeCargo").style["border-color"] = "#ced4da";
        document.getElementById("InputSalario").style["border-color"] = "#ced4da";
        document.getElementById("InputCargaHoraria").style["border-color"] = "#ced4da";
    }

    function validarCampos() {
        limparValidacao(); 
        let listaCampos = [];
        let inputnome = document.getElementById("InputNomeCargo");
        let inputsalario = document.getElementById("InputSalario");
        let inputcargahoraria = document.getElementById("InputCargaHoraria");
    
        if (inputnome.value.trim() === "")
            listaCampos.push(inputnome);
        
        if (inputsalario.value.trim() === "")
            listaCampos.push(inputsalario);
        
        if (inputcargahoraria.value.trim() === "")
            listaCampos.push(inputcargahoraria);
    
        let [hora, minuto] = inputcargahoraria.value.split(":").map(Number);
        if (hora > 44 || (hora === 44 && minuto > 0)) {
            listaCampos.push(inputcargahoraria);
            alert("A carga horária máxima permitida é 44 horas.");
        }
    
        if (listaCampos.length === 0) {
            return true;
        } else {
            for (let i = 0; i < listaCampos.length; i++) {
                listaCampos[i].style["border-color"] = "red";
            }
    
            alert("O formulário não foi preenchido corretamente. Veja os campos destacados!");
            document.getElementById("msgErro").innerHTML = "<b>O formulário não foi preenchido corretamente, por favor, veja os campos destacados!</b>";
    
            return false;
        }
    }

    function cadastrar() {
        let InputNome = document.getElementById("InputNomeCargo");
        let InputSalario = document.getElementById("InputSalario");
        let InputCarga = document.getElementById("InputCargaHoraria");
        if (validarCampos()) {
            let obj = {
                nome: InputNome.value,
                salario:InputSalario.value,
                carga_horaria:InputCarga.value
            }
            

            let stringObj = JSON.stringify(obj);

            fetch("/cadastrar/cargos", {
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
                        window.location.href = '/cadastrar/cargos';
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

    function atualizar() {
        let inputId = document.getElementById("InputId");
        let InputNome = document.getElementById("InputNomeCargo");
        let InputSalario = document.getElementById("InputSalario");
        let InputCarga = document.getElementById("InputCargaHoraria");
        if (validarCampos()) {
            let obj = {
                id: inputId.value,
                nome: InputNome.value,
                salario:InputSalario.value,
                carga_horaria:InputCarga.value
            }
            

            let stringObj = JSON.stringify(obj);

            fetch("/cargo/atualizar", {
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
                        window.location.href = '/gerenciar/cargos';
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
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
        document.getElementById("InputDataAgendada").style["border-color"] = "#ced4da";
        document.getElementById("InputHoraAgendada").style["border-color"] = "#ced4da";
        document.getElementById("InputIdPaciente").style["border-color"] = "#ced4da";
        document.getElementById("InputCroMedico").style["border-color"] = "#ced4da";

    }

    
    function aplicarMascaraInput(input, mascara) {
        let valor = input.value;
        let valorFiltrado = valor.replace(/\D/g, ""); 
        let resultado = "";
        let indexMascara = 0;
    
        for (let i = 0; i < valorFiltrado.length && indexMascara < mascara.length; i++) {
            if (mascara[indexMascara] === "#") {
                resultado += valorFiltrado[i];
                indexMascara++;
            } else {
                resultado += mascara[indexMascara];
                indexMascara++;
                i--; 
            }
        }
    
        input.value = resultado;
    }
    
    function validarCampos() {
        limparValidacao();
        let listaCampos = [];
        let inputnome = document.getElementById("InputNome");
        let inputdataAgendada = document.getElementById("InputDataAgendada");
        let inputhoraAgendada = document.getElementById("InputHoraAgendada");
        let inputidPaciente = document.getElementById("InputIdPaciente");
        let inputcroMedico = document.getElementById("InputCroMedico");
    
        if (inputnome.value.trim() === "")
            listaCampos.push(inputnome);
        if (inputdataAgendada.value.trim() === "" || !/^\d{4}-\d{2}-\d{2}$/.test(inputdataAgendada.value)) {
            listaCampos.push(inputdataAgendada);
        } else {
            let dataAtual = new Date();
            let dataInserida = new Date(inputdataAgendada.value);
            if (dataInserida < dataAtual.setHours(0, 0, 0, 0)) {
                listaCampos.push(inputdataAgendada);
                alert("A data não pode ser anterior à data atual.");
            }
        }
        if (inputhoraAgendada.value.trim() === "" || !/^\d{2}:\d{2}$/.test(inputhoraAgendada.value)) {
            listaCampos.push(inputhoraAgendada);
        } else {
            let [hora, minuto] = inputhoraAgendada.value.split(":").map(Number);
            if (hora < 8 || hora > 18 || (hora === 18 && minuto > 0)) {
                listaCampos.push(inputhoraAgendada);
                alert("O horário deve estar entre 08:00 e 18:00.");
            }
        }
        if (inputidPaciente.value.trim() === "")
            listaCampos.push(inputidPaciente);
        if (inputcroMedico.value.trim() === "" || inputcroMedico.value.length > 10 || !/^\d+$/.test(inputcroMedico.value))
            listaCampos.push(inputcroMedico);
    
        if (listaCampos.length === 0) {
            return true;
        } else {
            for (let i = 0; i < listaCampos.length; i++) {
                listaCampos[i].style["border-color"] = "red";
            }
    
            alert("O formulário não foi preenchido corretamente, por favor, veja os campos destacados!");
            document.getElementById("msgErro").innerHTML = "<b>O formulário não foi preenchido corretamente, por favor, veja os campos destacados!</b>";
    
            return false;
        }
    }
    
    document.getElementById("InputDataAgendada").addEventListener("input", function () {
        aplicarMascaraInput(this, "####-##-##");
    });
    
    document.getElementById("InputCroMedico").addEventListener("input", function () {
        aplicarMascaraInput(this, "##########");
    });
    
    document.getElementById("InputHoraAgendada").addEventListener("input", function () {
        aplicarMascaraInput(this, "##:##");
    });


    function cadastrar() {
        let inputnome = document.getElementById("InputNome");
        let inputdataAgendada = document.getElementById("InputDataAgendada");
        let inputhoraAgendada = document.getElementById("InputHoraAgendada");
        let inputidPaciente = document.getElementById("InputIdPaciente");
        let inputcroMedico = document.getElementById("InputCroMedico");
        if (validarCampos()) {
            let obj = {
                idPaciente: inputidPaciente.value,
                nome: inputnome.value,
                dataAgendada: inputdataAgendada.value,
                horaAgendada: inputhoraAgendada.value,
                croMedico: inputcroMedico.value
            }
            

            let stringObj = JSON.stringify(obj);

            fetch("/cadastrar/consultas", {
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
                        window.location.href = '/gerenciar/consultas';
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
        let inputid = document.getElementById("InputId");
        let inputnome = document.getElementById("InputNome");
        let inputdataAgendada = document.getElementById("InputDataAgendada");
        let inputhoraAgendada = document.getElementById("InputHoraAgendada");
        let inputidPaciente = document.getElementById("InputIdPaciente");
        let inputcroMedico = document.getElementById("InputCroMedico");
    
        if (validarCampos()) {
            let obj = {
                id: inputid.value,
                idPaciente: inputidPaciente.value,
                nome: inputnome.value,
                dataAgendada: inputdataAgendada.value,
                horaAgendada: inputhoraAgendada.value,
                croMedico: inputcroMedico.value
            };
    
            let stringObj = JSON.stringify(obj);
    
            fetch("/consulta/atualizar", {
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
                        window.location.href = '/gerenciar/consultas';
                    } else {
                        alert(resposta.msg);
                    }
                })
                .catch(function (e) {
                    console.error("Ocorreu um erro no fetch!: " + e);
                });
        }
    }
    
})
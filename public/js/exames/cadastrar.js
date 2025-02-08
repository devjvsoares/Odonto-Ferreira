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
        document.getElementById("Inputnome").style["border-color"] = "#ced4da";
        document.getElementById("Inputdescricao").style["border-color"] = "#ced4da";
        document.getElementById("Inputdata").style["border-color"] = "#ced4da";
        document.getElementById("Inputcro").style["border-color"] = "#ced4da";
        document.getElementById("InputPaciente").style["border-color"] = "#ced4da";
        document.getElementById("Inputcusto").style["border-color"] = "#ced4da";
        document.getElementById("Inputhorario").style["border-color"] = "#ced4da";

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
        let inputnome = document.getElementById("Inputnome");
        let inputdescricao = document.getElementById("Inputdescricao");
        let inputdata = document.getElementById("Inputdata");
        let inputcro = document.getElementById("Inputcro");
        let InputPaciente = document.getElementById("InputPaciente");
        let inputcusto = document.getElementById("Inputcusto");
        let inputhorario = document.getElementById("Inputhorario");
    
        if (inputnome.value.trim() === "")
            listaCampos.push(inputnome);
        if (inputdescricao.value.trim() === "")
            listaCampos.push(inputdescricao);
    
        if (inputdata.value.trim() === "" || !/^\d{4}-\d{2}-\d{2}$/.test(inputdata.value)) {
            listaCampos.push(inputdata);
        } else {
            let dataAtual = new Date();
            let dataInserida = new Date(inputdata.value);
            if (dataInserida < dataAtual.setHours(0, 0, 0, 0)) {
                listaCampos.push(inputdata);
                alert("A data não pode ser anterior à data atual.");
            }
        }
    
        if (inputcro.value.trim() === "" || inputcro.value.length > 10 || !/^\d+$/.test(inputcro.value))
            listaCampos.push(inputcro);
        if (InputPaciente.value.trim() === "")
            listaCampos.push(InputPaciente);
        if (inputcusto.value.trim() === "" || isNaN(parseFloat(inputcusto.value)))
            listaCampos.push(inputcusto);
    
        if (inputhorario.value.trim() === "" || !/^\d{2}:\d{2}$/.test(inputhorario.value)) {
            listaCampos.push(inputhorario);
        } else {
            let [hora, minuto] = inputhorario.value.split(":").map(Number);
            if (hora < 8 || hora > 18 || (hora === 18 && minuto > 0)) {
                listaCampos.push(inputhorario);
                alert("O horário deve estar entre 08:00 e 18:00.");
            }
        }
    
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
    
    document.getElementById("Inputdata").addEventListener("input", function () {
        aplicarMascaraInput(this, "####-##-##");
    });
    
    document.getElementById("Inputcro").addEventListener("input", function () {
        aplicarMascaraInput(this, "##########");
    });
    
    document.getElementById("Inputhorario").addEventListener("input", function () {
        aplicarMascaraInput(this, "##:##");
    });


    function cadastrar() {
        let InputPaciente = document.getElementById("InputPaciente");
        let inputnome = document.getElementById("Inputnome");
        let inputdescricao = document.getElementById("Inputdescricao");
        let inputdata = document.getElementById("Inputdata");
        let inputcro = document.getElementById("Inputcro");
        let inputcusto = document.getElementById("Inputcusto");
        let inputhorario = document.getElementById("Inputhorario");
        if (validarCampos()) {
            let obj = {
                id: InputPaciente.value,
                nome:inputnome.value,
                descricao:inputdescricao.value,
                data:inputdata.value,
                cro: inputcro.value,
                custo: inputcusto.value,
                horario: inputhorario.value
            }
            

            let stringObj = JSON.stringify(obj);

            fetch("/cadastrar/exame", {
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
                        window.location.href = '/gerenciar/exames';
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
        let InputPaciente = document.getElementById("InputPaciente");
        let inputnome = document.getElementById("Inputnome");
        let inputdescricao = document.getElementById("Inputdescricao");
        let inputdata = document.getElementById("Inputdata");
        let inputcro = document.getElementById("Inputcro");
        let inputcusto = document.getElementById("Inputcusto");
        let inputhorario = document.getElementById("Inputhorario");
        if (validarCampos()) {
            let obj = {
                id_ex: inputId.value,
                idPac: InputPaciente.value,
                nome:inputnome.value,
                descricao:inputdescricao.value,
                data:inputdata.value,
                cro: inputcro.value,
                custo: inputcusto.value,
                horario: inputhorario.value
            }
            

            let stringObj = JSON.stringify(obj);

            fetch("/exame/atualizar", {
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
                        window.location.href = '/gerenciar/exames';
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
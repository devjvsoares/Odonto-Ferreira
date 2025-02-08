document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnBuscar").addEventListener("click", buscar);
    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel)

    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaMedicos"));
        XLSX.writeFile(wb, "medicos-fullstack.xlsx");
    }

    let btns = document.querySelectorAll(".btn-exclusao");

    for(let btn of btns) {
        btn.addEventListener("click", excluir);
    }

    function excluir() {

        //janela de confirmação, boa prática durante o processo de exclusão
        let cro = this.dataset.cro;
        if(confirm(`Tem certeza que deseja excluir o medico com CRO ${cro}?`)) {
            //recuperar o id que está dentro do dataset
            
            let that = this;
            //fazer solicitação fetch chamando a rota de exclusão 
            if(cro) {
                fetch(`/medico/excluir/${cro}`)
                .then(response => {
                    return response.json();
                })
                .then(body => {
                    alert(body.msg);
                    if(body.ok) {
                        that.parentElement.parentElement.remove();
                    }
                })
                .catch(e => {
                    console.error(e);
                })
            }
            else {
                alert("Cro não encontrado");
            }
        }
    }

    function buscar() {
        let termo = document.getElementById("inputBusca").value;
        let tipoBusca = "";
        if (document.querySelector("input[name='tipoBusca']:checked"))
            tipoBusca = document.querySelector("input[name='tipoBusca']:checked").value;
        let objetoBusca = {};
    
        if (termo != "" && (tipoBusca == 'numero' || tipoBusca == 'produto')) {
            objetoBusca.termo = termo;
            objetoBusca.tipoBusca = tipoBusca;
        }
        else if (termo == "") {
            objetoBusca.termo = termo;
        }
        else {
            alert("Escolha o tipo da busca!");
            return;
        }
    
        fetch("/gerenciar/medicos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objetoBusca) 
        })
        .then(r => {
            return r.json();
        })
        .then(r => {
            console.log(r); 
    
            if (r.listaFiltrada.length > 0) {
                let html = "";
    
                for (let medico of r.listaFiltrada) {
                    html += `<tr>
                                <td>${medico.cro}</td> 
                                <td>${medico.nome}</td> 
                                <td>${medico.especialidade}</td>
                                <td>${medico.cpf}</td> 
                                <td>
                                    <div class="action-buttons">
                                        <button data-nome="<%= ${medico.nome} %>" data-id="<%= ${medico.id} %>" type="button" class="btn btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <a href="/medico/atualizar/${medico.id}" class="btn btn-primary">
                                            <i class="fas fa-pen"></i>
                                        </a>
                                    </div>
                                </td>
                                
                            </tr>`;
                }

                document.querySelector("#tabelaMedicos > tbody").innerHTML = html;
            } else {

                alert("Nenhum médico encontrado!");
            }
        })
        .catch(e => {
            console.error(e);
        });
    }
})
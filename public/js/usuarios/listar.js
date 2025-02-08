document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnBuscar").addEventListener("click", buscar);
    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel)

    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaPacientes"));
        XLSX.writeFile(wb, "pacientes-fullstack.xlsx");
    }

    let btns = document.querySelectorAll(".btn-exclusao");

    for(let btn of btns) {
        btn.addEventListener("click", excluir);
    }

    function excluir() {

        //janela de confirmação, boa prática durante o processo de exclusão
        let id = this.dataset.id;
        if(confirm(`Tem certeza que deseja excluir o paciente ${id}?`)) {
            //recuperar o id que está dentro do dataset
            
            let that = this;
            //fazer solicitação fetch chamando a rota de exclusão 
            if(id) {
                fetch(`/usuario/excluir/${id}`)
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
                alert("ID não encontrado");
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
    
        fetch("/gerenciar/pacientes", {
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
    
                for (let paciente of r.listaFiltrada) {
                    html += `<tr>
                                <td>${paciente.id}</td> 
                                <td>${paciente.nome}</td> 
                                <td>${paciente.sexo}</td>
                                <td>${paciente.email}</td> 
                                <td>${paciente.cpf}</td> 
                                <td>
                                    <div class="action-buttons">
                                        <button data-nome="<%= ${paciente.nome} %>" data-id="<%= ${paciente.id} %>" type="button" class="btn btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <a href="/usuario/atualizar/${paciente.id}" class="btn btn-primary">
                                            <i class="fas fa-pen"></i>
                                        </a>
                                    </div>
                                </td>
                                
                            </tr>`;
                }

                document.querySelector("#tabelaPacientes > tbody").innerHTML = html;
            } else {

                alert("Nenhum paciente encontrado!");
            }
        })
        .catch(e => {
            console.error(e);
        });
    }


})
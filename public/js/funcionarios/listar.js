document.addEventListener("DOMContentLoaded", function() {


    document.getElementById("btnBuscar").addEventListener("click", buscar);
    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel)


    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaFunc"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "funcionarios-fullstack.xlsx");
    }

    let btns = document.querySelectorAll(".btn-exclusao");
    
    for(let btn of btns) {
        btn.addEventListener("click", excluir);
    }

    function excluir() {

        //janela de confirmação, boa prática durante o processo de exclusão
        let id = this.dataset.id;
        if(confirm(`Tem certeza que deseja excluir o funcionario ${id}?`)) {
            //recuperar o id que está dentro do dataset
            
            let that = this;
            //fazer solicitação fetch chamando a rota de exclusão 
            if(id) {
                fetch(`/funcionario/excluir/${id}`)
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
    
        fetch("/gerenciar/funcionarios", {
            method: "POST", // Define o método HTTP como POST
            headers: {
                'Content-Type': 'application/json' // Define que o conteúdo enviado será JSON
            },
            body: JSON.stringify(objetoBusca) // Converte o objeto de busca para uma string JSON e envia no corpo da requisição
        })
        .then(r => {
            // Retorna a resposta do servidor em formato JSON
            return r.json();
        })
        .then(r => {
            console.log(r); 
    
            if (r.listaFiltrada.length > 0) {
                let html = "";
    
                for (let funcionario of r.listaFiltrada) {
                    html += `<tr>
                                <td>${funcionario.id}</td> 
                                <td>${funcionario.nome}</td> 
                                <td>${funcionario.cpf}</td>
                                <td>${funcionario.cargo}</td> 
                                <td>${new Date(funcionario.data_adm).toLocaleDateString('pt-br')}</td> 
                                <td>
                                    <div class="action-buttons">
                                        <button data-nome="<%= ${funcionario.nome} %>" data-id="<%= ${funcionario.id} %>" type="button" class="btn btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <a href="/funcionario/atualizar/${funcionario.id}" class="btn btn-primary">
                                            <i class="fas fa-pen"></i>
                                        </a>
                                    </div>
                                </td>
                                
                            </tr>`;
                }

                document.querySelector("#tabelaFunc > tbody").innerHTML = html;
            } else {

                alert("Nenhum item encontrado!");
            }
        })
        .catch(e => {
            // Exibe no console qualquer erro que ocorrer durante a requisição
            console.error(e);
        });
    }


     
})
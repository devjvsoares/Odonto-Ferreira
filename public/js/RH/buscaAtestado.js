document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnBuscar").addEventListener("click", buscar);
    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel)


    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaAtestado"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "atestado-fullstack.xlsx");
    }

    function buscar() {
        let termo = document.getElementById("inputBusca").value;
        
        let objetoBusca = {};
    
        if (termo != "") {
            objetoBusca.termo = termo;
        }
        else {
            objetoBusca.termo = termo;
        }

        fetch("/registro/relatorio-atestado", {
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
    
            if (r.listaFiltro.length > 0) {
                let html = "";
    
                for (let atestado of r.listaFiltro) {
                    html += `<tr>
                                <td>${atestado.id}</td>
                                <td>${atestado.nome}</td>
                                <td>${new Date(atestado.dataInicio).toLocaleDateString('pt-BR')}</td>
                                <td>${new Date(atestado.dataFim).toLocaleDateString('pt-BR')}</td>
                                <td>${atestado.descricao}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button data-nome="<%= ${atestado.nome} %>" data-id="<%= ${atestado.id} %>" type="button" class="btn btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <a href="/registro/atestado/atualizar/${atestado.id} " class="btn btn-primary">
                                            <i class="fas fa-pen"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                }
    
                document.querySelector("#tabelaAtestado > tbody").innerHTML = html;
            } else {
                alert("Nenhum atestado encontrado!");
            }
        })
        .catch(e => {
            console.error(e);
        });
    }
    
})
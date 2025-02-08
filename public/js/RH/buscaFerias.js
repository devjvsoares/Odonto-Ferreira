document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnBuscar").addEventListener("click", buscar);
    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel)


    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaFerias"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "ferias-fullstack.xlsx");
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

        fetch("/registro/relatorio-ferias", {
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
    
            if (r.listaFiltrada.length > 0) {
                let html = "";
    
                for (let ferias of r.listaFiltrada) {
                    html += `<tr>
                                <td>${ferias.id}</td>
                                <td>${ferias.nome}</td>
                                <td>${new Date(ferias.dataInicio).toLocaleDateString('pt-BR')}</td>
                                <td>${new Date(ferias.dataFim).toLocaleDateString('pt-BR')}</td>
                                <td>${ferias.status}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button data-nome="<%= ${ferias.nome} %>" data-id="<%= ${ferias.id} %>" type="button" class="btn btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <a href="/registro/ferias/atualizar/${ferias.id} " class="btn btn-primary">
                                            <i class="fas fa-pen"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                }
    
                document.querySelector("#tabelaFerias > tbody").innerHTML = html;
            } else {
                alert("Nenhum atestado encontrado!");
            }
        })
        .catch(e => {
            console.error(e);
        });
    }
    
})
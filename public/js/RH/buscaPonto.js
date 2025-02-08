document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnBuscar").addEventListener("click", buscar);
    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel)


    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaPontos"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "ponto-fullstack.xlsx");
    }

    function buscar() {
        let termo = document.getElementById("inputBusca").value;
        let dataBusca = document.getElementById("inputData").value;
        
        let objetoBusca = {};
    
        if (termo !== "" && dataBusca !== "") {
           objetoBusca.termo = termo;
           objetoBusca.dataBusca = dataBusca;
        } else if (termo !== "") {
            objetoBusca.termo = termo;
        } else if (dataBusca !== "") {
            objetoBusca.dataBusca = dataBusca;
        }

        console.log(objetoBusca);
        fetch("/registro/relatorio-ponto", {
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
            console.log("Resposta do backend:", r);
    
            if (r.listaFiltro.length > 0) {
                let html = "";
    
                for (let ponto of r.listaFiltro) {
                    html += `<tr>
                                <td>${ponto.id}</td>
                                <td>${ponto.nome}</td>
                                <td>${new Date(ponto.data).toLocaleDateString('pt-BR')}</td>
                                <td>${ponto.horaEntrada}</td> 
                                <td>${ponto.horaSaidaAlmoco}</td>
                                <td>${ponto.horaRetornoAlmoco}</td>
                                <td>${ponto.horaSaida}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button data-nome="<%= ${ponto.nome} %>" data-id="<%= ${ponto.id} %>" type="button" class="btn btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <a href="/registro/ponto/atualizar/${ponto.id}" class="btn btn-primary">
                                            <i class="fas fa-pen"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                }
    
                document.querySelector("#tabelaPontos > tbody").innerHTML = html;
            } else {
                alert("Nenhum ponto encontrado!");
            }
        })
        .catch(e => {
            console.error(e);
        });
    }
    
})
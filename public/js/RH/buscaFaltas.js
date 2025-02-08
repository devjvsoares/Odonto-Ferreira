document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnBuscar").addEventListener("click", buscar);
    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel)


    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaFaltas"));
        XLSX.writeFile(wb, "faltas-fullstack.xlsx");
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

        fetch("/registro/relatorio-faltas", {
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
    
                for (let faltas of r.listaFiltrada) {
                    html += `<tr>
                                <td>${faltas.id}</td>
                                <td>${faltas.nome}</td>
                                <td>${new Date(faltas.dataFalta).toLocaleDateString('pt-BR')}</td>
                                <td>${faltas.Justificativa}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button data-nome="<%= ${faltas.nome} %>" data-id="<%= ${faltas.id} %>" type="button" class="btn btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <a href="/registro/faltas/atualizar/${faltas.id} " class="btn btn-primary">
                                            <i class="fas fa-pen"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                }
    
                document.querySelector("#tabelaFaltas > tbody").innerHTML = html;
            } else {
                alert("Nenhuma falta encontrada!");
            }
        })
        .catch(e => {
            console.error(e);
        });
    }
    
})
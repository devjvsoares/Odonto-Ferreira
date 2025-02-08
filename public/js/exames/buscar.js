document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnBuscar").addEventListener("click", buscar);
    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel)


    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaExames"));
        XLSX.writeFile(wb, "exame-fullstack.xlsx");
    }

    function buscar() {
        let termo = document.getElementById("inputData").value;
        let objetoBusca = {};
    
        if (termo !== "") {
           objetoBusca.termo = termo;
        }

        console.log(objetoBusca);
        fetch("/gerenciar/exames", {
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
    
            if (r.listaFiltrada.length > 0) {
                let html = "";
    
                for (let exame of r.listaFiltrada) {
                    html += `<tr>
                                <td>${exame.id_ex}</td>
                                <td>${exame.nome}</td>
                                <td>${new Date(exame.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                                <td>${exame.horario}</td> 
                                <td>${exame.cro}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button data-nome="<%= ${exame.nome} %>" data-id="<%= ${exame.id_ex} %>" type="button" class="btn btn-danger" style="background-color: #f44336; color: white;">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <a href="/exame/atualizar/${exame.id_ex}" style="background-color: blue; color: white;" class="btn btn-primary">
                                            <i class="fas fa-pen"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                }
    
                document.querySelector("#tabelaExames > tbody").innerHTML = html;
            } else {
                alert("Nenhum exame encontrado!");
            }
        })
        .catch(e => {
            console.error(e);
        });
    }
    
})
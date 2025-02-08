document.addEventListener("DOMContentLoaded", function() {


    let btns = document.querySelectorAll(".btn-exclusao");

    for(let btn of btns) {
        btn.addEventListener("click", excluir);
    }

    function excluir() {
        let id = this.dataset.id;
        if(confirm(`Tem certeza que deseja excluir o exame com ID: ${id}?`)) {
            
            let that = this;
            if(id) {
                fetch(`/exame/excluir/${id}`)
                .then(response => {
                    return response.json();
                })
                .then(body => {
                    alert(body.msg);
                    if(body.ok) {
                        that.parentElement.parentElement.remove();
                        window.location.href = '/gerenciar/exames';
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
})
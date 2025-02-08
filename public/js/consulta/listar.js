document.addEventListener("DOMContentLoaded", function() {

    let btns = document.querySelectorAll(".btn-exclusao");

    for (let btn of btns) {
        btn.addEventListener("click", excluirConsulta);
    }

    function excluirConsulta() {
        let idConsulta = this.dataset.id;

        if (confirm(`Tem certeza que deseja excluir a consulta com ID ${idConsulta}?`)) {

            let that = this;

            if (idConsulta) {
                fetch(`/consulta/excluir/${idConsulta}`)
                .then(response => {
                    return response.json();
                })
                .then(body => {
                
                    alert(body.msg);

                    if (body.ok) {
                        that.parentElement.parentElement.remove();
                    }
                })
                .catch(e => {
                    console.error("Erro ao excluir consulta: ", e);
                });
            } else {
                alert("ID da consulta não encontrado");
            }
        }
    }
});

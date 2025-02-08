const MedicoModel = require("../models/medicoModel");

class MedicoController {

    async excluir(req, res) {
        //receber o parâmetro para exclusão;
        let cro = req.params.cro;
        let medico = new MedicoModel();
        let result = await medico.excluir(cro);
        let msg = "";
        if (result)
            msg = "Medico excluído com sucesso!";
        else
            msg = "Erro ao excluir Medico!";

        res.send({ ok: result, msg: msg });
    }


    async atualizarView(req, res) {
        let cro = req.params.cro;
        let medico = new MedicoModel();
        medico = await medico.obter(cro);
        res.render("Usuario/Cadastro/cadastroMedico.ejs", { MedicoAlteracao: medico });
    }

    async atualizar(req, res) {
        if (req.body.cro && req.body.nome && req.body.sexo && req.body.email && req.body.especialidade && req.body.nascimento && req.body.nascimento && req.body.cpf && req.body.cep && req.body.endereco  &&req.body.numero && req.body.bairro && req.body.estado&& req.body.cidade&& req.body.senha && req.body.senha.length) {
            let medico = new MedicoModel();
            medico.cro = req.body.cro;
            medico.nome = req.body.nome;
            medico.sexo = req.body.sexo;
            medico.email = req.body.email;
            medico.especialidade = req.body.especialidade;
            medico.nascimento = req.body.nascimento;
            medico.cpf = req.body.cpf;
            medico.cep = req.body.cep;
            medico.endereco = req.body.endereco;
            medico.numero = req.body.numero;
            medico.bairro = req.body.bairro;
            medico.estado = req.body.estado;
            medico.cidade = req.body.cidade;
            medico.senha = req.body.senha;
            let result = await medico.atualizar();
            if (result) {
                res.send({ ok: true, msg: "Atualização realizada com sucesso!" });
            }
            else {
                res.send({ ok: false, msg: "Erro ao atualizar Medico" });
            }
        }
        else {
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }


}

module.exports = MedicoController;
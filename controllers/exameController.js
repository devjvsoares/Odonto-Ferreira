const ExameModel = require('../models/exameModel');
const FuncionarioModel = require('../models/funcionarioModel');
const UsuarioModel = require('../models/usuarioModel');

class ExameController{

    async excluir(req, res) {
        let id_ex = req.params.id_ex;
        let exame = new ExameModel();
        let result = await exame.excluir(id_ex);
        let msg = "";
        if (result)
            msg = "Exame excluído com sucesso!";
        else
            msg = "Erro ao excluir Exame!";

        res.send({ ok: result, msg: msg });
    }

    async atualizarView(req, res) {
        let id = req.params.id;
        let usuario = new UsuarioModel();
        let exame = new ExameModel();
        exame = await exame.obter(id);
        let listaPaciente = await usuario.listarPaciente();
        let listaMedico = await usuario.listarMedico();
        res.render("Usuario/Cadastro/cadastroExame.ejs", { ExameAlteracao: exame, paciente:listaPaciente, medico: listaMedico });
    }

    async atualizar(req, res) {
        if (req.body.id_ex && req.body.idPac && req.body.nome && req.body.descricao && req.body.data && req.body.cro && req.body.custo && req.body.horario) {
            let exame = new ExameModel();
            exame.id_ex = req.body.id_ex
            exame.Id = req.body.idPac;
            exame.nome = req.body.nome;
            exame.descricao = req.body.descricao;
            exame.data = req.body.data;
            exame.cro_med = req.body.cro;
            exame.custo = req.body.custo;
            exame.horario = req.body.horario;
            let result = await exame.atualizar();
            if (result) {
                res.send({ ok: true, msg: "Atualização realizada com sucesso!" });
            }
            else {
                res.send({ ok: false, msg: "Erro ao atualizar Exame" });
            }
        }
        else {
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }

}

module.exports = ExameController;
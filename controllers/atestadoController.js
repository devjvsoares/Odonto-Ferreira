const FuncionarioModel = require('../models/funcionarioModel');
const MedicoModel = require('../models/medicoModel');
const AtestadoModel = require('../models/atestadoModel');

class AtestadoController {
    async registroAtestadoView(req, res) {
        let funcionario = new FuncionarioModel();
        let medico = new MedicoModel();
        let listaFuncionarios = await funcionario.listar();
        let listaMedicos = await medico.listar();
        res.render('RH/atestado.ejs', { layout: false, funcionario: listaFuncionarios, medico : listaMedicos});
    }

    async relatorioAtestado(req,res){
        let atestado = new AtestadoModel();
        let funcionario = new FuncionarioModel();
        let listaFuncionarios = await funcionario.listar();
        let listaAtestado = await atestado.listar();
        res.render('RH/relatorioAtestado.ejs', {layout: false, atestado: listaAtestado, funcionario : listaFuncionarios });
    }

    async listarComBusca(req, res) {
        let atestadoBusca = new AtestadoModel();
        let atestado = await atestadoBusca.listarAtestado(req.body.termo);
        res.send({listaFiltro: atestado});
    }

    async atualizarView(req, res) {
        let atestadoId = req.params.id;
        let atestado = new AtestadoModel();
        atestado = await atestado.obter(atestadoId);
        res.render("RH/atestado.ejs", { AtestadoAlteracao: atestado});
    }

    async atualizar(req, res) {
        let ok;
        if (req.body.id > 0 && req.body.nome !=""  && req.body.dataInicio != "" && req.body.dataFim !=""  && req.body.descricao !="" ) {
            let atestado = new AtestadoModel();
            atestado.id = req.body.id;
            atestado.nome = req.body.nome;
            atestado.dataInicio = req.body.dataInicio;
            atestado.dataFim = req.body.dataFim;
            atestado.descricao = req.body.descricao;
            let result = await atestado.atualizar();
            if (result) {
                res.send({ ok: true, msg: "Atualização realizada com sucesso!" });
            }
            else {
                res.send({ ok: false, msg: "Erro ao atualizar Atestado" });
            }
        }
        else {
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }

    async excluir(req, res) {
        let id = req.params.id;
        let atestado = new AtestadoModel();
        let result = await atestado.excluir(id);
        let msg = "";
        if (result)
            msg = "Atestado excluído com sucesso!";
        else
            msg = "Erro ao excluir Ponto!";

        res.send({ ok: result, msg: msg });
    }
}

module.exports = new AtestadoController();

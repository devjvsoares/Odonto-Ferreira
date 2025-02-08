const FeriasModel = require("../models/feriasModel");
const FuncionarioModel = require("../models/funcionarioModel");
const MedicoModel = require("../models/medicoModel");


class FeriasController {
    async registroFeriasView(req, res) {
        let funcionario = new FuncionarioModel();
        let medico = new MedicoModel();
        let listaFuncionarios = await funcionario.listar();
        let listaMedicos = await medico.listar();
        res.render('RH/ferias.ejs', { layout: false, funcionario: listaFuncionarios, medico : listaMedicos});
    }

    async relatorioFerias(req,res){
        let ferias = new FeriasModel();
        let funcionario = new FuncionarioModel();
        let listaFuncionarios = await funcionario.listar();
        let listaFerias = await ferias.listar();
        res.render('RH/relatorioFerias.ejs', {layout: false, ferias: listaFerias, funcionario : listaFuncionarios });
    }

    async listarComBusca(req, res) {
        let feriasBusca = new FeriasModel();
        let ferias = await feriasBusca.listarAtestado(req.body.termo);
        res.send({listaFiltrada: ferias});
    }

    async atualizarView(req, res) {
        let feriasId = req.params.id;
        let ferias = new FeriasModel();
        ferias = await ferias.obter(feriasId);
        res.render("RH/ferias.ejs", { FeriasAlteracao: ferias});
    }

    async atualizar(req, res) {
        let ok;
        if (req.body.id > 0 && req.body.nome !=""  && req.body.dataInicio != "" && req.body.dataFim !=""  && req.body.status !="" ) {
            let ferias = new FeriasModel();
            ferias.id = req.body.id;
            ferias.nome = req.body.nome;
            ferias.dataInicio = req.body.dataInicio;
            ferias.dataFim = req.body.dataFim;
            ferias.status = req.body.status;
            let result = await ferias.atualizar();
            if (result) {
                res.send({ ok: true, msg: "Atualização realizada com sucesso!" });
            }
            else {
                res.send({ ok: false, msg: "Erro ao atualizar Férias" });
            }
        }
        else {
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }

    async excluir(req, res) {
        let id = req.params.id;
        let ferias = new FeriasModel();
        let result = await ferias.excluir(id);
        let msg = "";
        if (result)
            msg = "Férias excluída com sucesso!";
        else
            msg = "Erro ao excluir Férias!";

        res.send({ ok: result, msg: msg });
    }
}

module.exports = new FeriasController();

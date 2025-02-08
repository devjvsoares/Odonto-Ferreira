const FaltasModel = require("../models/faltasModel");
const FeriasModel = require("../models/feriasModel");
const FuncionarioModel = require("../models/funcionarioModel");
const MedicoModel = require("../models/medicoModel");


class FaltasController {
    async registroFaltasView(req, res) {
        let funcionario = new FuncionarioModel();
        let medico = new MedicoModel();
        let listaFuncionarios = await funcionario.listar();
        let listaMedicos = await medico.listar();
        res.render('RH/faltas.ejs', { layout: false, funcionario: listaFuncionarios, medico : listaMedicos});
    }

    async relatorioFaltas(req,res){
        let faltas = new FaltasModel();
        let funcionario = new FuncionarioModel();
        let listaFuncionarios = await funcionario.listar();
        let listaFaltas = await faltas.listar();
        res.render('RH/relatorioFaltas.ejs', {layout: false, faltas: listaFaltas, funcionario : listaFuncionarios });
    }

    async listarComBusca(req, res) {
        let faltasBusca = new FaltasModel();
        let faltas = await faltasBusca.listarFaltas(req.body.termo);
        res.send({listaFiltrada: faltas});
    }

    async atualizarView(req, res) {
        let faltasId = req.params.id;
        let faltas = new FaltasModel();
        faltas = await faltas.obter(faltasId);
        res.render("RH/faltas.ejs", { FaltasAlteracao: faltas});
    }

    async atualizar(req, res) {
        let ok;
        if (req.body.id > 0 && req.body.nome !=""  && req.body.dataFalta != "" && req.body.Justificativa !="" ) {
            let faltas = new FaltasModel();
            faltas.id = req.body.id;
            faltas.nome = req.body.nome;
            faltas.dataFalta = req.body.dataFalta;
            faltas.Justificativa = req.body.Justificativa;
            let result = await faltas.atualizar();
            if (result) {
                res.send({ ok: true, msg: "Atualização realizada com sucesso!" });
            }
            else {
                res.send({ ok: false, msg: "Erro ao atualizar Falta" });
            }
        }
        else {
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }

    async excluir(req, res) {
        let id = req.params.id;
        let faltas = new FaltasModel();
        let result = await faltas.excluir(id);
        let msg = "";
        if (result)
            msg = "Falta excluída com sucesso!";
        else
            msg = "Erro ao excluir Falta!";

        res.send({ ok: result, msg: msg });
    }
}

module.exports = new FaltasController();

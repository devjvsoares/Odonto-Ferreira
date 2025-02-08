const FuncionarioModel = require('../models/funcionarioModel');
const MedicoModel = require('../models/medicoModel');
const PontoModel = require('../models/pontoModel');

class PontoController {
    async registroPontoView(req, res) {
        let funcionario = new FuncionarioModel();
        let medico = new MedicoModel();
        let listaFuncionarios = await funcionario.listar();
        let listaMedicos = await medico.listar();
        res.render('RH/ponto.ejs', { layout: false, funcionario: listaFuncionarios, medico : listaMedicos});
    }

    async relatorioPonto(req,res){
        let ponto = new PontoModel();
        let funcionario = new FuncionarioModel();
        let listaFuncionarios = await funcionario.listar();
        let listaPonto = await ponto.listar();
        res.render('RH/relatorioPonto.ejs', {layout: false, ponto: listaPonto, funcionario : listaFuncionarios });
    }

    async listarComBusca(req, res) {
        let pontoBusca = new PontoModel();
        let ponto = await pontoBusca.listarPontos(req.body.termo, req.body.dataBusca);
        res.send({listaFiltro: ponto});
    }

    async atualizarView(req, res) {
        let pontoId = req.params.id;
        let ponto = new PontoModel();
        let funcionario = new FuncionarioModel();
        let medico = new MedicoModel();
        let listaFuncionarios = await funcionario.listar();
        let listaMedicos = await medico.listar();
        ponto = await ponto.obter(pontoId);
        res.render("RH/ponto.ejs", { PontoAlteracao: ponto, funcionario: listaFuncionarios, medico: listaMedicos });
    }

    async atualizar(req, res) {
        let ok;
        if (req.body.id > 0 && req.body.nome !=""  && req.body.data && req.body.horaEntrada !=""  && req.body.horaSaidaAlmoco !=""  && req.body.horaRetornoAlmoco !=""  && req.body.horaSaida !="" ) {
            let ponto = new PontoModel();
            ponto.id = req.body.id;
            ponto.nome = req.body.nome;
            ponto.data = req.body.data;
            ponto.horaEntrada = req.body.horaEntrada;
            ponto.horaSaidaAlmoco = req.body.horaSaidaAlmoco;
            ponto.horaRetornoAlmoco = req.body.horaRetornoAlmoco;
            ponto.horaSaida = req.body.horaSaida;
            let result = await ponto.atualizar();
            if (result) {
                res.send({ ok: true, msg: "Atualização realizada com sucesso!" });
            }
            else {
                res.send({ ok: false, msg: "Erro ao atualizar Ponto" });
            }
        }
        else {
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }

    async excluir(req, res) {
        let id = req.params.id;
        let ponto = new PontoModel();
        let result = await ponto.excluir(id);
        let msg = "";
        if (result)
            msg = "Ponto excluído com sucesso!";
        else
            msg = "Erro ao excluir Ponto!";

        res.send({ ok: result, msg: msg });
    }
}

module.exports = new PontoController();

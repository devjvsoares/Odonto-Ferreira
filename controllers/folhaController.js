const FolhaModel = require("../models/folhaModel");
const FuncionarioModel = require("../models/funcionarioModel");



class FolhaController {
    async relatorioFolhasView(req, res) {
        let folha = new FolhaModel();
        let funcionario = new FuncionarioModel();
        let listaFuncionarios = await funcionario.listar();
        let listaMedia = await folha.listarMedia();
        let listaTotal = await folha.listarTotal();
        let listaFolha = await folha.listar();
        res.render('RH/relatorioFolha.ejs', { layout: false, funcionario: listaFuncionarios, folha : listaFolha, listaMedia, listaTotal});
    }

}

module.exports = new FolhaController();

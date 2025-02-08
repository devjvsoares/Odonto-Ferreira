const FuncionarioModel = require("../models/funcionarioModel");

class FuncionarioController{

    async excluir(req, res) {
        //receber o parâmetro para exclusão;
        let id = req.params.id;
        let funcionario = new FuncionarioModel();
        let result = await funcionario.excluir(id);
        let msg = "";
        if (result)
            msg = "Funcionario excluído com sucesso!";
        else
            msg = "Erro ao excluir Funcionario!";

        res.send({ ok: result, msg: msg });
    }

    async atualizarView(req, res) {
        let id = req.params.id;
        let funcionario = new FuncionarioModel();
        funcionario = await funcionario.obter(id);
        let listaCargo = await funcionario.listarCargo();
        res.render("Usuario/Cadastro/cadastroFuncionario.ejs", { FuncionarioAlteracao: funcionario, cargo:listaCargo });
    }

    async atualizar(req, res) {
        if (req.body.id && req.body.nome && req.body.data_adm && req.body.email && req.body.nascimento && req.body.endereco && req.body.bairro && req.body.cep && req.body.cpf && req.body.cargo) {
            let funcionario = new FuncionarioModel();
            funcionario.id = req.body.id;
            funcionario.nome = req.body.nome;
            funcionario.data_adm = req.body.data_adm;
            funcionario.email = req.body.email;
            funcionario.nascimento = req.body.nascimento;
            funcionario.endereco = req.body.endereco;
            funcionario.bairro = req.body.bairro;
            funcionario.cep = req.body.cep;
            funcionario.cpf = req.body.cpf;
            funcionario.cargo = req.body.cargo;
            let result = await funcionario.atualizar();
            if (result) {
                res.send({ ok: true, msg: "Atualização realizada com sucesso!" });
            }
            else {
                res.send({ ok: false, msg: "Erro ao atualizar Funcionario" });
            }
        }
        else {
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }

}


module.exports = FuncionarioController;
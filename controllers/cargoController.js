const CargoModel = require("../models/cargoModel");

class CargoController{

    async atualizarView(req, res) {
        let id = req.params.id;
        let cargo = new CargoModel();
        cargo = await cargo.obter(id);
        res.render("Usuario/Cadastro/cadastroCargo.ejs", { CargoAlteracao: cargo });
    }

    async excluir(req, res) {
        let id= req.params.id;
        let cargo = new CargoModel();
        let result = await cargo.excluir(id);
        let msg = "";
        if (result)
            msg = "Exame excluído com sucesso!";
        else
            msg = "Erro ao excluir Exame!";

        res.send({ ok: result, msg: msg });
    }

    async atualizar(req, res) {
        if (req.body.id && req.body.nome && req.body.salario && req.body.carga_horaria !== "") {
            let cargo = new CargoModel();
            cargo.id = req.body.id;
            cargo.nome = req.body.nome;
            cargo.salario = req.body.salario;
            cargo.carga_horaria = req.body.carga_horaria;
            let result = await cargo.atualizar();
            if (result) {
                res.send({ ok: true, msg: "Atualização realizada com sucesso!" });
            }
            else {
                res.send({ ok: false, msg: "Erro ao atualizar Cargo" });
            }
        }
        else {
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }
}

module.exports = CargoController;
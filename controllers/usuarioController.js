const UsuarioModel = require("../models/usuarioModel");


class UsuarioController {

    listagemView(req, res) {
        res.render('Usuario/listagem')
    }

    async excluir(req, res) {
        //receber o parâmetro para exclusão;
        let id = req.params.id;
        let usuario = new UsuarioModel();
        let result = await usuario.excluir(id);
        let msg = "";
        if (result)
            msg = "Paciente excluído com sucesso!";
        else
            msg = "Erro ao excluir pedido!";

        res.send({ ok: result, msg: msg });
    }

    async atualizarView(req, res) {
        let id = req.params.id;
        let usuario = new UsuarioModel();
        usuario = await usuario.obter(id);
        let dataNascimento = new Date(usuario.nascimento);
        let dataFormatada = dataNascimento.toISOString().split('T')[0];
        usuario.nascimento=dataFormatada;
        res.render("Usuario/Cadastro/cadastroPaciente.ejs", { usuarioAlteracao: usuario });
    }

    async atualizar(req, res) {
        if (req.body.id && req.body.nome && req.body.email && req.body.nascimento && req.body.cpf && req.body.endereco && req.body.num_end && req.body.bairro && req.body.cep && req.body.estado && req.body.cidade && req.body.senha && req.body.senha) {
            let usuario = new UsuarioModel();
            usuario.id = req.body.id;
            usuario.nome = req.body.nome;
            usuario.sexo = req.body.sexo;
            usuario.email = req.body.email;
            usuario.cpf = req.body.cpf;
            usuario.nascimento = req.body.nascimento;
            usuario.endereco = req.body.endereco;
            usuario.num_end = req.body.num_end;
            usuario.bairro = req.body.bairro;
            usuario.cep = req.body.cep;
            usuario.estado = req.body.estado;
            usuario.cidade = req.body.cidade;
            usuario.senha = req.body.senha;
            let result = await usuario.atualizar();
            if (result) {
                res.send({ ok: true, msg: "Atualização realizada com sucesso!" });
            }
            else {
                res.send({ ok: false, msg: "Erro ao atualizar usuário" });
            }
        }
        else {
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }
}

module.exports = UsuarioController;
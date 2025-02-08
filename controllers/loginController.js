const MedicoModel = require("../models/medicoModel");

class LoginController {

    loginView(req, res) {
        res.render('Usuario/login.ejs');
    }

    async login(req, res) {
        let msg = "";
        if(req.body.email != null && req.body.senha != null) {
            let medico = new MedicoModel();
            medico = await medico.obterPorEmailSenha(req.body.email, req.body.senha);
            if(medico != null && medico.ativo == 1) {
                res.cookie("usuarioLogado", medico.cro);
                res.redirect("/gerenciar");
            }
            else {
                msg = "Usuário/Senha incorretos!";
            }
        }
        else {
            msg = "Usuário/Senha incorretos!";
        }
        res.render("Usuario/login.ejs", { msg });
    }
}

module.exports = LoginController;
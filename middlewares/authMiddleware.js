const MedicoModel = require("../models/medicoModel");

class AuthMiddleware {

    async verificarUsuarioLogado(req, res, next) {
        if(req.cookies.usuarioLogado) {
            let croMedico = req.cookies.usuarioLogado;
            let medico = new MedicoModel();
            medico  = await medico.obter(croMedico);
            if(medico) {
                req.medico = medico;
                res.locals.medico = medico;
                next();
            }
            else{
                res.redirect("/login");
            }
        }
        else{
            res.redirect("/login");
        }
    }

    async validarMedico(req, res, next) {
        if(req.cookies.usuarioLogado) {
            let croMedico = req.cookies.usuarioLogado;
            let medico = new MedicoModel();
            medico  = await medico.obter(croMedico);
            if(medico && medico.ativo == 1) {
                req.medico = medico;
                res.locals.medico = medico;
                next();
            }
            else{
                //não é valido
                res.redirect("/login");
            }
        }
        else{
            res.redirect("/login");
        }
    }
}

module.exports = AuthMiddleware
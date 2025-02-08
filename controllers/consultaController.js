const ConsultaModel = require("../models/consultaModel");
const MedicoModel = require("../models/medicoModel");
const UsuarioModel = require("../models/usuarioModel");

class ConsultaController {

    // Método para excluir uma consulta pelo ID
    async excluir(req, res) {
        let idConsulta = req.params.idConsulta;
        let consulta = new ConsultaModel();
        let result = await consulta.excluir(idConsulta);

        let msg = result.success ? "Consulta excluída com sucesso!" : "Erro ao excluir Consulta!";
        res.send({ ok: result.success, msg: msg });
    }

    async atualizarView(req, res) {
        let idConsulta = req.params.id;
        let consulta = new ConsultaModel();
        consulta = await consulta.obter(idConsulta);
        let paciente = new UsuarioModel();
        paciente = await paciente.listar();
        let medico = new MedicoModel();
        medico = await medico.listar();
        res.render("Usuario/Cadastro/cadastroConsulta.ejs", { ConsultaAlteracao: consulta, pacientes: paciente, medicos: medico });
    }

    async atualizar(req, res) {
        if (req.body.id &&
            req.body.idPaciente &&
            req.body.nome &&
            req.body.dataAgendada &&
            req.body.horaAgendada &&
            req.body.croMedico
        ) {
            let consulta = new ConsultaModel();
            consulta.id = req.body.id;
            consulta.idPaciente = req.body.idPaciente;
            consulta.nome = req.body.nome;
            consulta.dataAgendada = req.body.dataAgendada;
            consulta.horaAgendada = req.body.horaAgendada;
            consulta.croMedico = req.body.croMedico;

            let result = await consulta.atualizar();
            if (result) {
                res.send({ ok: true, msg: "Atualização realizada com sucesso!" });
            }
            else {
                res.send({ ok: false, msg: "Erro ao atualizar Consulta" });
            }
        }
        else {
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }

}

module.exports = ConsultaController;

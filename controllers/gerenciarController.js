const UsuarioModel = require("../models/usuarioModel");
const MedicoModel = require("../models/medicoModel");
const ExameModel = require("../models/exameModel");
const ConsultaModel = require("../models/consultaModel");
const FuncionarioModel = require("../models/funcionarioModel");
const CargoModel = require("../models/cargoModel");

class GerenciarController{

    gerenciarView(req, res){
        res.render('Gerenciar/gerenciar.ejs', {layout: false});
    }

    async gerenciarConsultas(req, res){
        let consultaModel = new ConsultaModel();
        let listaConsultas = await consultaModel.listar();
        res.render('Gerenciar/gerenciarConsultas.ejs', {layout: false, consultas: listaConsultas});
    }
     async gerenciarExames(req, res){
        let exameModel = new ExameModel();
        let listaExames = await exameModel.listar();
        res.render('Gerenciar/gerenciarExames.ejs', {layout: false, exames : listaExames});
    }

    async gerenciarPacientes(req, res){
        let usuarioModel = new UsuarioModel();
        let listaUsuarios= await usuarioModel.listar();
        res.render('Gerenciar/gerenciarPacientes.ejs', {layout: false, usuarios: listaUsuarios});
    }

    async gerenciarMedicos(req, res){
        let medicoModel = new MedicoModel();
        let listaMedicos = await medicoModel.listar();
        res.render('Gerenciar/gerenciarMedicos.ejs', {layout: false, medicos: listaMedicos});
    }

    async gerenciarFuncionarios(req, res){
        let funcionarioModel = new FuncionarioModel();
        let listaFuncionarios = await funcionarioModel.listar();
        let listaCargo = await funcionarioModel.listarCargo();
        res.render('Gerenciar/gerenciarFuncionarios.ejs',{layout: false, funcionarios: listaFuncionarios, cargo:listaCargo});
    }
    
    async gerenciarCargos(req, res){
        let cargos = new CargoModel();
        let listaCargos = await cargos.listar();
        res.render('Gerenciar/gerenciarCargos.ejs', {layout: false, cargos : listaCargos});
    }

    gerenciarOpcoes(req, res){
        res.render('Gerenciar/opcoes.ejs');
    }

    opcoesRHView(req, res){
        res.render('Gerenciar/opcoesRH.ejs');
    }

    async listarComBusca(req, res) {
        let func = new FuncionarioModel();
        let listaCargo = await func.listarCargo();
        let funcionarios = await func.listarPedidos(req.body.termo, req.body.tipoBusca);
        res.send({listaFiltrada: funcionarios, cargo: listaCargo});
    }

    async listarComBuscaExame(req, res) {
        let exame = new ExameModel();
        let exames = await exame.listarExames(req.body.termo);
        res.send({listaFiltrada: exames});
    }

    async listarComBuscaPaciente(req, res) {
        let usuario = new UsuarioModel();
        let listaUsarios = await usuario.listarPacientes(req.body.termo, req.body.tipoBusca);
        res.send({listaFiltrada: listaUsarios});
    }

    async listarComBuscaMedicos(req, res) {
        let medico = new MedicoModel();
        let listaMedicos = await medico.listarMedicos(req.body.termo, req.body.tipoBusca);
        res.send({listaFiltrada: listaMedicos});
    }
}

module.exports = GerenciarController;

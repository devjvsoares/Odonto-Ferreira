const express = require('express');
const GerenciarController = require('../controllers/gerenciarController');
const AuthMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

let auth = new AuthMiddleware();
let ctrl = new GerenciarController();
router.get('/',auth.verificarUsuarioLogado, ctrl.gerenciarView);

router.get('/consultas', auth.verificarUsuarioLogado,ctrl.gerenciarConsultas);

router.get('/cargos', auth.verificarUsuarioLogado,ctrl.gerenciarCargos);

router.get('/exames',auth.verificarUsuarioLogado, ctrl.gerenciarExames);
router.post('/exames', auth.verificarUsuarioLogado,ctrl.listarComBuscaExame);

router.get('/pacientes', auth.verificarUsuarioLogado,ctrl.gerenciarPacientes);
router.post('/pacientes',auth.verificarUsuarioLogado, ctrl.listarComBuscaPaciente);

router.get('/medicos',auth.verificarUsuarioLogado, ctrl.gerenciarMedicos);
router.post('/medicos', auth.verificarUsuarioLogado,ctrl.listarComBuscaMedicos);

router.get('/funcionarios',auth.verificarUsuarioLogado,ctrl.gerenciarFuncionarios);
router.post('/funcionarios',auth.verificarUsuarioLogado, ctrl.listarComBusca);


module.exports = router;
const express = require('express');
const CadastroController = require('../controllers/cadastroController');
const GerenciarController = require('../controllers/gerenciarController');

const router = express.Router();

let ctrl = new CadastroController();
let ctrlGerenciar = new GerenciarController();
router.get('/paciente', ctrl.cadastroViewPaciente);
router.post('/paciente', ctrl.cadastroPaciente);
router.get('/medico', ctrl.cadastroMedicoView);
router.post('/medico', ctrl.cadastroMedico);
router.get('/exame', ctrl.cadastroExameView);
router.post('/exame', ctrl.cadastroExame);
router.get('/funcionarios', ctrl.cadastroFuncionarioView);
router.post('/funcionarios', ctrl.cadastroFuncionario);
router.get('/cargos', ctrl.cadastroCargoView);
router.post('/cargos', ctrl.cadastroCargos);
router.get('/consultas', ctrl.cadastroConsultaView);
router.post('/consultas', ctrl.cadastroConsulta);

router.get('/opcoes', ctrlGerenciar.gerenciarOpcoes);

module.exports = router;
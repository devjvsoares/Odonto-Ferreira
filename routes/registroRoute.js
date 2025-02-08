const express = require('express');
const router = express.Router();

const AtestadoController = require('../controllers/atestadoController');
const PontoController = require('../controllers/pontoController');
const GerenciarController = require('../controllers/gerenciarController');
const CadastroController = require('../controllers/cadastroController');
const pontoController = require('../controllers/pontoController');
const FeriasController = require('../controllers/feriasController');
const FaltasController = require('../controllers/faltasController');
const FolhaController = require('../controllers/folhaController');
let ctrlCadastro = new CadastroController();
let ctrl = new GerenciarController();

router.get('/', ctrl.opcoesRHView);

router.get('/atestado', AtestadoController.registroAtestadoView);
router.post('/atestado', ctrlCadastro.cadastroAtestado);
router.get('/atestado/excluir/:id', AtestadoController.excluir);
router.get('/atestado/atualizar/:id', AtestadoController.atualizarView)
router.post('/atestado/atualizar', AtestadoController.atualizar);


router.get('/ponto', PontoController.registroPontoView);
router.post('/ponto', ctrlCadastro.cadastroPonto);
router.get('/ponto/excluir/:id', PontoController.excluir);
router.get('/ponto/atualizar/:id', PontoController.atualizarView)
router.post('/ponto/atualizar', PontoController.atualizar);

router.get('/faltas', FaltasController.registroFaltasView);
router.post('/faltas', ctrlCadastro.cadastroFaltas);
router.get('/faltas/excluir/:id', FaltasController.excluir);
router.get('/faltas/atualizar/:id', FaltasController.atualizarView);
router.post('/faltas/atualizar', FaltasController.atualizar);

router.get('/ferias', FeriasController.registroFeriasView);
router.post('/ferias', ctrlCadastro.cadastroFerias);
router.get('/ferias/excluir/:id', FeriasController.excluir);
router.get('/ferias/atualizar/:id', FeriasController.atualizarView);
router.post('/ferias/atualizar', FeriasController.atualizar);


router.get('/relatorio-atestado', AtestadoController.relatorioAtestado);
router.post('/relatorio-atestado', AtestadoController.listarComBusca);
router.get('/relatorio-ponto', PontoController.relatorioPonto);
router.post('/relatorio-ponto', PontoController.listarComBusca);
router.get('/relatorio-ferias', FeriasController.relatorioFerias);
router.post('/relatorio-ferias', FeriasController.listarComBusca);
router.get('/relatorio-faltas', FaltasController.relatorioFaltas);
router.post('/relatorio-faltas', FaltasController.listarComBusca);

router.get('/relatorio-pagamento', FolhaController.relatorioFolhasView);



module.exports = router;

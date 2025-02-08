const express = require('express');
const ConsultaController = require('../controllers/consultaController');
const GerenciarController = require('../controllers/gerenciarController');

const router = express.Router();

let ctrl = new ConsultaController();
let ctrlgerenciar = new GerenciarController();
router.get('/', ctrlgerenciar.gerenciarConsultas);
router.get('/excluir/:idConsulta', ctrl.excluir);
router.get('/atualizar/:id', ctrl.atualizarView)
router.post('/atualizar', ctrl.atualizar);
module.exports = router;

const express = require('express');
const FuncionarioController= require('../controllers/funcionarioController');
const GerenciarController = require('../controllers/gerenciarController');

const router = express.Router();
let ctrl = new FuncionarioController();
let ctrlgerenciar = new GerenciarController();

router.get('/', ctrlgerenciar.gerenciarFuncionarios);
router.get('/excluir/:id', ctrl.excluir);
router.get('/atualizar/:id', ctrl.atualizarView)
router.post('/atualizar', ctrl.atualizar);

module.exports = router;

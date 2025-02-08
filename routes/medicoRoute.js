const express = require('express');
const MedicoController = require('../controllers/medicoController');
const GerenciarController = require('../controllers/gerenciarController');

const router = express.Router();

let ctrl = new MedicoController();
let ctrlgerenciar = new GerenciarController();
router.get('/', ctrlgerenciar.gerenciarMedicos);
router.get('/excluir/:cro', ctrl.excluir);
router.get('/atualizar/:cro', ctrl.atualizarView)
router.post('/atualizar', ctrl.atualizar);
module.exports = router;
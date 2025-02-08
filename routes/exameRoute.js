const express = require('express');
const exameController = require('../controllers/exameController');

const router = express.Router();
let ctrl = new exameController();

router.get('/excluir/:id_ex', ctrl.excluir);
router.get('/atualizar/:id', ctrl.atualizarView);
router.post('/atualizar', ctrl.atualizar);

module.exports = router;
const express = require('express');
const UsuarioController = require('../controllers/usuarioController');

const router = express.Router();

let ctrl = new UsuarioController();
router.get('/', ctrl.listagemView);
router.get('/excluir/:id', ctrl.excluir);
router.get('/atualizar/:id', ctrl.atualizarView)
router.post('/atualizar', ctrl.atualizar);

module.exports = router;
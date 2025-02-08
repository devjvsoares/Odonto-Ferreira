const express = require('express');
const CargoController = require('../controllers/cargoController');

const router = express.Router();
let ctrl = new CargoController();

router.get('/excluir/:id', ctrl.excluir);
router.get('/atualizar/:id', ctrl.atualizarView);
router.post('/atualizar', ctrl.atualizar);


module.exports = router;
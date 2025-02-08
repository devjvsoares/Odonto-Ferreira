const express = require('express');
const HomeController = require('../controllers/homeController');

const router = express.Router();

let ctrl = new HomeController();
router.get('/', ctrl.homeView);
router.get('/sobre', ctrl.sobreView);
router.get('/servicos', ctrl.servicosView);
router.get('/contatos', ctrl.contatoView);
router.get('/shutdown', (req, res) => {
    res.send('Servidor será encerrado.');
    console.log('Encerrando servidor...');
    process.exit(0); // Encerra o processo com status 0 (sucesso)
});

module.exports = router;
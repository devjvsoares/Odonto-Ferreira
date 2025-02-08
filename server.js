//importando os packages instalados
const express = require('express');
const homeRouter = require('./routes/homeRoute');
const loginRouter = require('./routes/loginRoute');
const usuarioRouter = require('./routes/usuarioRoute');
const cadastrarRouter = require('./routes/cadastrarRoute');
const gerenciarRouter = require('./routes/gerenciarRoute');
const medicoRouter = require('./routes/medicoRoute');
const registroRouter = require('./routes/registroRoute');
const funcionarioRouter = require('./routes/funcionarioRoute');
const exameRouter = require('./routes/exameRoute');
const cargoRouter = require('./routes/cargoRoute');
const consultaRouter = require('./routes/consultaRoute');
const cookieParser = require("cookie-parser");
const AuthMiddleware = require('./middlewares/authMiddleware');
const app = express();

//configurando a nossa pasta public como o nosso repositorio de arquivos estáticos (css, js, imagens)
app.use(express.static(__dirname + "/public"))
//configuração das nossas views para utilizar a ferramenta EJS
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configuração de onde ficará nossas views
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//configuração da nossa página de layout
app.use('/', homeRouter);
app.use('/login', loginRouter);
let auth = new AuthMiddleware();
app.use(auth.verificarUsuarioLogado);
app.use('/usuario', usuarioRouter);
app.use('/cadastrar', cadastrarRouter);
app.use('/gerenciar', gerenciarRouter);
app.use('/medico', medicoRouter);
app.use('/registro', registroRouter);
app.use('/funcionario',funcionarioRouter);
app.use('/exame', exameRouter);
app.use('/cargo',cargoRouter);
app.use('/consulta',consultaRouter);



//ponto de inicio do nosso servidor web
const server = app.listen('5000', function() {
    console.log('Servidor web iniciado');
});

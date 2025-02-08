const UsuarioModel = require("../models/usuarioModel");
const MedicoModel = require("../models/medicoModel");
const ExameModel = require("../models/exameModel");
const FuncionarioModel = require("../models/funcionarioModel");
const CargoModel = require("../models/cargoModel");
const PontoModel = require("../models/pontoModel");
const AtestadoModel = require("../models/atestadoModel");
const FeriasModel = require("../models/feriasModel");
const FaltasModel = require("../models/faltasModel");
const ConsultaModel = require("../models/consultaModel")

class CadastroController{

    cadastroViewPaciente(req,res){
        res.render("Usuario/Cadastro/cadastroPaciente.ejs", {layout:false});
    }

    async cadastroPaciente(req, res){
        let ok;
        
        if(req.body.nome && req.body.email && req.body.nascimento && req.body.cpf && req.body.endereco && req.body.num_end && req.body.bairro && req.body.cep && req.body.estado && req.body.cidade && req.body.senha && req.body.senha.length > 0) 
        {
            let usuario = new UsuarioModel();
            usuario.nome = req.body.nome;
            usuario.sexo = req.body.sexo;
            usuario.email = req.body.email;
            usuario.cpf = req.body.cpf;
            usuario.nascimento = req.body.nascimento;
            usuario.endereco = req.body.endereco;
            usuario.num_end = req.body.num_end;
            usuario.bairro = req.body.bairro;
            usuario.cep = req.body.cep;
            usuario.estado = req.body.estado;
            usuario.cidade = req.body.cidade;
            usuario.senha = req.body.senha;
            let result = await usuario.gravar();
            if(result) {
                res.send({ok: true, msg: "Cadastro realizado com sucesso!"});
            }
            else{
                res.send({ok: false, msg: "Erro ao cadastrar usuário"});
            }
        }
        else{
            res.send({ok: false, msg: "Parâmetros incorretos!"});
        }
            
    }

    cadastroMedicoView(req, res) {
        res.render('Usuario/Cadastro/cadastroMedico.ejs', { layout: false });
    }

   async cadastroMedico(req, res) {
        let ok;
        
        if (req.body.cro > 0 && req.body.nome != ""&& req.body.sexo!= "" && req.body.email != ""&& req.body.especialidade != ""&& req.body.nascimento!= "" && req.body.nascimento!= "" && req.body.cpf!= "" && req.body.cep!= "" && req.body.endereco!= "" &&req.body.numero!= "" && req.body.bairro!= "" && req.body.estado!= "" && req.body.cidade!= ""  && req.body.senha != "") {
            let medico = new MedicoModel();
            medico.cro = req.body.cro;
            medico.nome = req.body.nome;
            medico.sexo = req.body.sexo;
            medico.email = req.body.email;
            medico.especialidade = req.body.especialidade;
            medico.nascimento = req.body.nascimento;
            medico.cpf = req.body.cpf;
            medico.cep = req.body.cep;
            medico.endereco = req.body.endereco;
            medico.numero = req.body.numero;
            medico.bairro = req.body.bairro;
            medico.estado = req.body.estado;
            medico.cidade = req.body.cidade;
            medico.senha = req.body.senha;
            let result = await medico.gravar();
            if (result) {
                res.send({ ok: true, msg: "Cadastro realizado com sucesso!" });
    
            }
            else {
                res.send({ ok: false, msg: "Erro ao cadastrar Medico" });
            }
        }
        else {
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }

    async cadastroExameView(req, res) {
        let usuario = new UsuarioModel();
        let listaPaciente = await usuario.listarPaciente();
        let listaMedico = await usuario.listarMedico();
        let listaCargo = await usuario.listarCargo();
        res.render('Usuario/Cadastro/cadastroExame.ejs', { layout: false, exames : listaPaciente, medicos:listaMedico, cargo : listaCargo });
    }

    async cadastroExame(req, res) {
        let ok;
        if (req.body.id && req.body.nome && req.body.descricao && req.body.data && req.body.cro && req.body.custo && req.body.horario) {
            let exame = new ExameModel();
            exame.Id = req.body.id;
            exame.nome = req.body.nome;
            exame.descricao = req.body.descricao;
            exame.data = req.body.data;
            exame.cro_med = req.body.cro;
            exame.custo = req.body.custo;
            exame.horario = req.body.horario;
    
            try {
                let result = await exame.gravar();
                if (result) {
                    res.send({ ok: true, msg: "Cadastro realizado com sucesso!" });
                } else {
                    res.send({ ok: false, msg: "Erro ao cadastrar Exame" });
                }
            } catch (error) {
                console.log("Erro ao gravar exame: ", error);
                res.send({ ok: false, msg: "Erro ao cadastrar Exame" });
            }
        } else {
            console.log("Alguns parâmetros estão ausentes ou inválidos.");
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }

    async cadastroFuncionarioView(req, res) {
        let funcionario = new FuncionarioModel();
        let listaFuncionarios = await funcionario.listar();
        let listaMedicos = await funcionario.listarMedico();
        let listaCargo = await funcionario.listarCargo();
        res.render('Usuario/Cadastro/cadastroFuncionario.ejs', { layout: false, funcionario : listaFuncionarios, cargo:listaCargo, medico: listaMedicos });
    }

    async cadastroFuncionario(req, res) {
        let ok;
        if (req.body.nome && req.body.data_adm && req.body.email && req.body.nascimento && req.body.endereco && req.body.bairro && req.body.cep && req.body.cpf && req.body.cargo != "") {
            let funcionario = new FuncionarioModel();
            funcionario.id = req.body.id;
            funcionario.nome = req.body.nome;
            funcionario.data_adm = req.body.data_adm;
            funcionario.email = req.body.email;
            funcionario.endereco = req.body.endereco;
            funcionario.nascimento = req.body.nascimento;
            funcionario.bairro = req.body.bairro;
            funcionario.cep = req.body.cep;
            funcionario.cpf = req.body.cpf;
            funcionario.cargo = req.body.cargo;

            let result = await funcionario.gravar();
            if (result) {
                res.send({ ok: true, msg: "Cadastro realizado com sucesso!" });
    
            }
            else {
                res.send({ ok: false, msg: "Erro ao cadastrar Funcionario" });
            }
        }
        else {
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }

    async cadastroConsultaView(req, res) {
        let usuario = new UsuarioModel();
        let listaPaciente = await usuario.listarPaciente();
        let listaMedico = await usuario.listarMedico();
        let listaCargo = await usuario.listarCargo();
        res.render('Usuario/Cadastro/cadastroConsulta.ejs', { layout: false, consultas : listaPaciente, medicos:listaMedico, cargo : listaCargo });
    }

    async cadastroConsulta(req, res) {
        let ok;
        if (req.body.nome && req.body.dataAgendada && req.body.horaAgendada && req.body.idPaciente && req.body.croMedico) {
            let consulta = new ConsultaModel();
            consulta.nome = req.body.nome;
            consulta.dataAgendada = req.body.dataAgendada;
            consulta.horaAgendada = req.body.horaAgendada;
            consulta.idPaciente = req.body.idPaciente;
            consulta.croMedico = req.body.croMedico;
    
            try {
                let result = await consulta.gravar();
                if (result) {
                    res.send({ ok: true, msg: "Cadastro realizado com sucesso!" });
                } else {
                    res.send({ ok: false, msg: "Erro ao cadastrar Consulta" });
                }
            } catch (error) {
                res.send({ ok: false, msg: "Erro ao cadastrar consulta" });
            }
        } else {
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }

    cadastroCargoView(req, res){
        res.render('Usuario/Cadastro/cadastroCargo.ejs',{layout: false});
    }

    async cadastroCargos(req, res) {
        let ok;
        console.log(req.body);
        if (req.body.nome && req.body.salario && req.body.carga_horaria !== "") {
            let cargo = new CargoModel();
            cargo.nome = req.body.nome;
            cargo.salario = req.body.salario;
            cargo.carga_horaria = req.body.carga_horaria;
    
            try {
                let result = await cargo.gravar();
                if (result) {
                    res.send({ ok: true, msg: "Cadastro realizado com sucesso!" });
                } else {
                    res.send({ ok: false, msg: "Erro ao cadastrar Cargo" });
                }
            } catch (error) {
                console.log("Erro ao gravar Cargo: ", error);
                res.send({ ok: false, msg: "Erro ao cadastrar Cargo" });
            }
        } else {
            console.log("Alguns parâmetros estão ausentes ou inválidos.");
            res.send({ ok: false, msg: "Parâmetros incorretos!" });
        }
    }

    async cadastroPonto(req, res) {
        let ok;
        if (true) {
            let ponto = new PontoModel();
            ponto.nome = req.body.nome;
            ponto.data = req.body.data;
            ponto.horaEntrada = req.body.horaEntrada;
            ponto.horaSaidaAlmoco =req.body.horaSaidaAlmoco;
            ponto.horaRetornoAlmoco = req.body.horaRetornoAlmoco;
            ponto.horaSaida = req.body.horaSaida;
    
            try {
                let result = await ponto.gravar();
                if (result) {
                    res.send({ ok: true, msg: "Cadastro realizado com sucesso!" });
                } else {
                    res.send({ ok: false, msg: "Erro ao cadastrar Ponto" });
                }
            } catch (error) {
                console.log("Erro ao gravar Ponto: ", error);
                res.send({ ok: false, msg: "Erro ao cadastrar Ponto" });
            }
        } else {
        }
    }

    async cadastroAtestado(req, res) {
        let ok;
        if (true) {
            let atestado = new AtestadoModel();
            atestado.nome = req.body.nome;
            atestado.dataInicio = req.body.dataInicio;
            atestado.dataFim = req.body.dataFim;
            atestado.descricao = req.body.descricao;
    
            try {
                let result = await atestado.gravar();
                if (result) {
                    res.send({ ok: true, msg: "Cadastro realizado com sucesso!" });
                } else {
                    res.send({ ok: false, msg: "Erro ao cadastrar Atestado" });
                }
            } catch (error) {
                console.log("Erro ao gravar Atestado: ", error);
                res.send({ ok: false, msg: "Erro ao cadastrar Atestado" });
            }
        } else {
        }
    }


    async cadastroFerias(req, res) {
        let ok;
        if (req.body.nome !=""  && req.body.dataInicio != "" && req.body.dataFim !=""  && req.body.status !="" ) {
            let ferias = new FeriasModel();
            ferias.nome = req.body.nome;
            ferias.dataInicio = req.body.dataInicio;
            ferias.dataFim = req.body.dataFim;
            ferias.status = req.body.status;
            try {
                let result = await ferias.gravar();
                if (result) {
                    res.send({ ok: true, msg: "Cadastro realizado com sucesso!" });
                } else {
                    res.send({ ok: false, msg: "Erro ao cadastrar Ferias" });
                }
            } catch (error) {
                console.log("Erro ao gravar Ferias: ", error);
                res.send({ ok: false, msg: "Erro ao cadastrar Ferias" });
            }
        } else {
            console.log("Parametros Incorretos");
        }
    }

    async cadastroFaltas(req, res) {
        let ok;
        if (req.body.nome !=""  && req.body.dataFalta != "" && req.body.Justificativa !="" ) {
            let faltas = new FaltasModel();
            faltas.nome = req.body.nome;
            faltas.dataFalta = req.body.dataFalta;
            faltas.Justificativa = req.body.Justificativa;
            try {
                let result = await faltas.gravar();
                if (result) {
                    res.send({ ok: true, msg: "Cadastro realizado com sucesso!" });
                } else {
                    res.send({ ok: false, msg: "Erro ao cadastrar Ferias" });
                }
            } catch (error) {
                console.log("Erro ao gravar Ferias: ", error);
                res.send({ ok: false, msg: "Erro ao cadastrar Ferias" });
            }
        } else {
            console.log("Parametros Incorretos");
        }
    }
}

module.exports = CadastroController;
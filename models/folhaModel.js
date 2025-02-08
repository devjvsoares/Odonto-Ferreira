const Database = require('../utils/database');
const FeriasModel = require('./feriasModel');

const db = new Database();

class FolhaModel {
    #id
    #mes
    #ano
    #idFunc
    #salario

    constructor(id, mes, ano, idFunc, salario) {
        this.#id = id;
        this.#mes = mes;
        this.#ano = ano;
        this.#idFunc = idFunc;
        this.#salario = salario;
        
    }

    get id(){
        return this.#id;
    }

    set id(novo_id){
        this.#id = novo_id;
    }

    get mes(){
        return this.#mes;
    }

    set mes(novo_mes){
        this.#mes = novo_mes;
    }

    get ano(){
        return this.#ano;
    }

    set ano(novo_ano){
        this.#ano = novo_ano;
    }

    get idFunc(){    
        return this.#idFunc;
    }    

    set idFunc(novo_idFunc){    
        this.#idFunc = novo_idFunc;
    }

    get salario(){    
        return this.#salario;
    }

    set salario(novo_salario){    
        this.#salario = novo_salario;
    }
   

    async listar(){
        const sql = `select id, mes, ano, id_funcionario, salario from FolhaPagamento`;
        const resultados = await db.ExecutaComando(sql);
        const listaFolhas = [];
        for (let registro of resultados){
            listaFolhas.push(new FolhaModel(registro["id"],
                                                registro["mes"],
                                                registro["ano"],
                                                registro["id_funcionario"],   
                                                registro["salario"]
            ));
        }
        return listaFolhas;
    }

    async listarMedia() {
        const sql = `SELECT 
                        AVG(salario) AS media_salarial_mensal
                     FROM FolhaPagamento
                     WHERE mes = 12 AND ano = 2024;`;
    
        const resultados = await db.ExecutaComando(sql);
    
        if (resultados.length > 0) {
            return resultados[0]["media_salarial_mensal"];
        }
    
        return null; // Retorna null caso não haja resultados
    }

    async listarTotal() {
        const sql = `SELECT 
                    SUM(salario) AS folha_salarial_mensal
                FROM FolhaPagamento
                WHERE mes = 12 AND ano = 2024;`;
    
        const resultados = await db.ExecutaComando(sql);
    
        if (resultados.length > 0) {
            return resultados[0]["folha_salarial_mensal"];
        }
    
        return null; // Retorna null caso não haja resultados
    }



    
}

module.exports = FolhaModel;


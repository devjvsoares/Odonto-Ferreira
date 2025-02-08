const Database = require('../utils/database');

const db = new Database();

class AtestadoModel {
    #id
    #nome
    #dataInicio
    #dataFim
    #descricao

    constructor(id, nome, dataInicio, dataFim, descricao) {
        this.#id = id;
        this.#nome = nome;
        this.#dataInicio = dataInicio;
        this.#dataFim = dataFim;
        this.#descricao = descricao;
        
    }

    get id(){
        return this.#id;
    }

    set id(novo_id){
        this.#id = novo_id;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novo_nome){
        this.#nome = novo_nome;
    }

    get dataInicio(){
        return this.#dataInicio;
    }

    set dataInicio(novo_dataInicio){
        this.#dataInicio = novo_dataInicio;
    }

    get dataFim(){    
        return this.#dataFim;
    }    

    set dataFim(novo_dataFim){    
        this.#dataFim = novo_dataFim;
    }

    get descricao(){    
        return this.#descricao;
    }

    set descricao(novo_descricao){    
        this.#descricao = novo_descricao;
    }

    async listarAtestado(termo) {
    
        let whereFiltro = "";
        if (termo != "") {
            whereFiltro = ` WHERE Nome_func LIKE '%${termo}%' `;
       
        }
        else if (termo == "") {
            whereFiltro = "";
        }
    
        let sql = `SELECT * FROM RegistroAtestado ${whereFiltro}`;
    
    
        const rows = await db.ExecutaComando(sql);
    
        const listaAtestado = [];
    
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
    
            listaAtestado.push(new AtestadoModel(
                row["id"], 
                row["Nome_func"],
                row["Data_inicio"],
                row["Data_fim"],
                row["Descricao"] 
                
            ));
        }
    
        return listaAtestado;
    }

   

    async gravar() {
        let sql = 'INSERT INTO RegistroAtestado (Nome_func, Data_inicio, Data_fim, Descricao) VALUES (?,?,?,?)';
            let valores = [this.#nome, this.#dataInicio, this.#dataFim, this.#descricao];

        let result = await db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async listar(){
        const sql = `select id, Nome_func, Data_inicio, Data_fim, Descricao from RegistroAtestado`;
        const resultados = await db.ExecutaComando(sql);
        const listaAtestado = [];
        for (let registro of resultados){
            listaAtestado.push(new AtestadoModel(registro["id"],
                                                registro["Nome_func"],
                                                registro["Data_inicio"],
                                                registro["Data_fim"],   
                                                registro["Descricao"]
            ));
        }
        return listaAtestado;
    }

    async obter(id) {
        let sql = "select * from RegistroAtestado where id = ?";
        let valores = [id];

        let row = await db.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new AtestadoModel(row[0]["id"],
                                    row[0]["Nome_func"],
                                    row[0]["Data_inicio"],
                                    row[0]["Data_fim"],
                                    row[0]["Descricao"]
            )
        }else
            return null;

    }

    async atualizar() {
        let sql = `UPDATE RegistroAtestado 
                   SET id = ?,
                       Nome_func = ?, 
                       Data_inicio = ?, 
                       Data_fim = ?, 
                       Descricao = ?
                   WHERE id = ?`;

        let valores = [
            this.#id, this.#nome, this.#dataInicio, this.#dataFim, this.#descricao, this.#id
        ];
    
        let result = await db.ExecutaComandoNonQuery(sql, valores);
    
        return result;
    }

    async excluir(id) {
        let sql = `DELETE FROM RegistroAtestado WHERE id = ?`;
        try {
            let result = await db.ExecutaComandoNonQuery(sql, [id]);
            return { success: true, result };
        } catch (error) {

            console.error('Erro ao excluir:', error);
            return { success: false, error };
        }
    }



    toJSON(){
        return{
            id: this.#id,
            nome: this.#nome,
            dataInicio: this.#dataInicio,
            dataFim: this.#dataFim,
            descricao: this.#descricao
        }
    }
    
}

module.exports = AtestadoModel;


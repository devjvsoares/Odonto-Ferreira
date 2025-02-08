const Database = require('../utils/database');

const db = new Database();

class FeriasModel {
    #id
    #nome
    #dataInicio
    #dataFim
    #status

    constructor(id, nome, dataInicio, dataFim, status) {
        this.#id = id;
        this.#nome = nome;
        this.#dataInicio = dataInicio;
        this.#dataFim = dataFim;
        this.#status = status;
        
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

    get status(){    
        return this.#status;
    }

    set status(novo_status){    
        this.#status = novo_status;
    }

    async listarAtestado(termo) {
    
        let whereFiltro = "";
        if (termo != "") {
            whereFiltro = ` WHERE Nome_func LIKE '%${termo}%' `;
        }
        else if (termo == "") {
            whereFiltro = "";
        }
    
        let sql = `SELECT * FROM RegistroFerias ${whereFiltro}`;
    
        const rows = await db.ExecutaComando(sql);
    
        const listaFerias = [];
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
    
            listaFerias.push(new FeriasModel(
                row["id"], 
                row["Nome_func"],
                row["Data_inicio"],
                row["Data_fim"],
                row["Status"] 
                
            ));
        }
    
        return listaFerias;
    }

   

    async gravar() {
        let sql = 'INSERT INTO RegistroFerias (Nome_func, Data_inicio, Data_fim, Status) VALUES (?,?,?,?)';
            let valores = [this.#nome, this.#dataInicio, this.#dataFim, this.#status];

        let result = await db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async listar(){
        const sql = `select id, Nome_func, Data_inicio, Data_fim, Status from RegistroFerias`;
        const resultados = await db.ExecutaComando(sql);
        const listaFerias = [];
        for (let registro of resultados){
            listaFerias.push(new FeriasModel(registro["id"],
                                                registro["Nome_func"],
                                                registro["Data_inicio"],
                                                registro["Data_fim"],   
                                                registro["Status"]
            ));
        }
        return listaFerias;
    }

    async obter(id) {
        let sql = "select * from RegistroFerias where id = ?";
        let valores = [id];

        let row = await db.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new FeriasModel(row[0]["id"],
                                    row[0]["Nome_func"],
                                    row[0]["Data_inicio"],
                                    row[0]["Data_fim"],
                                    row[0]["Status"]
            )
        }else
            return null;

    }

    async atualizar() {
        let sql = `UPDATE RegistroFerias
                   SET id = ?,
                       Nome_func = ?, 
                       Data_inicio = ?, 
                       Data_fim = ?, 
                       Status = ?
                   WHERE id = ?`;

        let valores = [
            this.#id, this.#nome, this.#dataInicio, this.#dataFim, this.#status, this.#id
        ];
    
        let result = await db.ExecutaComandoNonQuery(sql, valores);
    
        return result;
    }

    async excluir(id) {
        let sql = `DELETE FROM RegistroFerias WHERE id = ?`;
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
            status: this.#status
        }
    }
    
}

module.exports = FeriasModel;


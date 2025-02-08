const Database = require('../utils/database');

const db = new Database();

class FaltasModel {
    #id
    #nome
    #dataFalta
    #Justificativa

    constructor(id, nome, dataFalta, Justificativa) {
        this.#id = id;
        this.#nome = nome;
        this.#dataFalta = dataFalta;
        this.#Justificativa = Justificativa;
        
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

    get dataFalta(){
        return this.#dataFalta;
    }

    set dataFalta(novo_dataFalta){
        this.#dataFalta = novo_dataFalta;
    }

    get Justificativa(){    
        return this.#Justificativa;
    }    

    set Justificativa(novo_Justificativa){    
        this.#Justificativa = novo_Justificativa;
    }

    async listarFaltas(termo) {
        let whereFiltro = "";
        if (termo != "") {
            whereFiltro = ` WHERE Nome_func LIKE '%${termo}%' `;
        }
        else if (termo == "") {
            whereFiltro = "";
        }
    
        let sql = `SELECT * FROM RegistroFaltas ${whereFiltro}`;
    
        const rows = await db.ExecutaComando(sql);
    
        const listaFaltas = [];
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
    
            listaFaltas.push(new FaltasModel(
                row["id"], 
                row["Nome_func"],
                row["Data_falta"],
                row["Justificativa"]
            ));
        }
    
        return listaFaltas;
    }

   

    async gravar() {
        let sql = 'INSERT INTO RegistroFaltas (Nome_func, Data_falta, Justificativa) VALUES (?,?,?)';
            let valores = [this.#nome, this.#dataFalta, this.#Justificativa];

        let result = await db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async listar(){
        const sql = `select id, Nome_func, Data_falta, Justificativa from RegistroFaltas`;
        const resultados = await db.ExecutaComando(sql);
        const listaFaltas = [];
        for (let registro of resultados){
            listaFaltas.push(new FaltasModel(registro["id"],
                                                registro["Nome_func"],
                                                registro["Data_falta"],
                                                registro["Justificativa"]
            ));
        }
        return listaFaltas;
    }

    async obter(id) {
        let sql = "select * from RegistroFaltas where id = ?";
        let valores = [id];

        let row = await db.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new FaltasModel(row[0]["id"],
                                    row[0]["Nome_func"],
                                    row[0]["Data_falta"],
                                    row[0]["Justificativa"]
            )
        }else
            return null;

    }

    async atualizar() {
        let sql = `UPDATE RegistroFaltas
                   SET id = ?,
                       Nome_func = ?, 
                       Data_falta = ?, 
                       Justificativa = ?
                   WHERE id = ?`;

        let valores = [
            this.#id, this.#nome, this.#dataFalta, this.#Justificativa, this.#id
        ];
    
        let result = await db.ExecutaComandoNonQuery(sql, valores);
    
        return result;
    }

    async excluir(id) {
        let sql = `DELETE FROM RegistroFaltas WHERE id = ?`;
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
            dataFalta: this.#dataFalta,
            Justificativa: this.#Justificativa
        }
    }
    
}

module.exports = FaltasModel;


const Database = require('../utils/database');

const db = new Database();

class ExameModel{
    #id_ex
    #nome
    #data
    #cro_med
    #descricao
    #Id
    #custo
    #horario

    constructor(id_ex, nome, data, cro_med, descricao, Id, custo, horario){
        this.#id_ex=id_ex;
        this.#nome=nome;
        this.#data=data;
        this.#cro_med=cro_med;
        this.#descricao=descricao;
        this.#Id=Id;
        this.#custo=custo;
        this.#horario=horario;
        
    }

    get id_ex(){
        return this.#id_ex;
    }

    set id_ex(novo_idexame){
        this.#id_ex = novo_idexame;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novo_nome){
        this.#nome = novo_nome;
    }
    get data(){
        return this.#data;
    }

    set data(nova_data){
        this.#data = nova_data;
    }

    get cro_med(){
        return this.#cro_med;
    }

    set cro_med(novo_cro_med){
        this.#cro_med = novo_cro_med;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(nova_descricao){
        this.#descricao = nova_descricao;
    }

    
    get Id(){
        return this.#Id;
    }

    set Id(novo_Id){
        this.#Id = novo_Id;
    }

    
    get custo(){
        return this.#custo;
    }

    set custo(novo_custo){
        this.#custo = novo_custo;
    }

    get horario(){
        return this.#horario;
    }

    set horario(novo_horario){
        this.#horario = novo_horario;
    }

    
    async listar() {
        const sql = `select * from Exames`;
        const resultados = await db.ExecutaComando(sql);
        const listaExames = [];
        for (const registro of resultados){
            listaExames.push(new ExameModel(registro["Id_ex"],
                                                registro["Nome_ex"],
                                                registro["Data_ex"],
                                                registro["CRO_med"],
                                                registro["Descricao_ex"],
                                                registro["Id"],
                                                registro["Custo"],
                                                registro["Horario_ex"]
            ));
        }
        return listaExames;
    }

    async gravar(){
        const sql = 'insert into Exames(Id, Nome_ex, Descricao_ex, Data_ex, CRO_med, Custo,Horario_ex) values(?,?,?,?,?,?,?)';

        let valores = [this.#Id, this.#nome, this.#descricao, this.#data, this.#cro_med, this.#custo, this.#horario];
        let result = await db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async listarExames(termo) {
        let whereFiltro = "";
        if(termo == undefined){
            termo = "";
        }

        if (termo != "") {
            whereFiltro = ` where Data_ex = '${termo}' `;
        }
    
        let sql = `select * from Exames  
                   ${whereFiltro} 
                   order by Id_ex`;
    
        let rows = await db.ExecutaComando(sql);
    
        let lista = [];
    
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
    
            lista.push(new ExameModel(row["Id_ex"],
                                    row["Nome_ex"],
                                    row["Data_ex"],
                                    row["CRO_med"],
                                    row["Descricao_ex"],
                                    row["Id"],
                                    row["Custo"],
                                    row["Horario_ex"]
            ));
        }
        return lista;
    }

    async obter(id_ex) {
        let sql = "select * from Exames where Id_ex = ?";
        let valores = [id_ex];

        let row = await db.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new ExameModel(row[0]["Id_ex"],
                                    row[0]["Nome_ex"],
                                    row[0]["Data_ex"],
                                    row[0]["CRO_med"],
                                    row[0]["Descricao_ex"],
                                    row[0]["Id"],
                                    row[0]["Custo"],
                                    row[0]["Horario_ex"]
            )
        }else
            return null;
    }

    async excluir(id_ex) {

        let sql = `DELETE FROM Exames WHERE Id_ex = ?`;

        try {

            let result = await db.ExecutaComandoNonQuery(sql, [id_ex]);
            return { success: true, result };
        } catch (error) {
            console.error('Erro ao excluir:', error);
            return { success: false, error };
        }
    }

    async atualizar() {
        let sql = `UPDATE Exames
                    SET Nome_ex = ?, 
                        Data_ex = ?, 
                        CRO_med = ?, 
                        Descricao_ex = ?,
                        Id = ?, 
                        Custo = ?, 
                        Horario_ex = ?
                    WHERE Id_ex = ?`;

        let valores = [
            this.#nome,
            this.#data,
            this.#cro_med,
            this.#descricao,
            this.#Id,
            this.#custo,
            this.horario,
            this.#id_ex
        ];
        console.log("Valores enviados para a query:", valores);
        
        let result = await db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }


    toJSON() {
        return {
            id_ex: this.#id_ex,
            idPac:this.#Id,
            nome: this.#nome,
            descricao: this.#descricao,
            data: this.#data,
            cro: this.#cro_med,
            custo: this.#custo,
            horario: this.#horario
        }
    }

}

module.exports = ExameModel;

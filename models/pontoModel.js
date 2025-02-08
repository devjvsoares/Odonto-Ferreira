const Database = require('../utils/database');

const db = new Database();

class PontoModel {
    #id
    #nome
    #data
    #horaEntrada
    #horaSaidaAlmoco
    #horaRetornoAlmoco
    #horaSaida

    constructor(id, nome, data, horaEntrada,horaSaidaAlmoco,horaRetornoAlmoco,horaSaida) {
        this.#id = id;
        this.#nome = nome;
        this.#data = data;
        this.#horaEntrada = horaEntrada;
        this.#horaSaidaAlmoco = horaSaidaAlmoco;
        this.#horaRetornoAlmoco =horaRetornoAlmoco;
        this.#horaSaida = horaSaida;
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

    get data(){
        return this.#data;
    }

    set data(nova_data){
        this.#data = nova_data;
    }

    get horaEntrada(){
        return this.#horaEntrada;
    }

    set horaEntrada(nova_horaEntrada){
        this.#horaEntrada = nova_horaEntrada;
    }

    get horaSaidaAlmoco(){
        return this.#horaSaidaAlmoco;
    }

    set horaSaidaAlmoco(nova_horaSaidaAlmoco){
        this.#horaSaidaAlmoco = nova_horaSaidaAlmoco;
    }

    get horaRetornoAlmoco(){
        return this.#horaRetornoAlmoco;
    }

    set horaRetornoAlmoco(nova_horaRetornoAlmoco){
        this.#horaRetornoAlmoco = nova_horaRetornoAlmoco;
    }

    get horaSaida(){
        return this.#horaSaida;
    }

    set horaSaida(nova_horaSaida){
        this.#horaSaida = nova_horaSaida;
    }

    async listarPontos(termo, dataBusca) {
        console.log(termo);
        console.log(dataBusca);
        if(dataBusca == undefined){
            dataBusca = "";
        }
        if(termo == undefined){
            termo = "";
        }
    
        let whereFiltro = "";

        if (termo !== "" && dataBusca !== "") {
            whereFiltro = `WHERE Nome_func LIKE '%${termo}%' AND Data_ponto = '${dataBusca}'`;
        } else if (termo !== "") {
            whereFiltro = `WHERE Nome_func LIKE '%${termo}%'`;
        } else if (dataBusca !== "") {
            whereFiltro = `WHERE Data_ponto LIKE '%${dataBusca}%'`;
        }

        // Caso nenhum filtro seja aplicado, não adiciona WHERE
        let sql = `SELECT * FROM RegistroPonto ${whereFiltro}`;
        console.log(sql);
    
    
        const rows = await db.ExecutaComando(sql);
    
        const listaPonto = [];
    
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
    
            // Certifique-se de que os dados estão corretos
            listaPonto.push(new PontoModel(
                row["id"], 
                row["Nome_func"], 
                row["Data_ponto"], 
                row["Horario_entrada"], 
                row["Horario_saida_almoco"], 
                row["Horario_retorno_almoco"], 
                row["Horario_saida"]
            ));
        }
    
        return listaPonto;
    }

   

    async gravar() {
        let sql = 'INSERT INTO RegistroPonto (Nome_func, Data_ponto, Horario_entrada, Horario_saida_almoco, Horario_retorno_almoco,Horario_saida) VALUES (?,?,?,?,?,?)';
            let valores = [this.#nome, this.#data, this.#horaEntrada, this.#horaSaidaAlmoco, this.#horaRetornoAlmoco, this.#horaSaida];

        let result = await db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async listar(){
        const sql = `select id, Nome_func, Data_ponto, Horario_entrada,Horario_saida_almoco, Horario_retorno_almoco, Horario_saida from RegistroPonto`;
        const resultados = await db.ExecutaComando(sql);
        const listaPonto = [];
        for (let registro of resultados){
            listaPonto.push(new PontoModel(registro["id"],
                                                registro["Nome_func"],
                                                registro["Data_ponto"],
                                                registro["Horario_entrada"],
                                                registro["Horario_saida_almoco"],
                                                registro["Horario_retorno_almoco"],
                                                registro["Horario_saida"]
            ));
        }
        return listaPonto;
    }

    async obter(id) {
        let sql = "select * from RegistroPonto where id = ?";
        let valores = [id];

        let row = await db.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new PontoModel(row[0]["id"],
                                    row[0]["Nome_func"],
                                    row[0]["Data_ponto"],
                                    row[0]["Horario_entrada"],
                                    row[0]["Horario_saida_almoco"],
                                    row[0]["Horario_retorno_almoco"],
                                    row[0]["Horario_saida"]
            )
        }else
            return null;

    }

    async atualizar() {
        let sql = `UPDATE RegistroPonto 
                   SET id = ?,
                       Nome_func = ?, 
                       Data_ponto = ?, 
                       Horario_entrada = ?, 
                       Horario_saida_almoco = ?,
                       Horario_retorno_almoco = ?,
                       Horario_saida = ?
                   WHERE id = ?`;

        let valores = [
            this.#id, this.#nome, this.#data, this.#horaEntrada, this.#horaSaidaAlmoco, this.#horaRetornoAlmoco, this.#horaSaida, this.#id
        ];
    
        let result = await db.ExecutaComandoNonQuery(sql, valores);
    
        return result;
    }

    async excluir(id) {
        let sql = `DELETE FROM RegistroPonto WHERE id = ?`;
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
            data: this.#data,
            horaEntrada: this.#horaEntrada,
            horaSaidaAlmoco: this.#horaSaidaAlmoco,
            horaRetornoAlmoco: this.#horaRetornoAlmoco,
            horaSaida: this.#horaSaida
        }
    }
    
}

module.exports = PontoModel;


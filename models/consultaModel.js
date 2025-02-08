const Database = require('../utils/database');

const db = new Database();

class ConsultaModel{
    #id
    #nome
    #dataAgendada
    #horaAgendada
    #idPaciente
    #croMedico
    

    constructor(id, nome, dataAgendada, horaAgendada, idPaciente, croMedico){
        this.#id = id;
        this.#nome = nome;
        this.#dataAgendada = dataAgendada;
        this.#horaAgendada = horaAgendada;
        this.#idPaciente = idPaciente;
        this.#croMedico = croMedico;
        
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
    get dataAgendada(){
        return this.#dataAgendada;
    }

    set dataAgendada(nova_dataAgendada){    
        this.#dataAgendada = nova_dataAgendada;
    }

    get horaAgendada(){
        return this.#horaAgendada;
    }

    set horaAgendada(nova_horaAgendada){    
        this.#horaAgendada = nova_horaAgendada;
    }

    get idPaciente(){
        return this.#idPaciente;
    }

    set idPaciente(novo_idPaciente){    
        this.#idPaciente = novo_idPaciente;
    }

    get croMedico(){    
        return this.#croMedico;
    }    

    set croMedico(novo_croMedico){    
        this.#croMedico = novo_croMedico;
    }
    
    async listar() {
        const sql = `select * from Consultas`;
        const resultados = await db.ExecutaComando(sql);
        const listaConsultas = [];
        for (const registro of resultados){
            listaConsultas.push(new ConsultaModel(registro["Id_Cons"],
                                                registro["Nome"],
                                                registro["Data_Agendada"],
                                                registro["Hora_Agendada"],
                                                registro["Id"],
                                                registro["CRO_med"]
            ));
        }
        return listaConsultas;
    }

    async gravar(){
        const sql = 'insert into Consultas(Id_Cons, Nome, Data_Agendada, Hora_Agendada, Id, CRO_med) values(?,?,?,?,?,?)';

        let valores = [this.#id, this.#nome, this.#dataAgendada, this.#horaAgendada, this.#idPaciente, this.#croMedico];
        let result = await db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {
        const sql = `DELETE FROM Consultas WHERE Id_Cons = ?`;
        try {
            const result = await db.ExecutaComandoNonQuery(sql, [id]);
            return { success: true, result };
        } catch (error) {
            console.error('Erro ao excluir:', error);
            return { success: false, error };
        }
    }

    async obter(id) {
        const sql = `SELECT * FROM Consultas WHERE Id_Cons = ?`;
        const resultados = await db.ExecutaComando(sql, [id]);
    
        if (resultados.length > 0) {
            const registro = resultados[0];
            return new ConsultaModel(
                registro["Id_Cons"],
                registro["Nome"],
                registro["Data_Agendada"],
                registro["Hora_Agendada"],
                registro["Id"],
                registro["CRO_med"]
            );
        }
        return null;
    }
    

    async atualizar() {
        const sql = `UPDATE Consultas 
                     SET Id = ?, 
                         Nome = ?, 
                         Data_Agendada = ?, 
                         Hora_Agendada = ?, 
                         CRO_med = ? 
                     WHERE Id_Cons = ?`;
    
        const valores = [
            this.#idPaciente,
            this.#nome,
            this.#dataAgendada,
            this.#horaAgendada,
            this.#croMedico,
            this.#id
        ];
    
        let result = await db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }
    

}


module.exports = ConsultaModel;

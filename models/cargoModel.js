const Database = require('../utils/database');

const db = new Database();

class CargoModel{
    #id
    #nome
    #salario
    #carga_horaria

    constructor(id, nome, salario, carga_horaria){
        this.#id = id;
        this.#nome = nome;
        this.#salario = salario;
        this.#carga_horaria = carga_horaria;
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

    get salario(){
        return this.#salario;
    }

    set salario(novo_salario){
        this.#salario = novo_salario;
    }

    get carga_horaria(){
        return this.#carga_horaria;
    }

    set carga_horaria(nova_carga){
        this.#carga_horaria = nova_carga;
    }


    async gravar() {

        const sql = `INSERT INTO Cargos (Nome_cargo, Salario_cargo, Carga_horaria) VALUES (?, ?, ?)`;
        const valores = [this.#nome, this.#salario, this.#carga_horaria];

        const result = await db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async listar() {
        const sql = `select * from Cargos`;
        const resultados = await db.ExecutaComando(sql);
        const listaCargos = [];
        for (const registro of resultados){
            listaCargos.push(new CargoModel(registro["Id_cargo"],
                                                registro["Nome_cargo"],
                                                registro["Salario_cargo"],
                                                registro["Carga_horaria"]
            ));
        }
        
        return listaCargos;
    }

    async obter(id) {
        let sql = "select * from Cargos where Id_cargo = ?";
        let valores = [id];

        let row = await db.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new CargoModel(row[0]["Id_cargo"],
                                    row[0]["Nome_cargo"],
                                    row[0]["Salario_cargo"],
                                    row[0]["Carga_horaria"]
                              
            )
        }else
            return null;
    }

    async excluir(id) {

        let sql = `DELETE FROM Cargos WHERE Id_cargo = ?`;

        try {

            let result = await db.ExecutaComandoNonQuery(sql, [id]);
            return { success: true, result };
        } catch (error) {
            console.error('Erro ao excluir:', error);
            return { success: false, error };
        }
    }

    async atualizar() {
        let sql = `UPDATE Cargos
                    SET Nome_cargo = ?, 
                        Salario_cargo = ?, 
                        Carga_horaria = ?
                    WHERE Id_cargo = ?`;

        let valores = [
            this.#nome,
            this.#salario,
            this.#carga_horaria,
            this.#id
        ];
        
        let result = await db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

}



module.exports = CargoModel;
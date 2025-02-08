const Database = require('../utils/database');
const MedicoModel = require('./medicoModel');
const CargoModel = require('./cargoModel')

const db = new Database();

class FuncionarioModel {

    #id
    #nome
    #data_adm
    #email
    #nascimento
    #endereco
    #bairro
    #cep
    #cpf
    #cargo

    constructor(id, nome, data_adm, email, nascimento, endereco, bairro, cep, cpf, cargo) {
        this.#id = id;
        this.#nome = nome;
        this.#data_adm = data_adm;
        this.#email = email;
        this.#nascimento = nascimento;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cep = cep;
        this.#cpf = cpf;
        this.#cargo = cargo;
    }

    get id() {
        return this.#id;
    }

    set id(novo_id) {
        this.#id = novo_id;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novo_nome) {
        this.#nome = novo_nome;
    }

    get data_adm() {
        return this.#data_adm;
    }

    set data_adm(novo_data_adm) {
        this.#data_adm = novo_data_adm;
    }

    get email() {
        return this.#email;
    }

    set email(novo_email) {
        this.#email = novo_email;
    }

    get nascimento() {
        return this.#nascimento
    }

    set nascimento(novo_nascimento) {
        this.#nascimento = novo_nascimento;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novo_endereco) {
        this.#endereco = novo_endereco;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(novo_bairro) {
        this.#bairro = novo_bairro;
    }

    get cep() {
        return this.#cep;
    }

    set cep(novo_cep) {
        this.#cep = novo_cep;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novo_cpf) {
        this.#cpf = novo_cpf;
    }

    get cargo() {
        return this.#cargo;
    }

    set cargo(novo_cargo) {
        this.#cargo = novo_cargo;
    }

    async listarPedidos(termo, tipoBusca) {
        // Inicializa uma variável para armazenar filtros da busca (WHERE).
        let whereFiltro = "";
    
        // Se um termo de busca for fornecido, monta o filtro baseado no tipo de busca.
        if (termo) {
            if (tipoBusca == "numero") {
                // Busca pelo número do pedido.
                whereFiltro = ` where Id_func = ${termo} `;
            } else if (tipoBusca == "produto") {
                whereFiltro = ` where Nome_func like '%${termo}%' `;
            }
        }
    
        // Define a consulta SQL, com joins entre tabelas de pedidos, itens de pedido e produtos.
        let sql = `select * from Funcionarios  
                   ${whereFiltro} 
                   order by Id_func`;
    
        // Executa a consulta no banco de dados e aguarda os resultados.
        let rows = await db.ExecutaComando(sql);
    
        let lista = []; // Lista para armazenar os objetos do modelo PedidoItemModel.
    
        // Para cada linha retornada, cria um objeto PedidoItemModel e adiciona à lista.
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
    
            lista.push(new FuncionarioModel(row["Id_func"],
                row["Nome_func"],
                row["Data_admissao"],
                row["Email_func"],
                row["Nascimento_func"],
                row["Endereco_func"],
                row["Bairro_func"],
                row["CEP_func"],
                row["CPF_func"],
                row["Id_cargo"]
            ));
        }

        // Retorna a lista de pedidos encontrados.
        return lista;
    }


    async listar() {
        const sql = `select * from Funcionarios`;
        const resultados = await db.ExecutaComando(sql);
        const listaFuncionarios = [];
        for (const registro of resultados) {
            listaFuncionarios.push(new FuncionarioModel(registro["Id_func"],
                registro["Nome_func"],
                registro["Data_admissao"],
                registro["Email_func"],
                registro["Nascimento_func"],
                registro["CEP_func"],
                registro["Endereco_func"],
                registro["Bairro_func"],
                registro["CPF_func"],
                registro["Id_cargo"]
            ));
        }
        return listaFuncionarios;
    }

    async gravar() {
        const sql = 'insert into Funcionarios(Nome_func,Data_admissao,Email_func,Nascimento_func,Endereco_func,Bairro_func,CEP_func,CPF_func, Id_cargo) values(?,?,?,?,?,?,?,?,?)';
        let valores = [this.#nome, this.#data_adm, this.#email, this.#nascimento, this.#endereco, this.#bairro, this.#cep, this.#cpf, this.#cargo];

        let result = await db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async listarMedico() {
        let sql = "select * from Medicos";
        let rows = await db.ExecutaComando(sql);
        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            lista.push(new MedicoModel(row["CRO_med"],
                row["Nome_med"],
                row["CPF_med"],
                row["Especialidade_med"]))
        }

        return lista;
    }

    async listarCargo() {
        let sql = "select * from Cargos";
        let rows = await db.ExecutaComando(sql);
        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            lista.push(new CargoModel(row["Id_cargo"],
                                    row["Nome_cargo"],
                                    row["Salario_cargo"],
                                    row["Carga_horaria"]))
        }

        return lista;
    }

    async excluir(id) {

        let sqlFuncionario = `DELETE FROM Funcionarios WHERE Id_func = ?`;

        try {

            let result = await db.ExecutaComandoNonQuery(sqlFuncionario, [id]);


            return { success: true, result };
        } catch (error) {

            console.error('Erro ao excluir:', error);
            return { success: false, error };
        }
    }

    async atualizar() {
        let sql = `UPDATE Funcionarios
           SET Nome_func = ?, 
               Data_admissao = ?, 
               Email_func = ?, 
               Nascimento_func = ?,
               Endereco_func = ?, 
               Bairro_func = ?, 
               CEP_func = ?, 
               CPF_func = ?, 
               Id_cargo = ?
           WHERE Id_func = ?`;

        let valores = [
            this.#nome,
            this.#data_adm,
            this.#email,
            this.#nascimento,
            this.#endereco,
            this.#bairro,
            this.#cep,
            this.#cpf,
            this.#cargo,
            this.#id

        ];
        

        let result = await db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(id) {
        let sql = "select * from Funcionarios where Id_func = ?";
        let valores = [id];

        let row = await db.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new FuncionarioModel(row[0]["Id_func"],
                                    row[0]["Nome_func"],
                                    row[0]["Data_admissao"],
                                    row[0]["Email_func"],
                                    row[0]["Nascimento_func"],
                                    row[0]["Endereco_func"],
                                    row[0]["Bairro_func"],
                                    row[0]["CEP_func"],
                                    row[0]["CPF_func"],
                                    row[0]["Id_cargo"],
            )
        }else
            return null;

    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            data_adm: this.#data_adm,
            email: this.#email,
            nascimento:this.#nascimento,
            endereco: this.#endereco,
            bairro: this.#bairro,
            cep: this.#cep,
            cpf: this.#cpf,
            cargo: this.#cargo
        }
    }

}

module.exports = FuncionarioModel;
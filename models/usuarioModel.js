const Database = require('../utils/database');
const CargoModel = require('./cargoModel');
const MedicoModel = require('./medicoModel');

const db = new Database();

class UsuarioModel{
    #id
    #nome
    #sexo
    #email
    #nascimento
    #cpf
    #endereco
    #num_end
    #bairro
    #cep
    #estado
    #cidade
    #senha
    #cro_med

    constructor(id, nome, sexo, email, cpf, nascimento, endereco, num_end, bairro, cep, estado, cidade, senha){
        this.#id=id;
        this.#nome=nome;
        this.#sexo=sexo;
        this.#email=email;
        this.#cpf=cpf;
        this.#nascimento=nascimento;
        this.#endereco=endereco;
        this.#num_end=num_end;
        this.#bairro=bairro;
        this.#cep=cep;
        this.#estado=estado;
        this.#cidade=cidade;
        this.#senha=senha;
        this.#cro_med;
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
    get cpf(){
        return this.#cpf;
    }

    set cpf(novo_cpf){
        this.#cpf = novo_cpf;
    }

    get email(){
        return this.#email;
    }

    set email(novo_email){
        this.#email = novo_email;
    }

    get sexo(){
        return this.#sexo;
    }

    set sexo(novo_sexo){
        this.#sexo = novo_sexo;
    }

    
    get nascimento(){
        return this.#nascimento;
    }

    set nascimento(novo_nascimento){
        this.#nascimento = novo_nascimento;
    }

    
    get endereco(){
        return this.#endereco;
    }

    set endereco(novo_endereco){
        this.#endereco = novo_endereco;
    }

    get num_end(){
        return this.#num_end;
    }

    set num_end(novo_num){
        this.#num_end = novo_num;
    }

    get bairro(){
        return this.#bairro;
    }

    set bairro(novo_bairro){
        this.#bairro = novo_bairro;
    }

    get cep(){
        return this.#cep;
    }

    set cep(novo_cep){
        this.#cep = novo_cep;
    }

    get estado(){
        return this.#estado;
    }

    set estado(novo_estado){
        this.#estado = novo_estado;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(nova_cidade){
        this.#cidade = nova_cidade;
    }

    get senha(){
        return this.#senha;
    }

    set senha(nova_senha){
        this.#senha = nova_senha;
    }

    get cro_med(){
        return this.#cro_med;
    }

    set cro_med(novo_cro){
        this.#cro_med = novo_cro;
    }


    async listar() {
        const sql = `select * from Pacientes`;
        const resultados = await db.ExecutaComando(sql);
        const listaUsuarios = [];
        for (const registro of resultados){
            listaUsuarios.push(new UsuarioModel(registro["Id"],
                                                registro["Nome"],
                                                registro["Sexo"],
                                                registro["Email"],
                                                registro["CPF"]
            ));
        }
        return listaUsuarios;
    }

    async listarPaciente(){
        let sql = "select * from Pacientes";
        let rows = await db.ExecutaComando(sql);
        let lista = [];
        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            lista.push(new UsuarioModel(row["Id"], row["Nome"]))
        }

        return lista;
    }


    async listarMedico(){
        let sql = "select * from Medicos";
        let rows = await db.ExecutaComando(sql);
        let lista = [];
        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            lista.push(new MedicoModel(row["CRO_med"], row["Nome_med"]))
        }

        return lista;
    }

    async listarCargo(){
        let sql = "select * from Cargos";
        let rows = await db.ExecutaComando(sql);
        let lista = [];
        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            lista.push(new CargoModel(row["Id_cargo"], row["Nome_cargo"]))
        }

        return lista;
    }


    async gravar(){
        
        let sql = `insert into Pacientes (Nome, Sexo, Email, CPF, Nascimento, Endereco, Num_end, Bairro, CEP, Estado, Cidade, Senha) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        let valores = [this.#nome, this.#sexo, this.#email, this.#cpf, this.#nascimento, this.#endereco, this.#num_end, this.#bairro, this.#cep, this.#estado, this.#cidade, this.#senha];

        let result = await db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {

        let sqlConsultas = `DELETE FROM Consultas WHERE Id = ?`;
        let sqlExames = `DELETE FROM Exames WHERE Id = ?`;
        let sqlPacientes = `DELETE FROM Pacientes WHERE Id = ?`;
    
        try {
            let resultConsultas = await db.ExecutaComandoNonQuery(sqlConsultas, [id]);
            let resultExames = await db.ExecutaComandoNonQuery(sqlExames, [id]);
            let resultPacientes = await db.ExecutaComandoNonQuery(sqlPacientes, [id]);
            
    
            return { success: true, resultPacientes, resultConsultas, resultExames };
        } catch (error) {
            console.error('Erro ao excluir:', error);
            return { success: false, error };
        }
    }

    async obter(id) {
        let sql = "select * from Pacientes where Id = ?";
        let valores = [id];

        let row = await db.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new UsuarioModel(row[0]["Id"],
                                    row[0]["Nome"],
                                    row[0]["Sexo"],
                                    row[0]["Email"],
                                    row[0]["CPF"],
                                    row[0]["Nascimento"],
                                    row[0]["Endereco"],
                                    row[0]["Num_end"],
                                    row[0]["Bairro"],
                                    row[0]["CEP"],
                                    row[0]["Estado"],
                                    row[0]["Cidade"],
                                    row[0]["Senha"]
            )
        }

        return null;

    }


    async atualizar() {
        let sql = `UPDATE Pacientes 
                   SET Nome = ?, 
                       Sexo = ?, 
                       Email = ?, 
                       CPF = ?, 
                       Nascimento = ?, 
                       Endereco = ?, 
                       Num_end = ?,
                       Bairro = ?, 
                       CEP = ?, 
                       Estado = ?, 
                       Cidade = ?, 
                       Senha = ?
                   WHERE Id = ?`;
    
        let valores = [
            this.#nome, 
            this.#sexo, 
            this.#email, 
            this.#cpf, 
            this.#nascimento, 
            this.#endereco, 
            this.#num_end,
            this.#bairro, 
            this.#cep, 
            this.#estado, 
            this.#cidade, 
            this.#senha, 
            this.#id
        ];
    
        let result = await db.ExecutaComandoNonQuery(sql, valores);
    
        return result;
    }

    async listarPacientes(termo, tipoBusca) {
        let whereFiltro = "";
        if (termo) {
            if (tipoBusca == "numero") {
                whereFiltro = ` where CPF like '%${termo}%' `;
            } else if (tipoBusca == "produto") {
                whereFiltro = ` where Nome like '%${termo}%' `;
            }
        }
    
        let sql = `select * from Pacientes  
                   ${whereFiltro} 
                   order by Id`;
    
        let rows = await db.ExecutaComando(sql);
    
        let lista = [];
    

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
    
            lista.push(new UsuarioModel(row["Id"],
                                        row["Nome"],
                                        row["Sexo"],
                                        row["Email"],
                                        row["CPF"],
                                        row["Nascimento"],
                                        row["Endereco"],
                                        row["Num_end"],
                                        row["Bairro"],
                                        row["CEP"],
                                        row["Estado"],
                                        row["Cidade"],
                                        row["Senha"]
            ));
        }
        return lista;
    }
    
    
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome, 
            sexo: this.#sexo, 
            email: this.#email, 
            cpf: this.#cpf, 
            nascimento: this.#nascimento, 
            endereco: this.#endereco, 
            num_end: this.#num_end,
            bairro: this.#bairro, 
            cep: this.#cep, 
            estado: this.#estado, 
            cidade: this.#cidade, 
            senha: this.#senha
        }
    }

}

module.exports = UsuarioModel;

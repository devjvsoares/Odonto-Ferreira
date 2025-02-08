const Database = require('../utils/database');

const db = new Database();

class MedicoModel{
    #cro
    #nome  
    #sexo  
    #email  
    #especialidade  
    #nascimento 
    #cpf
    #cep
    #endereco
    #numero
    #bairro
    #estado
    #cidade
    #ativo
    #senha

    constructor(cro, nome, sexo, email, especialidade, nascimento, cpf, cep, endereco, numero, bairro, estado, cidade, ativo,senha){
        this.#cro=cro;
        this.#nome=nome;
        this.#sexo=sexo;
        this.#email=email;
        this.#especialidade=especialidade;  
        this.#nascimento=nascimento;
        this.#cpf=cpf;
        this.#cep=cep;
        this.#endereco=endereco;
        this.#numero=numero;
        this.#bairro=bairro;
        this.#estado=estado;
        this.#cidade=cidade;
        this.#ativo=ativo;
        this.#senha=senha;
    }


    get cro(){
        return this.#cro;
    }

    set cro(novo_cro){
        this.#cro = novo_cro;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novo_nome){
        this.#nome = novo_nome;
    }

    get especialidade(){
        return this.#especialidade;
    }

    set especialidade(novo_especialidade){
        this.#especialidade = novo_especialidade;
    }

    get email(){
        return this.#email;
    }

    set email(novo_email){
        this.#email = novo_email;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novo_cpf){
        this.#cpf = novo_cpf;
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

    get cep(){
        return this.#cep;
    }

    set cep(novo_cep){
        this.#cep = novo_cep;
    }

    get sexo(){
        return this.#sexo;
    }

    set sexo(novo_sexo){
        this.#sexo = novo_sexo;
    }

    get numero(){
        return this.#numero;
    }

    set numero(novo_numero){
        this.#numero = novo_numero;
    }

    get bairro(){
        return this.#bairro;
    }

    set bairro(novo_bairro){
        this.#bairro = novo_bairro;
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

    get ativo(){
        return this.#ativo;
    }

    set ativo(nova_ativo){
        this.#ativo = nova_ativo;
    }

    get senha(){
        return this.#senha;
    }

    set senha(nova_senha){
        this.#senha = nova_senha;
    }


    async listar() {
        const sql = `select CRO_med, Nome_med, Especialidade_med, CPF_med from Medicos`;
        const resultados = await db.ExecutaComando(sql);
        const listaMedicos = [];
        for (const registro of resultados){
            listaMedicos.push(new MedicoModel(registro["CRO_med"],
                                                registro["Nome_med"],
                                                registro["CPF_med"],
                                                registro["Especialidade_med"]
            ));
        }
        return listaMedicos;
    }

    async gravar(){
        const sql = 'insert into Medicos(CRO_med,Nome_med,Sexo_med,Email_med,Especialidade_med,Nascimento_med,CPF_med,CEP_med,Endereco_med,NumeroEnd_med,Bairro_med,Estado_med,Cidade_med, Ativo_med,Senha_med) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

        let valores = [this.#cro, this.#nome, this.#sexo, this.#email, this.#especialidade, this.#nascimento, this.#cpf, this.#cep, this.#endereco, this.#numero, this.#bairro, this.#estado, this.#cidade, this.#ativo, this.#senha];

        let result = await db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(cro) {

        let sqlConsultas = `DELETE FROM Consultas WHERE CRO_med = ?`;
        let sqlExames = `DELETE FROM Exames WHERE CRO_med = ?`;
        let sqlMedicos = `DELETE FROM Medicos WHERE CRO_med = ?`;
        
    
        try {
            let resultConsultas = await db.ExecutaComandoNonQuery(sqlConsultas, [cro]);
            let resultExames = await db.ExecutaComandoNonQuery(sqlExames, [cro]);
            let resulMedicos = await db.ExecutaComandoNonQuery(sqlMedicos,[cro]);
            
    
            return { success: true, resultConsultas, resultExames, resulMedicos};
        } catch (error) {
            console.error('Erro ao excluir:', error);
            return { success: false, error };
        }
    }

    async obter(cro) {
        let sql = "select * from Medicos where CRO_med = ?";
        let valores = [cro];

        let row = await db.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new MedicoModel(row[0]["CRO_med"],
                                    row[0]["Nome_med"],
                                    row[0]["Sexo_med"],
                                    row[0]["Email_med"],
                                    row[0]["Especialidade_med"],
                                    row[0]["Nascimento_med"],
                                    row[0]["CPF_med"],
                                    row[0]["CEP_med"],
                                    row[0]["Endereco_med"],
                                    row[0]["NumeroEnd_med"],
                                    row[0]["Bairro_med"],
                                    row[0]["Estado_med"],
                                    row[0]["Cidade_med"],
                                    row[0]["Ativo_med"],
                                    row[0]["Senha_med"]
            )
        }else
            return null;

    }

    async atualizar() {
        let sql = `UPDATE Medicos 
                   SET CRO_med = ?,
                       Nome_med = ?, 
                       Sexo_med = ?, 
                       Email_med = ?, 
                       Especialidade_med = ?,
                       Nascimento_med = ?,
                       CPF_med = ?, 
                       CEP_med = ?, 
                       Endereco_med = ?, 
                       NumeroEnd_med = ?,
                       Bairro_med = ?,
                       Estado_med = ?,
                       Cidade_med = ?,
                       Ativo_med = ?,
                       Senha_med = ?
                   WHERE CRO_med = ?`;

        let valores = [
            this.#cro,
            this.#nome, 
            this.#sexo, 
            this.#email, 
            this.#especialidade, 
            this.#nascimento,
            this.#cpf, 
            this.#cep,
            this.#endereco, 
            this.#numero,
            this.#bairro,
            this.#estado,
            this.#cidade,
            this.#ativo,
            this.#senha, 
            this.#cro

        ];
    
        let result = await db.ExecutaComandoNonQuery(sql, valores);
    
        return result;
    }

    async listarMedicos(termo, tipoBusca) {
        let whereFiltro = "";
        if (termo) {
            if (tipoBusca == "numero") {
                whereFiltro = ` where CRO_med = ${termo} `;
            } else if (tipoBusca == "produto") {
                whereFiltro = ` where Nome_med like '%${termo}%' `;
            }
        }
    
        let sql = `select * from Medicos  
                   ${whereFiltro} 
                   order by CRO_med`;
        console.log(sql);
    
        let rows = await db.ExecutaComando(sql);
    
        let lista = [];
    

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
    
            lista.push(new MedicoModel(row["CRO_med"],
                                        row["Nome_med"],
                                        row["Sexo_med"],
                                        row["Email_med"],
                                        row["Especialidade_med"],
                                        row["Nascimento_med"],
                                        row["CPF_med"],
                                        row["CEP_med"],
                                        row["Endereco_med"],
                                        row["NumeroEnd_med"],
                                        row["Bairro_med"],
                                        row["Estado_med"],
                                        row["Cidade_med"],
                                        row["Ativo_med"],
                                        row["Senha_med"]
            ));
        }
        return lista;
    }
    async obterPorEmailSenha(email, senha) {
        let sql = "select * from Medicos where Email_med = ? and Senha_med = ?";

        let valores = [email, senha];
        
        let rows = await db.ExecutaComando(sql, valores);
        if(rows.length > 0) {
            let row = rows[0];
            return new MedicoModel(row["CRO_med"],
                row["Nome_med"],
                row["Sexo_med"],
                row["Email_med"],
                row["Especialidade_med"],
                row["Nascimento_med"],
                row["CPF_med"],
                row["CEP_med"],
                row["Endereco_med"],
                row["NumeroEnd_med"],
                row["Bairro_med"],
                row["Estado_med"],
                row["Cidade_med"],
                row["Ativo_med"],
                row["Senha_med"]);
        }

        return null;
    }
    
    
    toJSON() {
        return {
            cro: this.#cro,
            nome: this.#nome, 
            sexo: this.#sexo, 
            email: this.#email, 
            especialidade: this.#especialidade, 
            nascimento: this.#nascimento,
            cpf: this.#cpf, 
            cep: this.#cep,
            endereco: this.#endereco, 
            numero:this.#numero,
            bairro: this.#bairro,
            estado: this.#estado,
            cidade: this.#cidade,
            ativo: this.#ativo,
            senha: this.#senha
        }
    }

}

module.exports = MedicoModel;
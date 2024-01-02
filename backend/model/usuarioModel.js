const Database = require ('../utils/database')

const banco = new Database();

class UsuarioModel{

    #usuId;
    #usuEmail;
    #usuSenha;
    #usuNome;
    #usuDataCad;
    #perfilId;

    get usuId(){return this.#usuId;} set usuId(usuId){this.#usuId = usuId;}
    get usuEmail(){return this.#usuEmail;} set usuEmail(usuEmail){this.#usuEmail = usuEmail;}
    get usuSenha(){return this.#usuSenha;} set usuSenha(usuSenha){this.#usuSenha = usuSenha;}
    get usuNome(){return this.#usuNome;} set usuNome(usuNome){this.#usuNome = usuNome;}
    get usuDataCad(){return this.#usuDataCad;} set usuDataCad(usuDataCad){this.#usuDataCad = usuDataCad;}
    get perfilId(){return this.#perfilId} set perfilId(perfilId){this.#perfilId = perfilId}
    

    constructor(usuId, usuEmail, usuSenha, usuNome, usuDataCad, perfilId){
        this.#usuId = usuId;
        this.#usuEmail = usuEmail;
        this.#usuSenha = usuSenha;
        this.#usuNome = usuNome;
        this.#usuDataCad = usuDataCad;
        this.#perfilId = perfilId;
    }

    toJSON(){
        return{
            "usuId" : this.#usuId,
            "usuEmail" : this.#usuEmail,
            "usuSenha" : this.#usuSenha,
            "usuNome" : this.#usuNome,
            "usuDataCad" : this.#usuDataCad,
            "perfilId" : this.#perfilId,
            
        }
    }

    async gravar(){
        if(this.#usuId == 0){
            let sql = 'insert into tb_usuario (usu_email, usu_senha, usu_nome, usu_datacadastro, per_id) values (?,?,?,now(), ?)';
            let valores = [this.#usuEmail, this.#usuSenha, this.#usuNome, this.#usuDataCad, this.#perfilId];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;

        }else{
            let sql = 'update tb_usuario set usu_email = ?, usu_senha = ?, usu_nome = ?, usu_datacadastro = ?, per_id = ? where usu_id = ?';
            let valores = [this.#usuEmail, this.#usuSenha, this.#usuNome, this.#usuDataCad, this.#perfilId, this.#usuId];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;
        }
    }
    async gravarCliente(){
        if(this.#usuId == 0){
            let sql = 'insert into tb_usuario (usu_email, usu_senha, usu_nome, usu_datacadastro, per_id) values (?,?,?,now(), 2)';
            let valores = [this.#usuEmail, this.#usuSenha, this.#usuNome, this.#usuDataCad,];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;

        }else{
            let sql = 'update tb_usuario set usu_email = ?, usu_senha = ?, usu_nome = ?, usu_datacadastro = ?, per_id = ? where usu_id = ?';
            let valores = [this.#usuEmail, this.#usuSenha, this.#usuNome, this.#usuDataCad, this.#perfilId, this.#usuId];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;
        }
    }


    async obter(usuId){
        let sql = 'select * from tb_usuario where usu_id = ?';
        let valores = [usuId];
        let rows = await banco.ExecutaComando(sql,valores);

        if(rows.length > 0){
            let usuario = new UsuarioModel(rows[0]['usu_id'], rows[0]['usu_nome'], rows[0]['usu_email'], rows[0]['usu_senha'], rows[0]['usu_datacadastro'],rows[0]['per_id']);
            return usuario;
        }
        return null;
    }

    async listar(){
        let sql = 'select * from tb_usuario';
        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i=0; i<rows.length; i++){
            lista.push(new UsuarioModel(rows[i]['usu_id'], rows[i]['usu_nome'], rows[i]['usu_email'], rows[i]['usu_senha'], rows[i]['usu_datacadastro'], rows[i]['per_id']));
        }
        return lista;
    }

    async excluir(usuId){
        let sql = 'delete from tb_usuario where usu_id = ?';
        let valores = [usuId];
        let ok = await banco.ExecutaComandoNonQuery(sql,valores);
        return ok;
    }

    async autenticar(usuEmail, usuSenha){
        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ?";

        let valores = [usuEmail, usuSenha];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            return new UsuarioModel(rows[0]["usu_id"],
            rows[0]["usu_nome"], rows[0]["usu_email"], rows[0]["per_id"], rows[0]["usu_datacadastro"])
        }

        return null;
    }

}

module.exports = UsuarioModel;

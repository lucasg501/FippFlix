const Database = require ('../utils/database')

const banco = new Database();

class conteudoModel{
    
    #conId;
    #conYtId;
    #conTitulo;
    #conDisponivel;
    #categoriaId;

    get conId(){return this.#conId;} set conId(conId){this.#conId = conId;}
    get conYtId(){return this.#conYtId;} set conYtId(conYtId){this.#conYtId = conYtId;}
    get conTitulo(){return this.#conTitulo;} set conTitulo(conTitulo){ this.#conTitulo = conTitulo;}
    get conDisponivel(){return this.#conDisponivel;} set conDisponivel(conDisponivel){ this.#conDisponivel = conDisponivel;}
    get categoriaId(){return this.#categoriaId;} set categoriaId(categoriaId){ this.#categoriaId = categoriaId;}

    constructor(conId, conYtId, conTitulo, conDisponivel, categoriaId){
        this.#conId = conId;
        this.#conYtId = conYtId;
        this.#conTitulo = conTitulo;
        this.#conDisponivel = conDisponivel;
        this.#categoriaId = categoriaId;
    }

    toJSON(){
        return{
            'conId' : this.#conId,
            'conYtId' : this.#conYtId,
            'conTitulo' : this.#conTitulo,
            'conDisponivel' : this.#conDisponivel,
            'categoriaId' : this.#categoriaId,
        }
    }

    async gravar(){
        if(this.#conId == 0){
            let sql = 'insert into tb_conteudo (con_youtubeid, con_titulo, con_disponivel, cat_id) values (?,?,?,?)';
            let valores = [this.#conYtId, this.#conTitulo, this.#conDisponivel, this.#categoriaId];
            let ok = await banco.ExecutaComandoNonQuery(sql, valores);
            return ok;

        }else{
            let sql = 'update tb_conteudo set con_youtubeid = ?, con_titulo = ?, con_disponivel = ?, cat_id = ? where con_id = ?';
            let valores = [this.#conYtId, this.#conTitulo, this.#conDisponivel, this.#categoriaId, this.#conId];
            let ok = await banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }
    }

    async listarBusca(buscaDescricao){
        let sql = 'select * from tb_conteudo where con_titulo like ? ';
    
        let valores = [`%${buscaDescricao}%`];
    
        let rows = await banco.ExecutaComando(sql, valores);
    
        let lista = rows.map((row) => {
            return new conteudoModel(row['con_id'], row['con_youtubeid'], row['con_titulo'], row['con_disponivel'], row['cat_id']);
        });
    
        return lista;
    }

    async listar(){
        let sql = 'select * from tb_conteudo';
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for(let i=0; i<rows.length; i++){
            lista.push(new conteudoModel(rows[i]['con_id'], rows[i]['con_youtubeid'], rows[i]['con_titulo'], rows[i]['con_disponivel'], rows[i]['cat_id']));
        }
        return lista;
    }

    async listarFavoritos(usuId) {
        let sql = 'SELECT c.* FROM tb_conteudo c INNER JOIN tb_usuariolista ul ON c.con_id = ul.con_id WHERE ul.usu_id = ?';
    
        let valores = [usuId];
    
        let rows = await banco.ExecutaComando(sql, valores);
    
        let lista = rows.map((row) => {
            return new conteudoModel(row['con_id'], row['con_youtubeid'], row['con_titulo'], row['con_disponivel'], row['cat_id']);
        });
    
        return lista;
    }

    async listarFavoritos(usuId){
        let sql = 'SELECT c.* FROM tb_conteudo c INNER JOIN tb_usuariolista ul ON c.con_id = ul.con_id WHERE ul.usu_id = ?';

        let valores = [usuId];

        let rows = await banco.ExecutaComando(sql, valores);

        let lista = rows.map((row) => ({
            conId: row.con_id,
            conYtId: row.con_youtubeid, 
            conTitulo: row.con_titulo,
            disponivel: row.con_disponivel, 
            categoriaId: row.cat_id
        }));

        return lista;
}

    async obter(conId){
        let sql = "select * from tb_conteudo where con_id = ?";
        let valores = [conId];
        let rows = await banco.ExecutaComando(sql,valores);

        if(rows.length > 0){
            let conteudo = new conteudoModel(rows[0]['con_id'],  rows[0]['con_youtubeid'], rows[0]['con_titulo'], rows[0]['con_disponivel'], rows[0]['cat_id']);
            return conteudo;
        }
        return null;
    }

    async excluir(conId){
        let sql = 'delete from tb_conteudo where con_id = ?';
        let valores = [conId];
        let ok = await banco.ExecutaComandoNonQuery(sql, valores);
        return ok;
    }
}

module.exports = conteudoModel;
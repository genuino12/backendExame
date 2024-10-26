import conectar from "./conexao.js"; 
import Filho from "../MODEL/filhote.js"; 

  class FilhoteDAO {
    constructor() {}

    async init() {
        try {
            const conexao = await conectar();

        
            const sqlFilhotes = `CREATE TABLE filhotes (
                id INT(11) NOT NULL AUTO_INCREMENT,
                especie VARCHAR(100) NOT NULL,
                raca VARCHAR(100) NOT NULL,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`;

            await conexao.execute(sqlFilhotes);

            console.log("Tabela de filhotes criada com sucesso!");
        } catch (erro) {
            console.log("Erro ao criar tabela de filhotes!", erro);
        }
    }

    
    async gravarFilho(filho) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `INSERT INTO filhotes (especie, raca) VALUES (?, ?);`;
            const parametros = [filho.especie, filho.raca];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao incluir filhote!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }

    
    async alterarFilho(filho) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `UPDATE filhotes SET especie=?, raca=? WHERE id = ?;`;
            const parametros = [filho.especie, filho.raca, filho.id];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao alterar filhote!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }

    async excluirFilho(filho) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `DELETE FROM filhotes WHERE id = ?;`;
            const parametros = [filho.id];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao excluir filhote!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }

    
    async consultaFilhos(termoBusca) {
        let conexao;
        try {
            conexao = await conectar();
            let sql = "";
            const parametros = [];

            if (termoBusca) {
                sql = `SELECT * FROM filhotes WHERE id = ? ORDER BY especie;`;
                parametros.push(termoBusca);
            } else {
                sql = `SELECT * FROM filhotes ORDER BY especie;`;
            }

            const [registros] = await conexao.execute(sql, parametros);
            return registros.map(registro => new Filho(
                registro.id,
                registro.especie,
                registro.raca
            ));
        } catch (erro) {
            console.error("Erro ao consultar filhotes!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }

    
    async consultarFilhoPorId(id) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `SELECT * FROM filhotes WHERE id = ?;`;
            const [resultados] = await conexao.execute(sql, [id]);
            return resultados[0]; 
        } catch (erro) {
            console.error("Erro ao consultar filhote!", erro);
            throw erro;
        } finally {
            if (conexao) conexao.release();
        }
    }
}
export default FilhoteDAO;
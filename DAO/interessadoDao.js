import conectar from "./conexao.js"; // Certifique-se de que a conexão com o banco de dados esteja funcionando
import Interessado from "../MODEL/interessados.js";

export class InteressadoDAO {
    constructor() {}

    async init() {
        try {
            const conexao = await conectar();
            const sqlInteressados = `CREATE TABLE IF NOT EXISTS interessados (
                id_interessado INT(11) NOT NULL AUTO_INCREMENT,
                nome VARCHAR(100) NOT NULL,
                cpf VARCHAR(11) NOT NULL UNIQUE,
                telefone VARCHAR(15) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                PRIMARY KEY (id_interessado)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`;

            await conexao.execute(sqlInteressados);
            console.log("Tabela de interessados criada com sucesso!");
        } catch (erro) {
            console.log("Erro ao criar tabela de interessados!", erro);
        }
    }

    async gravarInteressado(interessado) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `INSERT INTO interessados (nome, cpf, telefone, email) VALUES (?, ?, ?, ?);`;
            const parametros = [interessado.nome, interessado.cpf, interessado.telefone, interessado.email];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao incluir interessado!", erro);
            throw erro;
        } finally {
            if (conexao) await conexao.release();
        }
    }

    async alterarInteressado(interessado) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `UPDATE interessados SET nome=?, cpf=?, telefone=?, email=? WHERE id_interessado = ?;`;
            const parametros = [interessado.nome, interessado.cpf, interessado.telefone, interessado.email, interessado.id_interessado];
            await conexao.execute(sql, parametros);
        } catch (erro) {
            console.error("Erro ao alterar interessado!", erro);
            throw erro;
        } finally {
            if (conexao) await conexao.release();
        }
    }

    async excluirInteressado(id_interessado) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `DELETE FROM interessados WHERE id_interessado = ?;`;
            await conexao.execute(sql, [id_interessado]);
        } catch (erro) {
            console.error("Erro ao excluir interessado!", erro);
            throw erro;
        } finally {
            if (conexao) await conexao.release();
        }
    }

    async consultarInteressados() {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `SELECT * FROM interessados;`;
            const [resultados] = await conexao.execute(sql);
            return resultados.map(registro => new Interessado(
                registro.id_interessado,
                registro.nome,
                registro.cpf,
                registro.telefone,
                registro.email
            ));
        } catch (erro) {
            console.error("Erro ao consultar interessados!", erro);
            throw erro;
        } finally {
            if (conexao) await conexao.release();
        }
    }

    async consultarInteressadoPorId(id) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `SELECT * FROM interessados WHERE id_interessado = ?;`;
            const [resultados] = await conexao.execute(sql, [id]);
            return resultados.length ? new Interessado(
                resultados[0].id_interessado,
                resultados[0].nome,
                resultados[0].cpf,
                resultados[0].telefone,
                resultados[0].email
            ) : null;
        } catch (erro) {
            console.error("Erro ao consultar interessado!", erro);
            throw erro;
        } finally {
            if (conexao) await conexao.release();
        }
    }
}

export default InteressadoDAO;

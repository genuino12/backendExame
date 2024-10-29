import Interessado from "../MODEL/interessados.js"; 
import Filhote from "../MODEL/filhotes.js"; 

class ControleGeral {
    async cadastrar(req, res) {
        const { tipo, dados } = req.body;

        if (req.method === "POST" && req.is("application/json")) {
            if (tipo === "interessado") {
                const { cpf, nome, telefone, email } = dados; 
                if (cpf && nome && telefone && email) {
                    const interessado = new Interessado(cpf, nome, telefone, email); 
                    try {
                        if (typeof interessado.incluir === "function") {
                            await interessado.incluir();
                            res.status(201).json({ "Status": true, "mensagem": "Interessado cadastrado com sucesso." });
                        } else {
                            throw new Error("Método incluir não definido em Interessado");
                        }
                    } catch (erro) {
                        res.status(500).json({ "Status": false, "mensagem": "Erro ao cadastrar interessado: " + erro.message });
                    }
                } else {
                    res.status(400).json({ "Status": false, "mensagem": "Requisição inválida, informe todos os dados do interessado." });
                }
            } else if (tipo === "filhote") {
                const { especie, raca } = dados;
                if (especie && raca) {
                    const filhote = new Filhote(especie, raca);
                    try {
                        if (typeof filhote.incluir === "function") {
                            await filhote.incluir();
                            res.status(201).json({ "Status": true, "mensagem": "Filhote cadastrado com sucesso." });
                        } else {
                            throw new Error("Método incluir não definido em Filhote");
                        }
                    } catch (erro) {
                        res.status(500).json({ "Status": false, "mensagem": "Erro ao cadastrar filhote: " + erro.message });
                    }
                } else {
                    res.status(400).json({ "Status": false, "mensagem": "Requisição inválida, informe todos os dados do filhote." });
                }
            } else {
                res.status(400).json({ "Status": false, "mensagem": "Tipo inválido. Use 'interessado' ou 'filhote'." });
            }
        } else {
            res.status(405).json({ "Status": false, "mensagem": "Método não permitido." });
        }
    }

    async alterar(req, res) {
        const { tipo, dados } = req.body;

        if ((req.method === "PUT" || req.method === "PATCH") && req.is("application/json")) {
            if (tipo === "interessado") {
                const { id_interessado, cpf, nome, telefone, email } = dados; 
                if (id_interessado && cpf && nome && telefone && email) {
                    const interessado = new Interessado(id_interessado, cpf, nome, telefone, email); 
                    try {
                        if (typeof interessado.alterar === "function") {
                            await interessado.alterar();
                            res.status(200).json({ "Status": true, "mensagem": "Interessado alterado com sucesso." });
                        } else {
                            throw new Error("Método alterar não definido em Interessado");
                        }
                    } catch (erro) {
                        res.status(500).json({ "Status": false, "mensagem": "Erro ao alterar interessado: " + erro.message });
                    }
                } else {
                    res.status(400).json({ "Status": false, "mensagem": "Requisição inválida, informe todos os dados do interessado." });
                }
            } else if (tipo === "filhote") {
                const { id_filhote, especie, raca } = dados;
                if (id_filhote && especie && raca) {
                    const filhote = new Filhote(id_filhote, especie, raca);
                    try {
                        if (typeof filhote.alterar === "function") {
                            await filhote.alterar();
                            res.status(200).json({ "Status": true, "mensagem": "Filhote alterado com sucesso." });
                        } else {
                            throw new Error("Método alterar não definido em Filhote");
                        }
                    } catch (erro) {
                        res.status(500).json({ "Status": false, "mensagem": "Erro ao alterar filhote: " + erro.message });
                    }
                } else {
                    res.status(400).json({ "Status": false, "mensagem": "Requisição inválida, informe todos os dados do filhote." });
                }
            } else {
                res.status(400).json({ "Status": false, "mensagem": "Tipo inválido. Use 'interessado' ou 'filhote'." });
            }
        } else {
            res.status(405).json({ "Status": false, "mensagem": "Método não permitido." });
        }
    }

    async excluir(req, res) {
        const { tipo, id } = req.body;

        if (req.method === "DELETE" && req.is("application/json")) {
            if (tipo === "interessado") {
                if (id) {
                    const interessado = new Interessado();
                    interessado.id_interessado = id;
                    try {
                        await interessado.excluir();
                        res.status(200).json({ "Status": true, "mensagem": "Interessado excluído com sucesso." });
                    } catch (erro) {
                        res.status(500).json({ "Status": false, "mensagem": "Erro ao excluir interessado: " + erro.message });
                    }
                } else {
                    res.status(400).json({ "Status": false, "mensagem": "Requisição inválida, informe o ID do interessado." });
                }
            } else if (tipo === "filhote") {
                if (id) {
                    const filhote = new Filhote();
                    filhote.id_filhote = id;
                    try {
                        await filhote.excluir();
                        res.status(200).json({ "Status": true, "mensagem": "Filhote excluído com sucesso." });
                    } catch (erro) {
                        res.status(500).json({ "Status": false, "mensagem": "Erro ao excluir filhote: " + erro.message });
                    }
                } else {
                    res.status(400).json({ "Status": false, "mensagem": "Requisição inválida, informe o ID do filhote." });
                }
            } else {
                res.status(400).json({ "Status": false, "mensagem": "Tipo inválido. Use 'interessado' ou 'filhote'." });
            }
        } else {
            res.status(405).json({ "Status": false, "mensagem": "Método não permitido." });
        }
    }

    async consulta(req, res) {
        const { tipo } = req.params;
        const termoBusca = req.params.termoBusca || "";

        if (req.method === "GET") {
            if (tipo === "interessado") {
                const interessado = new Interessado();
                try {
                    const interessados = await interessado.consulta(termoBusca);
                    res.status(200).json({ "Status": true, "ListaDeInteressados": interessados });
                } catch (erro) {
                    res.status(500).json({ "Status": false, "mensagem": "Erro ao consultar interessados: " + erro.message });
                }
            } else if (tipo === "filhote") {
                const filhote = new Filhote();
                try {
                    const filhotes = await filhote.consulta(termoBusca);
                    res.status(200).json({ "Status": true, "ListaDeFilhotes": filhotes });
                } catch (erro) {
                    res.status(500).json({ "Status": false, "mensagem": "Erro ao consultar filhotes: " + erro.message });
                }
            } else {
                res.status(400).json({ "Status": false, "mensagem": "Tipo inválido. Use 'interessado' ou 'filhote'." });
            }
        } else {
            res.status(405).json({ "Status": false, "mensagem": "Método não permitido." });
        }
        
    }
    
}
export default ControleGeral;
import Interessado from "./model/interessado.js";
import Filhote from "./model/filhote.js";

export default class ControleGeral {

    
    cadastrar(req, res) {
        const { tipo, dados } = req.body;

        if (req.method === "POST" && req.is("application/json")) {
            if (tipo === "interessado") {
                const { cpf, nome, telefone, email } = dados;
                if (cpf && nome && telefone && email) {
                    const interessado = new Interessado(cpf, nome, telefone, email);
                    interessado.incluir()
                        .then(() => {
                            res.status(201).json({
                                "Status": true,
                                "mensagem": "Interessado cadastrado com sucesso."
                            });
                        })
                        .catch((erro) => {
                            res.status(500).json({
                                "Status": false,
                                "mensagem": "Erro ao cadastrar interessado: " + erro.message
                            });
                        });
                } else {
                    res.status(400).json({
                        "Status": false,
                        "mensagem": "Requisição inválida, informe todos os dados do interessado."
                    });
                }
            } else if (tipo === "filhote") {
                const { especie, raca } = dados;
                if (especie && raca) {
                    const filhote = new Filhote(especie, raca);
                    filhote.incluir()
                        .then(() => {
                            res.status(201).json({
                                "Status": true,
                                "mensagem": "Filhote cadastrado com sucesso."
                            });
                        })
                        .catch((erro) => {
                            res.status(500).json({
                                "Status": false,
                                "mensagem": "Erro ao cadastrar filhote: " + erro.message
                            });
                        });
                } else {
                    res.status(400).json({
                        "Status": false,
                        "mensagem": "Requisição inválida, informe todos os dados do filhote."
                    });
                }
            } else {
                res.status(400).json({
                    "Status": false,
                    "mensagem": "Tipo inválido. Use 'interessado' ou 'filhote'."
                });
            }
        } else {
            res.status(405).json({
                "Status": false,
                "mensagem": "Método não permitido."
            });
        }
    }

    
    alterar(req, res) {
        const { tipo, dados } = req.body;

        if ((req.method === "PUT" || req.method === "PATCH") && req.is("application/json")) {
            if (tipo === "interessado") {
                const { id_interessado, cpf, nome, telefone, email } = dados;
                if (cpf && nome && telefone && email) {
                    const interessado = new Interessado(cpf, nome, telefone, email);
                    interessado.id_interessado = id_interessado;
                    interessado.alterar()
                        .then(() => {
                            res.status(200).json({
                                "Status": true,
                                "mensagem": "Interessado alterado com sucesso."
                            });
                        })
                        .catch((erro) => {
                            res.status(500).json({
                                "Status": false,
                                "mensagem": "Erro ao alterar interessado: " + erro.message
                            });
                        });
                } else {
                    res.status(400).json({
                        "Status": false,
                        "mensagem": "Requisição inválida, informe todos os dados do interessado."
                    });
                }
            } else if (tipo === "filhote") {
                const { id_filhote, especie, raca } = dados;
                if (id_filhote && especie && raca) {
                    const filhote = new Filhote(especie, raca);
                    filhote.id_filhote = id_filhote;
                    filhote.alterar()
                        .then(() => {
                            res.status(200).json({
                                "Status": true,
                                "mensagem": "Filhote alterado com sucesso."
                            });
                        })
                        .catch((erro) => {
                            res.status(500).json({
                                "Status": false,
                                "mensagem": "Erro ao alterar filhote: " + erro.message
                            });
                        });
                } else {
                    res.status(400).json({
                        "Status": false,
                        "mensagem": "Requisição inválida, informe todos os dados do filhote."
                    });
                }
            } else {
                res.status(400).json({
                    "Status": false,
                    "mensagem": "Tipo inválido. Use 'interessado' ou 'filhote'."
                });
            }
        } else {
            res.status(405).json({
                "Status": false,
                "mensagem": "Método não permitido."
            });
        }
    }

    // Método para excluir interessado ou filhote
    excluir(req, res) {
        const { tipo, id } = req.body;

        if (req.method === "DELETE" && req.is("application/json")) {
            if (tipo === "interessado") {
                if (id) {
                    const interessado = new Interessado();
                    interessado.id_interessado = id;
                    interessado.excluir()
                        .then(() => {
                            res.status(200).json({
                                "Status": true,
                                "mensagem": "Interessado excluído com sucesso."
                            });
                        })
                        .catch((erro) => {
                            res.status(500).json({
                                "Status": false,
                                "mensagem": "Erro ao excluir interessado: " + erro.message
                            });
                        });
                } else {
                    res.status(400).json({
                        "Status": false,
                        "mensagem": "Requisição inválida, informe o ID do interessado."
                    });
                }
            } else if (tipo === "filhote") {
                if (id) {
                    const filhote = new Filhote();
                    filhote.id_filhote = id;
                    filhote.excluir()
                        .then(() => {
                            res.status(200).json({
                                "Status": true,
                                "mensagem": "Filhote excluído com sucesso."
                            });
                        })
                        .catch((erro) => {
                            res.status(500).json({
                                "Status": false,
                                "mensagem": "Erro ao excluir filhote: " + erro.message
                            });
                        });
                } else {
                    res.status(400).json({
                        "Status": false,
                        "mensagem": "Requisição inválida, informe o ID do filhote."
                    });
                }
            } else {
                res.status(400).json({
                    "Status": false,
                    "mensagem": "Tipo inválido. Use 'interessado' ou 'filhote'."
                });
            }
        } else {
            res.status(405).json({
                "Status": false,
                "mensagem": "Método não permitido."
            });
        }
    }

    consulta(req, res) {
        const { tipo } = req.params;
        const termoBusca = req.params.termoBusca || "";

        if (req.method === "GET") {
            if (tipo === "interessado") {
                const interessado = new Interessado();
                interessado.consulta(termoBusca)
                    .then((interessados) => {
                        res.status(200).json({
                            "Status": true,
                            "ListaDeInteressados": interessados
                        });
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "Status": false,
                            "mensagem": "Erro ao consultar interessados: " + erro.message
                        });
                    });
            } else if (tipo === "filhote") {
                const filhote = new Filhote();
                filhote.consulta(termoBusca)
                    .then((filhotes) => {
                        res.status(200).json({
                            "Status": true,
                            "ListaDeFilhotes": filhotes
                        });
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "Status": false,
                            "mensagem": "Erro ao consultar filhotes: " + erro.message
                        });
                    });
            } else {
                res.status(400).json({
                    "Status": false,
                    "mensagem": "Tipo inválido. Use 'interessado' ou 'filhote'."
                });
            }
        } else {
            res.status(405).json({
                "Status": false,
                "mensagem": "Método não permitido."
            });
        }
    }
}

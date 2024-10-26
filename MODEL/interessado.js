import  interessadoDAO  from "../DAO/interessadoDAO.js";

export class Interessado {
    #nome;
    #cpf;
    #email;
    #telefone;

    constructor(nome, cpf, email, telefone) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#email = email;
        this.#telefone = telefone;
    }

    get nome() { return this.#nome; }
    get cpf() { return this.#cpf; }
    get email() { return this.#email; }
    get telefone() { return this.#telefone; }

    toString() {
        return `Nome: ${this.#nome}\nCPF: ${this.#cpf}\nEmail: ${this.#email}\nTelefone: ${this.#telefone}`;
    }

    toJSON() {
        return {
            nome: this.#nome,
            cpf: this.#cpf,
            email: this.#email,
            telefone: this.#telefone
        };
    }

    async incluir() {
        const intDao = new interessadoDAO();
        await intDao.gravar(this.toJSON());
    }

    async alterar() {
        const intDao = new interessadoDAO();
        await intDao.alterar(this);
    }

    async excluir() {
        const intDao = new interessadoDAO();
        await intDao.excluir(this);
    }

    async consulta(termoBusca) {
        const intDao = new interessadoDAO();
        return await intDao.consulta(termoBusca);
    }
}



export default Interessado;


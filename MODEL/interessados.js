import InteressadoDAO from "../DAO/interessadoDAO.js"; 

 class Interessado {
    #nome;
    #cpf;
    #email;
    #telefone;

    constructor(nome, cpf, email, telefone) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#email = email;
        this.#telefone = telefone;
        this.interessadoDAO = new InteressadoDAO(); 
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
        await this.interessadoDAO.gravarFilho(this.toJSON());
    }

    async alterar() {
        await this.interessadoDAO.alterarInteressado(this.toJSON());
    }

    async excluir() {
        await this.interessadoDAO.excluirInteressado(this.#cpf); 
    }

    async consulta(termoBusca) {
        return await this.interessadoDAO.consultarInteressados(); 
    }
}

export default Interessado;

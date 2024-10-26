import interessadoDAO from "../DAO/interessadoDAO.js";

 class interessado {
    #cpf;
    #nome;
    #telefone;
    #email;

    constructor(cpf, nomeInteressado, telefone, email) {
        this.#cpf = cpf;
        this.#nome = nomeInteressado;
        this.#telefone = telefone;
        this.#email = email;
    }

    
    get cpf() {
        return this.#cpf;
    }

    get nome_interessado() {
        return this.#nome;
    }

    get telefone() {
        return this.#telefone;
    }

    get email() {
        return this.#email;
    }

    
    toString() {
        return `CPF: ${this.#cpf}
    Nome: ${this.#nome}
    Telefone: ${this.#telefone}
    Email: ${this.#email}
    `;
    }

    toJSON() {
        return {
            cpf: this.#cpf,
            nome_interessado: this.#nome,
            telefone: this.#telefone,
            email: this.#email
        };
    }

    
    async incluir() {
        const intDao = new interessadoDAO();

        const interessadoData = {
            cpf: this.#cpf,
            nome_interessado: this.#nome,
            telefone: this.#telefone,
            email: this.#email
        };

        await intDao.gravar(interessadoData);
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

export default interessado;
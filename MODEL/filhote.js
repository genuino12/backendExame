import filhoteDAO from "../DAO/filhoteDAO.js";

class filhote {
    #especie;
    #raca;

    constructor(especie, raca) {
        this.#especie = especie;
        this.#raca = raca;
    }

    
    get especie() {
        return this.#especie;
    }

    get raca() {
        return this.#raca;
    }

    
    toString() {
        return `Espécie: ${this.#especie}
    Raça: ${this.#raca}
    `;
    }

    toJSON() {
        return {
            especie: this.#especie,
            raca: this.#raca
        };
    }

    
    async incluir() {
        const filDao = new filhoteDAO();

        const filhoteData = {
            especie: this.#especie,
            raca: this.#raca
        };

        await filDao.gravar(filhoteData);
    }

    
    async alterar() {
        const filDao = new filhoteDAO();
        await filDao.alterar(this);
    }

    
    async excluir() {
        const filDao = new filhoteDAO();
        await filDao.excluir(this);
    }

    
    async consulta(termoBusca) {
        const filDao = new filhoteDAO();
        return await filDao.consulta(termoBusca);
    }
}
export default filhote;
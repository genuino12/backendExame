import filhoteDAO from "../DAO/filhoteDAO.js";

 class filhote {
    #especie;
    #raca;

    constructor( especie, raca) {
        this.#especie = especie;
        this.#raca = raca;
        this.filhoteDAO = new filhoteDAO(); 
    }

    
    get especie() {
        return this.#especie;
    }

    get raca() {
        return this.#raca;
    }
 

    
    toString() {
        return`
        Espécie: ${this.#especie}
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
        await this.filhoteDAO.gravarFilhote(this.toJSON());
    }

    async alterar() {
        await this.filhoteDAO.alterarFilhote(this.toJSON());
    }

    async excluir() {
        await this.filhoteDAO.excluirFilhote(this.id); 
    }

    async consulta(termoBusca) {
        return await this.filhoteDAO.consultarFilhoPorId(); 
    }
    
    
}
export default filhote;
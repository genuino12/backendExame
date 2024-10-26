import { Router } from 'express';
import CadastroController from './controle/controletotal.js';

const rotaCadastro = Router();
const ctrlCadastro = new CadastroController(); 


rotaCadastro.get("/filhote", ctrlCadastro.consultar) 
    .get("/filhote/:termoBusca", ctrlCadastro.consultar) 
    .post("/filhote", ctrlCadastro.cadastrar) 
    .put("/filhote", ctrlCadastro.alterar) 
    .patch("/filhote", ctrlCadastro.alterar) 
    .delete("/filhote", ctrlCadastro.excluir); 

rotaCadastro.get("/interessado", ctrlCadastro.consultar) 
    .get("/interessado/:termoBusca", ctrlCadastro.consultar) 
    .post("/interessado", ctrlCadastro.cadastrar) 
    .put("/interessado", ctrlCadastro.alterar) 
    .patch("/interessado", ctrlCadastro.alterar) 
    .delete("/interessado", ctrlCadastro.excluir); 

export default rotaCadastro;

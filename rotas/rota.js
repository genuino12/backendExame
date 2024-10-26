import { Router } from 'express';
import ControleGeral from '../controle/controle.js';



const rota = Router();
const ctrlCadastro = new ControleGeral(); 


rota.get("/filhote", ctrlCadastro.consulta) 
    .get("/filhote/:termoBusca", ctrlCadastro.consulta) 
    .post("/filhote", ctrlCadastro.cadastrar) 
    .put("/filhote", ctrlCadastro.alterar) 
    .patch("/filhote", ctrlCadastro.alterar) 
    .delete("/filhote", ctrlCadastro.excluir); 

rota.get("/interessado", ctrlCadastro.consulta) 
    .get("/interessado/:termoBusca", ctrlCadastro.consulta) 
    .post("/interessado", ctrlCadastro.cadastrar) 
    .put("/interessado", ctrlCadastro.alterar) 
    .patch("/interessado", ctrlCadastro.alterar) 
    .delete("/interessado", ctrlCadastro.excluir); 

export default rota;

import { Router } from 'express';
import ControleGeral from '../controle/controle.js';



const rota = Router();
const ctrlCadastro = new ControleGeral(); 


rota.get("/filhotes", ctrlCadastro.consulta) 
    .get("/filhotes/:termoBusca", ctrlCadastro.consulta) 
    .post("/filhotes", ctrlCadastro.cadastrar) 
    .put("/filhotes", ctrlCadastro.alterar) 
    .patch("/filhotes", ctrlCadastro.alterar) 
    .delete("/filhotes", ctrlCadastro.excluir); 

rota.get("/interessados", ctrlCadastro.consulta) 
    .get("/interessados/:termoBusca", ctrlCadastro.consulta) 
    .post("/interessados", ctrlCadastro.cadastrar) 
    .put("/interessados", ctrlCadastro.alterar) 
    .patch("/interessados", ctrlCadastro.alterar) 
    .delete("/interessados", ctrlCadastro.excluir); 

export default rota;

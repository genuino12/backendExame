import express from "express";
import rota from "./rotas/rota.js";
import cors from "cors";

const app = express();
const host = "127.0.0.1";
const porta = 3000;

app.use(cors({
    origin: "*",
}));

app.use(express.json());
app.use('/interessado_Filhote', rota);



app.listen(porta, host, () => {
    console.log(`Servidor Iniciado em http://${host}:${porta}`);
});

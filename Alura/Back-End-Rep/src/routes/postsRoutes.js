//Padrão do JS imposts de bibliotecas antes dos imports interno
//biblioteca
import express from "express";
import multer from "multer";
//interno
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({dest:"./uploads", storage});
//No linux ou mac não usar storage
//const upload = multer({dest:"./uploads"});

//Quando inicia o servidor o melhor caminho é empacotar tudo que é de rota
//jogar pra fora desse arquivo, pra que server.js possa incorporar isso
//no servidor
const routes = (app) => {
    //Permite que o servidor interprete requisições com corpo no formato JSON
    app.use(express.json());
    app.use(cors(corsOptions));

    //Rota para buscar todos os posts
    app.get("/posts", listarPosts);

    //Rota para criar um post
    app.post("/posts", postarNovoPost);

    // Rota para fazer upload de uma imagem. 
    // Utiliza o middleware `upload.single("imagem")` para processar o upload de uma única imagem.
    // Chama a função `uploadImagem` para tratar o upload e salvar a imagem.
    app.post("/upload", upload.single("imagem"), uploadImagem);

    // Rota para atualizar um post existente identificado pelo parâmetro `id`.
    // Chama a função `atualizarNovoPost` para realizar a atualização dos dados do post.
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;

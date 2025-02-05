// Controller responsável por lidar com requisições e respostas relacionadas a posts

// Importa as funções para obter todos os posts e criar um novo post
import {getTodosPosts, getPostPorId, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
    // Chama a função do modelo para buscar todos os posts
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
    res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
    // Obtém os dados do novo post do corpo da requisição
    const novoPost = req.body;
    // Tenta criar o novo post
    try {
        // Chama a função do modelo para criar o post e armazena o resultado
        const postCriado = await criarPost(novoPost);
        // Envia uma resposta HTTP com status 200 (OK) e o post criado
        res.status(200).json(postCriado);
    // Caso ocorra algum erro
    } catch(erro) {
        // Imprime o erro no console para depuração
        console.error(erro.message);
        // Envia uma resposta HTTP com status 500 (Erro Interno do Servidor)
        res.status(500).json({"Erro":"Falha na requisão"});
    }
}

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
    // Cria um objeto com os dados do novo post, incluindo o nome do arquivo da imagem
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
      //alt: ""
        alt: req.file.originalname
    };

    // Tenta criar o novo post e renomear a imagem
    try {
        // Chama a função do modelo para criar o post e armazena o resultado
        const postCriado = await criarPost(novoPost);
        // Gera um novo nome para a imagem com o ID do post
        const imagemAtualizada = `uploads/${postCriado.insertedId}.jpg`;
        // Renomeia o arquivo da imagem para o novo nome
        fs.renameSync(req.file.path, imagemAtualizada);
        // Envia uma resposta HTTP com status 200 (OK) e o post criado
        res.status(200).json(postCriado);
    // Caso ocorra algum erro
    } catch(erro) {
        // Imprime o erro no console para depuração
        console.error(erro.message);
        // Envia uma resposta HTTP com status 500 (Erro Interno do Servidor)
        res.status(500).json({"Erro":"Falha na requisão"});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const postPesq  = await getPostPorId(id);
    const urlImagem = `http://localhost:3000/${id}.jpg`;

  //console.log(req.body.alt);
  //console.log(postPesq.alt);

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.jpg`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
          //alt: req.body.alt
          //alt: req.body.alt = null ? postPesq.alt : req.body.alt
          //alt: req.body.alt == null ? "IndonÃ©sia.jpg" : req.body.alt
            alt: req.body.alt == null ? postPesq.alt : req.body.alt
        }
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch(erro) {
        // Imprime o erro no console para depuração
        console.error(erro.message);
        // Envia uma resposta HTTP com status 500 (Erro Interno do Servidor)
        res.status(500).json({"Erro":"Falha na requisão"});
    }
}

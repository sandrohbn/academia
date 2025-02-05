import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

//Conect as banco de dados utilizando a string de conexão fornecida como variáveis de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Define uma função assíncrona para buscar todos os posts do banco de dados
//export default async function getTodosPosts() {
//"defaut" precisou ser retirado porque o fonte agora tem mais que uma funcao
export async function getTodosPosts() {
    // Conecta-se ao banco de dados MongoDB chamado "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção (tabela) "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Busca todos os documentos da coleção "posts" e retorna como um array
    return colecao.find().toArray();
}

// Função para buscar um post específico pelo seu "_id"
export async function getPostPorId(id) {
    // Conecta-se ao banco de dados MongoDB chamado "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção (tabela) "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Busca um documento na coleção "posts" cujo "_id" é igual ao fornecido
    // Convertendo o "id" para ObjectId do MongoDB
    return colecao.findOne({ _id: new ObjectId(id) });
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set: novoPost});
}

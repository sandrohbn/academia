import express from "express";
import routes from "./src/routes/postsRoutes.js";

//#AcessoRestrito: apagar comando após o teste
//console.log(process.env.STRING_CONEXAO);

const app = express(); //inicia servidor
app.use(express.static("uploads"));

routes(app);

//Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
    console.log('Servidor escutando...');
});

/*
//versão antes de incluir acesso ao banco de dados mongodb atlas
const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Gato fofo dormindo",
        imagem: "https://placecats.com/cute/200/300"
    },
    {
        id: 3,
        descricao: "Gatinho brincando com um novelo de lã",
        imagem: "https://placecats.com/playful/400/250"
    },
    {
        id: 4,
        descricao: "Olhos de gato verde",
        imagem: "https://placecats.com/greeneyes/350/200"
    },
    {
        id: 5,
        descricao: "Gato preto misterioso",
        imagem: "https://placecats.com/black/500/300"
    },
    {
        id: 6,
        descricao: "Gato fazendo careta",
        imagem: "https://placecats.com/funny/250/350"
    }
];

function buscarPostPorId(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

//rota todos os postes
app.get('/posts', (req, res) => {
    res.status(200).json(posts);
});

//rota 1 post escolhido
app.get('/posts/:id', (req, res) => {
    const index = buscarPostPorId(req.params.id)
    res.status(200).json(posts[index]);
});
*/

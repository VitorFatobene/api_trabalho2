const express = require('express');
const app = express();

app.use(express.json());

let filmes = [
    { id: 1, titulo: "Interestelar", genero: "Ficção", ano: 2014, nota: 9 },
    { id: 2, titulo: "Vingadores", genero: "Ação", ano: 2012, nota: 8 },
    { id: 3, titulo: "Titanic", genero: "Romance", ano: 1997, nota: 9 },
    { id: 4, titulo: "Matrix", genero: "Ficção", ano: 1999, nota: 10 },
    { id: 5, titulo: "Batman", genero: "Ação", ano: 2008, nota: 9 },
    { id: 6, titulo: "Frozen", genero: "Animação", ano: 2013, nota: 7 },
    { id: 7, titulo: "Shrek", genero: "Animação", ano: 2001, nota: 8 },
    { id: 8, titulo: "Corra!", genero: "Terror", ano: 2017, nota: 8 },
    { id: 9, titulo: "It", genero: "Terror", ano: 2017, nota: 7 },
    { id: 10, titulo: "Clube da Luta", genero: "Drama", ano: 1999, nota: 10 }
];

let proximoId = 11;

// GET - listar todos os filmes
app.get('/api/filmes', (req, res) => {
    res.json(filmes);
});

// GET - buscar filme por id
app.get('/api/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filme = filmes.find(f => f.id === id);

    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    res.json(filme);
});

// POST - criar filme
app.post('/api/filmes', (req, res) => {
    const { titulo, genero, ano, nota } = req.body;

    if (!titulo || !genero || !ano || !nota) {
        return res.status(400).json({
            erro: "Campos obrigatórios: titulo, genero, ano, nota"
        });
    }

    const novoFilme = {
        id: proximoId++,
        titulo,
        genero,
        ano,
        nota
    };

    filmes.push(novoFilme);

    res.status(201).json(novoFilme);
});

// PUT - atualizar filme
app.put('/api/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filme = filmes.find(f => f.id === id);

    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    const { titulo, genero, ano, nota } = req.body;

    if (!titulo || !genero || !ano || !nota) {
        return res.status(400).json({
            erro: "Campos obrigatórios: titulo, genero, ano, nota"
        });
    }

    filme.titulo = titulo;
    filme.genero = genero;
    filme.ano = ano;
    filme.nota = nota;

    res.json(filme);
});

// DELETE - remover filme
app.delete('/api/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = filmes.findIndex(f => f.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    filmes.splice(index, 1);

    res.status(204).send();
});

app.listen(3000, () => {
    console.log('🚀 API rodando na porta 3000');
});
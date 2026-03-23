# api_trabalho2
metodo get
app.get('/', (req, res) => {
    res.json({
        mensagem: '🎬 API de Filmes funcionando!',
        status: 'sucesso',
        versao: '1.0.0',
        endpoints: {
            listar:   'GET    /api/filmes',
            buscar:   'GET    /api/filmes/:id',
            criar:    'POST   /api/filmes',
            atualizar:'PUT    /api/filmes/:id',
            deletar:  'DELETE /api/filmes/:id'
        }
    });
});

metodo post 
app.post('/api/filmes', (req, res) => {
    // 1. Pegar dados do body
    const { titulo, genero, ano, nota, duracao } = req.body;
 
    // 2. Validar campos obrigatórios
    if (!titulo || !genero || !ano || !nota || !duracao) {
        return res.status(400).json({
            erro: "Campos obrigatórios: titulo, genero, ano, nota, duracao"
        });
    }
 
    // 3. Validar tipos e valores
    if (typeof nota !== 'number' || nota < 0 || nota > 10) {
        return res.status(400).json({
            erro: "Nota deve ser um número entre 0 e 10"
        });
    }
 
    if (typeof ano !== 'number' || ano < 1888 || ano > new Date().getFullYear()) {
        return res.status(400).json({
            erro: "Ano inválido"
        });
    }
 
    if (typeof duracao !== 'number' || duracao <= 0) {
        return res.status(400).json({
            erro: "Duração deve ser um número positivo (em minutos)"
        });
    }
 
    // 4. Criar novo filme
    const novoFilme = {
        id: proximoId++,
        titulo,
        genero,
        ano,
        nota,
        duracao
    };
 
    // 5. Adicionar ao array
    filmes.push(novoFilme);
 
    // 6. Retornar filme criado com status 201
    res.status(201).json(novoFilme);
});

metodo put
app.put('/api/filmes/:id', (req, res) => {
    // 1. Pegar ID da URL
    const id = parseInt(req.params.id);
 
    // 2. Buscar filme no array
    const filme = filmes.find(f => f.id === id);
 
    // 3. Verificar se existe
    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }
 
    // 4. Pegar dados do body
    const { titulo, genero, ano, nota, duracao } = req.body;
 
    // 5. Validar campos obrigatórios
    if (!titulo || !genero || !ano || !nota || !duracao) {
        return res.status(400).json({
            erro: "Campos obrigatórios: titulo, genero, ano, nota, duracao"
        });
    }
 
    // 6. Validar tipos e valores
    if (typeof nota !== 'number' || nota < 0 || nota > 10) {
        return res.status(400).json({
            erro: "Nota deve ser um número entre 0 e 10"
        });
    }
 
    if (typeof ano !== 'number' || ano < 1888 || ano > new Date().getFullYear()) {
        return res.status(400).json({
            erro: "Ano inválido"
        });
    }
 
    if (typeof duracao !== 'number' || duracao <= 0) {
        return res.status(400).json({
            erro: "Duração deve ser um número positivo (em minutos)"
        });
    }
 
    // 7. Atualizar campos
    filme.titulo  = titulo;
    filme.genero  = genero;
    filme.ano     = ano;
    filme.nota    = nota;
    filme.duracao = duracao;
 
    // 8. Retornar filme atualizado
    res.json(filme);
});

metodo delete
app.delete('/api/filmes/:id', (req, res) => {
    // 1. Pegar ID da URL
    const id = parseInt(req.params.id);
 
    // 2. Encontrar índice do filme no array
    const index = filmes.findIndex(f => f.id === id);
 
    // 3. Verificar se existe
    if (index === -1) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }
 
    // 4. Remover do array
    filmes.splice(index, 1);
 
    // 5. Retornar 204 No Content
    res.status(204).send();
});

link para as fotos do postman https://docs.google.com/document/d/1wBwP0cSRb4RPRpodItx_S5_5UBBZQOT5SHvyS0t68OE/edit?usp=sharing
 

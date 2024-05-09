const express           = require('express');
const mustacheExpress   = require('mustache-express');
const path              = require('path');
const app               = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    res.render('index.html');
});

app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.post('/dados', (req, res) => {
    const { nome, endereco, telefone, data } = req.body;

    
    res.send(`
    <div class="container mt-5">
        <h1 class="text-center">Dados Recebidos</h1>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Endereço:</strong> ${endereco}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Data de Agendamento:</strong> ${data}</p>
    </div>
    `);
});



const PORT = 8080;
app.listen(PORT, function () {
    console.log('app rodando na porta ' + PORT);
});

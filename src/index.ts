import express from "express";
import { Tarefa } from "./model/tarefas";
import { Usuarios } from "./model/usuarios";
import {v4 as uuidv4} from 'uuid'; 
import { getHash } from "./utils/criptografia";

const app = express();
app.use(express.json()); //Diz ao expressa para utilizar requisições no formato Json. Sem isso, o express
//não saberia qual o formato da requisição
const listaDeTarefas:Tarefa[] = []; //Variaveis em memória. Não esta gravada em lugar algum

app.listen(3001,() => {
	console.log("Servidor rodando na porta 3001");
});

//Criar uma tarefa POST
app.post('/tarefas', (req,res) => {
	const tarefa = req.body
	listaDeTarefas.push(tarefa);
	res.status(201).send(tarefa);
	res.send("Chamada ao método de Create ");
	console.log(tarefa); //body, pega os valores enviados na requisição post.
	console.log('Tarefa criada com Sucesso');
});
//Listar ou Buscar tarefas GET	
app.get('/tarefas',(req,res) => {
	res.send(listaDeTarefas);
});

app.get('tarefas/:id', (req,res) =>{
   const id = parseInt(req.params.id);
   const listaFiltrada = listaDeTarefas.filter(t => t.id === id);
   res.send(listaFiltrada[0]);
});


///////////////USUARIOS 

const listaDeUsuarios: Usuarios[] = [];
app.post('/usuarios' , (req,res) => {
	const usuario = req.body as Usuarios; // Isso porque, nao se sabe o tipo que vem na requisição, e assim
   //podemos utilizar o autocomplete, com os atributos do tipo Usuario.
   usuario.id = uuidv4();
   usuario.password = getHash(usuario.password);
	listaDeUsuarios.push(usuario);
	res.status(201).send(usuario);
	console.log("Usuário adicionado ");
});

app.get('/usuarios',(req,res) => {
	res.send(listaDeUsuarios);
});

app.get('/usuarios/:id',(req,res) => {
	const id = req.params.id;
	const listaFiltrada = listaDeUsuarios.filter(u => u.id === id);

	if(listaFiltrada && listaDeUsuarios.length){
		res.status(500).send({erro: true});
	}
	else{
		res.status(404).send({erro: 'Usuário não encontrado'});
	}
	res.send(listaFiltrada);
});

app.put('/usuarios/:id',(req,res) => {
	const id = req.params.id;
	const corpo = req.body as Usuarios;
	listaDeUsuarios.forEach((usuario) => {
		if(usuario.id === id){
                    usuario.nome = corpo.nome;
                    usuario.password = corpo.password;
		}
		console.log("Usuario alterado com sucesso");
		
	});
});
app.delete('/usuarios/:id',(req,res) => {
	const id = req.params.id;
	const corpo = req.body as Usuarios;
	listaDeUsuarios.forEach((usuario) => {
		if(usuario.id === id){
                    usuario.nome = corpo.nome;
                    usuario.password = corpo.password;
		}
		console.log("Usuario ao com sucesso");
	});
});

app.post('/auth/login', (req,res) => {
   const login = req.body.nome;
   const senha = req.body.password;
   const listaFiltrada = listaDeUsuarios.filter(u => u.nome);
	if(listaFiltrada && listaDeUsuarios.length){
		res.status(500).send({erro: true});
	}
	else{
		res.status(401).send({erro: 'Usuário não autorizado'});
	}
	res.send(listaFiltrada);

})
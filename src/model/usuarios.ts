export interface Usuarios {
	nome: string;
	id?: string; //Opcional porque na hora de requisição para criar o usuário, o id não existe ainda
	//string porque o cóigo é alfa numérico.
	password: string;
}
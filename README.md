# Boas vindas ao repositório do projeto List Task!

Esse é  um projeto para organização de tarefas, que utiliza do mongodb local para o banco de dados, é necessario a previa instalacao do [mongodb](https://docs.mongodb.com/manual/installation/).

---

## Sumário

- [Requisitos técnicos](#requisitos-tecnicos)
- [Funcionalidades](#funcionalidades)
- [Como Rodar a Aplicação](#como-rodar-a-aplicação)

---

## Requisitos técnicos

  ### 1. Front-End 
  - Feito em React;

  ### 2. Back-End 
  - Feito em NodeJS, com MongoDB;

  ### 3. Arquitetura em camadas;
  - Utilizando a Aquitetura MERN e MSC;

  ### 4. Testes
  - Feito com as tecnologias mocha, chai, sinon e mongodb-memory-server@6.
  - Para poder executar os testes basta executar comando `npm test`

  ### 5. Lint
  - Para poder rodar os `ESLint` em um projeto basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.
  
---

## Funcionalidades:
  
  1. Visualizar a lista de tarefas, Esta lista deve ser ordenável por:
  - Ordem alfabética; 
  - Data de criação;
  - Status,

  2. A tarefa deve possuir um status editável: 
  - pendente; 
  - em andamento;
  - pronto,

  3. O List Task deve ser capaz de: 
  - Inserir uma nova tarefa na lista;
  - Remover uma tarefa da lista;
  - Atualizar uma tarefa da lista,

  

---


## Como Rodar a Aplicação

Inicie o mongo:
```
sudo service mongod start 
```

Inicie o server:
```
cd mern/server
npm install
npm install -g nodemon
nodemon server
```

Inicie o client
```
cd mern/client
npm install
npm start
```

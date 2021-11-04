const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const taskModel = require('../../models/listTaskmodels');
const { getConnection } = require('./connectionsMock.test')

const payloadTask = [
      {
        _id: '61807c5a0416e7b14fcf02a2',
        task: 'Tarefa 1',
        status: 'pendente',
        date: "2021-11-01T23:44:41.354Z",
      },{
        _id: '61807c300416e7b14fcf02a1',
        task: 'Tarefa 2',
        status: 'em andamento',
        date: "2021-11-01T23:44:41.354Z",
      },{
        _id: '618098e66b7634ddfc53324a',
        task: 'Tarefa 3',
        status: 'pronto',
        date: "2021-11-01T23:44:41.354Z",
      },{
        _id: '6180802f1771cfb7f996999b',
        task: 'Tarefa 4',
        status: 'pendente',
        date: "2021-11-01T23:44:41.354Z",
      }
    ];

describe('Busca as tarefa pelo status no Banco de Dados', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection()
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async() => {
    MongoClient.connect.restore();
    await taskModel.deleteManyTest();
  });
  
  describe('quando existe alguma tarefa', async () => {
    before(async () => {
    await taskModel.createManyTest(payloadTask);
    });

    after(async() => {
    await taskModel.deleteManyTest();
    });
    
    it('retorna um array', async () => {
      const response = await taskModel.getStatus('pendente');
      expect(response).to.be.an('array');
    });
   
    it('o array não está vazio', async () => {
      const response = await taskModel.getStatus('pendente');
      expect(response).to.be.not.empty;
    });
    
    it('o array possui objeto', async () => {
      const [item] = await taskModel.getStatus('pendente');
      expect(item).to.be.an('object');
    });
    
    it('o array pode possuir varios objetos', async () => {
      const [item1, item2] = await taskModel.getStatus('pendente');
      expect(item1, item2).to.be.an('object');
    })
    
    it('o objeto tem as propriedades com "id" "task", "status" e "date" ', async () => {
      const [item] = await taskModel.getStatus('pendente');
      const { _id, task, status, date } = item;
      expect(item).to.be.a('object').to.include({ _id, task, status, date });
    });
    
    it('quando busca por "pendente", retorna objetos com o status "pendente" ', async () => {
      const [item] = await taskModel.getStatus('pendente');
      const { _id, task, status, date } = item;
      expect(item).to.be.a('object').to.have.property('status', 'pendente');
    });
    
    it('quando busca por "em andamento", retorna objetos com o status "em andamento" ', async () => {
      const [item] = await taskModel.getStatus('em andamento');
      const { _id, task, status, date } = item;
      expect(item).to.be.a('object').to.have.property('status', 'em andamento');
    });

    it('quando busca por "pronto", retorna objetos com o status "pronto" ', async () => {
      const [item] = await taskModel.getStatus('pronto');
      const { _id, task, status, date } = item;
      expect(item).to.be.a('object').to.have.property('status', 'pronto');
    });
  });
  describe('quando não existe nenhuma tarefa', async () => {

    it('retorna um array', async () => {
       const response = await taskModel.getStatus();
       expect(response).to.be.an('array');
    })
    
    it('o array está vazio', async () => {
      const response = await taskModel.getStatus();
      expect(response).to.be.empty;
    })
  }) 

});
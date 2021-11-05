const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const taskModel = require('../../models/listTaskmodels');
const { getConnection } = require('./connectionsMock.test')


describe('Insere uma nova tarefa no Banco de Dados', () => {
  let connectionMock;

  
  before(async () => {
    connectionMock = await getConnection()
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  
  after(async() => {
    MongoClient.connect.restore();
    await taskModel.deleteManyTest();
  });
  
  
  describe('quando é inserido com sucesso', () => {
    const payloadTask = {
      task: "Fazer algo em x tempo",
      status: "pendente"
    }
    it('retorna um object com "id" "task", "status", "date" como propriedade', async () => {
      const response = await taskModel.create(payloadTask);
      const {_id, task, status, date} = response;
      expect(response).to.be.a('object').to.include({ _id, task, status, date });
    });
  });
});
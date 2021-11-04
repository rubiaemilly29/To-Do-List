const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const taskModel = require('../../models/listTaskmodels');
const { getConnection } = require('./connectionsMock.test')

const payloadTask = {
        _id: '61807c5a0416e7b14fcf02a2',
        task: 'Tarefa 1',
        status: 'pendente',
        date: "2021-11-01T23:44:41.354Z",
      }

describe('Atualiza a tarefa no Banco de Dados', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection()
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async() => {
    MongoClient.connect.restore();
    await taskModel.deleteManyTest();
  });
  
  describe('ao passar um id como parametro', async () => {
    it('e o dado novo do task, é retornado um objeto com o task atualizado', async () => {
     const {_id} = await taskModel.create(payloadTask);
     
     const obj = await {
       _id: _id,
       task: 'Tarefa 2',
       status: 'pendente'
     }
     const item = await taskModel.updateList(obj._id,obj.task, obj.status);
     expect(item.task).to.not.equal(payloadTask.task);
    });
    
    it('e o dado novo do status, é retornado um objeto com o status atualizado', async () => {
      const {_id} = await taskModel.create(payloadTask);
      
      const obj = await {
        _id: _id,
        task: 'Tarefa 1',
        status: 'pronto'
      }
      const item = await taskModel.updateList(obj._id,obj.task, obj.status);
      expect(item.status).to.not.equal(payloadTask.status);
    });
  });
});
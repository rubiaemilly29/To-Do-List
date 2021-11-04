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

describe('Deleta a tarefa', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection()
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async() => {
    MongoClient.connect.restore();
    await taskModel.deleteManyTest();
  });
  
  describe('Ao ser passado um id como parametro', async () => {
    
    it('deleta o documento no banco de dados', async () => {
      const {_id} = await taskModel.create(payloadTask);
      await taskModel.deleteList(_id);
      const item = await taskModel.getAll()
      expect(item).to.be.empty;
    });
  });
});
const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const taskModel = require('../../models/listTaskmodels');
const { getConnection } = require('./connectionsMock.test')


describe('Busca por todas as tarefa no Banco de Dados', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection()
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async() => {
    MongoClient.connect.restore();
    await taskModel.deleteManyTest();
  });
  
  describe('quando não existe nenhuma tarefa', async () => {

    it('retorna um array', async () => {
       const response = await taskModel.getAll();
       expect(response).to.be.an('array');
    })
    
    it('o array está vazio', async () => {
      const response = await taskModel.getAll();
      expect(response).to.be.empty;
    })
  })

  describe('quando existe alguma  tarefa', () => {
    before(() => {
      sinon.stub(taskModel, 'getAll')
        .resolves([
          {
            _id: '61807be90416e7b14fcf029f',
            task: 'Tarefa 1',
            status: 'pendente',
            date: "2021-11-01T23:44:41.354Z",
          },
          {
            _id: '61807be90416e7b14fcf029f',
            task: 'Tarefa 2',
            status: 'pendente',
            date: "2021-11-01T23:44:41.354Z",
          }
        ]);
    });

    after(() => {
      taskModel.getAll.restore();
    })

    it('retorna um array', async () => {
      const response = await taskModel.getAll();
      expect(response).to.be.an('array');
    });
    it('o array não está vazio', async () => {
      const response = await taskModel.getAll();
      expect(response).to.be.not.empty;
    });
    it('o array possui objeto', async () => {
      const [item] = await taskModel.getAll();
      expect(item).to.be.an('object');
    });
    it('o array pode possuir varios objetos', async () => {
      const [item1, item2] = await taskModel.getAll();
      expect(item1, item2).to.be.an('object');
    })
    it('o objeto tem as propriedades com "id" "task", "status" e "date" ', async () => {
      const [item] = await taskModel.getAll();
      const { _id, task, status, date } = item;
      expect(item).to.be.a('object').to.include({ _id, task, status, date });
    });
  });
});
const { ObjectId } = require('mongodb');
const connection = require('../connection/conn');

const create = async (listTask) => {
  const { task, status } = listTask;
  const date = new Date();
  const db = await connection();
  const inserted = await db
    .collection('listTask')
    .insertOne({ task, status, date });
  const { ops } = inserted;

  return { id: inserted.insertedId, task, status, date: ops[0].date };
};

const getAll = async () => {
  const db = await connection();
  const allTask = await db.collection('listTask').find().toArray();
  return allTask;
};

const getStatus = async (statusProp) => {
  const db = await connection();
  const allTask = await db
    .collection('listTask')
    .find({ status: `${statusProp}` })
    .toArray();
  return allTask;
};

const updateList = async (id, task, status) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const date = new Date();
  const db = await connection();
  await db
    .collection('listTask')
    .updateOne({ _id: ObjectId(id) }, { $set: { task, status, date } });
  return { id, task, status, date };
};

const deleteList = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  const list = await db.collection('listTask').deleteOne({ _id: ObjectId(id) });
  return list;
};

const deleteManyTest = async () => {
  const db = await connection();
  await db.collection('listTask').deleteMany({});
};
const createManyTest = async (listTask) => {
  const db = await connection();
  await db.collection('listTask').insertMany(listTask);
};

module.exports = {
  create,
  getAll,
  getStatus,
  updateList,
  deleteList,
  deleteManyTest,
  createManyTest,
};

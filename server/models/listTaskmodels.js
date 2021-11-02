const { ObjectId } = require('mongodb');
const connection = require('../connection/conn');

const create = async (listTask) => {
  const { task, status } = listTask;
  const date = new Date();
  const db = await connection();
  const inserted = await db.collection('listTask').insertOne({ task, status, date });
  const { ops } = inserted;

  return { _id: inserted.insertedId, task, status, date: ops[0].date };
};

const searchByAscendingDate = async () => {
const db = await connection();
const allTask = await db.collection('listTask').find().sort({ date: 1 }).toArray();
return allTask;
};

const searchByDescendingDate = async () => {
const db = await connection();
const allTask = await db.collection('listTask').find().sort({ date: -1 }).toArray();
return allTask;
};

const searchStatus = async (status) => {
const db = await connection();
const allTask = await db.collection('listTask').find({ status: `${status}` }).toArray();
return allTask;
};

async function updateList(id, task, status) {
  if (!ObjectId.isValid(id)) {
     return null;
   }
const date = new Date();
const db = await connection();
await db.collection('listTask')
  .updateOne({ _id: ObjectId(id) }, { $set: { task, status, date } });
return { id, task, status, date };
}

async function deleteList(id) {
if (!ObjectId.isValid(id)) {
      return null;
}
const db = await connection();
const list = await db.collection('listTask').deleteOne({ _id: ObjectId(id) });
console.log(list);
return list;
}

module.exports = {
  create,
  searchByAscendingDate,
  searchByDescendingDate,
  searchStatus,
  updateList,
  deleteList,

};

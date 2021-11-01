/* const { ObjectId } = require('mongodb');
 */const connection = require('../connection/conn');

const create = async (listTask) => {
  const { task, status } = listTask;
  const db = await connection();
  const inserted = await db.collection('listTask').insertOne({ task, status, date: new Date() });
  const { ops } = inserted;

  return { _id: inserted.insertedId, task, status, date: ops[0].date };
};

module.exports = {
  create,
};

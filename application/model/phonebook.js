const { getDB } = require('../../database/connection');
const { asyncFuntion } = require('../../middleware/async');

exports.insertData = asyncFuntion(async (data) => {
  const _contact = await getDB().collection('contact');

  // check user number alredy exist or not
  const userData = await _contact.findOne(
    {
      number: data.number,
    },
    {
      projection: {
        _id: 1,
      },
    }
  );

  if (userData) return false;

  await _contact.insertOne(data);

  return true;
});

exports.getAllContact = asyncFuntion(async () => {
  return await getDB()
    .collection('contact')
    .find(
      {},
      {
        projection: {
          _id: 0,
        },
      }
    )
    .toArray();
});

exports.getDataByNumber = asyncFuntion(async (data) => {
  return await getDB()
    .collection('contact')
    .findOne(data, {
      projection: {
        _id: 0,
      },
    });
});

exports.updateContact = asyncFuntion(async (data) => {
  const _contact = await getDB().collection('contact');

  // check new number alredy exist or not
  const userData = await _contact.findOne(
    {
      number: data.newNumber,
    },
    {
      projection: {
        _id: 1,
      },
    }
  );

  if (userData) return { newNumberExist: true };

  const result = await _contact.updateOne(
    {
      number: data.currentNumber,
    },
    {
      $set: {
        number: data.newNumber,
      },
    }
  );

  return result.result.nModified === 1 ? { modified: true } : { modified: false };
});

exports.deleteContact = asyncFuntion(async (data) => {
  const result = await getDB().collection('contact').deleteOne(data);
  return result.result.n === 1 ? true : false;
});

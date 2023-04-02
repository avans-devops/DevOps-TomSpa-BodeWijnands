const request = require('supertest');
const app = require('../../app');
const { connectToDatabase, client } = require('../../services/database');
require("dotenv").config();

jest.mock('../../services/consumer', () => {
  const msgConsumer = async (msg) => {
    console.log(msg);
  }
  return { msgConsumer }
})

describe('Get Results', () => {
  let db;

  beforeEach(async () => {
    db = await connectToDatabase();
    await db.collection('consumermsgs').deleteMany({});
  });

  afterEach(async () => {
    await client.close()
  })

  it('should get all results in array', async () => {
    const expected = { 'msg': 'bar' };
    await db.collection('consumermsgs').insertOne(expected);
    delete expected._id;
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0]).toEqual(expect.objectContaining(expected));
  });
});

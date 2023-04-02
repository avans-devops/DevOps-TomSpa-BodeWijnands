const request = require('supertest');
const app = require('../../app');
const connectToDb = require('../../services/database');
require("dotenv").config();

describe('Get Results', () => {
  let db;

  beforeEach(async () => {
    db = await connectToDb();
    await db.collection(process.env.DB_NAME).deleteMany({});
  });

  it('should get all results in array', async () => {
    const expected = { 'msg': 'bar' };
    await db.collection(process.env.DB_NAME).insertOne(expected);
    delete expected._id;
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0]).toEqual(expect.objectContaining(expected));
  });
});

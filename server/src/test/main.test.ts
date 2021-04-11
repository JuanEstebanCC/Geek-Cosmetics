import request from 'supertest';
import  app  from '../index';
describe('Test PingController', () => {
  it('Request /ping should return Pong!', async () => {
    const result = await request(app).get('/items').send();

    expect(result.status).toBe(200);
  });
});


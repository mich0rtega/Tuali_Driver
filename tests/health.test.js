const request = require('supertest');
const app = require('../src/app');

describe('Health check', () => {
  it('GET /health debe retornar 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});

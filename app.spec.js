const request = require('supertest');
const app = require('./app')
const port = 3002

describe('Test the root path of express server', () => {
    test('It should response the GET method', async (done) => {
        const response = await request(app).get('/status');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Server setup and running');
        done();
    });
    test('It should response the GET method', async (done) => {
        const response = await request(app).post('/upload');
        expect(response.statusCode).toBe(400);


        done();
    });
})
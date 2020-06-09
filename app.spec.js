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
    test('It should response error code 400 for no file present', async (done) => {
        const response = await request(app).post('/upload');
        expect(response.statusCode).toBe(400);
        done();
    });
    test('It should return a form from address /', async (done) => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/\/upload/);
        expect(response.text).toMatch(/multipart\/form-data/);
        
        done();
    });
})
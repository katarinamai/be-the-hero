const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connections');

describe('ong', () => {
    beforeEach(async() => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async() => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async() => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "contato@apad.com",
                whatsapp: "11953372328",
                city: "São Paulo",
                uf: "SP"
            });

            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);
    });
});
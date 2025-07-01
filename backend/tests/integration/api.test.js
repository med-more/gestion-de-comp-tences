const request = require('supertest');
const app = require('../../server');

describe('API Intégration - Compétences', () => {
  it('GET /api/competences doit retourner 200', async () => {
    const res = await request(app).get('/api/competences');
    expect(res.statusCode).toBe(200);
    // On peut ajouter d'autres assertions selon la réponse attendue
  });
});

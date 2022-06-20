/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));

  describe('GET /recipe', () => {
    it('should get 200', (done) =>{
      agent.get('/recipe').expect(200)
      done();
    }).timeout(5000);
  });

  describe('GET /recipe/:id', () => {
    it('should get 200', (done) => {
      agent.get('/recipe:id').expect(200);
      done();
    }).timeout(2000);
  });

  describe('POST /recipe', () => {
    it('should get 200', (done) => {
      agent.post('/recipe')
      .send({
        name: 'comidita Rica',
        summary: 'muy buena',
        image: 'https://www.google.com/',
        health_score: '5',
        steps: 'muchos pasos',
        diets: 'vegetariana'      
      })
      .expect(200);
      done();
    }).timeout(3000);
  })

});

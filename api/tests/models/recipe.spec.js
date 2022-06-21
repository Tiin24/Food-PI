const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });

    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid summary', () => {
        Recipe.create({ summary: 'Milanesa a la napolitana' });
      });
    }
    );
    describe('image', () => {
      it('should throw an error if image is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid image')))
          .catch(() => done());
      }
      );
      it('should work when its a valid image', () => {
        Recipe.create({ image: 'Milanesa a la napolitana' });
      }
      );
    }
    );
    describe('health_score', () => {
      it('should throw an error if health_score is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid health_score')))
          .catch(() => done());
      }
      );
      it('should work when its a valid health_score', () => {
        Recipe.create({ health_score: '18' });
      }
      );
    }
    );
    describe('steps', () => {
      it('should throw an error if steps is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid steps')))
          .catch(() => done());
      }
      );
      it('should work when its a valid steps', () => {
        Recipe.create({ steps: 'Milanesa a la napolitana' });
      }
      );
    }
    );
    
  });
});

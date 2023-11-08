// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
  it('should add a new musician', (done) => {
    chai.request(app)
      .post('/musicians')
      .send({ name: 'John Doe', instrument: 'Guitar' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name', 'John Doe');
        expect(res.body).to.have.property('instrument', 'Guitar');
      });
  });

  it('should update an existing musician', (done) => {
    chai.request(app)
      .put('/musicians/1') // Assuming you have a musician with ID 1 in the database
      .send({ name: 'Updated Musician', instrument: 'Piano' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name', 'Updated Musician');
        expect(res.body).to.have.property('instrument', 'Piano');
      });
  });

  it('should delete an existing musician', (done) => {
    chai.request(app)
      .delete('/musicians/1') // Assuming you have a musician with ID 1 in the database
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Musician deleted');
      });
  });
});

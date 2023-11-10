// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');
const request = require('supertest');
const app = require('../your-express-app'); 

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
      .put('/musicians/1') 
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
      .delete('/musicians/1') 
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Musician deleted');
      });
  });
});


describe('POST /musicians', () => {
  it('should return an error when "name" field is empty', async () => {
    const response = await request(app)
      .post('/musicians')
      .send({ instrument: 'Guitar' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return an error when "instrument" field is empty', async () => {
    const response = await request(app)
      .post('/musicians')
      .send({ name: 'John Doe' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should add a musician when both "name" and "instrument" fields are provided', async () => {
    const response = await request(app)
      .post('/musicians')
      .send({ name: 'John Doe', instrument: 'Guitar' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Assuming it returns an array of musicians
  });
});

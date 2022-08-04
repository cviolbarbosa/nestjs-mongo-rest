import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MongoClient, Db } from 'mongodb';
import { getMockDeveloper1, getMockDeveloper2, getMockDeveloper3 } from './../src/developers/test/fixtures/developerStub';
import { ObjectId } from 'mongoose';

const DBHOST = process.env.DBHOST;
let developers = [   getMockDeveloper1('junior', false), 
                     getMockDeveloper2('junior', false),  
                     getMockDeveloper3('senior', false)];

async function cleanAndPopulateDatabase(items) {
  return MongoClient.connect(`mongodb://${DBHOST}/developers`)
        .then( client => {
            const connection = client.db();
            return connection.collection('developers').deleteMany({})
                  .then(() => connection.collection('developers').insertMany(items)) // mutates items objects
                  .then(() => connection); 
        });
}



describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connection: Db;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
    connection = await cleanAndPopulateDatabase(developers); //mutates developers objs by inserting "_id"
  })

  it('/ (GET Root)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Developer Database API');
  });

  it('/ (GET LIST)', () => {
    return request(app.getHttpServer())
      .get('/developers')
      .expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
			  expect(response.body.length).toEqual(3);
      });
  });


  it('/ (GET DETAIL)', () => {
    const id = developers[0]._id.toString();
    return request(app.getHttpServer())
      .get(`/developers/${id}`)
      .expect(200)
      .then(response => {
        expect(!Array.isArray(response.body)).toBeTruthy()
			  expect(response.body.name).toEqual(developers[0].name)
      });
  });

  // COMMENT: NESTJS issue: throwing error for partial update. It should not!
  it('/ (PATCH DATA)', () => {
    const id = developers[0]._id.toString();
    return request(app.getHttpServer())
      .patch(`/developers/${id}`)
      .send({level : 'senior', name:'Fulano', email:'fulano@email.com'})
      .expect(200)
      .then(response => {
			  expect(response.body.level).toEqual('senior')
      });
  });

  it('/ (PATCH INVALID DATA)', () => {
    const id = developers[0]._id.toString();
    return request(app.getHttpServer())
      .patch(`/developers/${id}`)
      .send({name : 'Fulano', level : 'INVALID', email:'fulano@hotmail.com'})
      .expect(400)
      .then(response => {
        expect(response.body.message).toContain('each value in level must be a valid enum value')
      });
  });

  it('/ (CREATE ITEM )', () => {
    return request(app.getHttpServer())
      .post(`/developers`)
      .send({name : 'Beltrano', level : 'senior', email:'fulano@hotmail.com'})
      .expect(201)
      .then(response =>  connection.collection('developers').findOne({name: 'Beltrano'}))
      .then( (developer) => expect(developer.name).toBe('Beltrano'));

    });
  
    it('/ (DELETE ITEM )', () => {
      const id: ObjectId= developers[0]._id;
      return request(app.getHttpServer())
        .delete(`/developers/${id}`)
        .expect(200)
        .then(response =>  connection.collection('developers').findOne(id))
        .then( (developer) => expect(developer).toBeNull);
      });
    

  afterAll(async()=>{
    await connection.collection('developers').deleteMany({});
    await app.close();
  })

});

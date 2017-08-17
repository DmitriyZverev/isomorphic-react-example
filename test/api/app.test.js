import supertest from 'supertest';

import appFactory from '../../api/app';

const CONTENT_TYPE = 'application/json; charset=utf-8';

const fixtures = {
  cars: [
    {
      id: '1',
      name: 'Car 1',
    },
    {
      id: '2',
      name: 'Car 2',
    },
  ],
  specs: [
    {
      carId: '1',
    },
    {
      carId: '2',
    },
  ],
};

function expectNotFound(response) {
  expect(response.statusCode).toBe(404);
  expect(response.headers['content-type']).toBe(CONTENT_TYPE);
  expect(response.headers['access-control-allow-origin']).toBe('*');
  expect(response.body).toEqual({message: 'Resource not found.'});
}

function expectSuccess(response) {
  expect(response.statusCode).toBe(200);
  expect(response.headers['content-type']).toBe(CONTENT_TYPE);
  expect(response.headers['access-control-allow-origin']).toBe('*');
}

describe('', () => {
  let request;

  beforeAll(() => {
    const app = appFactory(fixtures);
    request = supertest(app.callback());
  });

  it('/', async () => {
    const response = await request.get('/');
    expectNotFound(response);
  });

  it('/notfound/', async () => {
    const response = await request.get('/notfound/');
    expectNotFound(response);
  });

  it('/cars/', async () => {
    const response = await request.get('/cars/');
    expectSuccess(response);
    expect(response.body).toEqual(fixtures.cars);
  });

  it('/cars/:id/', async () => {
    const response = await request.get('/cars/1/');
    expectSuccess(response);
    expect(response.body).toEqual({
      ...fixtures.cars.find(car => car.id === '1'),
      spec: {
        ...fixtures.specs.find(spec => spec.carId === '1'),
      },
    });
  });

  it('/cars/:notExistsId/', async () => {
    const response = await request.get('/cars/999/');
    expectNotFound(response);
  });

  it('/cars/:invalidId/', async () => {
    const response = await request.get('/cars/invalid-string/');
    expectNotFound(response);
  });
});

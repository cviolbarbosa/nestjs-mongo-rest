<p align="center">
  <h1> NODEJS-MONGO BACKEND </h1>
</p>


  <p align="center">A backend built with <a href="http://nodejs.org" target="_blank">Node.js</a> with development and production settings using docker-compose.</p>
    <p align="center">

## Description

REST-API backend implementing CRUD operations using [Nest](https://github.com/nestjs/nest) and [Mongodb](https://github.com/mongodb/mongo).
In development mode, the backend uses a very simple in-memory storage implemented with [array-simple-query](https://github.com/cviolbarbosa/array-simple-query).

## Installation

```bash
$ npm install
```

## Running the app directly on the host OS

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```
## Running the app on a docker container
```bash
# watch mode
$ docker-compose -f docker-compose-dev up runbackend.

# production mode
$ build-image.sh
$ docker-compose up

```

## Test

```bash
# unit tests
$ docker-compose -f docker-compose-dev.yml up unittest

# e2e tests
$ docker-compose -f docker-compose-dev.yml up e2etest

```

##  Most important files 

| File | Description |
| --- | --- |
| `./Dockerfile` | Docker recipe to create the production image to run the application.
| `./build-image.sh` | Script to build the production image,to be used, for example, in a continous integration workflow.
| `./docker-compose.yml` | docker compose to spin up the backend and mongodb in production mode.
| `./Dockerfile-dev` | Docker recipe to create an image with extra libs for development.
| `./docker-compose-dev.yml` | docker compose to buid, run and test the application in development.
| `./src/developers/repositories/developers.mem.respository.ts` | in-memory repository interfaces with service layer.
| `./src/developers/repositories/developers.mongo.respository.ts` | mongo reposistory interfaces with service layer.
| --- | --- |
## Stay in touch

- Author - Carlos Viol Barbosa 

## License

Nest is [MIT licensed](LICENSE).

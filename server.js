// import { createServer } from 'node:http'
//
// const server = createServer((request, response) => {
//   console.log('server rodando');
//   return response.end();
// })
//
// server.listen(3333);
import {fastify} from  'fastify';
import{ DatabasePostgres} from './database-postgres.js'
//import {DatabaseMemory} from './database-memory.js'
const database = new DatabasePostgres();

const server = fastify();

//const database = new DatabaseMemory();

server.post('/videos', async (req, resp) =>{
  const body = req.body;



  await database.create({
    title: body.title,
    description: body.description,
    duration: body.duration,
  });


  return resp.status(201).send();
});

server.get('/videos', async (req, resp) =>{
  const search = req.query.search;

  const videos = await database.list(search);
  return videos;
});

server.put('/videos/:id', async (req, resp) =>{
  const body = req.body;

  const videoId = req.params.id;
  const video = await database.update(videoId, {
    title: body.title,
    description: body.description,
    duration: body.duration,
  });

  return resp.status(204).send();
});

server.delete('/videos/:id', async (req, resp) =>{
  const videoId = req.params.id;

  await database.delete(videoId);

  return resp.status(204).send();
});

server.listen({
  port: 3333,
});

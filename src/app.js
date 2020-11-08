const express = require("express");
const cors = require("cors");

const { v4: uuidv4, validate } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
      return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    
   const { title, url, techs } = request.body;

   const repositore = { id: uuidv4(), title, url, techs, likes: 0, };

   repositories.push(repositore);

   return response.json(repositore);
});

app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params;
  
  const { title, url, techs } = request.body;

    const finRepositoreIndex = repositories.findIndex(repositorie => repositorie.id == id);

    if (finRepositoreIndex < 0)  {
        return response.status(400).json({error: 'Repository does not exists' });
    }

    const repositorie = {
        id, title, url, techs, likes: repositories[finRepositoreIndex].likes,
    };

    repositories[finRepositoreIndex] = repositorie;
    
    return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  const findRepositoreIndex = repositories.findIndex(repositore => repositore.id == id);

  if (findRepositoreIndex >= 0)  {
      repositories.splice(findRepositoreIndex, 1);
  } else {
      return response.status(400).json({error: 'Repository does not exists.'});
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;

  const findRepositoreIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if (findRepositoreIndex < 0)  {
    return response.status(400).json({error: 'Repository does not exists.'});
  }

  repositories[findRepositoreIndex].likes += 1;

  return response.json(repositories[findRepositoreIndex]);

});

module.exports = app;

const express = require('express');

const server = express();

server.use(express.json());

const users = ['Diego', 'Robson', 'Victor'];

server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url};`);
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({
      error: 'User name is required'
    });
  }

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put('/users/:index', checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete('/users/:index', (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
})

server.listen(3000);
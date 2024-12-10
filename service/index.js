import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let employee = {};
let time = [];

// The service port. In production, the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Initialize the Express app
const app = express();

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Router for service endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

// ==============================
// Authentication Endpoints
// ==============================

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
  const employee = employees[req.body.email];
  if (employee) {
    res.status(409).send({ msg: 'Existing employee' });
  } else {
    const newEmployee = { email: req.body.email, password: req.body.password, token: uuidv4() };
    users[newEmployee.email] = newEmployee;
    res.send({ token: newEmployee.token });
  }
});

// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const employee = [req.body.email];
  if (employee && req.body.password === employee.password) {
    employee.token = uuidv4();
    res.send({ token: user.token });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const employee = Object.values(employees).find((u) => u.token === req.body.token);
  if (employee) {
    delete employee.token;
  }
  res.status(204).end();
});

// ==============================
// Scores Endpoints
// ==============================


// Get scores
apiRouter.get('/time', (req, res) => {
  res.json(times);
});

// Submit a new score
apiRouter.post('/time', (req, res) => {
  scores = updateScores(req.body, scores);
  res.send(times);
});

// ==============================
// Default Route
// ==============================

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==============================
// Start the Server
// ==============================

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';


// In-memory data store for employees and time logs
let employees = {};
let times = [];

// The service port. In production, the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Initialize the Express app
const app = express();

app.use(cors());

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

apiRouter.get('/test', (req, res) => {
  res.send('Server is working!');
});


// Create a new employee
apiRouter.post('/auth/create', async (req, res) => {
  console.log('Create employee request received:', req.body);

  const employee = employees[req.body.email];
  if (employee) {
    console.log('Employee already exists:', req.body.email);
    res.status(409).send({ msg: 'Existing employee' });
  } else {
    const newEmployee = { email: req.body.email, password: req.body.password, token: uuidv4() };
    employees[newEmployee.email] = newEmployee;
    console.log('New employee created:', newEmployee);
    res.send({ token: newEmployee.token });
  }
});


// Login an existing employee
apiRouter.post('/auth/login', async (req, res) => {
  console.log('Login request received:', req.body);

  const employee = employees[req.body.email];
  console.log('Employee data found:', employee);

  if (employee && req.body.password === employee.password) {
    employee.token = uuidv4();
    console.log('Login successful:', employee);
    res.send({ token: employee.token });
    return;
  }
  
  console.log('Login failed for:', req.body.email);
  res.status(401).send({ msg: 'Unauthorized' });
});


// Logout an employee
apiRouter.delete('/auth/logout', (req, res) => {
  const employee = Object.values(employees).find((e) => e.token === req.body.token);
  if (employee) {
    delete employee.token;
  }
  res.status(204).end();
});

// ==============================
// Time Log Endpoints
// ==============================

// Get time logs
apiRouter.get('/time', (req, res) => {
  res.json(times);
});

// Submit a new time log
apiRouter.post('/time', (req, res) => {
  times.push(req.body);
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

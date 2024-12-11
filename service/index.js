import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';

// In-memory data store for employees and time logs
let employees = {};
let times = [];

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 8000;

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', true);

// Serve up the front-end static content hosting
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// ==============================
// Router for Service Endpoints
// ==============================
const apiRouter = express.Router();
app.use('/api', apiRouter);

// ==============================
// Authentication Endpoints
// ==============================

// Create a new employee
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;

  if (employees[email]) {
    return res.status(409).send({ msg: 'Existing employee' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newEmployee = { email, password: hashedPassword, token: uuidv4() };
  employees[email] = newEmployee;

  // Set the cookie with the auth token
  setAuthCookie(res, newEmployee.token);

  res.send({ id: email });
});

// Login an existing employee
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const employee = employees[email];

  if (employee && await bcrypt.compare(password, employee.password)) {
    employee.token = uuidv4();
    setAuthCookie(res, employee.token);
    res.send({ id: email });
    return;
  }

  res.status(401).send({ msg: 'Unauthorized' });
});

// Logout an employee
apiRouter.delete('/auth/logout', (req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// ==============================
// Secure API Router
// ==============================
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

// Middleware to verify credentials for secure endpoints
secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const employee = Object.values(employees).find((e) => e.token === authToken);

  if (employee) {
    req.employee = employee;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Get time logs
secureApiRouter.get('/time', (req, res) => {
  res.json(times);
});

// Submit a new time log
secureApiRouter.post('/time', (req, res) => {
  const timeEntry = {
    email: req.employee.email,
    action: req.body.action,
    timestamp: new Date().toLocaleString(),
  };

  times.push(timeEntry);
  res.send(timeEntry);
});

// ==============================
// Default Route
// ==============================
app.use((_req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// ==============================
// Start the Server
// ==============================
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// ==============================
// Helper Function to Set Auth Cookie
// ==============================
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

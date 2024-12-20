import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { WebSocketServer } from 'ws';
import { employeeCollection, timeLogCollection } from './database.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 8080; // Default port to 8080
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('./public'));

app.get('/api/endpoint', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/api/logs', async (req, res) => {
  try {
    const logs = await timeLogCollection.find().sort({ timestamp: -1 }).toArray();
    res.json(logs);
  } catch (err) {
    console.error('Error fetching logs:', err);
    res.status(500).json({ msg: 'Failed to fetch logs' });
  }
});

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ msg: 'Please provide a city name' });
  }

  try {
    const apiKey = fc080b8fb73b8fe1b891b2013691cd41;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error('Error fetching weather data:', err);
    res.status(500).json({ msg: 'Failed to fetch weather data', error: err.message });
  }
});


// ==============================
// Authentication Routes
// ==============================

// Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await employeeCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Invalid password' });
    }

    res.json({ email: user.email, token: user.token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

// User Creation Route
app.post('/api/auth/create', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await employeeCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = uuidv4();

    const newUser = {
      email,
      password: hashedPassword,
      token,
    };

    await employeeCollection.insertOne(newUser);
    res.status(201).json({ email: newUser.email, token: newUser.token });
  } catch (err) {
    console.error('Error during user creation:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

// ==============================
// WebSocket Server with In-Memory Chat History
// ==============================
const wss = new WebSocketServer({ noServer: true });

// In-memory chat history
let chatHistory = [];

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Handle the HTTP->WebSocket upgrade
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Track connections
let connections = [];
let id = 0;

wss.on('connection', (ws) => {
  const connection = { id: ++id, alive: true, ws: ws };
  connections.push(connection);

  // Send chat history to the new client
  ws.send(JSON.stringify({ type: 'history', messages: chatHistory }));

  // When a message is received from a client
  ws.on('message', (data) => {
    try {
      const incoming = JSON.parse(data);
      const message = {
        from: incoming.name,
        name: incoming.name,
        msg: incoming.msg,
        timestamp: new Date().toLocaleString(),
      };

      // Add message to chat history
      chatHistory.push(message);

      // Broadcast to all clients (including the sender)
      connections.forEach((c) => {
        c.ws.send(JSON.stringify(message));
      });
    } catch (err) {
      console.error('Error parsing incoming message:', err);
    }
  });

  // Handle connection close
  ws.on('close', () => {
    connections = connections.filter((c) => c.id !== connection.id);
  });

  // Respond to pong messages by marking the connection alive
  ws.on('pong', () => {
    connection.alive = true;
  });
});

// Keep active connections alive
setInterval(() => {
  connections.forEach((c) => {
    if (!c.alive) {
      c.ws.terminate();
    } else {
      c.alive = false;
      c.ws.ping();
    }
  });
}, 10000);

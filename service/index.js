import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { WebSocketServer } from 'ws';
import { employeeCollection, timeLogCollection } from './database.js';


const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 8080; // Default port to 8080
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('./public'));

// ==============================
// Authentication Routes
// (Your existing authentication routes go here)
// ==============================

// ==============================
// WebSocket Server
// ==============================
const wss = new WebSocketServer({ noServer: true });

const server = app.listen(port, () => {
console.log(`Server running on http://localhost:${port}`);
});

// Handle the HTTP->WebSocket upgrade
server.on('upgrade', (request, socket, head) => {
wss.handleUpgrade(request, socket, head, function done(ws) {
wss.emit('connection', ws, request);
});
});

// Track connections
let connections = [];
let id = 0;

wss.on('connection', (ws) => {
const connection = { id: ++id, alive: true, ws: ws };
    connections.push(connection);

  // When a message is received from a client
  ws.on('message', (data) => {
    try {
    const incoming = JSON.parse(data);
    // Reformat the message to match what the client expects
        const broadcastData = JSON.stringify({
          from: incoming.name,
          name: incoming.name,
          msg: incoming.msg,
          });
      
          // Broadcast to all clients (including the sender)
          connections.forEach((c) => {
          c.ws.send(broadcastData);
          });
          } catch (err) {
          console.error('Error parsing incoming message:', err);
          }
      });
      
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
          // Kill any connection that didn't respond to the ping last time
          if (!c.alive) {
        c.ws.terminate();
          } else {
          c.alive = false;
          c.ws.ping();
          }
        });
      }, 10000);
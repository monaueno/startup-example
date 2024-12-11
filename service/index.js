import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { employeeCollection, timeLogCollection } from './database.js';

const authCookieName = 'token';
const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ==============================
// Authentication Routes
// ==============================

app.post('/api/auth/create', async (req, res) => {
  const { email, password } = req.body;

  try{
  const existingEmployee = await employeeCollection.findOne({ email });

  if (existingEmployee) {
    return res.status(409).send({ msg: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const token = uuidv4();
  await employeeCollection.insertOne({ email, password: hashedPassword, token });

  res.cookie(authCookieName, token, { httpOnly: true });
  res.status(201).send({ msg: 'User created' });
}catch (error){
  console.error('Error creating user:', error);
  res.status(500).json({ msg: 'Internal server error'});
}
});


app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try{
  const user = await employeeCollection.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = uuidv4();
    await employeeCollection.updateOne({ email }, { $set: { token } });
    res.cookie(authCookieName, token, { httpOnly: true });
    res.send({ msg: 'Login successful' });
  } else {
    res.status(401).send({ msg: 'Invalid credentials' });
  }
} catch (error){
  console.error('Error logging in:', error);
  res.status(500).json({ msg: 'Internal server error' });
}
});

app.delete('/api/auth/logout', (req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// ==============================
// Start the Server
// ==============================
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});

import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import config from './dbConfig.json' assert { type: 'json'};

// MongoDB Connection
const url = config.mongoUrl;
const client = new MongoClient(url);
const db = client.db(config.dbName);
const employeeCollection = db.collection('Employees');
const timeLogCollection = db.collection('TimeLogs');

export { employeeCollection, timeLogCollection };

// ==============================
// Test Database Connection
// ==============================
(async function testConnection() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB successfully!');
  } catch (ex) {
    console.error(`Unable to connect to database: ${ex.message}`);
    process.exit(1);
  }
})();

// ==============================
// Employee Authentication Functions
// ==============================

export async function getEmployee(email) {
  return employeeCollection.findOne({ email });
}

export async function getEmployeeByToken(token) {
  return employeeCollection.findOne({ token });
}

export async function createEmployee(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const employee = {
    email,
    password: passwordHash,
    token: uuidv4(),
  };

  await employeeCollection.insertOne(employee);
  return employee;
}

// ==============================
// Time Logging Functions
// ==============================

export async function addTimeLog(email, action) {
  const timeLog = {
    email,
    action,
    timestamp: new Date().toLocaleString(),
  };

  await timeLogCollection.insertOne(timeLog);
  return timeLog;
}

export async function getTimeLogsByEmployee(email) {
  return timeLogCollection.find({ email }).sort({ timestamp: -1 }).toArray();
}

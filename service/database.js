const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://monau:1234@startup.zcmgh.mongodb.net/?retryWrites=true&w=majority&appName=Startup`;
const client = new MongoClient(url);
const db = client.db('todaypay');
const employeeCollection = db.collection('employees');
const timeLogCollection = db.collection('timelogs');

// ==============================
// Test Database Connection
// ==============================

(async function testConnection() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB successfully!');
  } catch (ex) {
    console.error(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

// ==============================
// Employee Authentication Functions
// ==============================

async function getEmployee(email) {
  return employeeCollection.findOne({ email });
}

async function getEmployeeByToken(token) {
  return employeeCollection.findOne({ token });
}

async function createEmployee(email, password) {
  // Hash the password before inserting it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const employee = {
    email,
    password: passwordHash,
    token: uuid.v4(),
  };

  await employeeCollection.insertOne(employee);
  return employee;
}

// ==============================
// Time Logging Functions
// ==============================

async function addTimeLog(email, action) {
  const timeLog = {
    email,
    action,
    timestamp: new Date().toLocaleString(),
  };

  await timeLogCollection.insertOne(timeLog);
  return timeLog;
}

async function getTimeLogsByEmployee(email) {
  return timeLogCollection.find({ email }).sort({ timestamp: -1 }).toArray();
}

// ==============================
// Exported Functions
// ==============================

module.exports = {
  getEmployee,
  getEmployeeByToken,
  createEmployee,
  addTimeLog,
  getTimeLogsByEmployee,
};

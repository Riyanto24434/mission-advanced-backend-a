const { Low, JSONFile } = require('lowdb');
const path = require('path');

const file = path.join(__dirname, '../db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Inisialisasi data
async function initialize() {
  await db.read();
  db.data ||= { users: [], courses: [] };
  await db.write();
  return db;
}

module.exports = initialize();
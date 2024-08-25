const db = require('../config/db');

const School = {
  add: (schoolData, callback) => {
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [schoolData.name, schoolData.address, schoolData.latitude, schoolData.longitude], callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM schools';
    db.query(query, callback);
  }
};

module.exports = School;

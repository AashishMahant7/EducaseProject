const School = require('../models/schoolModel');

const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const schoolData = { name, address, latitude, longitude };
  School.add(schoolData, (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  });
};

const listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'User latitude and longitude are required' });
  }

  School.getAll((err, schools) => {
    if (err) throw err;

    const sortedSchools = schools.map(school => {
      const distance = haversine(parseFloat(latitude), parseFloat(longitude), school.latitude, school.longitude);
      return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  });
};

module.exports = {
  addSchool,
  listSchools
};

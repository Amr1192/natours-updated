const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tours');

dotenv.config();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    await Tour.deleteMany();
    await Tour.create(
      tours.map(({ id, startDates, ...tour }) => ({
        ...tour,
        startDates: startDates.map((date) => new Date(date.replace(',', ' '))),
      }))
    );
    console.log('Data successfully imported!');
  } catch (err) {
    console.error('Error importing data:', err);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
};

importData();

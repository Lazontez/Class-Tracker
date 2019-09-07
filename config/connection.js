const mongoose = require('mongoose');
const db = process.env.MONGODB_URI || 'mongodb://localhost/mongoSpaceNews'


const connection = mongoose.connect(db, { useNewUrlParser: true }, (err) => { if (err) { throw err } console.log('mongoose connected') });


module.exports = connection
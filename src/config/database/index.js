const mongoose = require('mongoose');

function connect(){
    mongoose.connect('mongodb://127.0.0.1:27017/bami-sot')
            .then(() => console.log('Connected to MongoDB - bami-sot database'))
            .catch(error => console.log('can not access data base', error));
}

module.exports = { connect };

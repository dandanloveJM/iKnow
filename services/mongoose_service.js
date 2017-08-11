const uri = 'mongodb://localhost/myapp'
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(uri, { useMongoClient: true, })
    .then(function db() {
        console.log('mongodb connection created')
    })

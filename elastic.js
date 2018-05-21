const elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'trace'
});

client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
  }, function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });

  client.search({
    q: 'pants'
  }).then(function (body) {
    var hits = body.hits.hits;
  }, function (error) {
    console.trace(error.message);
  });

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ 
  contactPoints: ['18.219.106.217'],
  localDataCenter: 'datacenter1',
  keyspace: 'gastrodamus',
});

module.exports = client;
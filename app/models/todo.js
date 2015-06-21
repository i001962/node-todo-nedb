// Replace mongo with NeDB
// Type 1: In-memory only datastore (no need to load the database)
var Datastore = require('nedb')
  , ToDo = new Datastore();

	module.exports = ToDo;

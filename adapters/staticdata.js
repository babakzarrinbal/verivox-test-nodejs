// adapter for connecting data source to our model
const exp = {};
let data = require("../storage/staticdata.json");
//returns the first element that matches the query
exp.getOne = (query={}) =>
  data.find(d => Object.keys(query).every(qk => d[qk] == query[qk]));

//returns all element that matches the query
exp.get = (query={}) =>
  data.filter(d => Object.keys(query).every(qk => d[qk] == query[qk]));

module.exports = exp;

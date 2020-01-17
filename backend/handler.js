'use strict';


const headers = { "Access-Control-Allow-Origin": "*" }
const DBMock = require('./DatabaseMock')

module.exports.getHomeInfo = (event, context, callback) => {

  const response = DBMock.getHomeInfo();

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(response),
    headers
  });
};

module.exports.getPartners = (event, context, callback) => {

  const partners = DBMock.getPartnes();

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(partners),
    headers
  });

};

module.exports.getProducts = (event, context, callback) => {

  const products = DBMock.getProducts()

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(products),
    headers
  });

};

module.exports.getKnowMore = (event, context, callback) => {

  const products = DBMock.getKnowMore()

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(products),
    headers
  });

};
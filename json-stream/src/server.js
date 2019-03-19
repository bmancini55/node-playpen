const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const jsonStream1 = require('./json-stream1');
const jsonStream2 = require('./json-stream2');
const jsonStream3 = require('./json-stream3');
const jsonStream4 = require('./json-stream4');
const jsonStream5 = require('./json-stream5');

const data = require('../big.json');

setInterval(() => {
  let usage = process.memoryUsage();
  console.log(`${new Date().toISOString()}: rss-${usage.rss}`);
}, 500);

app.get('/file', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'big.json'));
});

app.get('/json', (req, res) => {
  console.time('json');
  let result = JSON.stringify(data);
  console.timeEnd('json');
  res.send(result);
});

app.get('/json2', (req, res) => {
  console.time('json2');
  res.json(data);
  console.timeEnd('json2');
});

app.get('/jsonfile', (req, res) => {
  console.time('jsonfile');
  let ws = fs.createWriteStream(path.join(process.cwd(), 'temp'));
  ws.write(JSON.stringify(data));
  res.sendFile(path.join(process.cwd(), 'temp'));
  res.on('finish', () => console.timeEnd('jsonfile'));
});

app.get('/stream1', async (req, res) => {
  console.time('stream1');
  jsonStream1.stringify(res, data);
  console.timeEnd('stream1');
  res.end();
});

app.get('/stream2', async (req, res) => {
  console.time('stream2');
  jsonStream2.stringify(res, data);
  console.timeEnd('stream2');
  res.end();
});

app.get('/stream3', async (req, res) => {
  console.time('stream3');
  jsonStream3.stringify(res, data);
  console.timeEnd('stream3');
  res.end();
});

app.get('/stream4', async (req, res) => {
  console.time('stream4');
  await jsonStream4.stringify(res, data);
  console.timeEnd('stream4');
  res.end();
});

app.get('/stream5', async (req, res) => {
  console.time('stream5');
  await jsonStream5.stringify(res, data);
  console.timeEnd('stream5');
  res.end();
});

app.listen(9000);

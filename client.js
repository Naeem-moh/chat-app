// @ts-check

const NET = require('node:net');
const readline = require('node:readline/promises');

const client = NET.createConnection({port: 8080, host: '127.0.0.1'});
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


client.on('connect', async () => {
  console.log('Connection established with server');
  const message = await rl.question('message> ');
  client.write(message);
});

client.on('data', (data) => {
  console.log(data.toString('utf-8'));
});

//--------------------
// events for client
//--------------------
client.on('error', (err) => {
  console.error('Client error:', err);
});

client.on('close', () => {
  console.log('Client connection closed');
});

client.on('end', () => {
  console.log('Client disconnected ( end was called because the server closed gracefully) from server');
});


// @ts-check

const NET = require('node:net');
const readline = require('node:readline/promises');

const client = NET.createConnection({port: 8080, host: '127.0.0.1'});
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const terminal = new readline.Readline(process.stdout);

async function ask(){
  const message = await rl.question('message> ');
  
  terminal.moveCursor(0, -1).clearLine(0)
  await terminal.commit();

  client.write(message);
}

client.on('data', async (data) => {
  if(data.toString('utf-8').startsWith('Welcome to the chat! Your client ID is')){
    console.log(data.toString('utf-8'));
  }
  else{
    // this is a bit confusing, why not just clear the current line 
    console.log();
    await terminal.moveCursor(0, -1).clearLine(0).commit();
    console.log(data.toString('utf-8'));
  }
  // ask for the next message after the current one is received
  await ask();
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


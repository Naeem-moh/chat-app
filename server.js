// @ts-check

const NET = require('node:net');

const server = NET.createServer();

const HOST = '';
const PORT = 8080;

//@ts-ignore
const SOCKETS= [];

server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});

server.on('connection', (socket) => {
  console.log('New connection established');

  SOCKETS.push(socket);
  // this is fagile, if a client disconnects, the clientId will be reused by the next client that connects, which can cause confusion. A better approach would be to use a unique identifier for each client, such as a UUID or a timestamp.
  const clientId = SOCKETS.length;
  socket.write(`Welcome to the chat! Your client ID is ${clientId}\n`);

  //@ts-ignore
  SOCKETS.forEach((s) => {
      s.write(`Client ${clientId} has joined the chat\n`);
  });

  socket.on('data', (data) => {
    //@ts-ignore
    SOCKETS.forEach((s) => {
        s.write(`${clientId}: ${data}`);
    });
  });
});

//--------------------
// events for server
//--------------------


server.on('error', (err) => {
  console.error('Server error:', err);
});

server.on('close', () => {
  console.log('Server closed');
});



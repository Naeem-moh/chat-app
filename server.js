// @ts-check

const NET = require('node:net');

const server = NET.createServer();
//@ts-ignore
const SOCKETS= [];

server.listen(8080, '127.0.0.1', () => {
  console.log('Server listening on port 8080');
});

server.on('connection', (socket) => {
  console.log('New connection established');
  SOCKETS.push(socket);
  socket.on('data', (data) => {
    //@ts-ignore
    SOCKETS.forEach((s) => {
        s.write(data);
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



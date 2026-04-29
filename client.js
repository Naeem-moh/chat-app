const NET = require('node:net');

const connector = NET.createConnection({ port: 8080, host: '127.0.0.1' });

connector.on('connect', () => {

    connector.write('hello world', 'utf8', (err) => {
        if (err) {
            console.error('Error sending data to server:', err);
        }
    });
});
// NORMAL SERVER

import { app } from './app.js';
import { SERVER_PORT } from './env.js';

const port = SERVER_PORT || 4000;

app.listen(port, () => console.log(`Server has started on port: ${port}`));

// SERVER WITH HTTPS AS LOCAL

// import { app } from './app.js';
// import { SERVER_PORT } from './env.js';
// import { createRequire } from 'module'; // Bring in the ability to create the 'require' method
// const require = createRequire(import.meta.url); // construct the require method

// const https = require('https');
// const fs = require('fs');
// const options = {
//   key: fs.readFileSync('/Users/timonicolaux/localhost-key.pem'),
//   cert: fs.readFileSync('/Users/timonicolaux/localhost.pem'),
// };

// const server = https.createServer(options, app);

// const port = SERVER_PORT || 4000;

// server.listen(port, () => console.log(`Server has started on port: ${port}`));

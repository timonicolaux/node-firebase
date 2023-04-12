import { app } from './app.js';
import { SERVER_PORT } from './env.js';

const port = SERVER_PORT || 4000;

app.listen(port, () => console.log(`Server has started on port: ${port}`));

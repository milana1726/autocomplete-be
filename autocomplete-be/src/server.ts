import { createServer } from 'http';
import { handler } from "./handler";

const PORT = 3000;

const server = createServer(handler);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

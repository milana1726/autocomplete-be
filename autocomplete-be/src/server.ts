import { createServer, IncomingMessage, ServerResponse } from 'http';
import { handler } from './handler';
import path from 'path';
import { LoadCities } from './load-cities';

const PORT = 3000;

const citiesFilePath = path.join(__dirname, 'cities.json');
const cities: LoadCities = new LoadCities(citiesFilePath);

const server = createServer((req: IncomingMessage, res: ServerResponse) =>
    handler(req, res, cities)
);

server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));

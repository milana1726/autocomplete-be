import { IncomingMessage, ServerResponse } from 'http';
import { LoadCities } from './load-cities';

export const handler = async (
    req: IncomingMessage,
    res: ServerResponse,
    cities: LoadCities
): Promise<void> => {
    const parseURL = new URL(req.url ?? '', `http://${req.headers.host}`);
    if (req.method !== 'GET' || parseURL.pathname !== '/') {
        res
            .writeHead(404, { 'Content-Type': 'application/json' })
            .end(JSON.stringify({ error: 'Not Found' }));
        return;
    }

    const prefix = parseURL.searchParams.get('complete');
    if (!prefix) {
        res
            .writeHead(400, { 'Content-Type': 'application/json' })
            .end(JSON.stringify({ error: 'Missing complete parameter' }));
        return;
    }

    const suggestions = cities.getSuggestions(prefix);
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        'Last-Modified': cities.getLastModified(),
    });

    res.end(JSON.stringify({ suggestions }));
};

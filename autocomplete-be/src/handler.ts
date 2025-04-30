import { IncomingMessage, ServerResponse } from 'http';
import { LoadCities } from './load-cities';
import etag from 'etag';

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
            .end(JSON.stringify({ error: 'Bad Request. Missing complete parameter' }));
        return;
    }

    const suggestions = cities.getSuggestions(prefix);

    const responseBody = JSON.stringify({ suggestions });
    const responseEtag = etag(responseBody);

    // const lastModified = cities.getLastModified();
    // const ifModifiedSince = req.headers['if-modified-since'];

    if (req.headers['if-none-match'] === responseEtag) {
        // const clientDate = new Date(ifModifiedSince);
        // const serverDate = new Date(lastModified);

        // if (!isNaN(clientDate.getTime()) && clientDate.getTime() === serverDate.getTime()) {
            res.writeHead(304).end();
            return;
        // }
    }

    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        'Etag': responseEtag,
    });

    res.end(responseBody);
};

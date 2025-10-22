// Appwrite uses CommonJS - no ES modules
const { Client } = require('@elastic/elasticsearch');

module.exports = async ({ req, res, log }) => {
  try {
    const ELASTIC_URL = process.env.ELASTICSEARCH_URL;
    const ELASTIC_API_KEY = process.env.ELASTICSEARCH_API_KEY; // base64 api key
    const ELASTIC_USERNAME = process.env.ELASTICSEARCH_USERNAME;
    const ELASTIC_PASSWORD = process.env.ELASTICSEARCH_PASSWORD;
    const ELASTIC_INDEX = process.env.ELASTICSEARCH_INDEX || 'tasks';

    if (!ELASTIC_URL) {
      res.json({ results: [], error: 'Missing ELASTICSEARCH_URL' }, 500);
      return;
    }

    const client = new Client({
      node: ELASTIC_URL,
      auth: ELASTIC_API_KEY
        ? { apiKey: ELASTIC_API_KEY }
        : (ELASTIC_USERNAME && ELASTIC_PASSWORD ? { username: ELASTIC_USERNAME, password: ELASTIC_PASSWORD } : undefined),
      tls: { rejectUnauthorized: false }
    });

    const body = req.bodyJson || JSON.parse(req.payload || '{}') || {};
    const { query = '', userEmail, limit = 10 } = body;

    if (!userEmail) {
      res.json({ results: [], error: 'userEmail required' }, 400);
      return;
    }

    if (!query || String(query).trim().length < 2) {
      res.json({ results: [] }, 200);
      return;
    }

    const esQuery = {
      index: ELASTIC_INDEX,
      size: Math.min(Number(limit) || 10, 50),
      query: {
        bool: {
          must: [
            {
              simple_query_string: {
                query: `${query}*`,
                fields: ['title^3', 'description^2', 'category', 'assignee', 'invites'],
                default_operator: 'and'
              }
            }
          ],
          filter: [
            { term: { userEmail: userEmail } }
          ]
        }
      },
      _source: ['title','description','category','status','priority','dueDate','userEmail','$createdAt','$updatedAt']
    };

    const result = await client.search(esQuery);

    const hits = result.hits?.hits || [];
    const items = hits.map((h) => ({
      $id: h._id,
      ...(h._source || {})
    }));

    res.json({ results: items }, 200);
  } catch (err) {
    log(err?.message || String(err));
    res.json({ results: [], error: 'search_failed' }, 500);
  }
};

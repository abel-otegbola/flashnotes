// Appwrite uses CommonJS - no ES modules
const { Client } = require('@elastic/elasticsearch');

// Appwrite event trigger for database documents create/update/delete
module.exports = async ({ req, res, log }) => {
  try {
    const ELASTIC_URL = process.env.ELASTICSEARCH_URL;
    const ELASTIC_API_KEY = process.env.ELASTICSEARCH_API_KEY; // base64 api key
    const ELASTIC_USERNAME = process.env.ELASTICSEARCH_USERNAME;
    const ELASTIC_PASSWORD = process.env.ELASTICSEARCH_PASSWORD;
    const ELASTIC_INDEX = process.env.ELASTICSEARCH_INDEX || 'tasks';

    const client = new Client({
      node: ELASTIC_URL,
      auth: ELASTIC_API_KEY
        ? { apiKey: ELASTIC_API_KEY }
        : (ELASTIC_USERNAME && ELASTIC_PASSWORD ? { username: ELASTIC_USERNAME, password: ELASTIC_PASSWORD } : undefined),
      tls: { rejectUnauthorized: false }
    });

    const event = process.env.APPWRITE_FUNCTION_EVENT || '';
    const payloadStr = process.env.APPWRITE_FUNCTION_EVENT_DATA || req.payload || '{}';
    const payload = typeof payloadStr === 'string' ? JSON.parse(payloadStr || '{}') : (payloadStr || {});

    // Expect Appwrite document payload
    const doc = payload?.$id ? payload : payload?.document || {};
    const id = doc?.$id;

    if (!id) {
      res.json({ ok: false, reason: 'missing_document' }, 400);
      return;
    }

    if (event.includes('.delete')) {
      await client.delete({ index: ELASTIC_INDEX, id }).catch(() => {});
      res.json({ ok: true, action: 'deleted', id }, 200);
      return;
    }

    // Upsert for create/update
    const body = {
      title: doc.title,
      description: doc.description,
      category: doc.category,
      status: doc.status,
      priority: doc.priority,
      dueDate: doc.dueDate,
      userEmail: doc.userEmail,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      assignee: doc.assignee,
      invites: doc.invites,
    };

    await client.index({ index: ELASTIC_INDEX, id, document: body });
    await client.indices.refresh({ index: ELASTIC_INDEX }).catch(() => {});

    res.json({ ok: true, action: 'upserted', id }, 200);
  } catch (err) {
    log(err?.message || String(err));
    res.json({ ok: false, error: 'index_failed' }, 500);
  }
};

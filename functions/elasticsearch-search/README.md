# Elasticsearch Search Function

This Appwrite Function performs full-text search on tasks using Elasticsearch.

## Setup in Appwrite Console

1. **Create Function**:
   - Go to Functions in Appwrite Console
   - Click "Create function"
   - Name: `elasticsearch-search`
   - Runtime: Node.js 18.0 or Node.js 20.0
   - Entrypoint: `index.js`
   - Execute Access: Any (or specific roles as needed)

2. **Environment Variables**:
   Set these in the function settings:
   ```
   ELASTICSEARCH_URL=https://your-elastic-cluster:9200
   ELASTICSEARCH_API_KEY=your_base64_api_key
   # OR use username/password:
   ELASTICSEARCH_USERNAME=elastic
   ELASTICSEARCH_PASSWORD=your_password
   ELASTICSEARCH_INDEX=tasks
   ```

3. **Deploy Code**:
   - In Appwrite Console, go to your function
   - Click "Deploy" or "Deploy from folder"
   - Upload this folder (package.json + index.js)
   - Or use Appwrite CLI:
     ```bash
     appwrite functions createDeployment \
       --functionId=<your-function-id> \
       --activate=true \
       --entrypoint="index.js" \
       --code="."
     ```

4. **Get Function ID**:
   - Copy the Function ID from Appwrite Console
   - Add to your frontend `.env.local`:
     ```
     VITE_APPWRITE_SEARCH_FUNCTION_ID=<function-id>
     ```

## Testing

Test from Appwrite Console > Functions > Your Function > Execute:

**Request Body**:
```json
{
  "query": "design",
  "userEmail": "user@example.com",
  "limit": 10
}
```

**Expected Response**:
```json
{
  "results": [
    {
      "$id": "abc123",
      "title": "Design homepage",
      "description": "...",
      "category": "Design",
      "status": "in progress",
      ...
    }
  ]
}
```

## How It Works

1. Frontend calls this function via Appwrite Functions SDK
2. Function connects to Elasticsearch using credentials from env vars
3. Searches the `tasks` index with user's query
4. Filters results to only show tasks for the requesting user (by `userEmail`)
5. Returns matching tasks as JSON

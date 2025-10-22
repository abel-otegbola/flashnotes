# Elasticsearch Indexer Function

This Appwrite Function automatically indexes tasks into Elasticsearch when they're created, updated, or deleted.

## Setup in Appwrite Console

1. **Create Function**:
   - Go to Functions in Appwrite Console
   - Click "Create function"
   - Name: `elasticsearch-indexer`
   - Runtime: Node.js 18.0 or Node.js 20.0
   - Entrypoint: `index.js`
   - Execute Access: Any

2. **Environment Variables**:
   Same as search function:
   ```
   ELASTICSEARCH_URL=https://your-elastic-cluster:9200
   ELASTICSEARCH_API_KEY=your_base64_api_key
   ELASTICSEARCH_INDEX=tasks
   ```

3. **Event Triggers** (Important!):
   Add these events to trigger automatic indexing:
   ```
   databases.*.collections.<YOUR_TASKS_COLLECTION_ID>.documents.*.create
   databases.*.collections.<YOUR_TASKS_COLLECTION_ID>.documents.*.update
   databases.*.collections.<YOUR_TASKS_COLLECTION_ID>.documents.*.delete
   ```
   
   Replace `<YOUR_TASKS_COLLECTION_ID>` with your actual Appwrite collection ID for tasks.

4. **Deploy Code**:
   - Upload this folder to Appwrite
   - Or use Appwrite CLI:
     ```bash
     appwrite functions createDeployment \
       --functionId=<your-function-id> \
       --activate=true \
       --entrypoint="index.js" \
       --code="."
     ```

## How It Works

1. When a task is created/updated/deleted in Appwrite Database
2. Appwrite triggers this function with the document data
3. Function indexes/updates/deletes the document in Elasticsearch
4. Elasticsearch index stays in sync automatically

## Initial Backfill

If you have existing tasks, you'll need to backfill them once:

**Option 1 - Manual via Console**:
- Go to your Appwrite Database
- For each task, make a small edit and save (triggers the function)

**Option 2 - Create a backfill function** (recommended):
- I can create a separate one-time function to index all existing tasks
- Just ask and I'll add it!

## Testing

After deployment:
1. Create a new task in your app
2. Check Elasticsearch to verify it was indexed
3. Update or delete a task to test those operations

To check Elasticsearch directly:
```bash
curl -X GET "https://your-cluster:9200/tasks/_search?pretty" \
  -H "Authorization: ApiKey your_api_key" \
  -H "Content-Type: application/json" \
  -d '{"query": {"match_all": {}}}'
```

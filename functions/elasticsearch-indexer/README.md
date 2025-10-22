# Elasticsearch Indexer Function

This Appwrite Function automatically indexes tasks into Elasticsearch when they're created, updated, or deleted.

## Setup in Appwrite Console

### Method 1: Console Upload (Simple)

1. **Create Function**:
   - Go to Functions in Appwrite Console
   - Click "Create function"
   - Name: `elasticsearch-indexer`
   - Runtime: Node.js 18.0 or Node.js 20.0
   - Entrypoint: `src/index.js`
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
   - Create a tar.gz file with this folder structure:
     ```
     elasticsearch-indexer/
     ├── src/
     │   └── index.js
     └── package.json
     ```
   - Upload to Appwrite Console

### Method 2: Appwrite CLI (Recommended)

From the project root:
```bash
appwrite deploy function
```
Select `elasticsearch-indexer` when prompted. The CLI will use `appwrite.json` config.

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

## File Structure

Your function folder should look like this:
```
functions/elasticsearch-indexer/
├── src/
│   └── index.js          # Main function code
├── package.json
└── README.md
```

The `src/` folder is required by Appwrite!

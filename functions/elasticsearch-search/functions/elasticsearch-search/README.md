# Elasticsearch Search Function

This Appwrite Function performs full-text search on tasks using Elasticsearch.

## Setup in Appwrite Console

### Method 1: Using Appwrite Console (Manual Upload)

1. **Prepare deployment package**:
   ```powershell
   # In the function folder
   cd functions/elasticsearch-search
   npm install
   
   # Create a tar.gz file (need 7-Zip or similar)
   # Include: src/, node_modules/, package.json
   ```

2. **Create Function in Console**:
   - Go to Functions in Appwrite Console
   - Click "Create function"
   - Name: `elasticsearch-search`
   - Runtime: Node.js 18.0 or Node.js 20.0
   - Entrypoint: `src/index.js`
   - Execute Access: Any (or specific roles as needed)
   - Build Command: `npm install`

3. **Upload Code**:
   - Click "Create deployment"
   - Upload the entire `functions/elasticsearch-search` folder as a tar.gz
   - Or manually upload all files maintaining the structure:
     ```
     /src/index.js
     /package.json
     /package-lock.json (if exists)
     ```

### Method 2: Using Appwrite CLI (Recommended)

1. **Install Appwrite CLI** (if not installed):
   ```powershell
   npm install -g appwrite
   ```

2. **Login to Appwrite**:
   ```powershell
   appwrite login
   ```

3. **Initialize project** (if not already):
   ```powershell
   appwrite init project
   ```

4. **Deploy function**:
   ```powershell
   appwrite deploy function
   ```
   - Select the function from the list
   - CLI will handle packaging and upload automatically

2. **Environment Variables**:
   Set these in the function settings (after creating the function):
   ```
   ELASTICSEARCH_URL=https://your-elastic-cluster:9200
   ELASTICSEARCH_API_KEY=your_base64_api_key
   # OR use username/password:
   ELASTICSEARCH_USERNAME=elastic
   ELASTICSEARCH_PASSWORD=your_password
   ELASTICSEARCH_INDEX=tasks
   ```

3. **Get Function ID**:
   - Copy the **Function ID** from Appwrite Console
   - Add to your frontend `.env.local`:
     ```
     VITE_APPWRITE_SEARCH_FUNCTION_ID=<function-id>
     ```

## File Structure

Your function folder should look like this:
```
functions/elasticsearch-search/
├── src/
│   └── index.js          # Main function code
├── package.json
└── README.md
```

The `src/` folder is required by Appwrite!

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

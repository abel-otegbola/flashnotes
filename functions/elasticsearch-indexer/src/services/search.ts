import { functions } from "../appwrite/appwrite";

// Contract
// input: { query: string; userEmail: string; limit?: number }
// output: Array of tasks with fields used by UI; expects Appwrite $id and $createdAt/$updatedAt

export type SearchTask = {
  $id: string;
  title: string;
  description?: string;
  category?: string;
  status?: 'pending' | 'upcoming' | 'in progress' | 'completed' | 'suspended';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  userEmail: string;
  $createdAt?: string;
  $updatedAt?: string;
};

export async function searchTasks(query: string, userEmail: string, limit: number = 10): Promise<SearchTask[]> {
  const fnId = import.meta.env.VITE_APPWRITE_SEARCH_FUNCTION_ID;
  if (!fnId) {
    console.warn("Missing VITE_APPWRITE_SEARCH_FUNCTION_ID env var; search disabled");
    return [];
  }

  try {
    const payload = JSON.stringify({ query, userEmail, limit });
  const exec = await functions.createExecution(fnId, payload, true);

  // Appwrite Function returns a JSON string in responseBody
  const data = exec.responseBody || "";
    if (!data) return [];

    const parsed = JSON.parse(data);
    if (Array.isArray(parsed?.results)) {
      return parsed.results as SearchTask[];
    }
    // Backward compat: if directly returns array
    if (Array.isArray(parsed)) return parsed as SearchTask[];

    return [];
  } catch (err) {
    console.error("searchTasks error", err);
    return [];
  }
}

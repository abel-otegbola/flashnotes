// Search via backend API (e.g., Vercel deployment)
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
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (!backendUrl) {
    console.warn("Missing VITE_BACKEND_URL env var; search disabled");
    return [];
  }

  try {
    const res = await fetch(`${backendUrl}api/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, userEmail, limit })
    });
    if (!res.ok) {
      console.error('searchTasks HTTP error', res.status, res.statusText);
      return [];
    }
    const data = await res.json();
    if (Array.isArray(data?.results)) return data.results as SearchTask[];
    if (Array.isArray(data)) return data as SearchTask[];
    return [];
  } catch (err) {
    console.error('searchTasks error', err);
    return [];
  }
}

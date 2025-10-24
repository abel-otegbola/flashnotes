// Centralized helper to send indexing requests to the backend indexing endpoints.
type IndexAction = 'create' | 'update' | 'delete';

const getBackend = () => import.meta.env.VITE_BACKEND_URL || '';

export async function indexTask(action: IndexAction, payload: any) {
  try {
    const backend = getBackend();
    await fetch(`${backend}/api/index/task`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action === 'delete' ? { action, id: payload } : { action, document: payload })
    });
  } catch (e) {
    // keep indexing fire-and-forget; log but don't throw
    console.warn('indexTask failed', e);
  }
}

export async function indexOrganization(action: IndexAction, payload: any) {
  try {
    const backend = getBackend();
    await fetch(`${backend}/api/index/organizations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action === 'delete' ? { action, id: payload } : { action, document: payload })
    });
  } catch (e) {
    console.warn('indexOrganization failed', e);
  }
}

export default { indexTask, indexOrganization };

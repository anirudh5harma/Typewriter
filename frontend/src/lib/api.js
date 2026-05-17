const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

function buildUrl(path) {
  return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

async function parseResponse(res) {
  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Expected JSON from API but received ${res.status} ${res.statusText}`);
  }
}

async function api(path, options = {}) {
  const token = localStorage.getItem('tw_token');
  const res = await fetch(buildUrl(path), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await parseResponse(res);
  if (!res.ok) throw new Error(data?.message || `Request failed: ${res.status}`);
  return data;
}

export const documentApi = {
  create: (title) => api('/api/documents', { method: 'POST', body: JSON.stringify({ title }) }),
  get: (id) => api(`/api/documents/${id}`),
};

export const authApi = {
  login: (email, password) => api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (email, password, role) => api('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, password, role }) }),
  me: () => api('/api/auth/me'),
};

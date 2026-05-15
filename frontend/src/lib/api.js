const API_BASE = '';

async function api(path, options = {}) {
  const token = localStorage.getItem('tw_token');
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => null);
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

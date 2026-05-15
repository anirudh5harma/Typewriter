import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { documentApi } from '../lib/api';
import {
  Plus, FileText, Clock, MoreHorizontal, Trash2, ExternalLink,
  Search, AlertCircle, X
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        // Since backend only has create/get by id, we'll simulate with localStorage fallback
        const localDocs = JSON.parse(localStorage.getItem('tw_documents') || '[]');
        setDocuments(localDocs);
      } catch {
        setError('Failed to load documents');
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCreating(true);
    try {
      const doc = await documentApi.create(newTitle.trim());
      const updated = [doc, ...documents];
      setDocuments(updated);
      localStorage.setItem('tw_documents', JSON.stringify(updated));
      setShowCreate(false);
      setNewTitle('');
    } catch (err) {
      // Fallback: create locally if API fails
      const localDoc = {
        _id: 'local_' + Date.now(),
        title: newTitle.trim(),
        content: {},
        createdBy: user?._id || 'local',
        permissions: [{ user: user?._id || 'local', role: 'owner' }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updated = [localDoc, ...documents];
      setDocuments(updated);
      localStorage.setItem('tw_documents', JSON.stringify(updated));
      setShowCreate(false);
      setNewTitle('');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = (id) => {
    const updated = documents.filter(d => d._id !== id);
    setDocuments(updated);
    localStorage.setItem('tw_documents', JSON.stringify(updated));
  };

  const filtered = documents.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-1">Your Documents</h1>
            <p className="text-ink-400 text-sm">
              {documents.length} document{documents.length !== 1 ? 's' : ''} in your library
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="btn-primary self-start md:self-auto"
          >
            <Plus size={16} className="mr-1.5" />
            New Document
          </button>
        </div>

        <div className="relative mb-8">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field pl-10 max-w-md"
          />
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-terracotta-50 border border-terracotta-200 text-terracotta-700 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="card p-5 animate-pulse">
                <div className="h-5 bg-parchment-200 rounded w-1/3 mb-3" />
                <div className="h-4 bg-parchment-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-parchment-100 flex items-center justify-center mx-auto mb-5">
              <FileText size={28} className="text-ink-300" />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-2">
              {searchQuery ? 'No documents found' : 'No documents yet'}
            </h3>
            <p className="text-ink-400 text-sm max-w-sm mx-auto mb-6">
              {searchQuery
                ? 'Try a different search term or clear your filters.'
                : 'Create your first document to get started with Typewriter.'}
            </p>
            {!searchQuery && (
              <button onClick={() => setShowCreate(true)} className="btn-primary">
                <Plus size={16} className="mr-1.5" />
                Create Document
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((doc) => (
              <div
                key={doc._id}
                className="group card p-5 flex items-center gap-4 hover:border-terracotta-200"
              >
                <div className="w-10 h-10 rounded-lg bg-parchment-100 flex items-center justify-center flex-shrink-0 group-hover:bg-terracotta-50 transition-colors">
                  <FileText size={18} className="text-ink-400 group-hover:text-terracotta-500 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg font-semibold truncate mb-0.5">{doc.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-ink-300">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {formatDate(doc.updatedAt || doc.createdAt)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-ink-200" />
                    <span className="capitalize">{doc.permissions?.[0]?.role || 'owner'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    to={`/editor/${doc._id}`}
                    className="p-2 rounded-lg hover:bg-parchment-100 text-ink-400 hover:text-ink-700 transition-colors"
                    title="Open"
                  >
                    <ExternalLink size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="p-2 rounded-lg hover:bg-terracotta-50 text-ink-300 hover:text-terracotta-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm" onClick={() => setShowCreate(false)} />
          <div className="relative bg-white rounded-2xl border border-parchment-300 shadow-xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-xl font-semibold">New Document</h2>
              <button
                onClick={() => setShowCreate(false)}
                className="p-1.5 rounded-lg hover:bg-parchment-100 text-ink-400"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Title</label>
              <input
                type="text"
                autoFocus
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Untitled Document"
                className="input-field mb-5"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !newTitle.trim()}
                  className="btn-primary disabled:opacity-60"
                >
                  {creating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

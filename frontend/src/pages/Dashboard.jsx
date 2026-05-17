import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { documentApi } from '../lib/api';
import {
  Plus, Search, AlertCircle, X, Trash2, ArrowUpRight, FileText, Command
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
    try {
      const localDocs = JSON.parse(localStorage.getItem('tw_documents') || '[]');
      setDocuments(localDocs);
    } catch {
      setError('Failed to load documents');
    } finally {
      setLoading(false);
    }
  }, []);

  // ⌘N / ctrl+n
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault(); setShowCreate(true);
      }
      if (e.key === 'Escape') setShowCreate(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
      setShowCreate(false); setNewTitle('');
    } catch {
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
      setShowCreate(false); setNewTitle('');
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
    const now = new Date();
    const diff = (now - d) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff/86400)}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="eyebrow mb-3">— Library</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-serif text-5xl md:text-6xl tracking-display text-ink-900 leading-[1]">
              Your <span className="font-serif-i">documents</span>
            </h1>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400 nums">
                {documents.length.toString().padStart(2,'0')} {documents.length === 1 ? 'draft' : 'drafts'}
              </span>
              <button onClick={() => setShowCreate(true)} className="btn-accent">
                <Plus size={16} />
                New document
                <span className="hidden sm:inline font-mono text-[10px] opacity-70 border border-white/30 rounded px-1 py-px ml-1">⌘N</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-10">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            type="text"
            placeholder="Search drafts by title…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input pl-11 pr-16"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 font-mono text-[11px] text-ink-300">
            <Command size={11} /> K
          </span>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-accent-50 border border-accent-200 text-accent-700 text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="space-y-px bg-[var(--hair)] border border-[var(--hair)] rounded-2xl overflow-hidden">
            {[1,2,3].map(i => (
              <div key={i} className="bg-surface p-5 animate-pulse">
                <div className="h-4 bg-ink-100 rounded w-1/3 mb-2.5" />
                <div className="h-3 bg-ink-100 rounded w-1/5" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="surface text-center py-24 px-6">
            <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-ink-50 flex items-center justify-center">
              <FileText size={20} className="text-ink-400" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-3xl text-ink-900 mb-2">
              {searchQuery ? 'Nothing matched' : 'A blank shelf'}
            </h3>
            <p className="text-ink-500 text-[15px] max-w-sm mx-auto mb-8">
              {searchQuery
                ? 'Try another phrase or clear the search to see everything.'
                : 'Start your first draft. The page is waiting.'}
            </p>
            {!searchQuery && (
              <button onClick={() => setShowCreate(true)} className="btn-accent">
                <Plus size={16} /> Create document
              </button>
            )}
          </div>
        ) : (
          <div className="surface overflow-hidden divide-y divide-[var(--hair)]">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-6 px-6 py-3 bg-paper">
              <span className="eyebrow">Title</span>
              <span className="eyebrow hidden sm:block">Role</span>
              <span className="eyebrow">Updated</span>
              <span className="eyebrow w-8"></span>
            </div>

            {filtered.map((doc) => (
              <div
                key={doc._id}
                className="group grid grid-cols-[1fr_auto_auto_auto] gap-6 items-center px-6 py-4 hover:bg-paper transition-colors"
              >
                <Link to={`/editor/${doc._id}`} className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-ink-50 flex items-center justify-center flex-shrink-0 group-hover:bg-ink-900 transition-colors">
                    <span className="font-serif-i text-ink-700 group-hover:text-paper text-base leading-none transition-colors">
                      {(doc.title?.[0] || 'D').toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl text-ink-900 truncate leading-tight">{doc.title}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
                      {doc._id.startsWith('local_') ? 'draft · local' : 'draft · synced'}
                    </span>
                  </div>
                </Link>

                <span className="hidden sm:inline-flex pill">
                  {doc.permissions?.[0]?.role || 'owner'}
                </span>

                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500 nums">
                  {formatDate(doc.updatedAt || doc.createdAt)}
                </span>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    to={`/editor/${doc._id}`}
                    className="p-2 rounded-lg hover:bg-ink-50 text-ink-400 hover:text-ink-900"
                    title="Open"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="p-2 rounded-lg hover:bg-accent-50 text-ink-300 hover:text-accent-600"
                    title="Delete"
                  >
                    <Trash2 size={15} />
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
          <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={() => setShowCreate(false)} />
          <div className="relative bg-surface rounded-2xl border border-[var(--hair)] shadow-2xl w-full max-w-md p-7 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="eyebrow mb-1">New</div>
                <h2 className="font-serif text-2xl text-ink-900 leading-tight">A blank document</h2>
              </div>
              <button
                onClick={() => setShowCreate(false)}
                className="p-1.5 rounded-lg hover:bg-ink-50 text-ink-400"
                aria-label="close"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <label className="label block mb-1.5">Title</label>
              <input
                type="text"
                autoFocus
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Untitled draft"
                className="input mb-6"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={creating || !newTitle.trim()} className="btn-accent disabled:opacity-60">
                  {creating ? 'Creating' : 'Create draft'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

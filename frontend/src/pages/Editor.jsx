import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft, Save, Share2, MoreHorizontal, Users, Clock,
  Type, Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote
} from 'lucide-react';

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('Untitled Document');
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const localDocs = JSON.parse(localStorage.getItem('tw_documents') || '[]');
    const doc = localDocs.find(d => d._id === id);
    if (doc) {
      setTitle(doc.title);
    }
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!saved) {
        handleSave();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [content, title, saved]);

  const handleSave = () => {
    const localDocs = JSON.parse(localStorage.getItem('tw_documents') || '[]');
    const updated = localDocs.map(d =>
      d._id === id ? { ...d, title, updatedAt: new Date().toISOString() } : d
    );
    localStorage.setItem('tw_documents', JSON.stringify(updated));
    setSaved(true);
    setLastSaved(new Date());
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setSaved(false);
  };

  const insertFormat = (before, after = '') => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const text = ta.value;
    const selected = text.substring(start, end);
    const replacement = before + selected + after;
    setContent(text.substring(0, start) + replacement + text.substring(end));
    setSaved(false);
    setTimeout(() => {
      ta.selectionStart = start + before.length;
      ta.selectionEnd = start + before.length + selected.length;
      ta.focus();
    }, 0);
  };

  const collaborators = [
    { name: 'You', color: 'bg-terracotta-500' },
    { name: 'Alice', color: 'bg-sage-500' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-parchment-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-parchment-50/95 backdrop-blur-md border-b border-parchment-300">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg hover:bg-parchment-200 text-ink-400 hover:text-ink-700 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>

          <input
            type="text"
            value={title}
            onChange={e => { setTitle(e.target.value); setSaved(false); }}
            className="flex-1 bg-transparent font-serif text-lg font-semibold outline-none text-ink-900 placeholder-ink-300 min-w-0"
            placeholder="Untitled Document"
          />

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 mr-2">
              {collaborators.map((c, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-medium border-2 border-parchment-50`}
                  title={c.name}
                >
                  {c.name[0]}
                </div>
              ))}
              <span className="text-xs text-ink-300 ml-1">2 active</span>
            </div>

            <span className="text-xs text-ink-300 hidden md:block">
              {saved ? (
                lastSaved ? `Saved ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Saved'
              ) : (
                <span className="flex items-center gap-1">
                  <Clock size={12} className="animate-spin" />
                  Saving...
                </span>
              )}
            </span>

            <button
              onClick={handleSave}
              className="p-2 rounded-lg hover:bg-parchment-200 text-ink-400 hover:text-ink-700 transition-colors"
              title="Save now"
            >
              <Save size={18} />
            </button>

            <button
              onClick={() => setShowShare(!showShare)}
              className="btn-primary text-sm px-4 py-1.5"
            >
              <Share2 size={14} className="mr-1.5" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-parchment-200">
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center gap-1 overflow-x-auto">
          <button onClick={() => insertFormat('# ', '\n')} className="p-1.5 rounded hover:bg-parchment-100 text-ink-400 hover:text-ink-700" title="Heading 1">
            <Heading1 size={18} />
          </button>
          <button onClick={() => insertFormat('## ', '\n')} className="p-1.5 rounded hover:bg-parchment-100 text-ink-400 hover:text-ink-700" title="Heading 2">
            <Heading2 size={18} />
          </button>
          <div className="w-px h-5 bg-parchment-200 mx-1" />
          <button onClick={() => insertFormat('**', '**')} className="p-1.5 rounded hover:bg-parchment-100 text-ink-400 hover:text-ink-700" title="Bold">
            <Bold size={18} />
          </button>
          <button onClick={() => insertFormat('*', '*')} className="p-1.5 rounded hover:bg-parchment-100 text-ink-400 hover:text-ink-700" title="Italic">
            <Italic size={18} />
          </button>
          <div className="w-px h-5 bg-parchment-200 mx-1" />
          <button onClick={() => insertFormat('- ', '\n')} className="p-1.5 rounded hover:bg-parchment-100 text-ink-400 hover:text-ink-700" title="Bullet list">
            <List size={18} />
          </button>
          <button onClick={() => insertFormat('1. ', '\n')} className="p-1.5 rounded hover:bg-parchment-100 text-ink-400 hover:text-ink-700" title="Numbered list">
            <ListOrdered size={18} />
          </button>
          <button onClick={() => insertFormat('> ', '\n')} className="p-1.5 rounded hover:bg-parchment-100 text-ink-400 hover:text-ink-700" title="Quote">
            <Quote size={18} />
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing..."
            className="w-full min-h-[60vh] resize-none outline-none bg-transparent text-ink-800 leading-relaxed text-lg font-sans placeholder-ink-300"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm" onClick={() => setShowShare(false)} />
          <div className="relative bg-white rounded-2xl border border-parchment-300 shadow-xl w-full max-w-sm p-6 animate-slide-up">
            <h2 className="font-serif text-xl font-semibold mb-4">Share Document</h2>
            <div className="bg-parchment-100 rounded-lg p-3 mb-4 flex items-center gap-2">
              <Users size={16} className="text-ink-400" />
              <span className="text-sm text-ink-600 flex-1">Anyone with the link can view</span>
            </div>
            <div className="flex gap-2">
              <input
                readOnly
                value={`${window.location.origin}/editor/${id}`}
                className="input-field text-sm flex-1"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/editor/${id}`);
                }}
                className="btn-secondary whitespace-nowrap"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

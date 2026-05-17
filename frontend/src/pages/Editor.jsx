import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft, Share2, Users, Check, Loader2,
  Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, Code, Link2, Copy
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
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const localDocs = JSON.parse(localStorage.getItem('tw_documents') || '[]');
    const doc = localDocs.find(d => d._id === id);
    if (doc) setTitle(doc.title);
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => { if (!saved) handleSave(); }, 1500);
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

  const handleContentChange = (e) => { setContent(e.target.value); setSaved(false); };

  const insertFormat = (before, after = '') => {
    const ta = textareaRef.current; if (!ta) return;
    const start = ta.selectionStart, end = ta.selectionEnd, text = ta.value;
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

  const copyShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/editor/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const collaborators = [
    { name: 'You',   color: 'bg-ink-900 text-paper' },
    { name: 'Alice', color: 'bg-accent-500 text-white' },
  ];

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const tools = [
    { i: Heading1,   t: 'Heading 1', a: () => insertFormat('# ', '\n') },
    { i: Heading2,   t: 'Heading 2', a: () => insertFormat('## ', '\n') },
    { sep: true },
    { i: Bold,       t: 'Bold',      a: () => insertFormat('**', '**') },
    { i: Italic,     t: 'Italic',    a: () => insertFormat('*', '*') },
    { i: Code,       t: 'Code',      a: () => insertFormat('`', '`') },
    { sep: true },
    { i: List,       t: 'Bullets',   a: () => insertFormat('- ', '\n') },
    { i: ListOrdered,t: 'Numbered',  a: () => insertFormat('1. ', '\n') },
    { i: Quote,      t: 'Quote',     a: () => insertFormat('> ', '\n') },
    { i: Link2,      t: 'Link',      a: () => insertFormat('[', '](url)') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-paper/85 backdrop-blur-xl border-b border-[var(--hair)]">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-full hover:bg-ink-50 text-ink-500 hover:text-ink-900 transition-colors"
            title="Back to library"
          >
            <ArrowLeft size={17} />
          </button>

          <div className="hidden sm:block h-5 w-px bg-[var(--hair)]" />

          <input
            type="text"
            value={title}
            onChange={e => { setTitle(e.target.value); setSaved(false); }}
            className="flex-1 bg-transparent font-serif text-[19px] tracking-tightest outline-none text-ink-900 placeholder-ink-300 min-w-0"
            placeholder="Untitled document"
          />

          <span className="hidden md:flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
            {saved ? (
              <><Check size={12} className="text-accent-600" />
                {lastSaved ? `saved ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'saved'}
              </>
            ) : (
              <><Loader2 size={12} className="animate-spin" /> saving</>
            )}
          </span>

          <div className="hidden sm:flex items-center -space-x-2">
            {collaborators.map((c, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full ${c.color} flex items-center justify-center text-[11px] font-mono border-2 border-paper`}
                title={c.name}
              >{c.name[0]}</div>
            ))}
          </div>

          <button
            onClick={() => setShowShare(true)}
            className="btn-primary text-sm px-4 py-1.5"
          >
            <Share2 size={14} /> Share
          </button>
        </div>

        {/* Toolbar */}
        <div className="border-t border-[var(--hair)]">
          <div className="max-w-3xl mx-auto px-4 py-1.5 flex items-center gap-1 overflow-x-auto">
            {tools.map((tool, i) => tool.sep ? (
              <div key={i} className="w-px h-4 bg-[var(--hair)] mx-1" />
            ) : (
              <button
                key={i}
                onClick={tool.a}
                title={tool.t}
                className="p-2 rounded-md hover:bg-ink-50 text-ink-500 hover:text-ink-900 transition-colors"
              >
                <tool.i size={16} strokeWidth={1.6} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            placeholder="The page is yours. Start writing…"
            className="w-full min-h-[60vh] resize-none outline-none bg-transparent text-ink-900 leading-[1.75] text-[19px] font-sans placeholder-ink-300"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Footer status bar */}
      <div className="sticky bottom-0 border-t border-[var(--hair)] bg-paper/85 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-9 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
          <div className="flex items-center gap-4">
            <span className="nums">{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline nums">{content.length} chars</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-blink" />
            <span>{collaborators.length} live · synced</span>
          </div>
        </div>
      </div>

      {/* Share modal */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={() => setShowShare(false)} />
          <div className="relative bg-surface rounded-2xl border border-[var(--hair)] shadow-2xl w-full max-w-md p-7 animate-slide-up">
            <div className="eyebrow mb-2">Share</div>
            <h2 className="font-serif text-2xl text-ink-900 mb-1 leading-tight">Invite collaborators</h2>
            <p className="text-ink-500 text-sm mb-6">Anyone with the link can view this draft.</p>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-ink-50 border border-[var(--hair)] mb-3">
              <Users size={15} className="text-ink-400 ml-1" />
              <input
                readOnly
                value={`${window.location.origin}/editor/${id}`}
                className="input-bare text-[13px] flex-1 px-1 nums"
              />
              <button onClick={copyShare} className="btn-primary text-xs px-3 py-1.5">
                {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
              </button>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
              expires never · revoke anytime
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

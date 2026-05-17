import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Mail, Shield, Calendar, Edit3, Check, AlertCircle, Save, LogOut, X
} from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError(''); setSaved(false);
    setTimeout(() => { setSaved(true); setEditing(false); }, 500);
  };

  const initial = (user?.email || 'U')[0].toUpperCase();
  const memberSince = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="eyebrow mb-3">— Account</div>
          <h1 className="font-serif text-5xl md:text-6xl tracking-display text-ink-900 leading-[1]">
            Your <span className="font-serif-i">profile</span>
          </h1>
        </div>

        {/* Identity card */}
        <div className="surface p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-ink-900 flex items-center justify-center text-paper text-4xl font-serif-i flex-shrink-0">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h2 className="font-serif text-3xl text-ink-900 truncate leading-tight">{user?.email || 'User'}</h2>
                <span className="pill">{user?.role || 'viewer'}</span>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400 nums">
                member since {memberSince}
              </div>
            </div>
            {!editing && (
              <button onClick={() => setEditing(true)} className="btn-secondary text-sm">
                <Edit3 size={14} /> Edit
              </button>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="surface divide-y divide-[var(--hair)]">
          {editing ? (
            <div className="p-7">
              {error && (
                <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-accent-50 border border-accent-200 text-accent-700 text-sm">
                  <AlertCircle size={16} /> {error}
                </div>
              )}
              {saved && (
                <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-ink-50 border border-[var(--hair)] text-ink-700 text-sm">
                  <Check size={16} className="text-accent-600" /> Profile updated
                </div>
              )}
              <label className="label block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input mb-5"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => { setEditing(false); setEmail(user?.email || ''); }} className="btn-secondary">
                  <X size={14} /> Cancel
                </button>
                <button onClick={handleSave} className="btn-accent">
                  <Save size={14} /> Save changes
                </button>
              </div>
            </div>
          ) : (
            <>
              <Row
                label="Email"
                value={user?.email || '—'}
                icon={<Mail size={14} className="text-ink-400" strokeWidth={1.6} />}
              />
              <Row
                label="Role"
                value={user?.role || 'viewer'}
                icon={<Shield size={14} className="text-ink-400" strokeWidth={1.6} />}
              />
              <Row
                label="Joined"
                value={memberSince}
                icon={<Calendar size={14} className="text-ink-400" strokeWidth={1.6} />}
              />
            </>
          )}
        </div>

        {/* Sign out */}
        <div className="mt-10 surface p-7 flex items-center justify-between gap-4">
          <div>
            <div className="eyebrow mb-1">Session</div>
            <p className="font-serif text-xl text-ink-900 leading-tight">Sign out of Typewriter</p>
            <p className="text-ink-500 text-sm mt-1">End this session on this device.</p>
          </div>
          <button onClick={logout} className="btn-secondary border-accent-200 text-accent-700 hover:border-accent-500">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, icon }) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-center gap-6 px-7 py-5">
      <div className="flex items-center gap-2">
        {icon}
        <span className="eyebrow">{label}</span>
      </div>
      <span className="text-ink-900 text-[15px] truncate capitalize">{value}</span>
    </div>
  );
}

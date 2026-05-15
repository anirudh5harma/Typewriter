import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User, Mail, Shield, Calendar, Edit3, Check, AlertCircle,
  Save, LogOut
} from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');
    setSaved(false);
    // In a real app, this would call an API
    setTimeout(() => {
      setSaved(true);
      setEditing(false);
    }, 600);
  };

  const roleColors = {
    admin: 'bg-terracotta-100 text-terracotta-700 border-terracotta-200',
    editor: 'bg-sage-100 text-sage-700 border-sage-200',
    viewer: 'bg-ink-100 text-ink-600 border-ink-200',
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif font-bold mb-8">Profile</h1>

        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-parchment-300 shadow-sm p-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-terracotta-500 flex items-center justify-center text-white text-2xl font-serif font-bold shadow-md flex-shrink-0">
                {(user?.email || 'U')[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-serif text-2xl font-semibold truncate">{user?.email || 'User'}</h2>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border capitalize ${roleColors[user?.role] || roleColors.viewer}`}>
                    {user?.role || 'viewer'}
                  </span>
                </div>
                <p className="text-ink-400 text-sm flex items-center gap-1.5 mb-4">
                  <Calendar size={14} />
                  Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>

                {editing ? (
                  <div className="space-y-3">
                    {error && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-terracotta-50 border border-terracotta-200 text-terracotta-700 text-sm">
                        <AlertCircle size={16} /> {error}
                      </div>
                    )}
                    {saved && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-sage-50 border border-sage-200 text-sage-700 text-sm">
                        <Check size={16} /> Profile updated
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-ink-700 mb-1.5">Email</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button onClick={handleSave} className="btn-primary">
                        <Save size={16} className="mr-1.5" />
                        Save
                      </button>
                      <button onClick={() => { setEditing(false); setEmail(user?.email || ''); }} className="btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail size={16} className="text-ink-300" />
                      <span className="text-ink-600">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Shield size={16} className="text-ink-300" />
                      <span className="text-ink-600 capitalize">{user?.role || 'viewer'} access</span>
                    </div>
                    <button
                      onClick={() => setEditing(true)}
                      className="btn-secondary mt-2 text-sm"
                    >
                      <Edit3 size={14} className="mr-1.5" />
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl border border-parchment-300 shadow-sm p-8">
            <h3 className="font-serif text-lg font-semibold text-terracotta-700 mb-4">Danger Zone</h3>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-ink-700">Sign out everywhere</p>
                <p className="text-xs text-ink-400 mt-0.5">This will end your current session.</p>
              </div>
              <button
                onClick={logout}
                className="btn-secondary border-terracotta-200 text-terracotta-600 hover:bg-terracotta-50 hover:text-terracotta-700"
              >
                <LogOut size={14} className="mr-1.5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: editorial */}
      <div className="hidden lg:flex relative bg-ink-900 text-paper overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark bg-grid grid-fade opacity-50" />
        <div className="absolute -top-20 -left-20 w-[480px] h-[480px] bg-accent-500 rounded-full blur-[160px] opacity-20" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="w-7 h-7 rounded-md bg-paper flex items-center justify-center">
              <span className="font-serif-i text-ink-900 text-base leading-none -mt-0.5">T</span>
            </div>
            <span className="font-serif text-[22px] tracking-tightest">Typewriter</span>
          </Link>

          <div className="max-w-md">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400 mb-6">
              — Returning writer
            </div>
            <h2 className="font-serif text-5xl tracking-display leading-[1.02] mb-6">
              The page is <span className="font-serif-i">waiting</span> where you left it<span className="text-accent-500">.</span>
            </h2>
            <p className="text-ink-300 text-[15px] leading-relaxed">
              Your drafts, your collaborators, your cursor mid-sentence. Sign in to pick up the thread.
            </p>
          </div>

          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
            © {new Date().getFullYear()} Typewriter Labs
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center px-6 py-20 lg:py-12 bg-paper">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded-md bg-ink-900 flex items-center justify-center">
              <span className="font-serif-i text-paper text-base leading-none -mt-0.5">T</span>
            </div>
            <span className="font-serif text-[22px] tracking-tightest">Typewriter</span>
          </Link>

          <div className="mb-8">
            <div className="eyebrow mb-3">Sign in</div>
            <h1 className="font-serif text-4xl text-ink-900 tracking-display leading-tight">
              Welcome <span className="font-serif-i">back.</span>
            </h1>
          </div>

          {error && (
            <div className="mb-5 flex items-center gap-2 p-3 rounded-xl bg-accent-50 border border-accent-200 text-accent-700 text-sm animate-slide-down">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label block mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@studio.com"
                className="input"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label">Password</label>
                <a href="#" onClick={e => e.preventDefault()} className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400 hover:text-ink-700">
                  forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-700"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3"/>
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Signing in
                </>
              ) : (
                <>Continue <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-sm text-ink-500">
            New here?{' '}
            <Link to="/register" className="link">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

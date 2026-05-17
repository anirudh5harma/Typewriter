import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ArrowRight, AlertCircle, Check } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Passwords do not match');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    try {
      await register(email, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1400);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex items-center justify-center px-6 py-20 lg:py-12 bg-paper order-2 lg:order-1">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded-md bg-ink-900 flex items-center justify-center">
              <span className="font-serif-i text-paper text-base leading-none -mt-0.5">T</span>
            </div>
            <span className="font-serif text-[22px] tracking-tightest">Typewriter</span>
          </Link>

          <div className="mb-8">
            <div className="eyebrow mb-3">Create account</div>
            <h1 className="font-serif text-4xl text-ink-900 tracking-display leading-tight">
              Start a <span className="font-serif-i">new draft.</span>
            </h1>
          </div>

          {success && (
            <div className="mb-5 flex items-center gap-2 p-3 rounded-xl bg-ink-50 border border-[var(--hair)] text-ink-700 text-sm animate-slide-down">
              <Check size={16} className="text-accent-600" /> Account created. Redirecting…
            </div>
          )}
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
              <label className="label block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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

            <div>
              <label className="label block mb-1.5">Confirm password</label>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Repeat password"
                className="input"
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="btn-accent w-full py-3.5 disabled:opacity-60"
            >
              {loading ? 'Creating account' : (<>Create account <ArrowRight size={16} /></>)}
            </button>
          </form>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
            By continuing you agree to terms · privacy
          </p>

          <p className="mt-8 text-sm text-ink-500">
            Already writing?{' '}
            <Link to="/login" className="link">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right: editorial */}
      <div className="hidden lg:flex relative bg-ink-900 text-paper overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 bg-grid-dark bg-grid grid-fade opacity-50" />
        <div className="absolute -bottom-20 -right-20 w-[480px] h-[480px] bg-accent-500 rounded-full blur-[160px] opacity-20" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-2 w-fit ml-auto">
            <div className="w-7 h-7 rounded-md bg-paper flex items-center justify-center">
              <span className="font-serif-i text-ink-900 text-base leading-none -mt-0.5">T</span>
            </div>
            <span className="font-serif text-[22px] tracking-tightest">Typewriter</span>
          </Link>

          <div className="max-w-md">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400 mb-6">
              — A quiet beginning
            </div>
            <h2 className="font-serif text-5xl tracking-display leading-[1.02] mb-6">
              Every great draft starts with a <span className="font-serif-i">blank page</span><span className="text-accent-500">.</span>
            </h2>
            <p className="text-ink-300 text-[15px] leading-relaxed">
              No templates. No onboarding tour. Just a clean surface and the people you choose to share it with.
            </p>
          </div>

          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
            new · free during beta
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="w-7 h-7 rounded-md bg-ink-900 flex items-center justify-center">
        <span className="font-serif-i text-white text-base leading-none -mt-0.5">T</span>
      </div>
      <span className="font-serif text-[22px] tracking-tightest text-ink-900 leading-none">
        Typewriter
      </span>
    </Link>
  );
}

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isLanding = location.pathname === '/';

  const navLink = (to, label) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`px-3 py-2 text-sm rounded-full transition-colors ${
          active ? 'text-ink-900 bg-ink-50' : 'text-ink-500 hover:text-ink-900'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || !isLanding
          ? 'bg-paper/85 backdrop-blur-xl border-b border-[var(--hair)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Wordmark />
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              {navLink('/dashboard', 'Documents')}
              {navLink('/profile', 'Profile')}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="btn-ghost text-sm"
            >
              Sign out
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-ghost text-sm">Sign in</Link>
              <Link to="/register" className="btn-primary text-sm">
                Get started
                <span className="font-mono text-[10px] opacity-60">↗</span>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-full hover:bg-ink-50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--hair)] bg-paper/95 backdrop-blur-xl animate-slide-down">
          <div className="px-6 py-4 flex flex-col gap-1">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn-ghost justify-start">Documents</Link>
                <Link to="/profile" className="btn-ghost justify-start">Profile</Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="btn-ghost justify-start"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost justify-start">Sign in</Link>
                <Link to="/register" className="btn-primary justify-start mt-1">Get started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PenLine, Menu, X, User, LogOut, FileText } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isLanding = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isLanding
          ? 'bg-parchment-50/90 backdrop-blur-md border-b border-parchment-300 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-terracotta-500 flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow">
            <PenLine size={18} strokeWidth={2.5} />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-ink-900">
            Typewriter
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`btn-ghost ${location.pathname === '/dashboard' ? 'bg-parchment-200 text-ink-900' : ''}`}
              >
                <FileText size={16} className="mr-1.5" />
                Documents
              </Link>
              <Link
                to="/profile"
                className={`btn-ghost ${location.pathname === '/profile' ? 'bg-parchment-200 text-ink-900' : ''}`}
              >
                <User size={16} className="mr-1.5" />
                Profile
              </Link>
              <div className="h-5 w-px bg-parchment-300 mx-1" />
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="btn-ghost text-terracotta-600 hover:text-terracotta-700 hover:bg-terracotta-50"
              >
                <LogOut size={16} className="mr-1.5" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Sign in</Link>
              <Link to="/register" className="btn-primary ml-2">Get started</Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-parchment-200 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-parchment-300 bg-parchment-50/95 backdrop-blur-md animate-slide-down">
          <div className="px-6 py-4 flex flex-col gap-1">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn-ghost justify-start">
                  <FileText size={16} className="mr-2" /> Documents
                </Link>
                <Link to="/profile" className="btn-ghost justify-start">
                  <User size={16} className="mr-2" /> Profile
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="btn-ghost justify-start text-terracotta-600"
                >
                  <LogOut size={16} className="mr-2" /> Sign out
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

import { Link } from 'react-router-dom';
import { PenLine, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-parchment-300 bg-parchment-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-terracotta-500 flex items-center justify-center text-white">
              <PenLine size={14} strokeWidth={2.5} />
            </div>
            <span className="font-serif text-lg font-semibold text-ink-900">Typewriter</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-ink-400">
            <Link to="/" className="hover:text-ink-700 transition-colors">Home</Link>
            <Link to="/dashboard" className="hover:text-ink-700 transition-colors">Documents</Link>
            <a href="#" className="hover:text-ink-700 transition-colors" onClick={e => e.preventDefault()}>Privacy</a>
            <a href="#" className="hover:text-ink-700 transition-colors" onClick={e => e.preventDefault()}>Terms</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-parchment-200 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-ink-300">
          <span>Made with <Heart size={12} className="inline text-terracotta-400 mx-0.5" /> for writers everywhere</span>
          <span>&copy; {new Date().getFullYear()} Typewriter. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

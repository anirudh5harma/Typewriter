import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--hair)] bg-paper">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-ink-900 flex items-center justify-center">
                <span className="font-serif-i text-white text-sm leading-none -mt-0.5">T</span>
              </div>
              <span className="font-serif text-xl tracking-tightest text-ink-900">Typewriter</span>
            </div>
            <p className="text-ink-500 text-sm max-w-sm">
              A collaborative document surface for teams who treat writing as craft.
            </p>
          </div>

          <div>
            <div className="eyebrow mb-3">Product</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="text-ink-700 hover:text-ink-900">Documents</Link></li>
              <li><Link to="/profile" className="text-ink-700 hover:text-ink-900">Profile</Link></li>
              <li><a href="#" onClick={e => e.preventDefault()} className="text-ink-700 hover:text-ink-900">Changelog</a></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-3">Company</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={e => e.preventDefault()} className="text-ink-700 hover:text-ink-900">Privacy</a></li>
              <li><a href="#" onClick={e => e.preventDefault()} className="text-ink-700 hover:text-ink-900">Terms</a></li>
              <li><a href="#" onClick={e => e.preventDefault()} className="text-ink-700 hover:text-ink-900">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--hair)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
            © {new Date().getFullYear()} Typewriter Labs
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
            v0.1 · built for writers
          </span>
        </div>
      </div>
    </footer>
  );
}

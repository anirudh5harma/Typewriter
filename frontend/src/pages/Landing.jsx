import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ArrowUpRight, ArrowRight, Command, Users, History, Shield,
  Sparkles, Workflow, Activity
} from 'lucide-react';

function SectionLabel({ index, children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
        {String(index).padStart(2, '0')}
      </span>
      <span className="h-px flex-1 bg-[var(--hair)]" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 grid-bg grid-fade opacity-70" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[420px] bg-accent-100/40 blur-[120px] rounded-full -z-10" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="pill pill-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-blink" />
              Now in private beta
            </div>
          </div>

          <h1 className="text-display text-center text-ink-900 text-balance animate-slide-up">
            The collaborative
            <br className="hidden md:block" />
            <span className="font-serif-i text-ink-700"> surface </span>
            for writing<span className="text-accent-500">.</span>
          </h1>

          <p className="mt-8 text-center text-lg md:text-xl text-ink-500 max-w-2xl mx-auto text-pretty animate-slide-up animate-stagger-1">
            Typewriter is a quiet, fast document editor for teams who care about craft.
            Real-time presence, granular permissions, and a canvas that gets out of the way.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up animate-stagger-2">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-accent text-base px-7 py-3.5">
                Open dashboard
                <ArrowUpRight size={18} />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-accent text-base px-7 py-3.5">
                  Start writing
                  <ArrowUpRight size={18} />
                </Link>
                <Link to="/login" className="btn-secondary text-base px-7 py-3.5">
                  Sign in
                </Link>
              </>
            )}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-ink-400 font-mono animate-fade-in animate-stagger-3">
            <Command size={12} />
            <span>no credit card · ⌘K shortcuts · ships every week</span>
          </div>
        </div>
      </section>

      {/* ── Editor Preview ───────────────────────────────────── */}
      <section className="relative pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="surface overflow-hidden shadow-[0_40px_80px_-32px_rgba(10,10,10,0.18)]">
            {/* window chrome */}
            <div className="hairline-b px-4 py-3 flex items-center gap-3 bg-paper">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-ink-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-ink-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-ink-200" />
              </div>
              <span className="font-mono text-[11px] text-ink-400 ml-2">
                typewriter.app / the-great-draft
              </span>
              <span className="ml-auto flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                <span className="font-mono text-[11px] text-ink-500">3 live</span>
              </span>
            </div>

            {/* preview body */}
            <div className="px-8 md:px-16 py-12 md:py-16 bg-surface">
              <div className="max-w-2xl mx-auto">
                <div className="eyebrow mb-4">Chapter 01</div>
                <h2 className="font-serif text-4xl md:text-5xl text-ink-900 leading-[1.05] mb-6 tracking-display">
                  The art of <span className="font-serif-i">collaborative</span> writing
                </h2>
                <p className="text-ink-600 leading-relaxed mb-4 text-[17px]">
                  When multiple minds converge on a single document, something quietly powerful happens.
                  Ideas thicken. Sentences sharpen. The draft starts to listen back.
                </p>
                <p className="text-ink-600 leading-relaxed text-[17px]">
                  Typewriter is built for that moment<span className="caret"></span>
                </p>

                <div className="mt-10 pt-6 hairline-t flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {['A','S','M'].map((c,i) => (
                      <div
                        key={i}
                        className={`w-7 h-7 rounded-full border-2 border-surface flex items-center justify-center text-[11px] font-mono ${
                          i===0?'bg-ink-900 text-paper':i===1?'bg-accent-500 text-white':'bg-ink-100 text-ink-700'
                        }`}
                      >{c}</div>
                    ))}
                  </div>
                  <span className="font-mono text-[11px] text-ink-500 uppercase tracking-[0.16em]">
                    3 editors · synced just now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="border-t border-[var(--hair)] bg-paper py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel index={1}>Capabilities</SectionLabel>

          <div className="grid md:grid-cols-12 gap-8 mb-20">
            <h2 className="md:col-span-7 font-serif text-4xl md:text-6xl tracking-display text-ink-900 leading-[1.02]">
              Everything you need
              <br />
              <span className="font-serif-i text-ink-500">to do the work.</span>
            </h2>
            <p className="md:col-span-5 md:pt-4 text-ink-500 text-[17px] leading-relaxed">
              Built for the entire writing arc — from blank canvas to shipped draft.
              Every feature earns its place by getting out of yours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[var(--hair)] border border-[var(--hair)] rounded-2xl overflow-hidden">
            {[
              { icon: Activity,  k:'01', t: 'Real-time presence', d: 'Every cursor, every keystroke. Sub-100ms sync without conflict.' },
              { icon: Shield,    k:'02', t: 'Granular permissions', d: 'Owner, editor, viewer. Per-document, per-team, per-link.' },
              { icon: History,   k:'03', t: 'Full version history', d: 'Travel back to any revision. Restore a paragraph or the whole draft.' },
              { icon: Workflow,  k:'04', t: 'Quiet by default', d: 'No splash screens. No nudges. The page just lets you write.' },
              { icon: Users,     k:'05', t: 'Teams & spaces', d: 'Group documents into spaces. Bring the right people, leave the rest.' },
              { icon: Sparkles,  k:'06', t: 'Typography that breathes', d: 'Editorial typesetting. Output that looks shipped from the first draft.' },
            ].map(({icon:Icon,k,t,d}) => (
              <div key={k} className="bg-surface p-8 group hover:bg-paper transition-colors">
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-[11px] text-ink-400 uppercase tracking-[0.18em]">{k}</span>
                  <Icon size={18} className="text-ink-300 group-hover:text-accent-500 transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl text-ink-900 mb-2 leading-tight">{t}</h3>
                <p className="text-ink-500 text-[14px] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="border-t border-[var(--hair)] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel index={2}>Workflow</SectionLabel>
          <h2 className="font-serif text-4xl md:text-6xl tracking-display text-ink-900 leading-[1.02] mb-20 max-w-3xl">
            From blank page to <span className="font-serif-i">final draft.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              { d:'Day 1',  t:'Open a document', b:'Hit ⌘N. Title it. Start typing. No setup, no templates, no welcome tour.' },
              { d:'Day 3',  t:'Invite your team', b:'Share a link. Assign roles. Watch presence light up the margins in real time.' },
              { d:'Day 7',  t:'Ship the draft',   b:'Roll back any edit. Lock the version. Export clean typography to anywhere.' },
            ].map((s,i)=>(
              <div key={i} className="relative">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-600 mb-4">{s.d}</div>
                <h3 className="font-serif text-3xl text-ink-900 mb-3 leading-tight">{s.t}</h3>
                <p className="text-ink-500 text-[15px] leading-relaxed">{s.b}</p>
                <div className="absolute -top-2 right-0 font-serif-i text-ink-200 text-7xl leading-none select-none">
                  0{i+1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="bg-ink-900 text-paper">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-36 relative">
            <div className="absolute inset-0 bg-grid-dark bg-grid grid-fade opacity-60" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500 rounded-full blur-[140px] opacity-20" />

            <div className="relative max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400 mb-6">
                — Ready when you are
              </div>
              <h2 className="font-serif text-5xl md:text-7xl tracking-display leading-[1] text-paper">
                Write the next
                <br />
                <span className="font-serif-i">draft</span> today<span className="text-accent-500">.</span>
              </h2>
              <p className="mt-8 text-ink-300 text-lg max-w-xl leading-relaxed">
                Join the writers and teams using Typewriter as the surface for their most important documents.
              </p>

              <div className="mt-12 flex flex-col sm:flex-row items-start gap-3">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="btn-accent text-base px-7 py-3.5">
                    Open dashboard <ArrowRight size={18} />
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn-accent text-base px-7 py-3.5">
                      Create your account <ArrowRight size={18} />
                    </Link>
                    <Link to="/login" className="text-base px-7 py-3.5 rounded-full border border-ink-700 text-paper hover:border-ink-300 transition-colors inline-flex items-center gap-2">
                      Sign in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
